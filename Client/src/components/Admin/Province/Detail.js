import {
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  FormControlLabel,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';
import { ArrowBack, HighlightOff, Update } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { NotFound } from '../../../page/404';
import {
  error as errorAlert,
  success
} from '../../../redux/actions/alertAction';
import { adminStyles } from '../../../style';
import customAxios from '../../../utils/fetchData';
import { checkImage, uploadImages } from '../../../utils/uploadImage';
import Validator, { nameid } from '../../../utils/validator';
import Loading from '../../Loading';
import MapPicker from '../../Map/MapPicker';

export default function DetailProvinceAdmin() {
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const classes = adminStyles();

  const { subpage } = useParams();
  const [province, setProvince] = useState(null);
  const [state, setState] = useState({
    loading: false,
    error: false
  });
  const [notFound, setNotFound] = useState(false);
  const [tempFood, setTempFood] = useState('');
  const [errors, setErrors] = useState({});
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [picker, setPicker] = useState(false);

  const handleChangePicker = e => {
    setPicker(state => !state);
  };

  const changePositionText = e => {
    setProvince(province => ({
      ...province,
      position: {
        ...province.position,
        [e.target.name]: e.target.value
      }
    }));
  };

  const getProvince = async id => {
    if (id) {
      setState({
        loading: true,
        error: false
      });
      setNotFound(false);
      await customAxios()
        .get(`/province/${id}`)
        .then(res => {
          setProvince(res.data.province);
          setSrc(res.data.province.image);
          setState({
            loading: false,
            error: false
          });
        })
        .catch(err => {
          if (err.response && err.response.status === 404) setNotFound(true);
          else
            setState({
              loading: false,
              error: true
            });
        });
    }
  };

  useEffect(() => {
    if (subpage) {
      getProvince(subpage);
    }
  }, [subpage]);

  useEffect(() => {
    document.title = 'Ch???nh s???a th??ng tin t???nh';
  }, []);

  const handleChange = e => {
    setProvince(province => ({
      ...province,
      [e.target.name]: e.target.value
    }));
    setErrors(state => ({
      ...state,
      [e.target.name]: null
    }));
  };

  const changePosition = position => {
    setProvince(province => ({
      ...province,
      position: position
    }));
  };

  const handleAddFood = e => {
    e.preventDefault();
    setTempFood('');
    setProvince(province => ({
      ...province,
      detail: {
        ...province.detail,
        food: [...province.detail.food, tempFood]
      }
    }));
  };

  const handleRemoveFood = idx => {
    setProvince(province => ({
      ...province,
      detail: {
        ...province.detail,
        food: [
          ...province.detail.food.slice(0, idx),
          ...province.detail.food.slice(idx + 1)
        ]
      }
    }));
  };

  const handleChangeOverview = e => {
    setProvince(province => ({
      ...province,
      detail: {
        ...province.detail,
        overview: {
          ...province.detail.overview,
          [e.target.name]: e.target.value
        }
      }
    }));
  };

  const handleChangeVehicle = e => {
    setProvince(province => ({
      ...province,
      detail: {
        ...province.detail,
        vehicle: {
          ...province.detail.vehicle,
          [e.target.name]: e.target.value
        }
      }
    }));
  };

  const changeImage = e => {
    if (e.target.files) {
      setErrors(state => ({
        ...state,
        image: null
      }));
      const image = e.target.files[0];
      const check = checkImage(image);
      if (check === '') setSrc(image);
      else {
        setErrors(state => ({
          ...state,
          image: check
        }));
      }
    }
  };

  const removeImage = e => {
    setSrc(province?.image);
  };

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
      message: 'T??n kh??ng ???????c b??? tr???ng!'
    },
    {
      field: 'information',
      method: 'isEmpty',
      validWhen: false,
      message: 'T??n kh??ng ???????c b??? tr???ng!'
    },
    {
      field: 'name',
      method: nameid,
      validWhen: true,
      message: 'T??n kh??ng h???p l???'
    }
  ];
  const validator = new Validator(rules);

  const handleUpdate = async () => {
    setLoading(true);
    const err = validator.validate(province);

    setErrors(err);

    const image = await uploadImages([src]);

    if (Object.keys(err).length === 0) {
      await customAxios(token)
        .patch(`/province/${province._id}`, {
          ...province,
          image: image[0]
        })
        .then(res => {
          setProvince(res.data.province);
          // setProvince({
          //   ...res.data.province,
          //   position: {
          //     lng: res.data.province.position[0],
          //     lat: res.data.province.position[1]
          //   }
          // });
          setSrc(res.data.province.image);
          setLoading(false);
          dispatch(success({ message: 'C???p nh???t th??nh c??ng!' }));
        })
        .catch(err => {
          setLoading(false);
          dispatch(errorAlert({ message: 'C?? l???i x???y ra!' }));
        });
    }
  };

  return (
    <Paper
      style={{
        marginTop: 120,
        marginInline: 50,
        marginBottom: 30,
        padding: 30
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <IconButton component={Link} to={`/admin/province`} title="Quay l???i">
            <ArrowBack />
          </IconButton>
        </div>
        <Button
          target={'_blank'}
          component={Link}
          to={`/province/${subpage}`}
          style={{ margin: 20, textTransform: 'none' }}
          color="primary"
          variant="contained"
        >
          Xem trang chi ti???t
        </Button>
      </div>
      {notFound ? (
        <NotFound />
      ) : state.loading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}
        >
          <Loading />
        </div>
      ) : state.error ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}
        >
          C?? l???i x???y ra
        </div>
      ) : (
        province && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 30
              }}
            >
              <Typography variant="h4">Ch???nh s???a th??ng tin t???nh</Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%', marginRight: 20 }}>
                <TextField
                  label="T??n"
                  variant="outlined"
                  name="name"
                  onChange={handleChange}
                  value={province.name}
                  className={classes.fullField}
                  required
                  error={Boolean(errors?.name)}
                  helperText={errors?.name}
                />
              </div>
              <div style={{ width: '50%', marginLeft: 20 }}>
                <TextField
                  label="T??n ?????y ?????"
                  variant="outlined"
                  name="fullname"
                  onChange={handleChange}
                  value={province.fullname}
                  className={classes.fullField}
                  required
                  error={Boolean(errors?.fullname)}
                  helperText={errors?.fullname}
                />
              </div>
            </div>

            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%', marginRight: 20 }}>
                <TextField
                  label="V?? ?????"
                  variant="outlined"
                  name="lat"
                  handleChange={changePositionText}
                  value={province.position.lat}
                  className={classes.fullField}
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
                  handleChange={changePositionText}
                  value={province.position.lng}
                  className={classes.fullField}
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
              <div style={{ marginBlock: 10, marginInline: 20 }}>
                <MapPicker
                  position={{
                    lat: parseFloat(province.position.lat),
                    lng: parseFloat(province.position.lng)
                  }}
                  setPosition={changePosition}
                  height={400}
                />
              </div>
            )}

            <TextField
              label="Th??ng tin"
              variant="outlined"
              name="information"
              multiline
              onChange={handleChange}
              value={province.information}
              className={classes.fullField}
              required
              error={Boolean(errors?.information)}
              helperText={errors?.information}
            />

            <div className={classes.imageItem}>
              <div style={{ position: 'relative' }}>
                <img
                  src={typeof src === 'string' ? src : URL.createObjectURL(src)}
                  alt="Can not loading img"
                  className={classes.item}
                  // width="100%"
                  // height={300}
                />
                {src !== province.image && (
                  <IconButton
                    title="Xo?? ???nh"
                    onClick={removeImage}
                    className={classes.removeButton}
                  >
                    <HighlightOff />
                  </IconButton>
                )}
              </div>
            </div>
            <div className={classes.btnCover}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="input-image"
                name="images"
                multiple
                type="file"
                onChange={changeImage}
              />
              <label htmlFor="input-image">
                <Button
                  variant="contained"
                  component="span"
                  className={classes.btnChangeImage}
                >
                  Thay ?????i ???nh
                </Button>
              </label>
            </div>

            <div
              style={{ display: 'flex', justifyContent: 'center', margin: 20 }}
            >
              <Typography variant="h5">Chi ti???t:</Typography>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6">T???ng quan</Typography>
              <TextField
                label="V??n h??a"
                variant="outlined"
                name="cultural"
                multiline
                onChange={handleChangeOverview}
                value={province.detail.overview.cultural}
                className={classes.fullField}
              />
              <TextField
                label="?????a l??"
                variant="outlined"
                name="geography"
                multiline
                onChange={handleChangeOverview}
                value={province.detail.overview.geography}
                className={classes.fullField}
              />
              <TextField
                label="Th???i ti???t"
                variant="outlined"
                name="weather"
                multiline
                onChange={handleChangeOverview}
                value={province.detail.overview.weather}
                className={classes.fullField}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6">Ph????ng ti???n</Typography>
              <TextField
                label="S??n bay"
                variant="outlined"
                name="airport"
                multiline
                onChange={handleChangeVehicle}
                value={province.detail.vehicle.airport}
                className={classes.fullField}
              />
              <TextField
                label="Ph????ng ti???n giao th??ng"
                variant="outlined"
                name="traffic"
                multiline
                onChange={handleChangeVehicle}
                value={province.detail.vehicle.traffic}
                className={classes.fullField}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6">???m th???c</Typography>
              {province.detail.food.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => handleRemoveFood(index)}
                  style={{ margin: 5 }}
                />
              ))}
              <form onSubmit={handleAddFood} className={classes.formAdd}>
                <TextField
                  label={'Th??m ???m th???c'}
                  variant="outlined"
                  name="menu"
                  className={classes.fullField}
                  onChange={e => setTempFood(e.target.value)}
                  value={tempFood}
                />
                <Button
                  type="submit"
                  disabled={!tempFood}
                  variant="contained"
                  color="primary"
                >
                  Th??m
                </Button>
              </form>
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'right', margin: 30 }}
            >
              <Button
                startIcon={<Update />}
                onClick={handleUpdate}
                color="primary"
                variant="contained"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  'C???p nh???t'
                )}
              </Button>
            </div>
          </>
        )
      )}
    </Paper>
  );
}
