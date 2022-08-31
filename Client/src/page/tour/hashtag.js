import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Feed from '../../components/Feed';
import Loading from '../../components/Loading';
import Tour from '../../components/Tour';
import { getTourHashtag } from '../../redux/callApi/tourCall';
import { feedStyles } from '../../style';

export default function HashtagTour() {
  const location = useLocation();
  const hashtag = new URLSearchParams(location.search).get('hashtag');
  const dispatch = useDispatch();
  const { tour } = useSelector(state => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const classes = feedStyles();
  const loadTour = () => {
    if (tour.hasMore) {
      dispatch(getTourHashtag(tour.page, hashtag));
    }
  };
  const tryAgain = () => {
    dispatch(getTourHashtag(tour.page, hashtag));
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getTourHashtag(0, hashtag))
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
        loading={tour.loading}
        error={tour.error}
        hasMore={tour.hasMore}
      >
        {tour.tours &&
          tour.tours.map(tour => <Tour tour={tour} key={tour._id} />)}
      </Feed>
    </Container>
  );
}
