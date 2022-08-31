import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
// import KEY from "../../key/googlemap";
import {
  Button,
  ClickAwayListener,
  Paper,
  Popper,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as tourAction from '../../redux/actions/createTourAction';
import { cardStyles } from '../../style';
import LocationIcon from '../Icons/Location';
import { getRecommend } from '../../redux/callApi/serviceCall';

const KEY = process.env.REACT_APP_GOOGLE_MAP;

function Location(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const classes = cardStyles();

  const { location, onClick, indexDate, handleClose, indexEvent } = props;

  const handlePopoverOpen = event => {
    onClick();
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const addLoc = e => {
    e.preventDefault();
    dispatch(
      tourAction.addLocation({
        location,
        indexDate,
        indexEvent
      })
    );
    handlePopoverClose();
    handleClose();
    if (location?.position) dispatch(getRecommend(location.position));
  };

  return (
    <>
      <LocationIcon
        onClick={handlePopoverOpen}
        style={{
          color: open ? '#3f50b5' : '#ff7961',
          cursor: 'pointer'
        }}
      />
      <Popper
        id="province popover"
        open={open}
        anchorEl={anchorEl}
        placement="top"
        disablePortal={false}
        transition
        onClose={handlePopoverClose}
        style={{ zIndex: 9999 }}
      >
        <ClickAwayListener onClickAway={handlePopoverClose}>
          <Paper className={classes.locationPopper}>
            <img
              src={location.images[0]}
              alt={'Đang tải...'}
              height={200}
              width="100%"
              title={location.fullname}
            />
            <div className={classes.fullnameWrap}>
              <Typography
                title={location.fullname}
                component={Link}
                to={`/location/${location.name}`}
              >
                {location.fullname.length > 28
                  ? location.fullname.slice(0, 28) + '...'
                  : location.fullname}
              </Typography>
            </div>
            <div style={{ marginTop: 10 }} className={classes.buttonWrap}>
              <Button onClick={addLoc} className={classes.addButton}>
                Thêm địa điểm
              </Button>
            </div>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}

export default function AddLocMap(props) {
  const {
    locations,
    currentProvince,
    setLoc,
    state,
    setState,
    indexDate,
    handleClose,
    indexEvent
  } = props;

  useEffect(() => {
    if (currentProvince) {
      console.log('province');
      setState({
        zoom: 10,
        center: currentProvince.position
      });
    }
  }, [currentProvince, setState]);

  const locationClick = item => {
    if (item) {
      setState({
        zoom: 12,
        center: item.position
      });
      setLoc(item);
    }
  };

  return (
    <div style={{ height: 500 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: KEY }}
        defaultCenter={{ lat: 14.489055527436275, lng: 107.96608963227854 }}
        defaultZoom={8}
        center={state.center}
        zoom={state.zoom}
      >
        {currentProvince && locations
          ? locations.map(item => (
              <Location
                location={item}
                key={item._id}
                lat={item.position?.lat}
                lng={item.position?.lng}
                onClick={() => locationClick(item)}
                indexDate={indexDate}
                indexEvent={indexEvent}
                handleClose={handleClose}
              />
            ))
          : null}
      </GoogleMapReact>
    </div>
  );
}
