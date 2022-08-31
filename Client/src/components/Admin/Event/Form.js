import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete } from '@material-ui/lab';

import { adminStyles } from '../../../style';
import { getProvinces } from '../../../redux/callApi/locationCall';
import AddImageHorizontal from '../../Input/AddImageHorizontal';
import Validator, { nameid } from '../../../utils/validator';
import { uploadImages } from '../../../utils/uploadImage';
import customAxios from '../../../utils/fetchData';
import { error, success } from '../../../redux/actions/alertAction';

export default function FormAddEvent(props) {
  const classes = adminStyles();

  const { event, setEvent, mode } = props;

  const { provinces } = useSelector(state => state.location);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imgs, setImgs] = useState(event?.images || []);
  const [provinceOpt, setProvinceOpt] = useState(null);

  useEffect(() => {
    if (provinces.length === 0) {
      dispatch(getProvinces());
    }
  }, [provinces.length, dispatch]);

  useEffect(() => {
    if (event.provinceId && provinces.length > 0) {
      let temp = provinces.find(item => item._id === event.provinceId._id);
      setProvinceOpt(temp);
    }
  }, [event.provinceId, provinces]);

  const handleChange = e => {
    setEvent(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const isInt = value => {
    return (
      !isNaN(value) &&
      (function (x) {
        return (x | 0) === x;
      })(parseFloat(value))
    );
  };

  const rules = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Tên không được bỏ trống'
    },
    {
      field: 'fullname',
      method: 'isEmpty',
      validWhen: false,
      message: 'Tên đầy đủ không được bỏ trống!'
    },
    {
      field: 'description',
      method: 'isEmpty',
      validWhen: false,
      message: 'Mô tả không được bỏ trống!'
    },
    {
      field: 'name',
      method: nameid,
      validWhen: true,
      message: 'Tên không hợp lệ'
    },
    {
      field: 'time',
      method: isInt,
      validWhen: true,
      message: 'Thời gian không hợp lệ'
    }
  ];

  const validator = new Validator(rules);

  const onClickSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const err = validator.validate(event);

    setErrors(err);

    if (imgs.length === 0) {
      setErrors(err => ({
        ...err,
        images: 'Chèn thêm ảnh'
      }));
      return;
    }

    const imageUpload = await uploadImages(imgs);

    if (Object.keys(err).length === 0) {
      if (mode === 'edit') {
        await customAxios(token)
          .patch(`/event/${event._id}`, {
            ...event,
            images: imageUpload,
            provinceId: provinceOpt._id
          })
          .then(res => {
            setEvent(res.data.event);

            dispatch(success({ message: 'Cập nhật sự kiện thành công' }));
          })
          .catch(err => {
            dispatch(error({ message: 'Có lỗi xảy ra' }));
          });
      } else if (mode === 'add') {
        await customAxios(token)
          .post(`/event/create`, {
            ...event,
            provinceId: provinceOpt._id
          })
          .then(res => {
            dispatch(success({ message: 'Thêm sự kiện thành công' }));
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
            ? 'Chỉnh sửa thông tin sự kiện'
            : mode === 'add'
            ? 'Thêm sự kiện'
            : 'Đóng góp sự kiện'}
        </Typography>
      </div>
      <div>
        <TextField
          label="Tên"
          variant="outlined"
          name="name"
          onChange={handleChange}
          value={event.name}
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
          value={event.fullname}
          className={classes.fullField}
          required
          error={Boolean(errors?.fullname)}
          helperText={errors?.fullname}
        />
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
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%', marginRight: 20 }}>
            <TextField
              label="Thời gian"
              variant="outlined"
              name="time"
              onChange={handleChange}
              value={event.time}
              className={classes.fullField}
              required
              error={Boolean(errors?.time)}
              helperText={errors?.time}
            />
          </div>
          <FormControl
            variant="outlined"
            style={{ width: '50%', marginLeft: 20 }}
            className={classes.fullField}
          >
            <InputLabel id="calendar-type-select-label">Loại lịch</InputLabel>
            <Select
              labelId="calendar-type-select-label"
              id="calendar-type-select"
              value={event.calendarType}
              onChange={handleChange}
              label="Loại lịch"
              name="calendarType"
            >
              <MenuItem value={false}>Âm lịch</MenuItem>
              <MenuItem value={true}>Dương lịch</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TextField
          label="Mô tả thời gian"
          variant="outlined"
          name="timedes"
          onChange={handleChange}
          value={event.timedes}
          className={classes.fullField}
          required
          error={Boolean(errors?.timedes)}
          helperText={errors?.timedes}
        />
        <TextField
          label="Thông tin"
          variant="outlined"
          name="description"
          multiline
          onChange={handleChange}
          value={event.description}
          className={classes.fullField}
          required
          error={Boolean(errors?.description)}
          helperText={errors?.description}
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
