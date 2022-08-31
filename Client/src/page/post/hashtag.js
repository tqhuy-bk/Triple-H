import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Feed from '../../components/Feed';
import Loading from '../../components/Loading';
import Post from '../../components/Post';
import { getPostHashtag } from '../../redux/callApi/postCall';
import { feedStyles } from '../../style';

export default function HashtagTour() {
  const location = useLocation();
  const hashtag = new URLSearchParams(location.search).get('hashtag');
  const dispatch = useDispatch();
  const { post } = useSelector(state => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const classes = feedStyles();
  const loadTour = () => {
    if (post.hasMore) {
      dispatch(getPostHashtag(post.page, hashtag));
    }
  };
  const tryAgain = () => {
    dispatch(getPostHashtag(post.page, hashtag));
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getPostHashtag(0, hashtag))
      .then(() => setLoading(false))
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [dispatch, hashtag]);

  useEffect(() => {
    document.title = `Tìm kiếm hashtag ${hashtag}`;
  }, [hashtag]);

  if (loading)
    return (
      <div style={{ marginTop: 150 }}>
        {' '}
        <Loading />
      </div>
    );

  if (error)
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
      >
        Có lỗi xảy ra
      </div>
    );

  return (
    <Container className={classes.hashtagContainer}>
      <Feed
        loadMore={loadTour}
        tryAgain={tryAgain}
        loading={post.loading}
        error={post.error}
        hasMore={post.hasMore}
      >
        {post.posts?.map(post => (
          <Post post={post} key={post._id} />
        ))}
      </Feed>
    </Container>
  );
}
