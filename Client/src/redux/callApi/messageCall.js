import customAxios from "../../utils/fetchData";
import* as messageAction from "../actions/messageAction";
import * as alertAction from '../actions/alertAction';


export const addUser = (auth, user, message, socket, next) => async (dispatch) => {
    try {
        // console.log("user",user)
        const res = await customAxios(auth.token).post('/message/access_conversation', {userId:user._id, userName: user.fullname})
        if(message.conversations.every(item => item._id !== res.data.conversation._id)){
            const data ={
                    isGroup:res.data.conversation.isGroup,
                    _id: res.data.conversation._id, 
                    name: res.data.conversation.name,
                    members: res.data.conversation.members.filter(member => member._id !== auth.user._id),
                    latestMessage: { }
            }
            dispatch(messageAction.addUser(data))
        }

        next(res.data.conversation._id)
    } catch (err) {
        console.log(err);
    }
}

export const seenMessage = (id, auth) => async(dispatch) =>{
    try{
        dispatch(messageAction.seenMessage({id,member: auth.user._id}));
        await customAxios(auth.token).patch('/message/seen_message', {id})
    }catch(err){
        console.log(err);
    }
}

export const addMessage = (msg, auth, socket) => async(dispatch) =>{
    try{
        dispatch(messageAction.addMessage(msg));
        await customAxios(auth.token).post('/message/create_message', {conversationId: msg.conversation, text: msg.text, members: [msg.sender._id].concat(msg.members.map(item=> item._id))})
        socket.emit('addMessage', msg);
    }catch(err){
        console.log(err);
    }
}

export const changeNameConversation = (name, id, auth, next, error) => async(dispatch) =>{
    try{
        dispatch(messageAction.changeName({id, name}));
        await customAxios(auth.token).patch('/message/rename', {conversationId: id, name});
        next();
    }catch(err){
        console.log(err);
        error();
    }
}

export const getConversations = (auth) => async(dispatch)=>{
    try {
        const res = await customAxios(auth.token).get('/message/get_conversations');
    //    console.log("data",res.data.conversations);
       let newArr = [];
       res.data.conversations.forEach(conversation => {
           if(conversation.isGroup){
               newArr.push({
                    isGroup:conversation.isGroup,
                    _id: conversation._id, 
                    name: conversation.name,
                    members: conversation.members.filter(member => member._id !== auth.user._id),
                    groupAdmin: conversation.groupAdmin,
                    latestMessage: {
                        text: conversation.latestMessage?.text,
                        seen: conversation.latestMessage?.seen,
                        createdAt: conversation.latestMessage?.createdAt,
                        sender: conversation.latestMessage?.sender
                    }
                })
           }
           else{
                newArr.push({
                    isGroup: conversation.isGroup,
                    _id: conversation._id, 
                    name: conversation.members.filter(member => member._id !== auth.user._id)[0].fullname,
                    members: conversation.members.filter(member => member._id !== auth.user._id),
                    latestMessage: {
                        text: conversation.latestMessage?.text,
                        seen: conversation.latestMessage?.seen,
                        createdAt: conversation.latestMessage?.createdAt,
                        sender: conversation.latestMessage?.sender
                    }
                })
           }
       });
       dispatch(messageAction.getConversations(newArr))

    } catch (err) {
        console.log(err);
    }
}

export const getMessages = (id,auth, socket) => async(dispatch)=>{
    try {
        const res = await customAxios(auth.token).get(`/message/get_messages/${id}`);
        // console.log(res.data);
        dispatch(messageAction.getMessages(res.data.messages))

    } catch (err) {
        console.log(err);
    }
}

export const deleteConversation = (data, auth, next, error) => async(dispatch) =>{ 
    try {
        dispatch(messageAction.deleteConversation(data))
        await customAxios(auth.token).delete(`/message/delete_conversation/${data}`);
        dispatch(alertAction.success({ message: "Xóa cuộc trò chuyện thành công!" }))
        next();
    } catch (err) {
        error();
    }
}

export const moveGroup = (id, auth, next, error) => async(dispatch) =>{ 
    try {
        dispatch(messageAction.deleteConversation(id));
        await customAxios(auth.token).patch(`/message/group_move`,{conversationId: id, userId: auth.user._id});
        dispatch(alertAction.success({ message: "Rời cuộc trò chuyện!" }));
        next();
    } catch (err) {
        error();
    }
}
export const moveGroupByAdmin = (user, id, auth, next, error) => async(dispatch) =>{ 
    try {
        dispatch(messageAction.groupMove({user, id}));
        await customAxios(auth.token).patch(`/message/group_move`,{conversationId: id, userId: user._id});
        dispatch(alertAction.success({ message: "Xóa thành công" }));
        next();
    } catch (err) {
        error();
    }
}
export const groupAdd = (user, id, auth) => async(dispatch) =>{ 
    try {
        console.log("user",user)
        dispatch(messageAction.groupAdd({id, user}));
        await customAxios(auth.token).patch(`/message/group_add`,{conversationId: id, userId: user._id});
        // dispatch(alertAction.success({ message: "Rời cuộc trò chuyện!" }));
    } catch (err) {
       console.log(err)
    }
}

export const createGroupChat = (users, name, auth, next, error) => async(dispatch) =>{ 
    try {
        const data = {
            name,
            members: users.map(item => item._id)
        }
        // console.log("data", data)
        const res = await customAxios(auth.token).post('/message/create_group', data);
        // console.log("data", res.data.conversation)
        const dataConversation ={
            isGroup: res.data.conversation.isGroup,
            _id: res.data.conversation._id, 
            name: res.data.conversation.name,
            members: res.data.conversation.members.filter(member => member._id !== auth.user._id),
            groupAdmin: res.data.conversation.groupAdmin,
            latestMessage: { }
        }
        dispatch(messageAction.addUser(dataConversation))
        next();
    } catch (err) {
        error();
    }
}