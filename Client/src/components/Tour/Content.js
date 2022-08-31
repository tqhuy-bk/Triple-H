import {
  Avatar,
  Backdrop,
  Button,
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  MenuList,
  Modal,
  Paper,
  Popper,
  Typography
} from '@material-ui/core';
import {
  Bookmark,
  BookmarkBorder,
  MoreVert,
  Edit,
  Delete
} from '@material-ui/icons';
import { AvatarGroup } from '@material-ui/lab';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveTour, unsavedTour } from '../../redux/callApi/authCall';
import { deleteTour } from '../../redux/callApi/tourCall';

import { postStyles } from '../../style';
import { convertDateToStr, timeAgo } from '../../utils/date';
import ShareUpdateForm from '../Forms/UpdateShare';
import ImageModal from '../Modal/Image';
import ManageUserJoin from '../Modal/ManageUserJoin';
import UserList from '../Modal/UserList';
import { SeeMoreText } from '../SeeMoreText';

function ShareContent({ tour }) {
  const { auth, socket } = useSelector(state => state);
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const dispatch = useDispatch();

  const handleShowMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    handleCloseMenu();
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    handleCloseMenu();
  };

  const [tourShare, setTourShare] = useState(tour.shareId);

  const handleDeleteTour = () => {
    setState({
      loading: true,
      error: false
    });
    dispatch(
      deleteTour(
        tour,
        auth.token,
        socket,
        () => {
          setState({
            loading: false,
            error: false
          });
          setShowDelete(false);
          handleCloseMenu();
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

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const ref = React.createRef();

  const ShareRef = React.forwardRef((props, ref) => (
    <ShareUpdateForm {...props} innerRef={ref} />
  ));

  const classes = postStyles();
  return (
    <>
      <CardHeader
        avatar={<Avatar alt="avatar" src={tour.userId.avatar} />}
        action={
          <>
            {auth.user && auth.user._id === tour.userId._id && (
              <>
                <IconButton
                  aria-label="settings"
                  onClick={handleShowMenu}
                  size="small"
                >
                  <MoreVert />
                </IconButton>
                <Popper
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleCloseMenu}
                  disablePortal
                  className={classes.menuWrap}
                >
                  <ClickAwayListener onClickAway={handleCloseMenu}>
                    <Paper>
                      <MenuList>
                        <MenuItem onClick={handleShowEdit}>
                          <Edit className={classes.menuIcon} />
                          Chỉnh sửa bài viết
                        </MenuItem>
                        <Modal
                          aria-labelledby="transition-modal-edit"
                          aria-describedby="transition-modal-edit-description"
                          open={showEdit}
                          className={classes.modal}
                          onClose={handleCloseEdit}
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500
                          }}
                        >
                          <ShareRef
                            ref={ref}
                            object={tour}
                            type={'tour'}
                            handleClose={handleCloseEdit}
                          />
                        </Modal>
                        <MenuItem onClick={handleShowDelete}>
                          <Delete className={classes.menuIcon} />
                          Xóa bài viết
                        </MenuItem>
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
                              onClick={handleDeleteTour}
                              className={classes.delete}
                              disabled={state.loading}
                            >
                              {state.loading ? (
                                <CircularProgress size={15} color="inherit" />
                              ) : (
                                'Xóa'
                              )}
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </MenuList>
                    </Paper>
                  </ClickAwayListener>
                  {/* </Grow> */}
                </Popper>
              </>
            )}
          </>
        }
        title={
          <Typography
            noWrap={false}
            className={classes.userName}
            component={Link}
            to={`/u/${tour.userId._id}`}
          >
            {tour.userId.fullname}
          </Typography>
        }
        subheader={
          <Link to={`/tour/${tour._id}`} style={{ cursor: 'pointer' }}>
            {timeAgo(new Date(tour.createdAt))}
          </Link>
        }
      />
      <CardContent>
        <SeeMoreText variant="body1" maxText={100} text={tour.content} />
        <div className={classes.hashtagWrap}>
          {tour.hashtags.map((item, index) => (
            <Typography
              className={classes.hashtag}
              key={index}
              component={Link}
              to={`/tour/hashtag?hashtag=${item}`}
            >
              #{item}
            </Typography>
          ))}
        </div>
        <Box
          style={{
            border: '1px solid #e8e8e8',
            borderBottomColor: 'transparent'
          }}
        >
          {tourShare ? (
            <BaseContent tour={tourShare} setTour={setTourShare} share={true} />
          ) : (
            <Typography>Nội dung không còn tồn tại</Typography>
          )}
        </Box>
      </CardContent>
    </>
  );
}

