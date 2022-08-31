import {
  Button,
  Card,
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
  Avatar,
} from '@material-ui/core';
import { MoreVert, Close } from '@material-ui/icons';
import React, { useState, useEffect} from 'react';
import * as tourAction from '../../redux/actions/createTourAction';
import { tourdetailStyles } from '../../style';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import customAxios from '../../utils/fetchData';
import { timeAgo } from '../../utils/date';
import ImageList from '../Modal/ImageList';
import { Rating } from '@material-ui/lab';
import { SeeMoreText } from '../SeeMoreText';
import { useDispatch} from 'react-redux';
import CreateRateForm from '../Forms/CreateRate';
import { modalListStyles } from '../../style';

function ReviewList(props) {
  const { reviews, handleClose } = props;
  const [rvs, setRvs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const classes = modalListStyles();

  const getReview = async reviews => {
    setLoading(true);
    setError(false);
    try {
      await customAxios()
        .post(`/service/list_review`, {
          list: reviews
        })
        .then(res => {
          setRvs(res.data.reviews);
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
            rvs.map(rv => (
              <Card
                style={{
                  width: "98%",
                  borderRadius: 10,
                  border: '1px solid #ddd',
                  marginBottom: 10
                }}
                key={rv._id}
              >
                <CardHeader
                  avatar={<Avatar alt="avatar" src={rv.userId.avatar} />}
                  title={
                    <Typography
                      style={{ fontWeight: 500 }}
                      component={Link}
                      to={`/u/${rv.userId._id}`}
                    >
                      {rv.userId.fullname}
                    </Typography>
                  }
                  subheader=
                    {timeAgo(new Date(rv.createdAt))}
                />
                {rv.images?.length > 0 && (
                  <CardMedia>
                    <ImageList
                      imageList={rv.images}
                      show2Image={true}
                      defaultHeight={300}
                      isPost={false}
                    />
                  </CardMedia>
                )}
                <Rating
                  name="location-rating"
                  value={rv.rate}
                  readOnly
                  style={{ marginBottom: 10, marginInline: 20 }}
                />
                <CardContent style={{ marginInline: 10 }}>
                  <SeeMoreText
                    variant="body1"
                    maxText={100}
                    text={rv.content}
                  />
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
export default function ServiceCard(props) {
  const { service, index, isEdit, indexDate, isSave, isJoin, tourDateId, addRate } = props;

  const classes = tourdetailStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();
  const [showCreateRv, setShowCreateRv] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const handleShow = () => {
    setShowCreateRv(true);
  };

  const handleClose = () => {
    setShowCreateRv(false);
  };
  
  const handleShowReview = () => {
    setShowReview(true);
  };

  const handleCloseReview = () => {
    setShowReview(false);
  };

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
  };

  const handleDelete = () => {
    dispatch(
      tourAction.deleteService({
        indexEvent: index,
        indexDate: indexDate
      })
    );
    handleCloseMenu();
    handleCloseDelete();
    // dispatch(tourAction.deleteService({ index: index }))
  };

  const refCr = React.createRef();
  const ref = React.createRef();

  const CreateReviewRef = React.forwardRef((props, ref) => (
    <CreateRateForm {...props} innerRef={ref} />
    // <ReviewArea id={service.service._id} />
  ));

  const ReviewRef = React.forwardRef((props, ref) => (
    <ReviewList {...props} innerRef={ref} />
  ));

  return (
    <Card className={classes.serviceContainer}>
      <Grid container>
        <Grid item md={5} sm={3} className={classes.imageLocation}>
          <CardMedia style={{ height: '100%' }}>
            <img
              src={
                service.service?.images
                  ? service.service.images[0]
                  : '/default1.jpg'
              }
              alt="Service"
              className={classes.img}
            />
          </CardMedia>
        </Grid>
        <Grid item md={7} sm={9} xs={12}>
          <CardContent style={{ padding: 0 }}>
            <div className={classes.locationContentContainer}>
              <div style={{ margin: 16 }}>
                <div>
                  <Typography className={classes.locationName}>
                    {service.service?.name}
                  </Typography>
                </div>
                <div>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 400 }}
                    component={Link}
                    to={'/province/' + service.service?.province.name}
                  >
                    {service.service?.province.fullname}
                  </Typography>
                </div>
                {/* {!isEdit && service?.service && (
                  <ReviewArea id={service.service._id} />
                )} */}
                {isSave &&  (
                  <>
                    <div style={{ display: 'flex' }}>
                      {isJoin && service?.service &&  (
                        <div>
                          <Button
                            className={classes.reviewBtn}
                            onClick={handleShow}
                          >
                            Tạo Review
                          </Button>
                        </div>
                      )}
                      {service.rateIds?.length > 0 && (
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
                    service={service.service}
                    cost={service.cost}
                    handleClose={handleClose}
                    tourDateId={tourDateId}
                    indexDate={indexDate}
                    eventId={service._id}
                    serviceId={service.service._id}
                    addRate={addRate}
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
                    reviews={service.rateIds}
                    handleClose={handleCloseReview}
                  />
                </Fade>
              </Modal>
              <div>
                {isEdit && (
                  <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <IconButton
                      size="small"
                      onClick={handleShowMenu}
                      controls={anchorEl ? 'service-item-menu' : undefined}
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
                            <MenuItem onClick={handleShowDelete}>Xóa</MenuItem>
                            <Dialog
                              open={showDelete}
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
                                  onClick={handleDelete}
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
            </div>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
