import {
  Avatar,
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  Typography
} from '@material-ui/core';
import { Message } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { error, success } from '../../redux/actions/alertAction';
import { updateHelp } from '../../redux/actions/helpAction';
import { createNotify, deleteNotify } from '../../redux/callApi/notifyCall';
import { timeAgo } from '../../utils/date';
import customAxios from '../../utils/fetchData';
import Help from '../Modal/Help';
import { helpStyles } from '../../style';
import { addUser } from '../../redux/callApi/messageCall';
import { AvatarGroup } from '@material-ui/lab';

export default function HelpCard({ help, handleRemove, detail }) {
  const { auth, socket, message } = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = helpStyles();
  const [helped, setHelped] = useState(false);
  const [own, setOwn] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingHelp, setLoadingHelp] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const history = useHistory();
  const canHelp = () => {
    setLoadingHelp(true);
    customAxios(auth.token)
      .patch(`/help/help/${help._id}`)
      .then(res => {
        socket.emit('updateHelp', res.data.help);
        const dataNotify = {
          id: auth.user._id,
          text: ``,
          recipients: [help.userId._id],
          url: `/help/${help._id}`,
          content: `${auth.user.fullname} sẽ đến giúp bạn!`,
          image: `${auth.user.avatar}`
        };

        dispatch(createNotify(dataNotify, auth.token, socket));
        dispatch(updateHelp(res.data.help));
        setLoadingHelp(false);
        dispatch(
          success({
            message:
              'Cảm ơn bạn đã tham gia giúp đỡ! Hãy liên hệ với người cần giúp'
          })
        );
      })
      .catch(err => {
        dispatch(error({ message: 'Có lỗi xảy ra!' }));
        setLoadingHelp(false);
      });
  };
  const cancelHelp = () => {
    setLoadingHelp(true);
    customAxios(auth.token)
      .patch(`/help/cancel/${help._id}`)
      .then(res => {
        socket.emit('updateHelp', res.data.help);

        const dataNotify = {
          id: auth.user._id,
          url: `/help/${help._id}`,
        }
        dispatch(deleteNotify(dataNotify, auth.token, socket));
        dispatch(updateHelp(res.data.help));
        setLoadingHelp(false);
        dispatch(
          success({
            message:
              'Hủy thành công'
          })
        );
      })
      .catch(err => {
        dispatch(error({ message: 'Có lỗi xảy ra!' }));
        setLoadingHelp(false);
      });
  };

  const removeHelp = () => {
    setLoadingRemove(true);
    customAxios(auth.token)
      .delete(`/help/${help._id}`)
      .then(res => {
        socket.emit('deleteHelp', help._id);
        handleRemove(help._id);
        setLoadingRemove(false);
        dispatch(success({ message: 'Xóa yêu cầu thành công!' }));
      })
      .catch(err => {
        dispatch(error({ message: 'Có lỗi xảy ra!' }));
        setLoadingRemove(false);
      });
  };

  useEffect(() => {
    if (help.userId._id === auth.user._id) {
      setOwn(true);
    }
  }, [help.userId, auth.user]);

  useEffect(() => {
    if (help.state.filter(user=> user._id === auth.user._id).length !== 0 || own) {
      setHelped(true);
    }
  }, [auth.user, help.state, own]);

  const ref = React.createRef();

  const UpdateHelpRef = React.forwardRef((props, ref) => (
    <Help innerRef={ref} {...props} />
  ));

  const handleAddChat = (user) => {
    dispatch(addUser(auth, user, message, socket,
        (id) => {
          history.push(`/message/${id}`);
        }));
  }
  return (
    <Card>
      <CardHeader
        className={classes.cardHelpHeader}
        style={{borderBottom: "1px solid #d0d0d0"}}
        avatar={<Avatar alt="avatar" src={help.userId.avatar} className={classes.cardHelpAvatar}/>}
        action ={
          help.state.length === 0 &&
          <div className={classes.fadeLoadingCard} ></div>
        }
        title={
          <Typography
            component={Link}
            to={`/u/${help.userId._id}`}
            noWrap={false}
            variant="h6"
            className={classes.userName}
          >
            {help.userId.fullname}
          </Typography>
        }
        subheader={
          <Typography color="textSecondary" gutterBottom variant="body2">
             {timeAgo(new Date(help.createdAt))}
          </Typography>
        }
      />
      <CardContent style={{padding: "16px 16px 0 16px"}}>
        <Typography >
          <b>Liên lạc:</b> {detail ? help.contact : (help.contact.length > 30 ? help.contact.slice(0, 30)+ " ...": help.contact)}
        </Typography>
        <Typography>
          <b>Đang ở:</b>  {detail ? help.positionStr : (help.positionStr.length > 30 ? help.positionStr.slice(0, 30)+ " ...": help.positionStr)}
        </Typography>
        <Typography >
          <b>Gặp sự cố về:</b> {help.type}
        </Typography>
        <Typography >
          <b>Mô tả:</b> {detail ? help.description : (help.description.length > 30 ? help.description.slice(0, 30)+ " ...": help.description)}
        </Typography>
        <Typography>
          <b>Trạng thái:</b>{' '}
          {help.state.length === 0
            ? 'Chưa có ai giúp đỡ'
            : `Đã có ${help.state.length} người giúp`}
        </Typography>
        {help.state.length === 0 &&
          <div style={{height: 30, width: "100%"}}></div>
        }
        <AvatarGroup max={5} style={{ cursor: 'pointer' }}>
            {help.state.map(user =>
                <Avatar component={Link} to={`/u/${user._id}`} src={user.avatar} alt={'A'} key={user._id} style={{ height: 25, width: 25 }} />
            )}
        </AvatarGroup>
      </CardContent>
      {auth.user && (
        <CardActions
          style={{ display: 'flex', justifyContent: 'space-between',padding:"0 16px 10px 16px" }}
        >
          {own ? (
            <>
              {!detail && (
                <Button 
                  component={Link} 
                  to={`/help/${help._id}`} size="small"
                  variant="outlined" 
                  className={classes.buttonDetailCard}
                >
                  Chi tiết
                </Button>
              )}
              <Button
                size="small"
                variant="outlined"
                onClick={removeHelp}
                disabled={loadingRemove}
              >
                Xóa
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setShowUpdate(true)}
              >
                Cập nhật
              </Button>
              <Modal
                aria-labelledby="create-post"
                aria-describedby="create-post-modal"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                open={showUpdate}
                onClose={() => setShowUpdate(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500
                }}
              >
                <UpdateHelpRef
                  ref={ref}
                  help={help}
                  handleClose={() => setShowUpdate(false)}
                />
              </Modal>
            </>
          ) : (
            <>
              {!detail && (
                <Button 
                  component={Link} 
                  to={`/help/${help._id}`} size="small"
                  variant="outlined" 
                  className={classes.buttonDetailCard}
                >
                  Chi tiết
                </Button>
              )}

              {!helped && (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={canHelp}
                  className={classes.buttonDetailCard}
                  disabled={loadingHelp}
                >
                  Tôi có thể giúp
                </Button>
              )}
              {helped && (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={cancelHelp}
                  className={classes.buttonDetailCard}
                  disabled={loadingHelp}
                >
                  Hủy trợ giúp
                </Button>
              )}
              <Button
                onClick={() => handleAddChat(help.userId)}
                variant="outlined"
                size="small"
                startIcon={<Message />}
                className={classes.buttonDetailCard}
              >
                Nhắn tin
              </Button>
            </>
          )}
        </CardActions>
      )}
    </Card>
  );
}
