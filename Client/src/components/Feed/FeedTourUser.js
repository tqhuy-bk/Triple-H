import React from 'react';

import Tour from '../Tour';
import Feed from './index';
import { useSelector, useDispatch } from 'react-redux';
import { getUserTour } from '../../redux/callApi/tourCall';
import Loading from '../Loading';

export default function FeedUserTour(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const { auth, tour } = useSelector(state => state);

  const loadTour = () => {
    if (tour.hasMore) {
      dispatch(getUserTour(id, auth.token, tour.page));
    }
  };

  const tryAgain = () => {
    if (id) {
      loadTour(id, auth.token, tour.page, dispatch, tour.hasMore);
    }
  };

  return (
    <div style={{ marginTop: 80, marginInline: 10 }}>
      {tour.loadingFirst ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
        >
          <Loading />
        </div>
      ) : (
        <Feed
          loadMore={loadTour}
          loading={tour.loading}
          error={tour.error}
          tryAgain={tryAgain}
          hasMore={tour.hasMore}
        >
          {tour.tours &&
            tour.tours.map(tour => <Tour tour={tour} key={tour._id} />)}
        </Feed>
      )}
    </div>
  );
}
