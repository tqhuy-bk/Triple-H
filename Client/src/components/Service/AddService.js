import {
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addServiceStyles } from '../../style';
import AddImageHorizontal from '../Input/AddImageHorizontal';
import MapPicker from '../Map/MapPicker';

function Item(props) {
  const { item, handleRemove } = props;

  const classes = addServiceStyles();

  return (
    <div className={classes.itemContainer}>
      <Typography>{item}</Typography>
      <IconButton size="small" onClick={() => handleRemove()}>
        <Close />
      </IconButton>
    </div>
  );
}

export function BasicServiceInfo(props) {
  const classes = addServiceStyles();

  const { location } = useSelector(state => state);
  const [tempDiscount, setTempDiscount] = useState('');

  const { images, setImages, context, setContext } = props;

  const handleAddDiscount = e => {
    e.preventDefault();
    setTempDiscount('');
    setContext({
      ...context,
      discount: [...context.discount, tempDiscount]
    });
  };

  const handleRemoveDiscount = idx => {
    setContext({
      ...context,
      discount: [
        ...context.discount.slice(0, idx),
        ...context.discount.slice(idx + 1)
      ]
    });
  };

  const handleChange = e => {
    setContext({
      ...context,
      [e.target.name]: e.target.value
    });
  };

  const changeProvince = province => {
    console.log(province);
    setContext({
      ...context,
      province: province
    });
  };

  const setPosition = position => {
    // console.log(position)
    setContext({
      ...context,
      position: position
    });
  };

  // const changePosition = (position) => {
  //     setContext(state => ({
  //         ...state,
  //         position: {
  //             ...state.position,
  //             lat: position.lat,
  //             lon: position.lng
  //         }
  //     }))
  // }

  return (
    <div className={classes.formContainer}>
      <TextField
        label="T??n d???ch v???"
        variant="outlined"
        name="name"
        required
        className={classes.fullField}
        onChange={handleChange}
        value={context.name}
      />
      <AddImageHorizontal
        images={images}
        onChange={setImages}
        className={classes.fullField}
        maxImage={10}
      />
      <label htmlFor="type">Lo???i d???ch v??? *</label>
      <RadioGroup
        id="type"
        row
        aria-label="service-type"
        name="type"
        className={classes.fullField}
        onChange={handleChange}
        value={context.type}
      >
        <FormControlLabel
          value="nhahang"
          control={<Radio color="primary" />}
          label="Nh?? h??ng"
        />
        <FormControlLabel
          value="khachsan"
          control={<Radio color="primary" />}
          label="Kh??ch s???n"
        />
        <FormControlLabel
          value="dichuyen"
          control={<Radio color="primary" />}
          label="Di chuy???n"
        />
        <FormControlLabel
          value="khac"
          control={<Radio color="primary" />}
          label="Kh??c"
        />
      </RadioGroup>
      <TextField
        label="M?? t??? d???ch v???"
        variant="outlined"
        name="description"
        multiline
        className={classes.fullField}
        onChange={handleChange}
        value={context.description}
      />
      <TextField
        label="Li??n h???"
        variant="outlined"
        name="contact"
        multiline
        className={classes.fullField}
        onChange={handleChange}
        value={context.contact}
      />
      <TextField
        label="Kho???ng chi ph??"
        variant="outlined"
        name="cost"
        className={classes.fullField}
        onChange={handleChange}
        value={context.cost}
      />
      <TextField
        label="?????a ch???"
        variant="outlined"
        name="andress"
        className={classes.fullField}
        onChange={handleChange}
        value={context.andress}
      />
      <div style={{ height: 500 }}>
        <MapPicker setPosition={setPosition} position={context.position} />
      </div>
      <Autocomplete
        id="province"
        options={location.provinces}
        loading={location.loading}
        getOptionLabel={option => option?.fullname}
        getOptionSelected={(opt, value) => opt?._id === value?._id}
        renderInput={params => (
          <TextField
            {...params}
            name="province"
            label="Ch???n t???nh th??nh"
            variant="outlined"
          />
        )}
        className={classes.fullField}
        onChange={(e, value) => changeProvince(value)}
        value={context.province}
      />
      <Grid container>
        {context.discount.map((item, index) => (
          <Grid item md={6} sm={12} xs={12} key={index}>
            <Item
              item={item}
              handleRemove={() => handleRemoveDiscount(index)}
            />
          </Grid>
        ))}
      </Grid>
      <form onSubmit={handleAddDiscount} className={classes.formAdd}>
        <TextField
          label="C??c ??u ????i"
          variant="outlined"
          name="discount"
          className={classes.fullField}
          onChange={e => setTempDiscount(e.target.value)}
          value={tempDiscount}
        />
        <Button
          type="submit"
          disabled={!tempDiscount}
          variant="contained"
          color="primary"
        >
          Th??m
        </Button>
      </form>
    </div>
  );
}

