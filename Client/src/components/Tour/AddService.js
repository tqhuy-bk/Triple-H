import {
  Button,
  Grid,
  InputBase,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapPicker from 'react-google-map-picker';
import * as tourAction from '../../redux/actions/createTourAction';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';
import { formStyles, tourdetailStyles } from '../../style';
// import { Link } from 'react-router-dom';
import { AddCircle, CameraAltOutlined } from '@material-ui/icons';
import customAxios from '../../utils/fetchData';
import { checkImage, uploadImages } from '../../utils/uploadImage';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

const KEY = process.env.REACT_APP_GOOGLE_MAP;

const filter = createFilterOptions();

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

function ServiceAddContributeForm(props) {
  const dispatch = useDispatch();
  const { location, auth } = useSelector(state => state);

  const { indexDate, cProvince, cName, handleClose, indexEvent } = props;
  const [service, setService] = useState({
    name: cName,
    description: '',
    address: ''
  });
  const [position, setPosition] = useState({
    lat: 15,
    lng: 108
  });
  const [loading, setLoading] = useState(location.loadingServices);
  const [province, setProvince] = useState(cProvince);
  const [images, setImages] = useState([]);

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

    console.log(service);
    console.log(province);
    console.log(position);
    customAxios(auth.token)
      .post('/service/contribute', {
        ...service,
        position: [position.lng, position.lat],
        province: province._id,
        province_name: province.fullname,
        images: imgUploads
      })
      .then(res => {
        const service = {
          service: res.data.service,
          indexDate: indexDate,
          indexEvent: indexEvent
        };
        dispatch(tourAction.addService(service));
        setLoading(false);
        handleClose();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleChange = e => {
    setService(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const classes = formStyles();

  return (
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
            value={service.name}
            onChange={handleChange}
            style={{marginBottom:10, width: "100%"}}
            variant="outlined"
            label="Tên"
            name="name"
            id="name"
          />
          <TextField
            value={service.address}
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
            value={service.description}
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
                    src={URL.createObjectURL(item)}
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
          startIcon={<AddCircle />}
          disabled={loading}
        >
          Thêm
        </Button>
      </div>
    </div>
  );
}

function ServiceItemAddForm(props) {
  const dispatch = useDispatch();

  const { location } = useSelector(state => state);

  const {
    indexDate,
    indexEvent,
    province,
    setProvince,
    setName,
    setContribute,
    handleClose
  } = props;
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(location.loadingServices);
  // const [province, setProvince] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (province?._id) {
      customAxios()
        .get(`/service/province/${province._id}`)
        .then(res => {
          setServices(res.data.services);
        });
    }
    setLoading(false);
  }, [province?._id]);

  const changeProvince = province => {
    setProvince(province);
  };

  const handleSubmit = () => {
    if (service) {
      if (service.isNew) {
        setName(service.name);
        setContribute(true);
        return;
      }
      dispatch(
        tourAction.addService({
          service: service,
          indexDate: indexDate,
          indexEvent: indexEvent
        })
      );
    }
    handleClose();
    // console.log(service);
  };

  // const changeCost = (e, value) => {
  //     setCost(parseInt(value));
  // }

  const classes = formStyles();

  return (
    <div style={{width: '500px'}}>
      <div className={classes.center}>
        <Typography variant="h6">Thêm dịch vụ</Typography>
      </div>
      <div className={classes.center}>
        <Autocomplete
          id="choose-province"
          freeSolo
          options={location.provinces}
          loading={location.loading}
          getOptionLabel={option => option?.fullname}
          className={classes.autocomplete}
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
      </div>
      <div className={classes.center}>
        <Autocomplete
          value={service}
          onChange={(e, value) => {
            if (typeof value === 'string') {
              setService({
                name: value,
                description: '',
                images: ['/default1.jpg'],
                province: province,
                isNew: true
              });
            } else if (value && value.inputValue) {
              setService({
                name: value.inputValue,
                description: '',
                images: ['/default1.jpg'],
                province: province,
                isNew: true
              });
            } else {
              setService(value);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                name: `Thêm ${params.inputValue}`
              });
            }
            return filtered;
          }}
          id="choose-province"
          freeSolo
          options={services}
          loading={loading}
          getOptionLabel={option => {
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }

            return option.name;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={option => option.name}
          className={classes.autocomplete}
          renderInput={params => (
            <TextField
              {...params}
              name="provinces"
              label="Chọn dịch vụ"
              variant="outlined"
            />
          )}
        />
      </div>

      {service && (
        <div className={classes.description}>
          <Typography variant="body2">{service.description}</Typography>
        </div>
      )}
      <div style={{ marginTop: 10 }} className={classes.center}>
        <Button
          className={classes.addDay}
          type="submit"
          onClick={handleSubmit}
          startIcon={<AddCircle />}
          disabled={!service}
        >
          Thêm
        </Button>
      </div>
    </div>
  );
}

export default function AddService(props) {
  const classes = tourdetailStyles();

  const [contribute, setContribute] = useState(false);
  const [province, setProvince] = useState(null);
  const [name, setName] = useState('');

  return (
    <Paper className={classes.paperContainer} style={{borderRadius: 15,  maxHeight: 800, overflow:'hidden', overflowY:'auto'}}>
      <div style={{ padding: 16, borderTop: '1px solid #ded9d9', borderRadius: 15 }}>
        {contribute ? (
          <ServiceAddContributeForm
            {...props}
            cProvince={province}
            cName={name}
          />
        ) : (
          <ServiceItemAddForm
            {...props}
            province={province}
            setProvince={setProvince}
            setName={setName}
            setContribute={setContribute}
          />
        )}
      </div>
    </Paper>
  );
}
