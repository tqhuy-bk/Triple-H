import React from 'react';

import Post from '../Post';
import Feed from './index';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPost } from '../../redux/callApi/postCall';
import Loading from '../Loading';

export default function FeedPostUser(props) {
  const { id } = props;
  const dispatch = useDispatch();

  const { post } = useSelector(state => state);

  const tryAgain = () => {
    if (id) {
      dispatch(getUserPost(id, post.page));
    }
  };

  const loadPost = () => {
    if (post.hasMore) {
      dispatch(getUserPost(id, post.page));
    }
  };

  return (
    <div style={{ marginTop: 90, padding: '0 10px 10px 10px' }}>
      {post.loadingFirst ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
        >
          <Loading />
        </div>
      ) : (
        <Feed
          loadMore={loadPost}
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
