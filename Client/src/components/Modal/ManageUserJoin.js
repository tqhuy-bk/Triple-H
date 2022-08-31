import {
  Avatar,
  Button,
  CircularProgress,
  IconButton
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { modalListStyles } from '../../style';
import customAxios from '../../utils/fetchData';

export default function ManageUserJoin(props) {
  const { tourId, title, handleClose, updateJoin } = props;
  const { auth } = useSelector(state => state);
  const [listUser, setListUser] = useState(props.listUser);
  const [loading, setLoading] = useState(false);

  const classes = modalListStyles();

  const handleRemove = async user => {
    // console.log(user);
    let prevJoin = listUser;
    let newJoin = listUser.filter(u => u._id !== user);
    updateJoin(newJoin);
    setListUser(newJoin);
    setLoading(true);
    await customAxios(auth.token)
      .patch(`/tour/${tourId}/remove_join`)
      .then(res => {
        updateJoin(res.data.joinIds);
        setLoading(false);
      })
      .catch(err => {
        updateJoin(prevJoin);
        setLoading(false);
      });
  };

  return (
    <div className={classes.paper}>
      <div className={classes.modal_header}>
        <h2 className={classes.modal_header_left}>{title}</h2>
        <div className={classes.modal_header_right}>
          <IconButton onClick={handleClose} size="small">
            <Close className={classes.modal_header_closeIcon} />
          </IconButton>
        </div>
      </div>
      {listUser && (
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
                {auth.user && auth.user._id !== user._id && (
                  <Button
                    variant="outlined"
                    className={classes.modal_body_user_button}
                    onClick={() => handleRemove(user._id)}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : (
                      'Xoá'
                    )}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
