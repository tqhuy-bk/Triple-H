import {
  Typography,
  Avatar,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemText,
  Collapse,
  InputBase,
  ListItemIcon,
  ListItemAvatar
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import {
  Send,
  InfoOutlined,
  ExpandLess,
  ExpandMore,
  Close,
  ExitToAppOutlined,
  DeleteForeverOutlined
} from '@material-ui/icons';
import { messageStyles } from '../../style';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  addMessage,
  getMessages,
  deleteConversation,
  seenMessage,
  changeNameConversation,
  moveGroup,
  groupAdd,
  moveGroupByAdmin
} from '../../redux/callApi/messageCall';
import { timeAgo } from '../../utils/date';
import EmojiPicker from '../Input/EmojiPicker';
import { Link } from 'react-router-dom';
import customAxios from '../../utils/fetchData';

export default function Chat() {
  const classes = messageStyles();
  const [conversation, setConversation] = useState();
  const { auth, message, socket } = useSelector(state => state);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { id } = useParams();
  const refDisplay = useRef();
  const history = useHistory();
  const [error, setError] = useState('');
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  useEffect(() => {
    const currentConversation = message.conversations.find(
      conversation => conversation._id === id
    );
    if (currentConversation) setConversation(currentConversation);
  }, [id, message.conversations]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text.trim()) return;
    setText('');
    const msg = {
      isGroup: conversation.isGroup,
      conversation: id,
      text: text,
      createdAt: new Date().toISOString(),
      sender: auth.user,
      members: conversation.members,
      name: conversation.isGroup ? conversation.name : auth.user.fullname,
      recipients: conversation.isGroup
        ? conversation.members.map(member => member._id)
        : [conversation.members[0]._id]
    };
    dispatch(addMessage(msg, auth, socket));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getMessages(id, auth, socket));
      if (refDisplay.current) {
        refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [id, dispatch, auth, socket]);

  useEffect(() => {
    if (id) {
      dispatch(seenMessage(id, auth));
    }
  }, [id, dispatch, auth]);

  useEffect(() => {
    document.title = 'Tin nhắn';
  }, []);
  const handleDelete = () => {
    setState({
      loading: true,
      error: false
    });
    dispatch(
      deleteConversation(
        id,
        auth,
        () => {
          setState({
            loading: false,
            error: false
          });
          handleCloseDelete();
        },
        () => {
          setState({
            loading: false,
            error: true
          });
        }
      )
    );
    history.push('/message');
  };

  const handleMoveGroup = () => {
    setState({
      loading: true,
      error: false
    });
    dispatch(
      moveGroup(
        id,
        auth,
        () => {
          setState({
            loading: false,
            error: false
          });
          handleCloseMoveGroup();
        },
        () => {
          setState({
            loading: false,
            error: true
          });
        }
      )
    );
    history.push('/message');
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const [showMoveGroup, setShowMoveGroup] = useState(false);
  const handleCloseMoveGroup = () => {
    setShowMoveGroup(false);
  };
  const handleShowMoveGroup = () => {
    setShowMoveGroup(true);
  };

  const [showInfo, setShowInfo] = useState(true);
  const handleShowInfo = () => {
    setShowInfo(prev => !prev);
  };
  const [openName, setOpenName] = useState(true);
  const [openMembers, setOpenMembers] = useState(false);
  const [openMove, setOpenMove] = useState(false);
  const handleClickName = () => {
    setOpenName(!openName);
  };
  const handleClickMembers = () => {
    setOpenMembers(!openMembers);
  };
  const handleClickMove = () => {
    setOpenMove(!openMove);
  };
  const [name, setName] = useState(conversation?.name);
  const handleSubmitName = e => {
    e.preventDefault();
    if (name === '') {
      setError('Cần điền tên nhóm!');
      return;
    }
    setState({
      loading: true,
      error: null
    });
    dispatch(
      changeNameConversation(
        name,
        id,
        auth,
        () => {
          setState({
            loading: false,
            error: false
          });
        },
        () => {
          setState({
            loading: false,
            error: true
          });
        }
      )
    );
  };

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const handleSearch = async e => {
    e.preventDefault();
    if (!search) return setSearchResult([]);
    try {
      const res = await customAxios().get(
        `/user/search_by_name?fullname=${search}`
      );
      const tempData = res.data.users.filter(
        item => item._id !== auth.user._id
      );
      setSearchResult(tempData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = user => {
    const isVail = conversation.members.filter(item => item._id === user._id);
    if (isVail.length > 0) {
      setError('Đã thêm thành viên!');
      return;
    } else {
      dispatch(groupAdd(user, id, auth));
    }
  };

  const handleRemoveByAdmin = member => {
    if (auth.user._id === conversation.groupAdmin._id) {
      setState({
        loading: true,
        error: false
      });
      dispatch(
        moveGroupByAdmin(
          member,
          id,
          auth,
          () => {
            setState({
              loading: false,
              error: false
            });
          },
          () => {
            setState({
              loading: false,
              error: true
            });
            setError('Xóa không thành công');
          }
        )
      );
    }
  };
  return (
    <>
      {conversation && (
        <Grid item md={9} sm={10} xs={10}>
          <div className={classes.message_conversation}>
            <div className={classes.message_box}>
              <div className={classes.message_box_header}>
                <div className={classes.message_box_header_left}>
                  <Avatar
                    alt="avatar"
                    src={conversation.members[0].avatar}
                  ></Avatar>
                  {conversation.isGroup ? (
                    <Typography className={classes.message_box_header_text}>
                      {conversation.name}
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.message_box_header_text}
                      component={Link}
                      to={`/u/${conversation.members[0]._id}`}
                    >
                      {conversation.name}
                    </Typography>
                  )}
                </div>
                <div className={classes.message_box_header_right}>
                  <IconButton onClick={handleShowInfo}>
                    <InfoOutlined />
                  </IconButton>
                </div>
              </div>
              <div className={classes.message_container}>
                <div className={classes.message_chats} ref={refDisplay}>
                  {message.data.map((item, index) => (
                    <div key={index}>
                      {item.sender._id !== auth.user._id ? (
                        <div className={classes.message_yourchat}>
                          <div className={classes.message_display}>
                            <div className={classes.message_content_your}>
                              {conversation.isGroup && (
                                <Typography
                                  style={{ marginLeft: 35 }}
                                  className={classes.chat_date}
                                >
                                  {' '}
                                  {item.sender.fullname.split(" ")[item.sender.fullname.split(" ").length - 1]}
                                </Typography>
                              )}
                              <div style={{ display: 'flex' }}>
                                <Avatar
                                  className={classes.chat_your_user}
                                  src={item.sender.avatar}
                                ></Avatar>
                                <Typography
                                  className={classes.chat_your_content}
                                >
                                  {item.text}
                                </Typography>
                              </div>
                              <div className={classes.chat_date}>
                                {timeAgo(new Date(item.createdAt))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={classes.message_mychat}>
                          <div className={classes.message_display}>
                            <div className={classes.message_content_my}>
                              <div style={{ display: 'flex' }}>
                                <Typography className={classes.chat_my_content}>
                                  {item.text}
                                </Typography>
                                <Avatar
                                  className={classes.chat_my_user}
                                  src={item.sender.avatar}
                                ></Avatar>
                              </div>
                              <div className={classes.chat_date}>
                                {timeAgo(new Date(item.createdAt))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className={classes.chat_input}>
                <form
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between'
                  }}
                  onSubmit={handleSubmit}
                >
                  <input
                    placeholder="Nhập tin nhắn..."
                    type="text"
                    aria-multiline
                    className={classes.chat_input_form}
                    value={text}
                    onChange={e => setText(e.target.value)}
                  ></input>
                  <EmojiPicker content={text} setContent={setText} />
                  <IconButton
                    disabled={!text || text.trim() === ''}
                    type="submit"
                  >
                    <Send className={classes.iconSend} />
                  </IconButton>
                </form>
              </div>
            </div>
            <div
              className={
                showInfo
                  ? classes.conversationInfo
                  : classes.conversationInfoHidden
              }
            >
              <Avatar
                alt="avatar"
                src={conversation.members[0].avatar}
                className={classes.infoImage}
              ></Avatar>
              <Typography variant="h6">{conversation.name}</Typography>
              {error !== '' && (
                <Typography variant="body1" style={{ color: 'red' }}>
                  {error}
                </Typography>
              )}
              <List component="nav" className={classes.infoOptions}>
                <ListItem
                  button
                  onClick={handleClickName}
                  className={classes.infoOption}
                >
                  <ListItemText
                    style={{ fontWeight: 500 }}
                    primary="Thay đổi tên trò chuyện"
                  />
                  {openName ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openName} timeout="auto" unmountOnExit>
                  <div style={{ display: 'flex' }}>
                    <InputBase
                      placeholder="Tên nhóm trò chuyện"
                      title="name"
                      variant="outlined"
                      name="name"
                      id="name"
                      required
                      className={classes.userNameInput}
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                    <Button
                      className={classes.button}
                      onClick={handleSubmitName}
                      disabled={state.loading}
                      style={{
                        padding: 20,
                        height: 40,
                        fontSize: 12,
                        marginLeft: 10
                      }}
                    >
                      {state.loading ? (
                        <CircularProgress size={15} color="inherit" />
                      ) : (
                        'Cập nhập'
                      )}
                    </Button>
                  </div>
                </Collapse>
                {conversation.isGroup && (
                  <>
                    <ListItem
                      button
                      onClick={handleClickMembers}
                      className={classes.infoOption}
                    >
                      <ListItemText
                        style={{ fontWeight: 500 }}
                        primary="Thành viên trò chuyện"
                      />
                      {openMembers ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                      in={openMembers}
                      timeout="auto"
                      unmountOnExit
                      style={{ marginLeft: 15 }}
                    >
                      <List component="nav">
                        {conversation.members
                          .concat([auth.user])
                          .map((member, idx) => (
                            <ListItem button key={idx} style={{ padding: 0 }}>
                              <ListItemAvatar>
                                <Avatar
                                  alt="avatar"
                                  src={member.avatar}
                                ></Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                className={classes.message_card_text}
                                primary={member.fullname}
                                secondary={
                                  member._id === conversation.groupAdmin._id
                                    ? 'Người tạo nhóm'
                                    : 'Thành viên'
                                }
                                component={Link}
                                to={`/u/${member._id}`}
                              />
                              {conversation.groupAdmin._id ===
                                auth.user._id && (
                                <ListItemIcon>
                                  <IconButton
                                    onClick={() => handleRemoveByAdmin(member)}
                                  >
                                    <Close />
                                  </IconButton>
                                </ListItemIcon>
                              )}
                            </ListItem>
                          ))}
                      </List>
                      <form onSubmit={handleSearch}>
                        <InputBase
                          placeholder="Thêm thành viên"
                          title="search"
                          variant="outlined"
                          name="search"
                          id="search"
                          className={classes.userNameInput}
                          style={{ width: '90%' }}
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                        />
                      </form>
                      <List className={classes.message_users_list}>
                        {searchResult.length > 0 ? (
                          <>
                            {searchResult.map(user => (
                              <ListItem
                                button
                                key={user._id}
                                onClick={() => handleAdd(user)}
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt="avatar"
                                    src={user.avatar}
                                  ></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.fullname} />
                              </ListItem>
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </List>
                    </Collapse>
                  </>
                )}
                <ListItem
                  button
                  onClick={handleClickMove}
                  className={classes.infoOption}
                >
                  <ListItemText
                    style={{ fontWeight: 500 }}
                    primary="Quyền riêng tư"
                  />
                  {openMove ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMove} timeout="auto" unmountOnExit>
                  {conversation.isGroup && (
                    <>
                      <ListItem button onClick={handleShowMoveGroup}>
                        <ListItemIcon>
                          <ExitToAppOutlined />
                        </ListItemIcon>
                        <ListItemText
                          primary="Rời khỏi nhóm"
                          style={{ marginLeft: -15 }}
                        />
                      </ListItem>
                      <Dialog
                        open={showMoveGroup}
                        onClose={handleCloseMoveGroup}
                        aria-labelledby="show-delete-dialog"
                        aria-describedby="show-delete-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {'Bạn có chắc chắn muốn rời khỏi nhóm?'}
                        </DialogTitle>
                        <DialogContent>Bạn sẽ không thể hoàn tác</DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseMoveGroup}>Hủy</Button>
                          <Button
                            onClick={handleMoveGroup}
                            className={classes.buttonDelete}
                            disabled={state.loading}
                          >
                            {state.loading ? (
                              <CircularProgress size={15} color="inherit" />
                            ) : (
                              'Rời'
                            )}{' '}
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  )}
                  <ListItem button onClick={handleShowDelete}>
                    <ListItemIcon>
                      <DeleteForeverOutlined style={{ color: 'red' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Xóa trò chuyện"
                      style={{ color: 'red', marginLeft: -15 }}
                    />
                  </ListItem>
                  <Dialog
                    open={showDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="show-delete-dialog"
                    aria-describedby="show-delete-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {'Bạn có chắc chắn muốn xóa?'}
                    </DialogTitle>
                    <DialogContent>
                      Bạn sẽ không thể khôi phục lại dữ liệu sau khi xóa!
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDelete}>Hủy</Button>
                      <Button
                        onClick={handleDelete}
                        className={classes.buttonDelete}
                        disabled={state.loading}
                      >
                        {state.loading ? (
                          <CircularProgress size={15} color="inherit" />
                        ) : (
                          'Xóa'
                        )}{' '}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Collapse>
              </List>
            </div>
          </div>
        </Grid>
      )}
    </>
  );
}
