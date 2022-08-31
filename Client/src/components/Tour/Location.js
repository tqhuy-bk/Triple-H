import {
  Button,
  Card,
  // Collapse,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Modal,
  Typography,
  Backdrop,
  Fade,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  Popper,
  ClickAwayListener,
  Paper,
  MenuList,
  CircularProgress,
  CardHeader,
  Avatar
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Close, MoreVert } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { tourdetailStyles } from '../../style';
import CreateReviewForm from '../Forms/CreateReview';
import EditLocationForm from '../Forms/EditLocation';
import * as tourAction from '../../redux/actions/createTourAction';
import customAxios from '../../utils/fetchData';
import { timeAgo } from '../../utils/date';
import { Rating } from '@material-ui/lab';
import { SeeMoreText } from '../SeeMoreText';
import ImageList from '../Modal/ImageList';
import 'react-quill/dist/quill.snow.css';
import { modalListStyles } from '../../style';

function ReviewList(props) {
  const { reviews, handleClose } = props;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const classes = modalListStyles();

  const getReview = async reviews => {
    setLoading(true);
    setError(false);
    try {
      await customAxios()
        .post(`/post/list`, {
          list: reviews
        })
        .then(res => {
          setPosts(res.data.posts);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    getReview(reviews);
  }, [reviews]);

  return (
   <div className={classes.paper} style={{padding: 20}}>
      <div className={classes.modal_header} style={{marginBottom:10}}>
        <Typography variant="h5" className={classes.modal_header_left}>
           Các Review
        </Typography>
        <div className={classes.modal_header_right}>
          <IconButton onClick={handleClose} size="small">
            <Close className={classes.modal_header_closeIcon} />
          </IconButton>
        </div>
      </div>
      <div style={{ position: 'relative', overflowY: 'auto' }}>
          {loading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 100
              }}
            >
              <CircularProgress />
            </div>
          )}
          {error && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 100
              }}
            >
              <Typography>Có lỗi xảy ra</Typography>
            </div>
          )}
          {!error &&
            posts.map(post => (
              <Card
                style={{
                  width: "98%",
                  borderRadius: 10,
                  border: '1px solid #ddd',
                  marginBottom: 10
                }}
                key={post._id}
              >
                <CardHeader
                  avatar={<Avatar alt="avatar" src={post.userId.avatar} />}
                  title={
                    <Typography
                      style={{ fontWeight: 500 }}
                      component={Link}
                      to={`/u/${post.userId._id}`}
                    >
                      {post.userId.fullname}
                    </Typography>
                  }
                  subheader={
                    <Link to={`/post/${post._id}`}>
                      {timeAgo(new Date(post.createdAt))}
                    </Link>
                  }
                />
                {post.images.length > 0 && (
                  <CardMedia>
                    <ImageList
                      imageList={post.images}
                      show2Image={true}
                      defaultHeight={300}
                      isPost={false}
                    />
                  </CardMedia>
                )}
                <Rating
                  name="location-rating"
                  value={post.rate}
                  readOnly
                  style={{ marginBottom: 10, marginInline: 20 }}
                />
                <CardContent style={{ marginInline: 10 }}>
                  <SeeMoreText
                    variant="body1"
                    maxText={100}
                    text={post.content}
                  />
                </CardContent>
              </Card>
            ))}
        </div>
    </div>
  );
}

