import { Grid } from '@material-ui/core';
import React, { createRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LeftBar from '../../../components/Leftbar';
import RightBar from '../../../components/Rightbar';
import Scroll from '../../../components/Scroll';
import useStyles from '../../../style';
import { profileMenu, serviceMenu } from '../../../constant/menu';
import FeedTourUser from '../../../components/Feed/FeedTourUser';
import ProfileAvatar from '../../../components/Profile/Avatar';
import SpeedDialButton from '../../../components/SpeedDialBtn';
import Calendar from '../../../components/Calendar';
import FriendRecommendCard from '../../../components/Card/FriendRecommend';
import { NotFound } from '../../404';
import { getUser } from '../../../redux/callApi/userCall';
import { getUserTour } from '../../../redux/callApi/tourCall';

function ProfileTours() {
  const classes = useStyles();

  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, user, tour } = useSelector(state => state);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!user?.user || user.user?._id !== id) {
      setNotFound(false);
      dispatch(
        getUser(id, () => {
          setNotFound(true);
        })
      );
    }
  }, [user?.user, id, dispatch, setNotFound]);

  useEffect(() => {
    if (
      !user.user ||
      tour.loading ||
      tour.error ||
      tour.loadingFirst ||
      (tour.tours && tour.id === id)
    ) {
      console.log('???');
      return;
    }

    dispatch(getUserTour(id, auth.token, 0));
  }, [dispatch, user.user, auth.token, tour, id]);

  const ref = createRef();

  return (
    <div>
      {notFound ? (
        <NotFound />
      ) : (
        <>
          <Scroll showBelow={500} />
          <SpeedDialButton />
          <ProfileAvatar user={user.user} />
          <Grid container className={classes.containerHome}>
            <Grid item md={3} sm={2} xs={2}>
              {user.user && (
                <LeftBar
                  menuList={user.user?.role === 1 ? serviceMenu : profileMenu}
                />
              )}
            </Grid>
            <Grid item md={6} sm={10} xs={10}>
              <FeedTourUser id={id} />
            </Grid>
            <Grid item md={3} className={classes.rightbar}>
              <RightBar ref={ref}>
                <Calendar />
                <FriendRecommendCard />
              </RightBar>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}

export default ProfileTours;
