import React, { useEffect, useState } from 'react';
import { Card, List, Typography, CardHeader, Avatar } from '@material-ui/core';
import { friendCardStyles } from '../../style';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTourRecommend } from '../../redux/callApi/tourCall';
import { useDispatch } from 'react-redux';
import { timeAgo } from '../../utils/date';
import { Link } from 'react-router-dom';

export default function TourRecommendCardForYou() {
  const { auth } = useSelector(state => state);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = friendCardStyles();
  const [tours, setTours] = useState([]);
  useEffect(() => {
    dispatch(
      getTourRecommend(auth.token, data => {
        setTours(data);
      })
    );
  }, [dispatch, auth]);

  return (
    tours?.length > 0 && 
    <Card className={classes.tourRecommend}>
      <div className={classes.friendHeader}>
        <Typography
          className={classes.text}
          style={{ fontSize: 18, fontWeight: 500 }}
        >
          Hành trình gợi ý
        </Typography>
      </div>
      <div>
        <List className={classes.list}>
          {tours?.length > 0 ? (
            tours?.slice(0, 3).map(
              item =>
                !item.shareId && (
                  <div key={item._id} className={classes.itemWrapper}>
                    <div
                      className={classes.itemImage}
                      onClick={() => history.push(`/tour/${item._id}`)}
                    >
                      <img
                        className={classes.image}
                        src={item.image}
                        alt="loading"
                      />
                      <Typography variant="h6" className={classes.itemText}>
                        {item.name}
                      </Typography>
                    </div>
                    <div className={classes.userInfo}>
                      <CardHeader
                        style={{ padding: 0 }}
                        avatar={
                          <Avatar
                            alt={item.userId.fullname}
                            src={item.userId.avatar}
                            aria-label="avatar"
                          />
                        }
                        title={
                          <Typography
                            className={classes.username}
                            component={Link}
                            to={`/u/${item.userId._id}`}
                          >
                            {item.userId?.fullname}
                          </Typography>
                        }
                        subheader={
                          <Typography className={classes.subheader}>
                            {timeAgo(new Date(item.createdAt))}
                          </Typography>
                        }
                      />
                    </div>
                  </div>
                )
            )
          ) : (
            <div>Không có gợi ý hành trình</div>
          )}
        </List>
      </div>
    </Card>
  );
}
