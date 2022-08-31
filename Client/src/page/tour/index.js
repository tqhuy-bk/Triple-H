import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LeftBar from '../../components/Leftbar';
import FeedTour from '../../components/Feed/FeedTour';
import useStyles from '../../style';
import { homeMenu } from '../../constant/menu';
import SpeedDialButton from '../../components/SpeedDialBtn';
import { getTours, getTourHot } from '../../redux/callApi/tourCall';

export default function TourPage(props) {
  const classes = useStyles();
  const { loading, error, tours, tourHot, id, loadingFirst } = useSelector(
    state => state.tour
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading || loadingFirst || error || (tours && id === 0)) return;
    dispatch(getTours());
  }, [dispatch, loading, error, tours, id, loadingFirst]);

  useEffect(() => {
    if (loading || loadingFirst || error || tourHot) return;
    dispatch(getTourHot());
  }, [dispatch, loading, error, tourHot, loadingFirst]);

  useEffect(() => {
    document.title = 'Hành trình | Triple H';
  }, []);


  return (
    <>
      <Grid container className={classes.container}>
        <SpeedDialButton />
        <Grid
          container
          className={classes.containerHome}
          style={{ marginTop: -50 }}
        >
          <Grid item md={3} sm={3} xs={2} className={classes.leftbar}>
            <LeftBar menuList={homeMenu} />
          </Grid>
          <Grid item md={9} sm={9} xs={10} className={classes.content}>
            <FeedTour />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
