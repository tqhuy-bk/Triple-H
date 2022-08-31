import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import GoogleMapPicker from 'react-google-map-picker';
// import KEY from '../../key/googlemap';

const KEY = process.env.REACT_APP_GOOGLE_MAP;

const DefaultLocation = { lat: 18, lng: 106 };
const DefaultZoom = 8;

export default function MapPicker(props) {
  const { position, setPosition, height } = props;

  const defaultLocation = position || DefaultLocation;

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setPosition({ ...location });
  }

  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setShow(true), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!show) {
    return 'Loading map...';
  }

  return (
    <>
      <GoogleMapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        mapTypeId="roadmap"
        style={{ height: height || 450 }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey={KEY}
      />
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Button
          style={{ margin: 20 }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Xác nhận vị trí
        </Button>
      </div>
    </>
  );
}
