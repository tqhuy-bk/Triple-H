import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  Card,
  // CardActions,
  Collapse,
  Modal,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  Favorite,
  InsertLink,
  ChatBubbleOutlineSharp
} from '@material-ui/icons';
import Comment from '../Comment';
import { postStyles } from '../../style';
import InputComment from '../Input/Comment';
import UserList from '../Modal/UserList';

import SharePost from '../Forms/Share';
import TourContent from './Content';
import { likeTour, unlikeTour } from '../../redux/callApi/tourCall';
import LoginModal from '../Modal/Login';
// import HeartFillIcon from "../Icons/HeartFill";
// import HeartIcon from "../Icons/Heart";
// import CommentIcon from "../Icons/Comment";
// import ShareIcon from "../Icons/Share";
import { loadComment } from '../../redux/callApi/commentCall';

export default function Tour(props) {
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  const [showCmt, setShowCmt] = useState(false);
  const [like, setLike] = useState(false);
  const [tour, setTour] = useState(null);
  const [share, setShare] = useState(false);
  const [login, setLogin] = useState(false);

  const [loadingComment, setLoadingComment] = useState(false);
  const [errorComment, setErrorComment] = useState(false);
  const [pageComment, setPageComment] = useState(0);

  const updateLike = likes => {
    setTour({
      ...tour,
      likes: likes
    });
  };

  const classes = postStyles({ showCmt });

  const likePress = () => {
    if (!auth.user) {
      setLogin(true);
      return;
    }
    if (like) {
      handleUnlike();
    } else handleLike();
  };

  const handleLike = () => {
    setLike(true);
    let prevLike = tour.likes;
    let newLike = [...prevLike, auth.user];
    updateLike(newLike);

    dispatch(
      likeTour(tour._id, auth, socket, () => {
        if (like) {
          setLike(false);
          updateLike(prevLike);
        }
      })
    );
  };

  const handleUnlike = () => {
    setLike(false);
    let prevLike = tour.likes;
    let newLikes = prevLike.filter(user => user._id !== auth.user._id);
    updateLike(newLikes);

    dispatch(
      unlikeTour(tour._id, auth, socket, () => {
        if (!like) {
          setLike(true);
          updateLike(prevLike);
        }
      })
    );
  };

  const [showLike, setShowLike] = useState(false);

  const handleOpen = () => {
    setShowLike(true);
  };

  const handleClose = () => {
    setShowLike(false);
  };

  const loadMoreComment = () => {
    setLoadingComment(true);
    dispatch(
      loadComment(
        tour._id,
        'tour',
        () => {
          setLoadingComment(false);
          setPageComment(state => state + 1);
        },
        () => {
          setLoadingComment(false);
          setErrorComment(true);
        },
        pageComment
      )
    );
  };

  const handleShowCmt = () => {
    if (!showCmt) {
      if (!tour.commentDetail) {
        setLoadingComment(true);
        dispatch(
          loadComment(
            tour._id,
            'tour',
            () => {
              setLoadingComment(false);
              setPageComment(1);
            },
            () => {
              setLoadingComment(false);
              setErrorComment(true);
            },
            0
          )
        );
      }
    }
    setShowCmt(!showCmt);
  };

  useEffect(() => {
    setTour(props.tour);
  }, [props.tour]);

  useEffect(() => {
    if (tour) {
      if (auth.user && tour.likes.find(like => like._id === auth.user._id)) {
        setLike(true);
      }
    }
  }, [tour, auth.user]);

  const handleCloseLogin = () => {
    setLogin(false);
  };

  const handleShowShare = () => {
    setShare(true);
  };

  const handleCloseShare = () => {
    setShare(false);
  };

  const refLogin = React.createRef();
  const refUser = React.createRef();
  const refShare = React.createRef();

  const LoginRef = React.forwardRef((props, ref) => (
    <LoginModal {...props} innerRef={ref} />
  ));

  const UserListRef = React.forwardRef((props, ref) => (
    <UserList {...props} innerRef={ref} />
  ));

  const ShareRef = React.forwardRef((props, ref) => (
    <SharePost {...props} innerRef={ref} />
  ));

  return (
    <Card className={classes.cardContainer}>
      <>
        {tour && (
          <>
            <TourContent tour={tour} setTour={setTour} />
            <div className={classes.postActions} style={{ marginTop: -80 }}>
              <div className={classes.likeWrapperNotImage} onClick={likePress}>
                {like ? (
                  <div
                    className={classes.likeButton}
                    style={{ backgroundColor: 'red' }}
                  >
                    <Favorite
                      className={classes.likedIcon}
                      style={{ color: 'white' }}
                    />
                  </div>
                ) : (
                  <div className={classes.likeButton}>
                    <Favorite
                      className={classes.likedIcon}
                      style={{ color: 'red' }}
                    />
                  </div>
                )}
              </div>
              <div className={classes.commentWrapperNotImage}>
                <div
                  className={classes.likeButton}
                  style={{ backgroundColor: '#a5dec8' }}
                >
                  <ChatBubbleOutlineSharp
                    className={classes.iconButton}
                    onClick={handleShowCmt}
                  />
                </div>
              </div>
              <div className={classes.shareWrapperNotImage}>
                <div
                  className={classes.likeButton}
                  style={{ backgroundColor: '#a5dec8' }}
                >
                  <InsertLink
                    className={classes.iconButton}
                    onClick={handleShowShare}
                  />
                </div>
              </div>
            </div>
            <div className={classes.postFooter}>
              <div className={classes.likers}>
                {tour?.likes?.length > 0 &&
                  tour.likes
                    .slice(0, 3)
                    .map((item, index) => (
                      <img
                        className={classes.liker}
                        src={item.avatar}
                        alt="avatar"
                        key={index}
                      />
                    ))}
              </div>
              <div className={classes.likersText}>
                <p style={{ color: '#888da8', margin: 0, display: 'flex' }}>
                  {tour?.likes?.length > 0 &&
                    tour.likes.slice(0, 3).map((item, index) => (
                      <Typography
                        key={index}
                        onClick={handleOpen}
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: 'black',
                          cursor: 'pointer'
                        }}
                      >
                        {
                          item.fullname.split(' ')[
                            item.fullname.split(' ')?.length - 1
                          ]
                        }
                        {index !== tour.likes.slice(0, 3)?.length - 1
                          ? ', '
                          : ''}
                      </Typography>
                    ))}
                </p>
                {tour?.likes?.length === 1 ? (
                  <p style={{ margin: 0 }}>đã thích bài viết này</p>
                ) : (
                  tour?.likes?.length > 1 && (
                    <p
                      style={{ margin: 0, cursor: 'pointer' }}
                      onClick={handleOpen}
                    >
                      và những người khác đã thích bài này
                    </p>
                  )
                )}
              </div>
              <div className={classes.socialCount}>
                <div className={classes.likeCount} onClick={handleOpen}>
                  <Favorite
                    style={{ height: 18, width: 18, color: '#888da8' }}
                  />
                  <span
                    style={{
                      display: 'block',
                      fontSize: 13,
                      color: '#888da8',
                      margin: '0 5px'
                    }}
                  >
                    {tour.likes?.length}
                  </span>
                </div>
                <div className={classes.likeCount}>
                  <ChatBubbleOutlineSharp
                    style={{ height: 18, width: 18, color: '#888da8' }}
                  />
                  <span
                    style={{
                      display: 'block',
                      fontSize: 13,
                      color: '#888da8',
                      margin: '0 5px'
                    }}
                  >
                    {tour.comments?.length}
                  </span>
                </div>
                <div className={classes.likeCount}>
                  <InsertLink
                    style={{ height: 18, width: 18, color: '#888da8' }}
                  />
                  <span
                    style={{
                      display: 'block',
                      fontSize: 13,
                      color: '#888da8',
                      margin: '0 5px'
                    }}
                  >
                    {tour.likes?.length}
                  </span>
                </div>
              </div>
            </div>
            <Modal
              aria-labelledby="login"
              aria-describedby="must-login"
              className={classes.modal}
              open={login}
              onClose={handleCloseLogin}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <LoginRef ref={refLogin} handleClose={handleCloseLogin} />
            </Modal>
            <Modal
              aria-labelledby="share"
              aria-describedby="share-this-tour"
              className={classes.modal}
              open={share}
              onClose={handleCloseShare}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <ShareRef
                ref={refShare}
                object={tour.shareId ? tour.shareId : tour}
                type="tour"
                handleClose={handleCloseShare}
              />
            </Modal>
            <Modal
              aria-labelledby="like"
              aria-describedby="user-like-this-tour"
              className={classes.modal}
              open={showLike}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <UserListRef
                ref={refUser}
                listUser={tour.likes}
                title={'Đã thích'}
                handleClose={handleClose}
              />
            </Modal>
            <Collapse className={classes.cmt} in={showCmt}>
              <hr className={classes.line} />
              <div className={classes.listCmt}>
                {tour.commentDetail &&
                  tour.commentDetail.map(cmt => (
                    <Comment
                      comment={cmt}
                      key={cmt._id}
                      id={tour._id}
                      type="tour"
                    />
                  ))}
              </div>
              {loadingComment && <Typography>Đang tải...</Typography>}
              {errorComment && <Typography>Có lỗi xảy ra</Typography>}
              {tour.commentDetail &&
                !loadingComment &&
                tour.commentDetail?.length < tour.comments?.length && (
                  <Typography
                    variant="body1"
                    onClick={loadMoreComment}
                    className={classes.loadMoreComment}
                  >
                    Xem thêm bình luận
                  </Typography>
                )}
            </Collapse>
            {showCmt && auth.user && <InputComment type="tour" id={tour._id} />}
          </>
        )}
      </>
    </Card>
  );
}
