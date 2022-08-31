import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Popper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Grid,
  Typography,
  CircularProgress,
  Backdrop,
  Paper,
  IconButton,
  Modal,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  makeStyles,
  Fade,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Popover
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React, { useEffect, useState } from 'react';
import { tourdetailStyles } from '../../style';
import Location from './Location';
import { convertDateToStr, timeAgo } from '../../utils/date';
import MapCard from '../Map/MapCard';
import ImageModal from '../Modal/Image';
import {
  MoreVert,
  LocationOnOutlined,
  Label,
  Delete,
  Edit,
  FlagOutlined,
  ChatBubbleOutlineOutlined
} from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import UserList from '../Modal/UserList';
import { useDispatch, useSelector } from 'react-redux';
import { acceptJoinTour, unAcceptJoinTour } from '../../redux/callApi/tourCall';
import SpeedDialButton from '../SpeedDialBtn';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deleteTour } from '../../redux/callApi/tourCall';
import TourRecommendCard from '../Card/TourRecommendCard';
import InviteTour from '../Modal/InviteTour';
import ServiceCard from './Service';
import InputCommentFeedBack from '../Input/CommentFeedBack';
import Comment from '../Comment';

function DetailDate(props) {
  const { tourDate } = props;

  const classes = tourdetailStyles();

  return (
    <div className={classes.infoTourDate}>
      <Grid container style={{ padding: 10 }}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography style={{ fontSize: 16, fontWeight: 500 }}>
            Tổng quan ngày
          </Typography>
          <Typography>
            <Label style={{ fontSize: 15 }} />{' '}
            <span style={{ fontWeight: 500 }}> Mô tả: </span>{' '}
            {/* {tourDate.description} */}
            <div dangerouslySetInnerHTML={{ __html: tourDate.description }} />
          </Typography>
          <Typography>
            <Label style={{ fontSize: 15 }} />
            <span style={{ fontWeight: 500 }}>Chi phí: </span>{' '}
            {new Intl.NumberFormat().format(tourDate.cost * 1000)} VND
          </Typography>
        </Grid>
        {/* <Grid item md={12} sm={12} xs={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              style={{ textAlign: 'center', marginTop: 10 }}
            >
              Danh sách dịch vụ
            </Typography>
          </div>
          <div className={classes.servicesWrapperMaxHeight}>
            {tourDate.services.map((item, index) => (
              <ServiceCard
                joined={joined}
                type="date"
                key={index}
                service={item}
                index={index}
                isEdit={false}
                indexDate={date}
              />
            ))}
          </div>
        </Grid> */}
      </Grid>
    </div>
  );
}
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    zIndex: 1,
    color: '#63B191',
    width: 35,
    height: 35,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #63B191'
  },
  active: {
    backgroundColor: '#63B191',
    color: 'white',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  },
  completed: {
    backgroundColor: 'white',
    color: '#63B191'
  }
});
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      <LocationOnOutlined style={{ width: 25 }} />
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

