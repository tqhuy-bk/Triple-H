import { Card, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { myReviewStyles } from '../../style';

function LocationItem({ review, onClick }) {
  const classes = myReviewStyles();
  return (
    <Card onClick={onClick} className={classes.itemWrapper}>
      <div className={classes.itemImage}>
        <img
          className={classes.image}
          src={review?.locationId?.images[0]}
          alt="loading"
        />
        <Typography variant="h6" className={classes.itemText}>
          {review?.locationId?.fullname}
        </Typography>
      </div>
    </Card>
  );
}

export default function LocationList({
  reviews,
  setShowInfo,
  setZoom,
  setCenter
}) {
  const handleClick = item => {
    setShowInfo(item);
    setCenter(item.locationId?.position);
    setZoom(11);
  };
  const classes = myReviewStyles();

  return (
    <div className={classes.listReview}>
      <Typography variant="h6" className={classes.title}>
        Những địa điểm bạn đã review
      </Typography>
      <div style={{ height: '80vh', overflowY: 'auto' }}>
        {!reviews.length && (
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
          >
            <Typography>Bạn chưa có review</Typography>
          </div>
        )}
        <Grid container>
          {reviews.map(item => (
            <Grid
              item
              md={6}
              sm={12}
              xs={12}
              key={item._id}
              style={{ cursor: 'pointer' }}
            >
              <LocationItem review={item} onClick={e => handleClick(item)} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
