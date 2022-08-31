import React, { useCallback, useEffect, useState } from 'react';
import { Card, List, Typography, CardHeader, Avatar } from '@material-ui/core';
import { friendCardStyles } from '../../style';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { getTourSimilar } from '../../redux/callApi/tourCall';
// import { useDispatch } from 'react-redux';
import { timeAgo } from '../../utils/date';
import { Link } from 'react-router-dom';
import customAxios from '../../utils/fetchData';

export default function TourRecommendCard(props) {
  const { id } = props;
  const { auth } = useSelector(state => state);
  const history = useHistory();
  // const dispatch = useDispatch();
  const classes = friendCardStyles();
  const [tours, setTours] = useState([]);

  const getTourSimilar = useCallback(() => {
    customAxios(auth?.token)
      .get(`/tour/similar/${id}`)
      .then(res => {
        setTours(res.data.tours);
      });
  }, [auth?.token, id]);

  useEffect(() => {
    getTourSimilar();
  }, [getTourSimilar]);

  // useEffect(() => {
  //   dispatch(
  //     getTourSimilar(auth, id, data => {
  //       setTours(data);
  //     })
  //   );
  // }, [dispatch, id, auth]);

  return (
    <Card className={classes.tourRecommend}>
      <div className={classes.friendHeader}>
        <Typography className={classes.tourRecommendTittle}>
          Hành trình liên quan
        </Typography>
      </div>
      <div>
        <List className={classes.list}>
          {tours?.length > 0 ? (
            tours?.slice(0, 4).map(
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
