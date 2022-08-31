import { Grid } from '@material-ui/core';
import React, { createRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LeftBar from '../../../components/Leftbar';
import RightBar from '../../../components/Rightbar';
import Scroll from '../../../components/Scroll';
import ProfileAvatar from '../../../components/Profile/Avatar';
import Introduction from '../../../components/Profile/Introduction';
import { profileMenu, serviceMenu } from '../../../constant/menu';
import SpeedDialButton from '../../../components/SpeedDialBtn';
import Calendar from '../../../components/Calendar';
import FriendRecommendCard from '../../../components/Card/FriendRecommend';
import { getUser } from '../../../redux/callApi/userCall';
import { NotFound } from '../../404';
import useStyles from '../../../style';
import ServiceList from '../../../components/Service/ServiceList';
import { getServices } from '../../../redux/callApi/serviceCall';

function InfoProfile() {
  // const classes = useStyles();
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  const [notFound, setNotFound] = useState(false);

  const { id } = useParams();

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
    if (user?.user?.role === 1) {
      dispatch(getServices(id, 0));
    }
  }, [dispatch, user?.user, id]);

  const classes = useStyles();

  const ref = createRef();

  return (
    <>
      {notFound ? (
        <NotFound />
      ) : (
        <>
          <Scroll showBelow={500} />
          <SpeedDialButton />
          <ProfileAvatar user={user?.user} />
          <Grid container className={classes.containerHome}>
            {user?.user && (
              <>
                <Grid item md={3} sm={2} xs={2}>
                  <LeftBar
                    menuList={user.user.role === 1 ? serviceMenu : profileMenu}
                  />
                </Grid>
                <Grid item md={6} sm={10} xs={10}>
                  {user.user.role === 1 ? (
                    <ServiceList />
                  ) : (
                    <Introduction user={user.user} />
                  )}
                </Grid>
                <Grid item md={3} className={classes.rightbar}>
                  <RightBar ref={ref}>
                    <Calendar />
                    <FriendRecommendCard />
                  </RightBar>
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
}

export default InfoProfile;
