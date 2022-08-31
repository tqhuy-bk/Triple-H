import { Card, Paper, Popover, Typography } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LocationIcon from '../Icons/Location';

const KEY = process.env.REACT_APP_GOOGLE_MAP;

const K_WIDTH = 300;
// const K_HEIGHT = 300;

const greatePlaceStyle = {
  position: 'absolute',
  width: K_WIDTH,
  left: -K_WIDTH / 2 + 10,
  top: -K_WIDTH + 50
};

function LocationInfo({ review, setShowInfo }) {
  return (
    <Paper style={greatePlaceStyle}>
      <div
        onClick={() => setShowInfo(null)}
        style={{ display: 'flex', justifyContent: 'right', marginRight: 5 }}
      >
        <Typography>x</Typography>
      </div>
      <img
        src={
          review?.images?.length
            ? review?.images[0]
            : review?.locationId.images[0]
        }
        alt={'Đang tải...'}
        width={300}
        height={200}
        title={review.locationId.fullname}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '0 10px 10px 10px'
        }}
      >
        <Typography component={Link} to={`/post/${review._id}`} variant="body2">
          {review.content}
        </Typography>
        <Rating name="read-only" value={review.rate} readOnly size="small" />
      </div>
    </Paper>
  );
}

const LocationMarker = ({ location }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <LocationIcon
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
      />
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        onClose={handleClose}
        disableRestoreFocus
      >
        <Card
          style={{
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 10
          }}
        >
          <Typography variant="body1">{location?.fullname}</Typography>
          <img
            src={location?.images[0]}
            alt={'Đang tải...'}
            width={300}
            height={200}
          />
        </Card>
      </Popover>
    </>
  );
};

export default function MapReview({
  reviews,
  center,
  zoom,
  showInfo,
  setShowInfo
}) {
  return (
    <Card style={{ height: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: KEY }}
        defaultCenter={{ lat: 15, lng: 108 }}
        defaultZoom={8}
        center={center}
        zoom={zoom}
      >
        {reviews.map(item => (
          <LocationMarker
            key={item._id}
            lat={item?.locationId?.position.lat}
            lng={item?.locationId?.position.lng}
            location={item?.locationId}
          />
        ))}
        {showInfo && (
          <LocationInfo
            lat={showInfo?.locationId?.position.lat}
            lng={showInfo?.locationId?.position.lng}
            review={showInfo}
            setShowInfo={setShowInfo}
          />
        )}
      </GoogleMapReact>
    </Card>
  );
}
