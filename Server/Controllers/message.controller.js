const Messages = require('../Models/message.model');
const Conversations = require('../Models/conversation.model');

const ObjectId = require('mongoose').Types.ObjectId;
class MessageController {
    async seenMessage(req, res){
        try {
            if (!ObjectId.isValid(req.body.id)) {
                res.notFound('Không tìm thấy Cuộc trò chuyện');
                return;
            }
            const conversation = await Conversations.findById(req.body.id);

            if (!conversation) {
                res.notFound('Không tìm thấy cuộc trò chuyện')
                return;
            }
            await Messages.findOneAndUpdate(
                {
                  _id: conversation.latestMessage,
                  seen: { $elemMatch: { member: req.user._id } },
                },
                {
                  $set: {
                    'seen.$.isSeen': true,
                  },
                },
                { new: true }
              );
            res.success({
                success: true, message: "Đọc tin nhắn"
            });
            
        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }
    async getConversation(req, res){
        try {
            if (!ObjectId.isValid(req.params.id)) {
                res.notFound('Không tìm thấy Cuộc trò chuyện');
                return;
            }
            // console.log(req.params.id)
            let conversation = await Conversations.findById(req.params.id);

            if (!conversation) {
                res.notFound('Không tìm thấy cuộc trò chuyện')
                return;
            }

            conversation = await Conversations.findById(req.params.id)
            .populate('members', 'avatar username fullname role')
            .populate({
                path: 'latestMessage',
                populate: {
                  path: 'sender',
                  select: 'username fullname avatar'
                }
            })
            .populate('groupAdmin', 'avatar username fullname')


            res.success({
                success: true, message: "Lấy thông tin 1 cuộc trò chuyện thành công", conversation 
            });
            
        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }
    async accessConversation(req, res) {
        try {
            // console.log("userId", req.body.userId )
            // console.log("userName", req.body.userName)
            const { userId, userName } = req.body;
            const isConversation = await Conversations.find({
                isGroup: false,
                $or: [
                    { members: [userId, req.user._id] },
                    { members: [req.user._id, userId] }
                ]
            })
            .populate('members', 'avatar username fullname role')
            .populate({
                path: 'latestMessage',
                populate: {
                  path: 'sender',
                  select: 'username fullname avatar'
                }
            })
            // console.log("isConversation", isConversation)
            if (isConversation.length > 0) {
                res.success({
                    success: true,
                    message: "Get successful",
                    conversation: isConversation[0]
                })
            }else{
                const newConversation = new Conversations({
                    name: userName,
                    isGroup: false,
                    members: [req.user._id, userId],
                })
    
                await newConversation.save()
                const fullConversation = await Conversations.findOne({ _id: newConversation._id })
                .populate('members', 'avatar username fullname role')
                res.success({
                    success: true,
                    message: "Get successful",
                    conversation: fullConversation
                })
            }
        } catch (err) {
            res.error(err);
        }
    }
    
    async createMessage(req, res) {
        try {
            const { text, conversationId, members } = req.body;
            if (!text || !conversationId) {
                return res.sendStatus(400);
            }

            const seen = members.map(item => item == req.user._id ? {
                member: item,
                isSeen: true
            }: {member: item, isSeen: false});
            // console.log("seen", seen)

            const newMessage = new Messages({
                conversation: conversationId,
                sender: req.user._id,
                text,
                seen: seen
            })

            await newMessage.save();
            await Conversations.findByIdAndUpdate(conversationId, {
              latestMessage: newMessage._id
            });

            res.created({
              success: true,
              message: 'Create messageGroup successful',
              newMessage: {
                ...newMessage._doc
              }
            });
          }
        catch (err) {
          res.error(err);
        }
  }

  //get conversations of 1 user
  async getConversations(req, res) {
    try {
      const conversations = await Conversations.find({ members: req.user._id })
        .sort('-updatedAt')
        .populate('members', 'avatar username fullname role')
        .populate({
          path: 'latestMessage',
          populate: {
            path: 'sender',
            select: 'username fullname avatar'
          }
        })
        .populate('groupAdmin', 'avatar username fullname');

      res.success({
        success: true,
        message: 'Get conversations successful',
        conversations
      });
    } catch (err) {
      res.error(err);
    }
  }

  // get messages of the conversation
  async getMessages(req, res) {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.notFound('Không tìm thấy tin nhắn');
        return;
      }

      const messages = await Messages.find({
        conversation: req.params.id
      })
        .sort('-createAt')
        .populate('sender', 'username fullname avatar');

      res.success({
        success: true,
        message: 'Get messages successful',
        messages
      });
    } catch (err) {
      res.error(err);
    }
  }
  async deleteConversation(req, res) {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.notFound('Không tìm thấy tin nhắn');
        return;
      }

