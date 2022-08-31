import React, { useState } from 'react';
import { InputBase, Modal, Backdrop, Fade } from '@material-ui/core';
import {
  CameraAltOutlined,
  SentimentSatisfiedOutlined,
  MoreHorizOutlined
} from '@material-ui/icons';
import Feed from './index';
import Post from '../Post';
import { feedStyles } from '../../style';
import CreatePostForm from '../Forms/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { getMorePost, getPosts } from '../../redux/callApi/postCall';
import Loading from '../Loading';

export default function FeedPost(props) {
  const dispatch = useDispatch();

  const { auth, post } = useSelector(state => state);

  const [show, setShow] = useState(false);

  const classes = feedStyles();

  const loadMore = () => {
    if (post.postId && post.postId.length > 0) {
      dispatch(getMorePost({ postId: post.postId }));
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const tryAgain = () => {
    if (post.page === 0) {
      dispatch(getPosts(auth.token));
      return;
    }
    dispatch(getMorePost({ postId: post.postId }));
  };

  const CreatePostRef = React.forwardRef((props, ref) => (
    <CreatePostForm {...props} innerRef={ref} />
  ));
  const ref = React.createRef();

  return (
    <div className={classes.container}>
      {auth.user && (
        <div className={classes.create}>
          <div className={classes.createWrapper}>
            <div className={classes.compose}>
              <div className={classes.composeForm}>
                <img
                  className={classes.composeFormImage}
                  src={auth.user.avatar}
                  alt="avatar"
                />
                <InputBase
                  placeholder="Bạn đang nghĩ gì?..."
                  className={classes.createText}
                  onClick={handleShow}
                  readOnly
                  rows={1}
                  disabled={!auth.user}
                />
              </div>
            </div>
            <div className={classes.composeOptions}>
              <div className={classes.composeOption} onClick={handleShow}>
                <CameraAltOutlined className={classes.composeIcon} />
                <span>Hình ảnh</span>
              </div>
              <div className={classes.composeOption} onClick={handleShow}>
                <SentimentSatisfiedOutlined className={classes.composeIcon} />
                <span>Cảm xúc</span>
              </div>
              <div className={classes.composeOption} onClick={handleShow}>
                <MoreHorizOutlined className={classes.composeIcon} />
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={show}>
          <CreatePostRef ref={ref} handleClose={handleClose} />
        </Fade>
      </Modal>
      {post.loadingFirst ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
        >
          <Loading />
        </div>
      ) : (
        <Feed
          loadMore={loadMore}
          tryAgain={tryAgain}
          loading={post.loading}
          error={post.error}
          hasMore={post.hasMore}
        >
          {post.posts &&
            post.posts.map(post => <Post post={post} key={post._id} />)}
        </Feed>
      )}
    </div>
  );
}
