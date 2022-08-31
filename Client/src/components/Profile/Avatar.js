import React, { useEffect, useState } from 'react';
import { RssFeed, Update, VerifiedUser } from '@material-ui/icons';
import {
  Avatar,
  Button,
  Container,
  Typography,
  Modal,
  Backdrop,
  CircularProgress,
  Tooltip
} from '@material-ui/core';

import { profileStyles } from '../../style';
import UserList from '../Modal/UserList';
import ImageModal from '../Modal/Image';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { follow, unfollow } from '../../redux/callApi/userCall';
import ChatIcon from '../Icons/Chat';
import { addUser} from '../../redux/callApi/messageCall';
import { Skeleton } from '@material-ui/lab';

export default function ProfileAvatar(props) {
  const { user } = props;

  const { id } = useParams();
  const history = useHistory();

  const { auth, socket, message } = useSelector(state => state);

  const dispatch = useDispatch();

  const classes = profileStyles();
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollower, setOpenFollower] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openCover, setOpenCover] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [stateFollow, setStateFollow] = useState({
    loading: false,
    error: false
  });

  const handleAddChat = (user) => {
    dispatch(addUser(auth, user, message, socket,
        (id) => {
          history.push(`/message/${id}`);
        }));
  }

  const handleOpenFollowing = () => {
    setOpenFollowing(true);
  };

  const handleCloseFollowing = () => {
    setOpenFollowing(false);
  };

  const handleOpenFollower = () => {
    setOpenFollower(true);
  };

  const handleCloseFollower = () => {
    setOpenFollower(false);
  };

  const handleOpenAvatar = () => {
    setOpenAvatar(true);
  };

  const handleCloseAvatar = () => {
    setOpenAvatar(false);
  };

  const handleOpenCover = () => {
    setOpenCover(true);
  };

  const handleCloseCover = () => {
    setOpenCover(false);
  };

  const handleFollow = () => {
    // console.log(user);
    if (followed) {
      setStateFollow({
        loading: true,
        error: false
      });
      dispatch(
        unfollow(user, auth.token, socket, () => {
          setStateFollow({
            loading: false,
            error: true
          });
        })
      );
      setStateFollow({
        loading: false,
        error: false
      });
      setFollowed(false);
    } else {
      setStateFollow({
        loading: true,
        error: false
      });
      dispatch(
        follow(user, auth.token, socket, () => {
          setStateFollow({
            loading: false,
            error: true
          });
        })
      );
      setStateFollow({
        loading: false,
        error: false
      });
      setFollowed(true);
    }
  };

  useEffect(() => {
    const isFollowed = () => {
      if (auth.user && user) {
        for (const u of auth.user.followings) {
          if (u._id === user._id) {
            return true;
          }
        }
        return false;
      }
    };

    if (isFollowed()) setFollowed(true);
    else setFollowed(false);
  }, [id, auth, history, user]);

  useEffect(() => {
    if (user?.fullname) {
      document.title = user.fullname;
    }
  }, [dispatch, user]);

  const refFollowing = React.createRef();
  const refFollower = React.createRef();

  const UserListRef = React.forwardRef((props, ref) => (
    <UserList {...props} innerRef={ref} />
  ));

  if (!user || user._id !== id) {
    return (
      <Container className={classes.container}>
        <Skeleton
          variant="rect"
          width={'100%'}
          height={400}
          style={{ position: 'absolute' }}
        />
        <div className={classes.profile_info}>
          <Skeleton variant="circle" width={200} height={200} />
          <div className={classes.infoUser}>
            <Skeleton variant="rect" height={50} width={300} />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      {user && (
        <Container className={classes.container}>
          <div>
            <img
              className={classes.profile_overImage}
              src={user.background}
              alt="cover"
              onClick={handleOpenCover}
            />
            <ImageModal
              open={openCover}
              handleClose={handleCloseCover}
              img={user.background}
            />
          </div>
          <div className={classes.profile_info}>
            <div className={classes.profile_avatar}>
              <Avatar
                className={classes.profile_avatar__img}
                src={user.avatar}
                alt="avatar"
                onClick={handleOpenAvatar}
              />
              <ImageModal
                open={openAvatar}
                handleClose={handleCloseAvatar}
                img={user.avatar}
              />
            </div>
            <div className={classes.infoUsers}>
              <Typography variant="body1" className={classes.fullname}>
                {user.fullname}
                {user.confirmAccount?.state === 1 && (
                  <Tooltip
                    title={'Tài khoản đã được xác thực'}
                    aria-label="verified"
                    style={{ marginLeft: 10 }}
                  >
                    <VerifiedUser color="primary" fontSize="small" />
                  </Tooltip>
                )}
              </Typography>
              <div variant="body1" component="p" className={classes.follow}>
                <Typography
                  className={classes.followInfo}
                  onClick={handleOpenFollowing}
                >
                  {user.followings?.length} đang theo dõi
                </Typography>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openFollowing}
                  onClose={handleCloseFollowing}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500
                  }}
                >
                  <UserListRef
                    ref={refFollowing}
                    listUser={user?.followings}
                    title={'Đang theo dõi'}
                    handleClose={handleCloseFollowing}
                  />
                </Modal>
                <Typography
                  className={classes.followInfo}
                  onClick={handleOpenFollower}
                >
                  {user.followers?.length} người theo dõi
                </Typography>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openFollower}
                  onClose={handleCloseFollower}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500
                  }}
                >
                  <UserListRef
                    ref={refFollower}
                    listUser={user?.followers}
                    title={'Người theo dõi'}
                    handleClose={handleCloseFollower}
                  />
                </Modal>
              </div>
            </div>
            <div className={classes.profile_button}>
              {user?._id !== auth.user?._id ? (
                <>
                  <Button
                    startIcon={<RssFeed />}
                    className={classes.button}
                    onClick={handleFollow}
                    disabled={!auth.token || stateFollow.loading}
                  >
                    {stateFollow.loading ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : followed ? (
                      'Hủy theo dõi'
                    ) : (
                      'Theo dõi'
                    )}
                  </Button>
                  <Button
                    startIcon={<ChatIcon />}
                    className={classes.button}
                    disabled={!auth.token}
                    onClick={() => handleAddChat(user)}
                  >
                    Nhắn tin
                  </Button>
                </>
              ) : (
                <Button
                  startIcon={<Update />}
                  className={classes.button}
                  component={Link}
                  to="/changeinfo"
                >
                  Thay đổi thông tin
                </Button>
              )}
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