export default function Location(props) {
  const classes = tourdetailStyles();

  const dispatch = useDispatch();

  const {
    location,
    isEdit,
    isSave,
    tourDateId,
    indexDate,
    indexLocation,
    addReview,
    isJoin
  } = props;
  // const [showDetail, setShowDetail] = useState(false);
  const [showCreateRv, setShowCreateRv] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editLoc, setEditLoc] = useState(false);
  const [showDeleteLocation, setShowDeleteLocation] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // useEffect(() => {
  //   setShowDetail(false);
  // }, [indexDate]);

  const handleShowMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleShowEdit = () => {
    setEditLoc(true);
  };

  const handleCloseEdit = () => {
    setEditLoc(false);
    handleCloseMenu();
  };

  const handleShow = () => {
    setShowCreateRv(true);
  };

  const handleClose = () => {
    setShowCreateRv(false);
  };

  const handleShowDelete = () => {
    setShowDeleteLocation(true);
  };
  const handleCloseDelete = () => {
    setShowDeleteLocation(false);
  };

  const handleDeleteLocation = () => {
    dispatch(
      tourAction.deleteLocation({
        indexDate: indexDate,
        indexEvent: indexLocation
      })
    );
    handleCloseDelete();
    handleCloseMenu();
  };

  // const handleShowDetail = () => {
  //   setShowDetail(state => !state);
  // };

  const handleShowReview = () => {
    setShowReview(true);
  };

  const handleCloseReview = () => {
    setShowReview(false);
  };

  const refEdit = React.createRef();
  const refCr = React.createRef();
  const ref = React.createRef();
  // const refDetail = React.createRef();

  const EditLocationRef = React.forwardRef((props, ref) => (
    <EditLocationForm {...props} innerRef={ref} />
  ));

  const CreateReviewRef = React.forwardRef((props, ref) => (
    <CreateReviewForm {...props} innerRef={ref} />
  ));

  const ReviewRef = React.forwardRef((props, ref) => (
    <ReviewList {...props} innerRef={ref} />
  ));

  // const DetailRef = React.forwardRef((props, ref) => (
  //   <Detail {...props} innerRef={ref} />
  // ));

  return (
    <Card className={classes.cardContainer}>
      <Grid container>
        <Grid item md={5} sm={3} className={classes.imageLocation}>
          <CardMedia style={{ height: '100%' }}>
            <img
              src={
                location.location.images
                  ? location.location.images[0]
                  : './default1.jpg'
              }
              alt="Đang tải..."
              className={classes.img}
            />
          </CardMedia>
        </Grid>
        <Grid item md={7} sm={9} xs={12}>
          <CardContent style={{ padding: 0 }}>
            <div className={classes.locationContentContainer}>
              <div style={{ margin: 16 }}>
                <div>
                  <Typography
                    className={classes.locationName}
                    component={Link}
                    to={`/location/${location.location.name}`}
                  >
                    {location.location.fullname}
                  </Typography>
                </div>
                <div>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 400 }}
                    component={Link}
                    to={'/province/' + location.location.province.name}
                  >
                    {location.location.province.fullname}
                  </Typography>
                </div>
                {isSave &&  (
                  <>
                    <div style={{ display: 'flex' }}>
                      {location.location && isJoin && (
                        <div>
                          <Button
                            className={classes.reviewBtn}
                            onClick={handleShow}
                          >
                            Tạo Review
                          </Button>
                        </div>
                      )}
                      {location.reviewIds?.length > 0 && (
                        <Button
                          className={classes.reviewBtn}
                          onClick={handleShowReview}
                        >
                          Xem review
                        </Button>
                      )}
                    </div>
                  </>
                )}
                {/* <Button
                  className={classes.reviewBtn}
                  onClick={handleShowDetail}
                >
                  Chi tiết
                </Button> */}
              </div>
              {isEdit && (
                <div>
                  <div className={classes.tourHeader}>
                    <IconButton
                      aria-label="settings"
                      onClick={handleShowMenu}
                      size="small"
                    >
                      <MoreVert />
                    </IconButton>
                  </div>
                  <Popper
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    disablePortal
                  >
                    <ClickAwayListener onClickAway={handleCloseMenu}>
                      <Paper>
                        <MenuList>
                          {location.location && (
                            <>
                              <MenuItem onClick={handleShowEdit}>
                                Chỉnh sửa
                              </MenuItem>
                              <Modal
                                aria-labelledby="transition-modal-edit"
                                aria-describedby="transition-modal-edit-description"
                                open={editLoc}
                                className={classes.modal}
                                onClose={handleCloseEdit}
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                  timeout: 500
                                }}
                              >
                                <Fade in={editLoc}>
                                  <EditLocationRef
                                    ref={refEdit}
                                    handleCloseParent={handleCloseMenu}
                                    handleClose={handleCloseEdit}
                                    indexDate={indexDate}
                                    indexLocation={indexLocation}
                                    location={location}
                                  />
                                </Fade>
                              </Modal>
                            </>
                          )}
                          <MenuItem onClick={handleShowDelete}>Xóa</MenuItem>
                          <Dialog
                            open={showDeleteLocation}
                            onClose={handleCloseDelete}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {'Bạn có chắc chắn muốn xóa?'}
                            </DialogTitle>
                            <DialogActions>
                              <Button onClick={handleCloseDelete}>Hủy</Button>
                              <Button
                                onClick={handleDeleteLocation}
                                className={classes.delete}
                              >
                                Xóa
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </MenuList>
                      </Paper>
                    </ClickAwayListener>
                  </Popper>
                </div>
              )}
            </div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={showCreateRv}
              className={classes.modal}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={showCreateRv}>
                <CreateReviewRef
                  ref={refCr}
                  location={location.location}
                  cost={location.cost}
                  handleClose={handleClose}
                  tourDateId={tourDateId}
                  indexDate={indexDate}
                  eventId={location._id}
                  // locationId={location._id}
                  addReview={addReview}
                />
              </Fade>
            </Modal>
            <Modal
              aria-labelledby="transition-modal-review"
              aria-describedby="transition-modal-review-description"
              open={showReview}
              className={classes.modal}
              onClose={handleCloseReview}
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={showReview}>
                <ReviewRef
                  ref={ref}
                  reviews={location.reviewIds}
                  handleClose={handleCloseReview}
                />
              </Fade>
            </Modal>
          </CardContent>
        </Grid>
        {/* <Grid item md={12} sm={12} xs={12}>
          <Collapse in={showDetail} style={{ width: '100%' }}>
            <DetailRef
              ref={refDetail}
              location={location}
              isEdit={isEdit}
              indexDate={indexDate}
              indexLocation={indexLocation}
              handleClose={handleShowDetail}
              joined={joined}
            />
          </Collapse>
        </Grid> */}
      </Grid>
    </Card>
  );
}
