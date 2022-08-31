import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { adminStyles } from '../../../style';
import AddImageHorizontal from '../../Input/AddImageHorizontal';
import Validator, { isFloat, nameid } from '../../../utils/validator';
import { uploadImages } from '../../../utils/uploadImage';
import { useDispatch, useSelector } from 'react-redux';
import { getProvinces } from '../../../redux/callApi/locationCall';
import customAxios from '../../../utils/fetchData';
import { error, success } from '../../../redux/actions/alertAction';
import MapPicker from '../../Map/MapPicker';

export default function FormLocationAdmin(props) {
  const classes = adminStyles();

  const { provinces } = useSelector(state => state.location);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { location, setLocation, mode } = props;
  const [errors, setErrors] = useState({});
  const [imgs, setImgs] = useState(location?.images || []);
  const [loading, setLoading] = useState(false);
  const [provinceOpt, setProvinceOpt] = useState(null);
  const [picker, setPicker] = useState(false);

  const handleChange = e => {
    setLocation(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const handleChangePicker = e => {
    setPicker(state => !state);
  };

  const changePositionText = e => {
    setLocation(state => ({
      ...state,
      position: {
        ...state.position,
        [e.target.name]: e.target.value
      }
    }));
  };

  const changePosition = position => {
    setLocation(state => ({
      ...state,
      position: position
    }));
  };

  useEffect(() => {
    if (provinces.length === 0) {
      dispatch(getProvinces());
    }
  }, [provinces.length, dispatch]);

  useEffect(() => {
    if (location.province && provinces.length > 0) {
      let temp = provinces.find(item => item._id === location.province._id);
      setProvinceOpt(temp);
    }
  }, [location.province, provinces]);

  const rules = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Tên không được bỏ trống!'
    },
    {
      field: 'fullname',
      method: 'isEmpty',
      validWhen: false,
      message: 'Tên đầy đủ không được bỏ trống!'
    },
    {
      field: 'information',
      method: 'isEmpty',
      validWhen: false,
      message: 'Mô tả không được bỏ trống!'
    },
    {
      field: 'name',
      method: nameid,
      validWhen: true,
      message: 'Tên không hợp lệ'
    }
  ];
  const rulesPosition = [
    {
      field: 'lat',
      method: isFloat,
      validWhen: true,
      message: 'Vị trí không hợp lệ!'
    },
    {
      field: 'lng',
      method: isFloat,
      validWhen: true,
      message: 'Vị trí không hợp lệ!'
    }
  ];

  const validator = new Validator(rules);
  const validatorPos = new Validator(rulesPosition);

  const onClickSubmit = async () => {
    setLoading(true);
    const err = validator.validate(location);
    const errPos = validatorPos.validate(location.position);
    const totalErr = {
      ...err,
      position: errPos
    };

    setErrors(totalErr);

    if (imgs.length === 0) {
      setErrors(err => ({
        ...err,
        images: 'Chèn thêm ảnh'
      }));
      return;
    }

    const imageUpload = await uploadImages(imgs);

    const data = {
      ...location,
      images: imageUpload,
      province: provinceOpt._id,
      position: [location.position.lng, location.position.lat]
    };

    if (Object.keys(err).length === 0 && Object.keys(errPos).length === 0) {
      if (mode === 'edit') {
        await customAxios(token)
          .patch(`/location/${location._id}`, data)
          .then(res => {
            setLocation(res.data.location);
            dispatch(success({ message: 'Cập nhật địa điểm thành công' }));
          })
          .catch(err => {
            dispatch(error({ message: 'Có lỗi xảy ra' }));
          });
      } else if (mode === 'add') {
        await customAxios(token)
          .post(`/location/create`, data)
          .then(res => {
            dispatch(success({ message: 'Thêm địa điểm thành công' }));
          })
          .catch(err => {
            dispatch(error({ message: 'Có lỗi xảy ra' }));
          });
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}
      >
        <Typography variant="h4">
          {mode === 'edit'
            ? 'Chỉnh sửa thông tin địa điểm'
            : mode === 'add'
            ? 'Thêm địa điểm'
            : 'Đóng góp địa điểm'}
        </Typography>
      </div>
      <div>
        <TextField
          label="Tên"
          variant="outlined"
          name="name"
          onChange={handleChange}
          value={location.name}
          className={classes.fullField}
          required
          error={Boolean(errors?.name)}
          helperText={errors?.name}
        />
        <TextField
          label="Tên đầy đủ"
          variant="outlined"
          name="fullname"
          onChange={handleChange}
          value={location.fullname}
          className={classes.fullField}
          required
          error={Boolean(errors?.fullname)}
          helperText={errors?.fullname}
        />

        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%', marginRight: 20 }}>
            <TextField
              label="Vĩ độ"
              variant="outlined"
              name="lat"
              onChange={changePositionText}
              value={location.position.lat}
              className={classes.fullField}
              required
              error={Boolean(errors?.position?.lat)}
              helperText={errors?.position?.lat}
              InputProps={{
                readOnly: picker
              }}
            />
          </div>
          <div style={{ width: '50%', marginLeft: 20 }}>
            <TextField
              label="Kinh độ"
              variant="outlined"
              name="lng"
              onChange={changePositionText}
              value={location.position.lng}
              className={classes.fullField}
              required
              error={Boolean(errors?.position?.lng)}
              helperText={errors?.position?.lng}
              InputProps={{
                readOnly: picker
              }}
            />
          </div>
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={picker}
              onChange={handleChangePicker}
              name="picker-checker"
              color="primary"
            />
          }
          label="Chọn vị trí trên bản đồ"
        />
        {picker && (
          <div>
            <MapPicker
              position={{
                lat: parseFloat(location.position.lat),
                lng: parseFloat(location.position.lng)
              }}
              setPosition={changePosition}
              height={400}
            />
          </div>
        )}

        <Autocomplete
          id="set-province"
          options={provinces}
          loading={provinces.length === 0}
          value={provinceOpt}
          getOptionLabel={option => option.fullname}
          onChange={(e, value) => setProvinceOpt(value)}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Tỉnh"
              placeholder="Tỉnh thành"
              className={classes.fullField}
              required
            />
          )}
        />
        <AddImageHorizontal images={imgs} onChange={setImgs} maxImage={10} />
        <span style={{ color: 'red' }}>{errors?.images}</span>
        <TextField
          label="Thông tin"
          variant="outlined"
          name="information"
          multiline
          onChange={handleChange}
          value={location.information}
          className={classes.fullField}
          required
          error={Boolean(errors?.information)}
          helperText={errors?.information}
        />
      </div>
      <div className={classes.btnRight}>
        <Button
          onClick={onClickSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Xong'}
        </Button>
      </div>
    </>
  );
}
