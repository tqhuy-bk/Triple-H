import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  Card,
  // CardActions,
  Collapse,
  Modal,
  Typography,
  CardMedia
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  Favorite,
  InsertLink,
  ChatBubbleOutlineSharp
} from '@material-ui/icons';
import Comment from '../Comment';
import InputComment from '../Input/Comment';
import { postStyles } from '../../style';
import UserList from '../Modal/UserList';
import SharePost from '../Forms/Share';
import PostContent from './Content';
import { likePost, unlikePost } from '../../redux/callApi/postCall';
import LoginModal from '../Modal/Login';
// import HeartIcon from "../Icons/Heart";
// import HeartFillIcon from "../Icons/HeartFill";
// import CommentIcon from "../Icons/Comment";
// import ShareIcon from "../Icons/Share";
import { loadComment } from '../../redux/callApi/commentCall';
import ImageList from '../Modal/ImageList';

export default function Post(props) {
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  const [showCmt, setShowCmt] = useState(false);
  const [like, setLike] = useState(false);
  const [post, setPost] = useState(null);
  const [share, setShare] = useState(false);
  const [login, setLogin] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const [errorComment, setErrorComment] = useState(false);
  const [pageComment, setPageComment] = useState(0);

  const classes = postStyles({ showCmt });

  const updateLike = likes => {
    setPost({
      ...post,
      likes: likes
    });
  };

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
    updateLike([...post.likes, auth.user]);
    // call api
    dispatch(
      likePost(post._id, auth, socket, () => {
        if (like) {
          setLike(false);
          let newLikes = post.likes.filter(user => user._id !== auth.user._id);
          updateLike(newLikes);
        }
      })
    );
  };

  const handleUnlike = () => {
    setLike(false);
    let newLikes = post.likes.filter(user => user._id !== auth.user._id);
    updateLike(newLikes);
    // call api
    dispatch(
      unlikePost(post._id, auth, socket, () => {
        if (!like) {
          setLike(true);
          updateLike([...post.likes, auth.user]);
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
        post._id,
        'post',
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
      if (!post.commentDetail) {
        setLoadingComment(true);
        dispatch(
          loadComment(
            post._id,
            'post',
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

  const handleCloseLogin = () => {
    setLogin(false);
  };

  const handleShowShare = () => {
    setShare(true);
  };

  const handleCloseShare = () => {
    setShare(false);
  };

  useEffect(() => {
    setPost(props.post);
  }, [props.post]);

  useEffect(() => {
    if (post) {
      if (auth.user && post.likes.find(like => like._id === auth.user._id)) {
        setLike(true);
      }
    }
  }, [post, auth.user]);

  const refLogin = React.createRef();
  const refUser = React.createRef();
  const refShare = React.createRef();

  const Login = React.forwardRef((props, ref) => (
    <LoginModal {...props} innerRef={ref} />
  ));

  const User = React.forwardRef((props, ref) => (
    <UserList {...props} innerRef={ref} />
  ));

  const ShareRef = React.forwardRef((props, ref) => (
    <SharePost {...props} innerRef={ref} />
  ));

  return (
    <Card className={classes.cardContainer}>
      {post && (
        <>
          <PostContent post={post} />
          {post.images.length > 0 ? (
            <div className={classes.postImage}>
              <div className={classes.masonryGrid}>
                <CardMedia>
                  <ImageList
                    imageList={post.images}
                    show2Image={true}
                    defaultHeight={500}
                    isPost={true}
                  />
                </CardMedia>
                <div className={classes.likeWrapper} onClick={likePress}>
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
                <div className={classes.commentWrapper}>
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
                <div className={classes.shareWrapper}>
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
            </div>
          ) : (
            <div className={classes.postActions}>
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
          )}
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
            <Login ref={refLogin} handleClose={handleCloseLogin} />
          </Modal>
          <Modal
            aria-labelledby="share"
            aria-describedby="share-this-post"
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
              object={post.shareId ? post.shareId : post}
              type="post"
              handleClose={handleCloseShare}
            />
          </Modal>
          <div className={classes.postFooter}>
            <div className={classes.likers}>
              {post?.likes.length > 0 &&
                post.likes
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
                {post?.likes.length > 0 &&
                  post.likes.slice(0, 3).map((item, index) => (
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
                          item.fullname.split(' ').length - 1
                        ]
                      }
                      {index !== post.likes.slice(0, 3).length - 1 ? ', ' : ''}
                    </Typography>
                  ))}
              </p>
              {post?.likes.length === 1 ? (
                <p style={{ margin: 0 }}>đã thích bài viết này</p>
              ) : (
                post?.likes.length > 1 && (
                  <p style={{ margin: 0 }} onClick={handleOpen}>
                    và những người khác đã thích bài này
                  </p>
                )
              )}
            </div>
            <div className={classes.socialCount}>
              <div className={classes.likeCount} onClick={handleOpen}>
                <Favorite style={{ height: 18, width: 18, color: '#888da8' }} />
                <span
                  style={{
                    display: 'block',
                    fontSize: 13,
                    color: '#888da8',
                    margin: '0 5px'
                  }}
                >
                  {post.likes.length}
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
                  {post.comments.length}
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
                  {post.likes.length}
                </span>
              </div>
            </div>
          </div>
          <Modal
            aria-labelledby="like"
            aria-describedby="user-like-this-post"
            className={classes.modal}
            open={showLike}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <User
              ref={refUser}
              listUser={post?.likes}
              title={'Đã thích'}
              handleClose={handleClose}
            />
          </Modal>
          <Collapse className={classes.cmt} in={showCmt}>
            <hr className={classes.line} />
            <div className={classes.listCmt}>
              {post.commentDetail &&
                post.commentDetail.map(cmt => (
                  <Comment
                    comment={cmt}
                    key={cmt._id}
                    id={post._id}
                    type="post"
                  />
                ))}
            </div>
            {loadingComment && (
              <Typography className={classes.loadingComment}>
                Đang tải...
              </Typography>
            )}
            {errorComment && (
              <Typography className={classes.errorComment}>
                Có lỗi xảy ra
              </Typography>
            )}
            {post.commentDetail &&
              !loadingComment &&
              post.commentDetail?.length < post.comments?.length && (
                <Typography
                  variant="body1"
                  className={classes.loadMoreComment}
                  onClick={loadMoreComment}
                >
                  Xem thêm bình luận
                </Typography>
              )}
          </Collapse>
          {showCmt && <InputComment type="post" id={post._id} />}
        </>
      )}
    </Card>
  );
}
