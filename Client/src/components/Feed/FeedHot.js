import { Button, Container, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import { feedStyles } from '../../style';
import Event from '../Event';
import Loading from '../Loading';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEvent,
  getHotLocation,
  getRecommendLocation
} from '../../redux/callApi/hotCall';
import {
  LocationHotScrollList,
  LocationRecommendScrollList
} from '../Location/LocationScrollList';

export default function FeedHot(props) {
  const classes = feedStyles();
  const { hot, auth } = useSelector(state => state);

  const { events, locations, locationRe } = hot;
  const dispatch = useDispatch();

  const [stateEvent, setStateEvent] = useState({
    loading: false,
    error: false
  });

  const [stateLocationHot, setStateLocationHot] = useState({
    loading: false,
    error: false
  });

  const [stateLocationRecommend, setStateLocationRecommend] = useState({
    loading: false,
    error: false
  });

  const getCurrentEvent = dispatch => {
    setStateEvent({
      loading: true,
      error: false
    });
    dispatch(
      getEvent(
        () =>
          setStateEvent({
            loading: false,
            error: false
          }),
        () =>
          setStateEvent({
            loading: false,
            error: true
          })
      )
    );
  };

  const getHotLocations = dispatch => {
    setStateLocationHot({
      loading: true,
      error: false
    });
    dispatch(
      getHotLocation(
        () =>
          setStateLocationHot({
            loading: false,
            error: false
          }),
        () =>
          setStateLocationHot({
            loading: false,
            error: true
          })
      )
    );
  };

  const getRecommendLocations = useCallback(
    dispatch => {
      setStateLocationRecommend({
        loading: true,
        error: false
      });
      dispatch(
        getRecommendLocation(
          auth.token,
          () => {
            setStateLocationRecommend({
              loading: false,
              error: false
            });
          },
          () => {
            setStateLocationRecommend({
              loading: false,
              error: true
            });
          }
        )
      );
    },
    [auth?.token]
  );

  useEffect(() => {
    if (stateLocationHot.loading || stateLocationHot.error || locations) return;
    getHotLocations(dispatch);
  }, [dispatch, stateLocationHot, locations]);

  useEffect(() => {
    if (stateEvent.loading || stateEvent.error || events) return;
    getCurrentEvent(dispatch);
  }, [dispatch, stateEvent, events]);

  useEffect(() => {
    if (
      stateLocationRecommend.loading ||
      stateLocationRecommend.error ||
      locationRe ||
      !auth.token
    )
      return;
    getRecommendLocations(dispatch);
  }, [
    dispatch,
    stateLocationRecommend,
    locationRe,
    getRecommendLocations,
    auth.token
  ]);

  return (
    <Container className={classes.container}>
      <div className={classes.content}>
        <div className={classes.event}>
          <div className={classes.title}>
            <Typography variant="h4">Sự kiện lễ hội</Typography>
          </div>
          {stateEvent.loading ? (
            <div className={classes.centerMarginTop}>
              <Loading />
            </div>
          ) : stateEvent.error ? (
            <div className={classes.centerMarginTop}>
              <Button onClick={getCurrentEvent}>Thử lại</Button>
            </div>
          ) : (
            events && <Event events={events} />
          )}
        </div>
        <div className={classes.hot}>
          <div className={classes.title}>
            <Typography variant="h4">Địa điểm hot</Typography>
          </div>
          <div className={classes.hotFeed}>
            {stateLocationHot.loading ? (
              <div className={classes.centerMarginTop}>
                <Loading />
              </div>
            ) : stateLocationHot.error ? (
              <div className={classes.centerMarginTop}>
                <Button onClick={getHotLocations}>Thử lại</Button>
              </div>
            ) : (
              locations && <LocationHotScrollList locations={locations} />
            )}
          </div>
        </div>
        <div className={classes.hot}>
          <div className={classes.title}>
            <Typography variant="h4">Địa điểm gợi ý</Typography>
          </div>
          <div className={classes.hotFeed}>
            {stateLocationRecommend.loading ? (
              <div className={classes.centerMarginTop}>
                <Loading />
              </div>
            ) : stateLocationRecommend.error ? (
              <div className={classes.centerMarginTop}>
                <Button onClick={getHotLocations}>Thử lại</Button>
              </div>
            ) : (
              locationRe && (
                <LocationRecommendScrollList locations={locationRe} />
              )
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