      await Conversations.findByIdAndDelete(req.params.id);
      await Messages.deleteMany({ conversation: req.params.id });

      res.success({
        success: true,
        message: 'Delete conversation successful'
      });
    } catch (err) {
      res.error(err);
    }
  }

  async createConversationGroup(req, res) {
      try {
          var members = req.body.members
          // console.log("members",members)
          if (!req.body.members || !req.body.name) {
              return res.status(400).send({ message: "Điền đầy đủ các trường!" });
          }
          if (req.body.members.length < 2) {
              return res
                .status(400)
                .send({ message: "Cần hơn hai thành viên để tạo nhóm" });
          }

          members.push(req.user._id)
          // console.log("members",members)
          const group = await Conversations.create({
              name: req.body.name,
              members: members,
              isGroup: true,
              groupAdmin: req.user._id,
          });
        
          const conversation = await Conversations.findOne({ _id: group._id })
              .populate("members", "username fullname avatar")
              .populate("groupAdmin", "username fullname avatar");

          res.success({
            success: true,
            message: 'Tạo nhóm chat thành công!',
            conversation
          });
        } catch (err) {
          res.error(err);
        }
  }

  async renameConversation(req, res) {
    try {
      const { conversationId, name } = req.body;
      const conversation = await Conversations.findByIdAndUpdate(
        conversationId,
        {
          name: name
        },
        {
          new: true
        }
      )
        .populate('members', 'username fullname avatar')
        .populate('groupAdmin', 'username fullname avatar');
      if (!conversation) {
        return res
          .status(404)
          .send({ message: 'Không tìm thấy cuộc trò chuyện' });
      }
      res.success({
        success: true,
        message: 'Thay đổi tên thành công',
        conversation
      });
    } catch (err) {
      res.error(err);
    }
  }

  async conversationGroupAdd(req, res) {
    try {
      const { conversationId, userId } = req.body;

      const conversation = await Conversations.findByIdAndUpdate(
        conversationId,
        {
          $push: { members: userId }
        },
        {
          new: true
        }
      )
        .populate('members', 'username fullname avatar')
        .populate('groupAdmin', 'username fullname avatar');

      if (!conversation) {
        return res
          .status(404)
          .send({ message: 'Không tìm thấy cuộc trò chuyện' });
      }
      res.success({
        success: true,
        message: 'Thêm thành viên thành công',
        conversation
      });
    } catch (err) {
      res.error(err);
    }
  }

  async conversationGroupRemove(req, res) {
    try {
      const { conversationId, userId } = req.body;

      const conversation = await Conversations.findByIdAndUpdate(
        conversationId,
        {
          $pull: { members: userId }
        },
        {
          new: true
        }
      )
        .populate('members', 'username fullname avatar')
        .populate('groupAdmin', 'username fullname avatar');

      if (!conversation) {
        return res
          .status(404)
          .send({ message: 'Không tìm thấy cuộc trò chuyện' });
      }
      res.success({
        success: true,
        message: 'Thêm thành viên thành công',
        conversation
      });
    } catch (err) {
      res.error(err);
    }
  }
}
module.exports = new MessageController();
