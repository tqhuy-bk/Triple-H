import React, { useState } from 'react';
import { Backdrop, Fade, InputBase, Modal } from '@material-ui/core';

import Post from '../Post';
import Feed from './index';
import { feedReviewStyles } from '../../style';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsLocation } from '../../redux/callApi/postCall';
import CreateReview from '../Forms/CreateReview';
import Loading from '../Loading';
// import SuccessIcon from "../Icons/Success";

export default function FeedReview(props) {
  const { location } = props;

  const { post, auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // const [fetch, setFetch] = useState(false);

  const handleShow = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = feedReviewStyles();

  const loadMoreReview = () => {
    if (post.hasMore) {
      dispatch(getPostsLocation(location._id, post.page));
    }
  };

  const tryAgain = () => {
    if (location) {
      dispatch(getPostsLocation(location._id, post.page));
    }
  };

  const ref = React.createRef();

  const CreateReviewRef = React.forwardRef((props, ref) => (
    <CreateReview innerRef={ref} {...props} />
  ));

  return (
    <div style={{ minHeight: '153px' }}>
      <div className={classes.create}>
        <div className={classes.containerText}>
          <InputBase
            placeholder="Viết review..."
            className={classes.createText}
            onClick={handleShow}
            readOnly
            rows={1}
            disabled={!auth.user}
          />
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <CreateReviewRef
              ref={ref}
              handleClose={handleClose}
              location={location}
            />
          </Fade>
        </Modal>
      </div>
      {post.loadingFirst ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
        >
          <Loading />
        </div>
      ) : (
        <Feed
          loadMore={loadMoreReview}
          loading={post.loading}
          error={post.error}
          hasMore={post.hasMore}
          tryAgain={tryAgain}
          type="review"
        >
          {post.posts &&
            post.posts.map(post => <Post post={post} key={post._id} />)}
        </Feed>
      )}
    </div>
  );
}