export function DetailServiceInfo(props) {
  const classes = addServiceStyles();

  const { detail, setDetail, context } = props;
  const type = context.type;
  const [tempMenu, setTempMenu] = useState('');
  const [tempPickup, setTempPickup] = useState('');
  const [tempStop, setTempStop] = useState('');

  const handleChange = (e, value) => {
    if (!value) value = e.target.value;
    setDetail({
      ...detail,
      [e.target.name]: value
    });
  };

  const handleAddPickup = e => {
    e.preventDefault();
    setTempPickup('');
    setDetail({
      ...detail,
      pickup: [...detail.pickup, tempPickup]
    });
  };

  const handleAddStop = e => {
    e.preventDefault();
    setTempStop('');
    setDetail({
      ...detail,
      stop: [...detail.stop, tempStop]
    });
  };

  const handleAddMenu = e => {
    e.preventDefault();
    setTempMenu('');
    setDetail({
      ...detail,
      menu: [...detail.menu, tempMenu]
    });
  };

  const handleRemovePickup = idx => {
    setDetail({
      ...detail,
      pickup: [...detail.pickup.slice(0, idx), ...detail.pickup.slice(idx + 1)]
    });
  };

  const handleRemoveStop = idx => {
    setDetail({
      ...detail,
      stop: [...detail.stop.slice(0, idx), ...detail.stop.slice(idx + 1)]
    });
  };

  const handleRemoveMenu = idx => {
    setDetail({
      ...detail,
      menu: [...detail.menu.slice(0, idx), ...detail.menu.slice(idx + 1)]
    });
  };

  const MORE_INFO = [
    { key: 0, label: 'Wifi' },
    { key: 1, label: '??i???u h??a' },
    { key: 2, label: 'Visa/ Master card' },
    { key: 3, label: 'Trang tr?? s??? ki???n' },
    { key: 4, label: 'Th?? nu??i' },
    { key: 5, label: 'H??a ????n VAT' },
    { key: 6, label: 'Ph??ng ri??ng' },
    { key: 7, label: 'Gh??? tr??? em' },
    { key: 8, label: 'Ch??? ch??i tr??? em' },
    { key: 9, label: 'M??y chi???u' }
  ];

  return (
    <div className={classes.formContainer}>
      <TextField
        label="Ph?? h???p"
        variant="outlined"
        name="conform"
        className={classes.fullField}
        multiline
        onChange={handleChange}
        value={detail.conform}
      />
      <TextField
        label="?????c tr??ng"
        variant="outlined"
        name="featured"
        className={classes.fullField}
        multiline
        onChange={handleChange}
        value={detail.featured}
      />
      <Grid container>
        {detail.menu.map((item, index) => (
          <Grid item md={6} sm={12} xs={12} key={index}>
            <Item item={item} handleRemove={() => handleRemoveMenu(index)} />
          </Grid>
        ))}
      </Grid>
      <form onSubmit={handleAddMenu} className={classes.formAdd}>
        <TextField
          label={
            type === 'nhahang'
              ? 'Menu'
              : type === 'khachsan'
              ? 'C??c lo???i ph??ng'
              : 'C??c lo???i d???ch v???'
          }
          variant="outlined"
          name="menu"
          className={classes.fullField}
          onChange={e => setTempMenu(e.target.value)}
          value={tempMenu}
        />
        <Button
          type="submit"
          disabled={!tempMenu}
          variant="contained"
          color="primary"
        >
          Th??m
        </Button>
      </form>
      <Autocomplete
        multiple
        className={classes.fullField}
        id="more-info"
        name="more_info"
        options={MORE_INFO.map(option => option.label)}
        onChange={(_, value) =>
          handleChange({ target: { name: 'more_info' } }, value)
        }
        filterSelectedOptions
        renderInput={params => (
          <TextField {...params} variant="outlined" label="Th??ng tin th??m" />
        )}
      />
      <TextField
        label="Ch??? ????? xe"
        variant="outlined"
        name="park"
        className={classes.fullField}
        multiline
        onChange={handleChange}
        value={detail.park}
        disabled={type && type === 'dichuyen'}
      />
      <TextField
        label="Kh??ng gian"
        variant="outlined"
        name="space"
        className={classes.fullField}
        multiline
        onChange={handleChange}
        value={detail.space}
        disabled={type && type === 'dichuyen'}
      />
      <TextField
        label="Ti???n nghi"
        variant="outlined"
        name="convenient"
        className={classes.fullField}
        multiline
        onChange={handleChange}
        value={detail.convenient}
      />
      <TextField
        label="C??ch ?????t tr?????c"
        variant="outlined"
        name="book"
        className={classes.fullField}
        multiline
        onChange={handleChange}
        value={detail.book}
      />
      <TextField
        label="L??u ??"
        variant="outlined"
        name="note"
        className={classes.fullField}
        multiline
        onChange={handleChange}
        value={detail.note}
      />
      <TextField
        label="Th???i gian m??? c???a"
        variant="outlined"
        name="time"
        className={classes.fullField}
        multiline
        onChange={handleChange}
        value={detail.time}
      />
      <Grid container>
        {detail.pickup.map((item, index) => (
          <Grid item md={6} sm={12} xs={12} key={index}>
            <Item item={item} handleRemove={() => handleRemovePickup(index)} />
          </Grid>
        ))}
      </Grid>
      <form onSubmit={handleAddPickup} className={classes.formAdd}>
        <TextField
          label="??i???m ????n kh??ch"
          variant="outlined"
          name="pickup"
          className={classes.fullField}
          onChange={e => setTempPickup(e.target.value)}
          disabled={type && type !== 'dichuyen'}
          value={tempPickup}
        />
        <Button
          disabled={!tempPickup}
          type="submit"
          variant="contained"
          color="primary"
        >
          Th??m
        </Button>
      </form>
      <Grid container>
        {detail.stop.map((item, index) => (
          <Grid item md={6} sm={12} xs={12} key={index}>
            <Item item={item} handleRemove={() => handleRemoveStop(index)} />
          </Grid>
        ))}
      </Grid>

      <form onSubmit={handleAddStop} className={classes.formAdd}>
        <TextField
          label="??i???m tr??? kh??ch"
          variant="outlined"
          name="stop"
          className={classes.fullField}
          onChange={e => setTempStop(e.target.value)}
          disabled={type && type !== 'dichuyen'}
          value={tempStop}
        />
        <Button
          type="submit"
          disabled={!tempStop}
          variant="contained"
          color="primary"
        >
          Th??m
        </Button>
      </form>
    </div>
  );
}
