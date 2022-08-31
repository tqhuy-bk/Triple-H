import { Grid } from '@material-ui/core';
import React, { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import LeftBar from '../../../components/Leftbar';
import RightBar from '../../../components/Rightbar';
import Scroll from '../../../components/Scroll';
import ProfileAvatar from '../../../components/Profile/Avatar';
import { profileMenu, serviceMenu } from '../../../constant/menu';
import SpeedDialButton from '../../../components/SpeedDialBtn';
import Calendar from '../../../components/Calendar';
import FriendRecommendCard from '../../../components/Card/FriendRecommend';
import { NotFound } from '../../404';
import { getUser } from '../../../redux/callApi/userCall';
import { getUserPost } from '../../../redux/callApi/postCall';
import useStyles from '../../../style';
import FeedPostUser from '../../../components/Feed/FeedPostUser';

function ProfilePosts() {
  const { id } = useParams();
  const { auth, user, post } = useSelector(state => state);
  const [notFound, setNotFound] = useState(false);

  const dispatch = useDispatch();

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
      post.loading ||
      post.error ||
      post.loadingFirst ||
      (post.posts && post.id === id)
    )
      return;
    if (user.user) {
      dispatch(getUserPost(user.user._id, auth.token, 0));
    }
  }, [user.user, dispatch, auth.token, post, id]);

  const classes = useStyles();

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
              <FeedPostUser id={id} />
            </Grid>
            <Grid item sm={3} className={classes.rightbar}>
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

export default ProfilePosts;
