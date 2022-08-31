import {
  Avatar,
  Button,
  CircularProgress,
  IconButton
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { followInList, unfollowInList } from '../../redux/callApi/authCall';
import { modalListStyles } from '../../style';

export default function UserList(props) {
  const { title, listUser, handleClose } = props;
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();
  const [followings, setFollowings] = useState([]);
  const [stateFollow, setStateFollow] = useState({
    id: null,
    loading: false,
    error: false
  });

  const classes = modalListStyles();

  const handleFollow = userId => {
    if (isFollowed(userId)) {
      setStateFollow({
        id: userId,
        loading: true,
        error: false
      });
      dispatch(
        unfollowInList(auth.token, userId, socket, () => {
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
        followInList(auth.token, userId, socket, () => {
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

  const isFollowed = id => {
    for (const u of followings) {
      // console.log(u._id);
      if (u._id === id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (auth.user) {
      setFollowings(auth.user.followings);
    }
  }, [auth.user]);

  return (
    <div className={classes.paper}>
      <div className={classes.modal_header}>
        <h2 className={classes.modal_header_left}>
          {title}: {listUser.length}
        </h2>
        <div className={classes.modal_header_right}>
          <IconButton onClick={handleClose} size="small">
            <Close className={classes.modal_header_closeIcon} />
          </IconButton>
        </div>
      </div>
      <div style={{ position: 'relative', overflowY: 'auto' }}>
        <ul>
          {listUser.map(user => (
            <li className={classes.modal_body_user} key={user._id}>
              <div className={classes.userWrap}>
                <Avatar
                  alt="avatar"
                  src={user.avatar}
                  className={classes.avatar}
                />
                <div className={classes.fullnameWrap}>
                  <Link
                    to={`/u/${user._id}`}
                    onClick={handleClose}
                    className={classes.fullname}
                  >
                    {user.fullname}
                  </Link>
                </div>
              </div>
              <div>
                {auth.user && user._id !== auth.user._id && (
                  <Button
                    variant="outlined"
                    className={classes.modal_body_user_button}
                    onClick={() => handleFollow(user._id)}
                    disabled={stateFollow.loading}
                  >
                    {stateFollow.loading && stateFollow.id === user._id ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : isFollowed(user._id) ? (
                      'Hủy theo dõi'
                    ) : (
                      'Theo dõi'
                    )}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
