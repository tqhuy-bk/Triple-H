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
      message: 'T??n kh??ng ???????c b??? tr???ng!'
    },
    {
      field: 'fullname',
      method: 'isEmpty',
      validWhen: false,
      message: 'T??n ?????y ????? kh??ng ???????c b??? tr???ng!'
    },
    {
      field: 'information',
      method: 'isEmpty',
      validWhen: false,
      message: 'M?? t??? kh??ng ???????c b??? tr???ng!'
    },
    {
      field: 'name',
      method: nameid,
      validWhen: true,
      message: 'T??n kh??ng h???p l???'
    }
  ];
  const rulesPosition = [
    {
      field: 'lat',
      method: isFloat,
      validWhen: true,
      message: 'V??? tr?? kh??ng h???p l???!'
    },
    {
      field: 'lng',
      method: isFloat,
      validWhen: true,
      message: 'V??? tr?? kh??ng h???p l???!'
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
        images: 'Ch??n th??m ???nh'
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
            dispatch(success({ message: 'C???p nh???t ?????a ??i???m th??nh c??ng' }));
          })
          .catch(err => {
            dispatch(error({ message: 'C?? l???i x???y ra' }));
          });
      } else if (mode === 'add') {
        await customAxios(token)
          .post(`/location/create`, data)
          .then(res => {
            dispatch(success({ message: 'Th??m ?????a ??i???m th??nh c??ng' }));
          })
          .catch(err => {
            dispatch(error({ message: 'C?? l???i x???y ra' }));
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
            ? 'Ch???nh s???a th??ng tin ?????a ??i???m'
            : mode === 'add'
            ? 'Th??m ?????a ??i???m'
            : '????ng g??p ?????a ??i???m'}
        </Typography>
      </div>
      <div>
        <TextField
          label="T??n"
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
          label="T??n ?????y ?????"
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
              label="V?? ?????"
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
              label="Kinh ?????"
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
          label="Ch???n v??? tr?? tr??n b???n ?????"
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
              label="T???nh"
              placeholder="T???nh th??nh"
              className={classes.fullField}
              required
            />
          )}
        />
        <AddImageHorizontal images={imgs} onChange={setImgs} maxImage={10} />
        <span style={{ color: 'red' }}>{errors?.images}</span>
        <TextField
          label="Th??ng tin"
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