export default function TourDetail(props) {
  const { tour, isOwn, setTour, isInvite, setIsInvite, memberIsEdit, isJoin } =
    props;

  const history = useHistory();

  const classes = tourdetailStyles();
  const dispatch = useDispatch();
  const { auth, socket } = useSelector(state => state);

  const [indexDate, setIndexDate] = useState(0);
  const [indexEvent, setIndexEvent] = useState(0);
  const [position, setPosition] = useState(null);
  const [locations, setLocations] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [showUserJoin, setShowUserJoin] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const handleShowJoin = () => {
    setShowUserJoin(true);
  };

  const handleCloseJoin = () => {
    setShowUserJoin(false);
  };

  const handleShowInvite = () => {
    setShowInvite(true);
  };

  const handleCloseInvite = () => {
    setShowInvite(false);
  };

  const handleShowImage = () => {
    setShowImage(true);
  };

  const handleCloseImage = () => {
    setShowImage(false);
  };

  const createReview = (id, index_loc, tourdate_id) => {
    setTour(state => ({
      ...state,
      tour: state.tour.map(item =>
        item._id === tourdate_id
          ? {
              ...item,
              events: item.events.map(event =>
                event._id === index_loc
                  ? {
                      ...event,
                      reviewIds: [...event.reviewIds, id]
                    }
                  : event
              )
            }
          : item
      )
    }));
  };

  const createRate = (id, index_ser, tourdate_id) => {
    setTour(state => ({
      ...state,
      tour: state.tour.map(item =>
        item._id === tourdate_id
          ? {
              ...item,
              events: item.events.map(event =>
                event._id === index_ser
                  ? {
                      ...event,
                      rateIds: [...event.rateIds, id]
                    }
                  : event
              )
            }
          : item
      )
    }));
  };

  useEffect(() => {
    if (tour?.tour[indexDate]?.events?.length > 0) {
      const temp = tour.tour[indexDate].events[indexEvent];
      if (temp.location) setPosition(temp.location.position);
      else if (temp.service)
        setPosition({
          lng: temp.service.position[0],
          lat: temp.service.position[1]
        });
    }
  }, [tour, indexDate, indexEvent]);
  useEffect(() => {
    if (tour?.tour) {
      var locs = tour.tour[indexDate].events
        .filter(item => item.location)
        .map(item => item.location);
      setLocations(locs);
    }
  }, [tour?.tour, indexDate]);

  const refDetail = React.createRef();
  const refUser = React.createRef();
  const refInvite = React.createRef();

  const DetailDateRef = React.forwardRef((props, ref) => (
    <DetailDate {...props} innerRef={ref} />
  ));

  const UserListRef = React.forwardRef((props, ref) => (
    <UserList {...props} innerRef={ref} />
  ));

  const InviteRef = React.forwardRef((props, ref) => (
    <InviteTour {...props} innerRef={ref} />
  ));

  const [anchorEl, setAnchorEl] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const handleShowMenu = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    handleCloseMenu();
  };
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
          history.push('/tour');
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

  const updateAccept = () => {
    setTour(tour => ({
      ...tour,
      joinIds: tour.joinIds.map(item =>
        item.id._id === auth.user._id
          ? {
              ...item,
              isJoin: true
            }
          : item
      )
    }));
  };

  const handleAcceptInvite = () => {
    setState({
      loadingJoin: true,
      error: false
    });
    dispatch(
      acceptJoinTour(
        tour._id,
        auth.token,
        () => {
          setState({
            loadingJoin: false,
            error: false
          });
          setIsInvite(false);
          updateAccept();
        },
        () => {
          setState({
            loadingJoin: false,
            error: true
          });
        }
      )
    );
  };

  const updateUnAccept = () => {
    setTour(tour => ({
      ...tour,
      joinIds: tour.joinIds.filter(item => item.id._id !== auth.user._id)
    }));
  };

  const handleUnAcceptInvite = () => {
    setState({
      loadingJoin: true,
      error: false
    });
    dispatch(
      unAcceptJoinTour(
        tour._id,
        auth.token,
        () => {
          setState({
            loadingJoin: false,
            error: false
          });
          updateUnAccept();
        },
        () => {
          setState({
            loadingJoin: false,
            error: true
          });
        }
      )
    );
  };

  const handleChangeIndexDate = index => {
    if (index !== indexDate) {
      setIndexDate(index);
      setIndexEvent(0);
    }
  };

  const [anchorElFeedback, setAnchorElFeedback] = useState(null);

  const handleClickFeedback = event => {
    setAnchorElFeedback(event.currentTarget);
  };

  const handleCloseFeedback = () => {
    setAnchorElFeedback(null);
  };

  const openFeedback = Boolean(anchorElFeedback);
  return (
    <>
      {tour ? (
        <Grid container className={classes.container}>
          <SpeedDialButton />
          <Grid container className={classes.tourDetailContainer}>
            <Grid container className={classes.tourInfos}>
              <Grid item lg={9} md={8} sm={12} xs={12}>
                <div className={classes.tourInfoLeftImage}>
                  <img
                    src={tour.image}
                    className={classes.image}
                    width="100%"
                    alt="Can not load"
                    onClick={handleShowImage}
                  />
                  <ImageModal
                    open={showImage}
                    handleClose={handleCloseImage}
                    img={tour.image}
                  />
                </div>
                {isInvite && (
                  <div className={classes.invitation}>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            alt="avatar"
                            src={tour.userId.avatar}
                          ></Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            tour.userId.fullname +
                            ' đã mời bạn tham gia hành trình này'
                          }
                          secondary={
                            1 ? 'Với quyền chỉnh sửa' : 'Với quyền chỉnh sửa'
                          }
                        />
                        <ListItemSecondaryAction>
                          <Button
                            onClick={() => handleAcceptInvite()}
                            className={classes.reviewBtn}
                          >
                            Tham gia hành trình
                          </Button>
                          <Button
                            onClick={() => handleUnAcceptInvite()}
                            className={classes.reviewBtn}
                          >
                            Từ chối lời mời
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </div>
                )}

                <div className={classes.tourLeftInfo}>
                  <Typography variant="h6" className={classes.tourName}>
                    {tour.name}
                  </Typography>
                  <div className={classes.tourTime}>
                    <div className={classes.timeItem}>
                      <Typography
                        className={classes.timeItemTitle}
                        style={{ color: '#63B191' }}
                      >
                        Điểm khởi hành
                      </Typography>
                      <div>
                        <IconButton style={{ padding: 0 }}>
                          <LocationOnOutlined className={classes.iconStart} />
                        </IconButton>
                      </div>
                      <Typography className={classes.timeItemLocation}>
                        {tour.locations[0]}
                      </Typography>
                      <Typography className={classes.timeItemDate}>
                        {convertDateToStr(tour.tour[0]?.date)}
                      </Typography>
                    </div>
                    <div className={classes.timeItem}>
                      <Typography
                        className={classes.timeItemTitle}
                        style={{ color: '#f44336' }}
                      >
                        Điểm kết thúc
                      </Typography>
                      <div className={classes.connectLine}>
                        <IconButton style={{ padding: 0 }}>
                          <FlagOutlined className={classes.iconEnd} />
                        </IconButton>
                      </div>
                      <Typography className={classes.timeItemLocation}>
                        {tour.locations[tour.locations.length - 1]}
                      </Typography>
                      <Typography className={classes.timeItemDate}>
                        {convertDateToStr(tour.tour[tour.tour.length - 1].date)}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      paddingBottom: 20,
                      borderBottom: '1px solid #0000001f',
                      minHeight: 70
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: tour.content }} />
                  </div>
                  <div className={classes.hashtagWrap}>
                    {tour.hashtags.map((hashtag, index) => (
                      <Typography
                        className={classes.hashtag}
                        key={index}
                        component={Link}
                        to={`/tour/hashtag?hashtag=${hashtag}`}
                      >
                        #{hashtag}
                      </Typography>
                    ))}
                  </div>
                  <Typography variant="body1">
                    Tổng chi phí:{' '}
                    {new Intl.NumberFormat().format(tour.cost * 1000)} VND
                  </Typography>
                  <div>
                    <Typography>Thành viên hành trình: </Typography>
                    <AvatarGroup
                      max={4}
                      onClick={handleShowJoin}
                      style={{ cursor: 'pointer' }}
                    >
                      {tour.joinIds.map(
                        (user, indexDate) =>
                          user.isJoin && (
                            <Avatar
                              src={user.id.avatar}
                              alt={'avatar'}
                              key={indexDate}
                              style={{ height: 30, width: 30 }}
                            />
                          )
                      )}
                    </AvatarGroup>
                    <Modal
                      aria-labelledby="like"
                      aria-describedby="user-like-this-post"
                      className={classes.modal}
                      open={showUserJoin}
                      onClose={handleCloseJoin}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500
                      }}
                    >
                      <UserListRef
                        ref={refUser}
                        listUser={tour.joinIds
                          .filter(item => item.isJoin === true)
                          .map(item => item.id)}
                        title={'Đã tham gia'}
                        handleClose={handleCloseJoin}
                      />
                    </Modal>
                  </div>
                </div>
              </Grid>
              <Grid item lg={3} md={4} sm={12} xs={12}>
                <Card className={classes.cardInfoUser}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt={tour.userId.fullname}
                        src={tour.userId.avatar}
                        aria-label="avatar"
                      />
                    }
                    action={
                      <>
                        {auth.user && memberIsEdit && (
                          <>
                            <IconButton
                              aria-label="settings"
                              onClick={handleShowMenu}
                              className={classes.action}
                              size="small"
                              controls={anchorEl ? 'post-menu' : undefined}
                            >
                              <MoreVert />
                            </IconButton>
                            <Popper
                              open={Boolean(anchorEl)}
                              anchorEl={anchorEl}
                              onClose={handleCloseMenu}
                              disablePortal
                            >
                              <ClickAwayListener onClickAway={handleCloseMenu}>
                                <Paper>
                                  <MenuList>
                                    <MenuItem onClick={handleShowInvite}>
                                      <Edit className={classes.menuIcon} /> Mời
                                      thành viên
                                    </MenuItem>
                                    <Modal
                                      aria-labelledby="invite"
                                      aria-describedby="user-invite"
                                      className={classes.modal}
                                      open={showInvite}
                                      onClose={handleCloseInvite}
                                      closeAfterTransition
                                      BackdropComponent={Backdrop}
                                      BackdropProps={{
                                        timeout: 500
                                      }}
                                    >
                                      <Fade in={showInvite}>
                                        <InviteRef
                                          ref={refInvite}
                                          handleClose={handleCloseInvite}
                                          usersParent={tour.joinIds}
                                          tour={tour}
                                          setTour={setTour}
                                        />
                                      </Fade>
                                    </Modal>
                                    <MenuItem
                                      component={Link}
                                      to={'?edit=true'}
                                    >
                                      <Edit className={classes.menuIcon} />{' '}
                                      Chỉnh sửa hành trình
                                    </MenuItem>
                                    {isOwn && (
                                      <MenuItem onClick={handleShowDelete}>
                                        {' '}
                                        <Delete className={classes.menuIcon} />
                                        Xóa hành trình
                                      </MenuItem>
                                    )}
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
                                        Bạn sẽ không thể khôi phục lại dữ liệu
                                        sau khi xóa!
                                      </DialogContent>
                                      <DialogActions>
                                        <Button onClick={handleCloseDelete}>
                                          Hủy
                                        </Button>
                                        <Button
                                          onClick={handleDeleteTour}
                                          className={classes.delete}
                                        >
                                          {state.loading ? (
                                            <CircularProgress
                                              size={15}
                                              color="inherit"
                                            />
                                          ) : (
                                            'Xóa'
                                          )}
                                        </Button>
                                      </DialogActions>
                                    </Dialog>
                                  </MenuList>
                                </Paper>
                              </ClickAwayListener>
                            </Popper>
                          </>
                        )}
                      </>
                    }
                    title={
                      <Typography
                        className={classes.username}
                        component={Link}
                        to={`/u/${tour.userId._id}`}
                      >
                        {tour.userId?.fullname}
                      </Typography>
                    }
                    subheader={
                      <Typography className={classes.subheader}>
                        {timeAgo(new Date(tour.createdAt))}
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Typography className={classes.tourName}>
                      {tour.name}
                    </Typography>
                  </CardContent>
                </Card>
                <div className={classes.tourRecommend}>
                  <TourRecommendCard id={tour._id} />
                </div>
              </Grid>
            </Grid>
            <Grid container className={classes.tourDates}>
              <Grid
                item
                lg={9}
                md={8}
                sm={12}
                xs={12}
                className={classes.tourDatesLeft}
              >
                <Stepper
                  activeStep={indexDate}
                  orientation="vertical"
                  className={classes.datesWrapper}
                >
                  {tour.tour.map((tourDate, index) => (
                    <Step
                      key={index}
                      onClick={() => handleChangeIndexDate(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <StepLabel StepIconComponent={ColorlibStepIcon}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body1">
                            Chi tiết lịch trình ngày{' '}
                            {convertDateToStr(tourDate.date)}{' '}
                          </Typography>
                        </div>
                      </StepLabel>
                      <StepContent>
                        <Grid container className={classes.generalDate}>
                          <Grid item md={11} sm={11} xs={11}>
                            <DetailDateRef
                              ref={refDetail}
                              date={indexDate}
                              tourDate={tour.tour[indexDate]}
                            />
                          </Grid>
                          <Grid
                            item
                            md={1}
                            sm={1}
                            xs={1}
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            {isJoin && (
                              <>
                                <IconButton
                                  className={classes.buttonChat}
                                  onClick={handleClickFeedback}
                                  aria-describedby={indexDate}
                                >
                                  <ChatBubbleOutlineOutlined />
                                </IconButton>
                                <Popover
                                  id={indexDate}
                                  open={openFeedback}
                                  anchorEl={anchorElFeedback}
                                  onClose={handleCloseFeedback}
                                  anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                  }}
                                  transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                  }}
                                >
                                  <div className={classes.feedbacks}>
                                    <Typography
                                      variant="h6"
                                      style={{ padding: '5px 5px 5px 30px' }}
                                    >
                                      Nhận xét
                                    </Typography>
                                    <hr className={classes.line} />
                                    <div className={classes.listCmt}>
                                      {tourDate.comments &&
                                        tourDate.comments.map(cmt => (
                                          <Comment
                                            comment={cmt}
                                            key={cmt._id}
                                            id={tourDate._id}
                                            type="feedback"
                                          />
                                        ))}
                                    </div>
                                    {auth.user && (
                                      <div className={classes.wrapInput}>
                                        <InputCommentFeedBack
                                          type="feedback"
                                          id={tourDate._id}
                                          setTour={setTour}
                                          indexDate={indexDate}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </Popover>
                              </>
                            )}
                          </Grid>
                        </Grid>
                        <Grid container className={classes.detailDate}>
                          <Grid
                            item
                            md={2}
                            sm={2}
                            xs={12}
                            className={classes.tourDateWrapper}
                          >
                            <div className={classes.timelineTour}>
                              {tourDate.events.map((item, index) => (
                                <div key={index}>
                                  <Button
                                    onClick={() => setIndexEvent(index)}
                                    className={
                                      index === indexEvent
                                        ? classes.activeTimeline
                                        : classes.unactiveTimeline
                                    }
                                  >
                                    {item.time}
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </Grid>
                          <Grid item md={10} sm={10} xs={12}>
                            <div className={classes.tourDateInfoWrapper}>
                              <Typography>
                                <Label style={{ fontSize: 15 }} />{' '}
                                <span style={{ fontWeight: 500 }}>
                                  {' '}
                                  Mô tả:{' '}
                                </span>{' '}
                                {/* {tourDate.events[indexEvent].description} */}
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      tourDate.events[indexEvent]?.description
                                  }}
                                />
                              </Typography>
                              <Typography>
                                <Label style={{ fontSize: 15 }} />
                                <span style={{ fontWeight: 500 }}>
                                  Chi phí:{' '}
                                </span>{' '}
                                {new Intl.NumberFormat().format(
                                  tourDate.events[indexEvent]?.cost * 1000
                                )}{' '}
                                VND
                              </Typography>
                            </div>
                            {tourDate.events[indexEvent]?.location && (
                              <Location
                                location={tourDate.events[indexEvent]}
                                indexDate={indexDate}
                                tourDateId={tourDate._id}
                                indexLocation={indexEvent}
                                edit={false}
                                key={indexEvent}
                                isSave={true}
                                isEdit={false}
                                addReview={createReview}
                                isJoin={isJoin}
                                isOwn={isOwn}
                              />
                            )}
                            {tourDate.events[indexEvent]?.service && (
                              <ServiceCard
                                service={tourDate.events[indexEvent]}
                                indexDate={indexDate}
                                index={indexEvent}
                                tourDateId={tourDate._id}
                                addRate={createRate}
                                isSave={true}
                                isEdit={false}
                                isJoin={isJoin}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid
                item
                lg={3}
                md={4}
                sm={12}
                xs={12}
                className={classes.tourDatesRight}
              >
                <div className={classes.map}>
                  {position && (
                    <MapCard
                      position={position}
                      zoom={12}
                      locations={locations}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress color={'inherit'} />
      )}
    </>
  );
}
