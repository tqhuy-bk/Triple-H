import React, { useEffect, useState } from 'react';
import { Card, List, Typography, CircularProgress } from '@material-ui/core';
import { CheckCircleOutline, PersonAddOutlined } from '@material-ui/icons';
import { friendCardStyles } from '../../style';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { follow, unfollow } from '../../redux/callApi/authCall';

export default function FriendRecommendCard(props) {
  const { friendsRecommend } = useSelector(state => state.auth);

  const history = useHistory();

  const classes = friendCardStyles();
  const [followings, setFollowings] = useState([]);
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();
  const [stateFollow, setStateFollow] = useState({
    id: null,
    loading: false,
    error: false
  });
  
  useEffect(() => {
    if (auth.user) {
      setFollowings(auth.user.followings);
    }
  }, [auth.user]);

  const isFollowed = id => {
    for (const u of followings) {
      // console.log(u._id);
      if (u._id === id) {
        return true;
      }
    }
    return false;
  };

  const handleFollow = userId => {
    if (isFollowed(userId)) {
      setStateFollow({
        id: userId,
        loading: true,
        error: false
      });
      dispatch(
        unfollow(auth.token, userId, socket, () => {
          setStateFollow({
            id: userId,
            loading: false,
            error: true
          });
        })
      );
      setStateFollow({
        id: userId,
        loading: false,
        error: false
      });
    } else {
      setStateFollow({
        id: userId,
        loading: true,
        error: false
      });
      dispatch(
        follow(auth.token, userId, socket, () => {
          setStateFollow({
            id: userId,
            loading: false,
            error: true
          });
        })
      );
      setStateFollow({
        id: userId,
        loading: false,
        error: false
      });
    }
  };
  return (
    <Card className={classes.friend}>
      <div className={classes.friendHeader}>
        <Typography style={{ fontSize: 18 }}>Gợi ý theo dõi</Typography>
      </div>
      <div>
        <List className={classes.list}>
          {friendsRecommend?.length > 0 ? (
            friendsRecommend.map((item, index) => (
              <div className={classes.friendBlock} key={index}>
                <img
                  className={classes.friendAvatar}
                  src={item.avatar}
                  alt="avatar"
                  onClick={() => history.push(`/u/${item._id}`)}
                />
                <div
                  className={classes.friendInfo}
                  onClick={() => history.push(`/u/${item._id}`)}
                >
                  <Typography>{item.fullname}</Typography>
                  <Typography>{item.fullname}</Typography>
                </div>
                <div className={classes.addFriend} onClick={() => handleFollow(item._id)}>
                  {stateFollow.loading && stateFollow.id === item._id ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : isFollowed(item._id) ? (
                      <CheckCircleOutline style={{backgroundColor: "#a5dec8", color:"white", borderRadius: 50}}/>
                    ) : (
                      <PersonAddOutlined />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>Không có bạn bè gợi ý</div>
          )}
        </List>
      </div>
    </Card>
  );
}
