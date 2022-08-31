import {
  Button,
  Grid,
  InputBase,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { CameraAltOutlined } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useDispatch, useSelector } from 'react-redux';
import { error, success } from '../../redux/actions/alertAction';
import { formStyles } from '../../style';
import customAxios from '../../utils/fetchData';
import { checkImage, uploadImages } from '../../utils/uploadImage';
import GoogleMapPicker from 'react-google-map-picker';

const KEY = process.env.REACT_APP_GOOGLE_MAP;

function MapPicker({ setPosition, position }) {
  const [show, setShow] = useState(false);
  const [zoom, setZoom] = useState(8);

  const defaultPosition = position || { lat: 15, lng: 108 };

  useEffect(() => {
    let timer = setTimeout(() => setShow(true), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function handleChangeLocation(lat, lng) {
    setPosition({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  if (!show) {
    return 'Loading map...';
  }
  return (
    <GoogleMapPicker
      defaultLocation={defaultPosition}
      zoom={zoom}
      defaultZoom={8}
      mapTypeId="roadmap"
      style={{ height:  580 }}
      onChangeLocation={handleChangeLocation}
      onChangeZoom={handleChangeZoom}
      apiKey={KEY}
    />
  );
}

export default function EditLocation({ location, handleClose }) {
  const { location: locationReducer, token } = useSelector(state => state);
  const dispatch = useDispatch();

  const [loc, setLoc] = useState(location);
  const [position, setPosition] = useState(
    location.position || {
      lat: 15,
      lng: 108
    }
  );
  const [loading, setLoading] = useState(false);
  const [province, setProvince] = useState(location.province);
  const [images, setImages] = useState(location.images);

  const changeProvince = province => {
    setProvince(province);
  };

  const handleChangeImageUpload = e => {
    let error = '';
    for (const file of e.target.files) {
      const check = checkImage(file);
      if (check !== '') {
        error = check;
        break;
      }
    }
    if (error === '') {
      setImages(oldImage => [...oldImage, ...e.target.files]);
    }
  };

  const removeImage = index => {
    setImages(oldImage => [
      ...oldImage.slice(0, index),
      ...oldImage.slice(index + 1)
    ]);
  };

  const handleSubmit = async () => {
    // console.log(service);
    setLoading(true);
    console.log(loc);
    console.log(province);
    console.log(position);
    let imgUploads = [];
    if (images.length > 0) {
      imgUploads = await uploadImages(images);
    }
    customAxios(token)
      .put('/location/contribute', {
        ...loc,
        position,
        province: province._id,
        province_name: province.fullname,
        images: imgUploads
      })
      .then(() => {
        dispatch(success({ message: 'Cập nhật thành công' }));
        setLoading(false);
        handleClose();
      })
      .catch(() => {
        dispatch(error({ message: 'Có lỗi xảy ra' }));
        setLoading(false);
        handleClose();
      });
  };

  const handleChange = e => {
    setLoc(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const classes = formStyles();
  return (
    <Paper style={{borderRadius: 15,  maxHeight: 800, overflow:'hidden', overflowY:'auto'}}>
      <div style={{ padding: 16, borderTop: '1px solid #ded9d9', borderRadius: 15 }}>
      <div className={classes.addLocationContribute}>
      <div 
      className={classes.center}
      style={{ borderBottom: '1px solid #eeeeee', marginBottom: 10 }}>
        <Typography variant="h6">Chỉnh sửa địa điểm</Typography>
      </div>
      <Grid container>
        <Grid item md={6} sm={12} xs={12} style={{ paddingRight: 16 }}>
          <Autocomplete
            id="choose-province"
            freeSolo
            options={locationReducer.provinces}
            loading={locationReducer.loading}
            getOptionLabel={option => option?.fullname}
            className={classes.autocomplete}
            style={{ marginBottom: 10 }}
            onChange={(e, value) => changeProvince(value)}
            value={province}
            renderInput={params => (
              <TextField
                {...params}
                name="provinces"
                label="Chọn tỉnh thành"
                variant="outlined"
              />
            )}
          />
          <TextField
            value={loc.fullname}
            onChange={handleChange}
            style={{ marginBottom: 10, width: '100%' }}
            variant="outlined"
            label="Tên"
            name="fullname"
            id="fullname"
          />
          <InputBase
            placeholder="Mô tả"
            rows={7}
            name="information"
            id="information"
            multiline
            className={classes.input}
            value={loc.information}
            onChange={handleChange}
          />
          <div className={classes.composeOptions}>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: 'none' }}
              id="input-image-contribute"
              name="images-contribute"
              multiple
              type="file"
              onChange={handleChangeImageUpload}
            />
            <label
              className={classes.composeOption}
              htmlFor="input-image-contribute"
            >
              <CameraAltOutlined className={classes.composeIcon} />
              <span>Hình ảnh</span>
            </label>
          </div>
          <div className={classes.imageInputContainer}>
            {images.length > 0 && (
              <ScrollMenu height="300px">
                {images.map((item, index) => (
                  <img
                    key={index}
                    alt="Error"
                    className={classes.imageInput}
                    onClick={() => removeImage(index)}
                    src={
                      typeof item === 'string'
                        ? item
                        : URL.createObjectURL(item)
                    }
                    title={'Xoá'}
                  />
                ))}
              </ScrollMenu>
            )}
          </div>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <MapPicker setPosition={setPosition} position={position} />
        </Grid>
      </Grid>

      <div style={{ marginTop: 10 }} className={classes.center}>
        <Button
          className={classes.addDay}
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          Cập nhật
        </Button>
      </div>
    </div>
      </div>
    </Paper>
    
  );
}
