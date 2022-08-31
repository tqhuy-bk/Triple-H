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
      style={{ height: 580 }}
      onChangeLocation={handleChangeLocation}
      onChangeZoom={handleChangeZoom}
      apiKey={KEY}
    />
  );
}

export default function EditService({ service, handleClose }) {
  const dispatch = useDispatch();
  const { location, auth } = useSelector(state => state);

  const [ser, setSer] = useState(service);
  const [position, setPosition] = useState({
    lat: service.position[1] || 15,
    lng: service.position[0] || 108
  });
  const [loading, setLoading] = useState(false);
  const [province, setProvince] = useState(service.province);
  const [images, setImages] = useState(service.images);

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
    let imgUploads = [];
    setLoading(true);
    if (images.length > 0) {
      imgUploads = await uploadImages(images);
    }

    console.log(ser);
    console.log(province);
    console.log(position);
    customAxios(auth.token)
      .put('/service/contribute', {
        ...ser,
        position: [position.lng, position.lat],
        province: province._id,
        province_name: province.fullname,
        images: imgUploads
      })
      .then(res => {
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
    setSer(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const classes = formStyles();

  return (
    <Paper style={{borderRadius: 15,  maxHeight: 800, overflow:'hidden', overflowY:'auto'}}>
      <div style={{ padding: 16, borderTop: '1px solid #ded9d9', borderRadius: 15 }}>
      <div className={classes.addServiceContribute}>
        <div className={classes.center} style={{borderBottom: "1px solid #eeeeee", marginBottom: 10}}>
          <Typography variant="h6" >Thêm dịch vụ</Typography>
        </div>
        <Grid container>
          <Grid item md={6} sm={12} xs={12} style={{paddingRight: 16}}>
            <Autocomplete
              id="choose-province"
              freeSolo
              options={location.provinces}
              loading={location.loading}
              getOptionLabel={option => option?.fullname}
              className={classes.autocomplete}
              style={{marginBottom:10}}
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
              value={ser.name}
              onChange={handleChange}
              style={{marginBottom:10, width: "100%"}}
              variant="outlined"
              label="Tên"
              name="name"
              id="name"
            />
            <TextField
              value={ser.address}
              onChange={handleChange}
              style={{marginBottom:10, width: "100%"}}
              variant="outlined"
              label="Mô tả vị trí"
              name="address"
              id="address"
            />
            <InputBase
              placeholder="Mô tả"
              rows={7}
              name="description"
              id="description"
              multiline
              className={classes.input}
              value={ser.description}
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
