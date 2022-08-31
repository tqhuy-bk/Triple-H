import { Grid } from '@material-ui/core';
import React, { createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LeftBar from '../components/Leftbar';
import FeedPost from '../components/Feed/FeedPost';
import RightBar from '../components/Rightbar';
import Slider from '../components/Slider';
import useStyles from '../style';
import { homeMenu } from '../constant/menu';
import SpeedDialButton from '../components/SpeedDialBtn';
import Calendar from '../components/Calendar';
import FriendRecommendCard from '../components/Card/FriendRecommend';
import { getPosts } from '../redux/callApi/postCall';

function HomePage() {
  const { auth, post } = useSelector(state => state);

  const classes = useStyles();

  const ref = createRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !auth.token ||
      post.loading ||
      post.loadingFirst ||
      post.error ||
      (post.posts && post.id === 0)
    )
      return;
    dispatch(getPosts(auth.token));
    console.log('get post');
  }, [dispatch, auth.token, post]);

  useEffect(() => {
    document.title = 'Triple H';
  }, []);

  return (
    <Grid container className={classes.container}>
      <SpeedDialButton />
      <Grid item md={12} sm={12} xs={12} style={{ marginBottom: -60 }}>
        <Slider />
      </Grid>
      <Grid container className={classes.containerHome}>
        <Grid item md={3} sm={3} xs={2} className={classes.leftbar}>
          <LeftBar menuList={homeMenu} />
        </Grid>
        <Grid item md={6} sm={9} xs={10} className={classes.content}>
          {auth.token ? <FeedPost /> : <></>}
        </Grid>
        <Grid item md={3} className={classes.rightbar}>
          <RightBar ref={ref}>
            <Calendar />
            {auth.token && <FriendRecommendCard />}
          </RightBar>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomePage;