function BaseContent(props) {
  const { tour, setTour, share } = props;

  const isSaved = () => {
    if (auth.user && auth.user.tourSaved)
      return auth.user.tourSaved.includes(tour._id);
    return false;
  };

  const { auth, socket } = useSelector(state => state);

  const [anchorEl, setAnchorEl] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [state, setState] = useState({
    loadingDelete: false,
    loadingJoin: false,
    error: false
  });

  const dispatch = useDispatch();

  const handleShowMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    handleCloseMenu();
  };

  // const [join, setJoin] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);

  const classes = postStyles();

  const updateJoin = joins => {
    setTour({
      ...tour,
      joinIds: joins
    });
  };

  // useEffect(() => {
  //   if (
  //     auth.user &&
  //     tour.joinIds.findIndex(join => join._id === auth.user._id) >= 0
  //   ) {
  //     setJoin(true);
  //   }
  // }, [tour, auth.user]);

  // const handleJoin = async () => {
  //   setState({
  //     loadingJoin: true,
  //     error: false
  //   });
  //   setJoin(true);
  //   var prevJoin = tour.joinIds;
  //   updateJoin([...prevJoin, auth.user]);
  //   dispatch(
  //     joinTour(
  //       tour._id,
  //       auth.token,
  //       () => {
  //         setState({
  //           loadingJoin: false,
  //           error: false
  //         });
  //       },
  //       () => {
  //         setState({
  //           loadingJoin: false,
  //           error: true
  //         });
  //         if (join) {
  //           setJoin(false);
  //           updateJoin(prevJoin);
  //         }
  //       }
  //     )
  //   );
  // };

  // const handleUnJoin = () => {
  //   setState({
  //     loadingJoin: true,
  //     error: false
  //   });
  //   setJoin(false);
  //   var prevJoin = tour.joinIds;
  //   var newJoin = prevJoin.filter(user => user._id !== auth.user._id);
  //   updateJoin(newJoin);

  //   dispatch(
  //     unJoinTour(
  //       tour._id,
  //       auth.token,
  //       () => {
  //         setState({
  //           loadingJoin: false,
  //           error: false
  //         });
  //       },
  //       () => {
  //         setState({
  //           loadingJoin: false,
  //           error: true
  //         });
  //         if (!join) {
  //           setJoin(true);
  //           updateJoin(prevJoin);
  //         }
  //       }
  //     )
  //   );
  // };

  const handleShowJoin = () => {
    setOpenJoin(true);
  };

  const handleCloseJoin = () => {
    setOpenJoin(false);
  };

  // const joinClick = () => {
  //   if (auth.user) {
  //     if (join) {
  //       handleUnJoin();
  //     } else handleJoin();
  //   }
  // };

  // const isOld = useMemo(() => {
  //   const startDate = new Date(tour.tour[0]?.date);
  //   const now = new Date();
  //   return startDate < now;
  // }, [tour.tour]);

  const handleDeleteTour = () => {
    setState({
      loadingDelete: true,
      error: false
    });
    dispatch(
      deleteTour(
        tour,
        auth.token,
        socket,
        () => {
          setState({
            loadingDelete: false,
            error: false
          });
          setShowDelete(false);
          handleCloseMenu();
        },
        () => {
          setState({
            loadingDelete: false,
            error: true
          });
        }
      )
    );
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const handleOpenImage = () => {
    setOpen(true);
  };

  const handleCloseImage = () => {
    setOpen(false);
  };

  const handleSaveTour = () => {
    dispatch(saveTour(tour._id, auth.token));
    handleCloseMenu();
  };

  const handleUnSaveTour = () => {
    dispatch(unsavedTour(tour._id, auth.token));
    handleCloseMenu();
  };

  const refMg = React.createRef();
  const refUser = React.createRef();

  const ManageUserRef = React.forwardRef((props, ref) => (
    <ManageUserJoin {...props} innerRef={ref} />
  ));

  const UserListRef = React.forwardRef((props, ref) => (
    <UserList {...props} innerRef={ref} />
  ));

  const [open, setOpen] = useState(false);
  return (
    <>
      <CardHeader
        avatar={<Avatar alt="avatar" src={tour.userId.avatar} />}
        action={
          <>
            <IconButton
              aria-label="settings"
              onClick={handleShowMenu}
              size="small"
            >
              <MoreVert />
            </IconButton>
            <Popper
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleCloseMenu}
              disablePortal
              className={classes.menuWrap}
            >
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <Paper>
                  <>
                    {auth.user &&
                    auth.user._id === tour.userId._id &&
                    !share ? (
                      <MenuList>
                        <MenuItem
                          component={Link}
                          to={`/tour/${tour._id}?edit=true`}
                        >
                          <Edit className={classes.menuIcon} />
                          Chỉnh sửa hành trình
                        </MenuItem>
                        <MenuItem onClick={handleShowDelete}>
                          <Delete className={classes.menuIcon} />
                          Xóa hành trình
                        </MenuItem>
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
                              onClick={handleDeleteTour}
                              className={classes.delete}
                              disabled={state.loadingDelete}
                            >
                              {state.loadingDelete ? (
                                <CircularProgress color="inherit" size={15} />
                              ) : (
                                'Xóa'
                              )}
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </MenuList>
                    ) : (
                      <>
                        {isSaved() ? (
                          <MenuList>
                            <MenuItem onClick={handleUnSaveTour}>
                              <Bookmark fontSize="small" />
                              Hành trình đã lưu
                            </MenuItem>
                          </MenuList>
                        ) : (
                          <MenuList>
                            <MenuItem onClick={handleSaveTour}>
                              <BookmarkBorder fontSize="small" />
                              Lưu hành trình
                            </MenuItem>
                          </MenuList>
                        )}
                      </>
                    )}
                  </>
                </Paper>
              </ClickAwayListener>
            </Popper>
          </>
        }
        title={
          <Typography
            noWrap={false}
            className={classes.userName}
            component={Link}
            to={`/u/${tour.userId._id}`}
          >
            {tour.userId.fullname}
          </Typography>
        }
        subheader={
          <Link to={`/tour/${tour._id}`} className={classes.subheader}>
            {timeAgo(new Date(tour.createdAt))}
          </Link>
        }
      />
      {tour.image !== '' && (
        <CardMedia>
          <img
            src={tour.image}
            className={classes.imageTour}
            width="100%"
            alt="Can not load"
            onClick={handleOpenImage}
          />
          <ImageModal
            open={open}
            handleClose={handleCloseImage}
            img={tour.image}
          />
        </CardMedia>
      )}

      <CardContent>
        <Typography
          variant="h6"
          className={classes.title}
          component={Link}
          to={`/tour/${tour._id}`}
        >
          {tour.name}
        </Typography>
        {/* <div dangerouslySetInnerHTML={{ __html: tour.content }} /> */}
        <Typography style={{ marginTop: 5 }}>
          Tỉnh: {tour.provinces.join(', ')}
        </Typography>

        {tour.tour.length > 1 ? (
          <Typography style={{ marginTop: 5 }}>
            Từ {convertDateToStr(tour.tour[0]?.date)} đến{' '}
            {convertDateToStr(tour.tour[tour.tour.length - 1]?.date)}
          </Typography>
        ) : (
          <Typography>Ngày {convertDateToStr(tour.tour[0]?.date)}</Typography>
        )}
        <Typography style={{ marginTop: 5 }}>
          Chi phí: {new Intl.NumberFormat().format(tour.cost * 1000)} VND
        </Typography>
        <div>
          <div style={{ display: 'flex' }}>
            <Typography>Thành viên tham gia:</Typography>
            <AvatarGroup
              max={4}
              onClick={handleShowJoin}
              style={{ cursor: 'pointer' }}
            >
              {tour.joinIds.map(
                (user, index) =>
                  user.isJoin && (
                    <Avatar
                      src={user.id.avatar}
                      alt={'A'}
                      key={index}
                      style={{ height: 20, width: 20 }}
                    />
                  )
              )}
            </AvatarGroup>
          </div>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openJoin}
            onClose={handleCloseJoin}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            {auth.user && auth.user._id === tour.userId._id ? (
              <ManageUserRef
                ref={refMg}
                listUser={tour.joinIds.map(item => item?.id)}
                updateJoin={updateJoin}
                tourId={tour._id}
                title={'Thành viên tham gia'}
                handleClose={handleCloseJoin}
              />
            ) : (
              <UserListRef
                ref={refUser}
                listUser={tour.joinIds.map(item => item?.id)}
                title={'Thành viên tham gia'}
                handleClose={handleCloseJoin}
              />
            )}
          </Modal>
        </div>

        <div className={classes.hashtagWrap}>
          {tour.hashtags.map((item, index) => (
            <Typography
              className={classes.hashtag}
              key={index}
              component={Link}
              to={`/tour/hashtag?hashtag=${item}`}
            >
              #{item}
            </Typography>
          ))}
        </div>
      </CardContent>
    </>
  );
}

export default function TourContent({ tour, setTour }) {
  return (
    <>
      {tour && tour.shareId ? (
        <ShareContent tour={tour} />
      ) : (
        <BaseContent tour={tour} setTour={setTour} share={false} />
      )}
    </>
  );
}
