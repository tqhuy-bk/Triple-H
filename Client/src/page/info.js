import {
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import ChangeImage from '../components/Forms/ChangeImage';
import DateFnsUtils from '@date-io/date-fns';
import { formStyles } from '../style';
import customAxios from '../utils/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImages } from '../utils/uploadImage';
import { useHistory, Redirect } from 'react-router-dom';
import { updateInfo } from '../redux/actions/authAction';

const hobbiesOption = [
  'Biển',
  'Núi',
  'Lễ hội',
  'Lịch sử',
  'Văn hóa',
  'Thiên nhiên',
  'Con người'
];

export default function InfoPage() {
  const auth = useSelector(state => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);
  const [bg, setBg] = useState(null);
  const [hobbies, setHobbies] = useState([]);
  const [birthday, setBirthday] = useState(null);
  const [andress, setAndress] = useState(null);
  const [gender, setGender] = useState('male');
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const classes = formStyles();

  const changeHobbies = (e, value) => {
    // console.log(value);
    setHobbies(value);
  };

  const handleChangeDate = e => {
    setBirthday(e);
    // console.log(e);
  };

  const handleChangeGender = e => {
    setGender(e.target.value);
  };

  const handlePass = () => {
    customAxios(auth?.token)
      .patch('/user/change_new', {})
      .then(res => {
        setState({
          loading: false
        });
        history.push('/');
      })
      .catch(err => {
        setState({
          loading: false,
          error: true
        });
      });
  };

  const handleSubmit = async () => {
    setState(state => ({
      ...state,
      loading: true
    }));
    let urlAvatar = [
        'https://res.cloudinary.com/huunguyencs/image/upload/v1648397898/default-avatar_np2xqa.webp'
      ],
      urlBg = [
        'https://res.cloudinary.com/huunguyencs/image/upload/v1648397899/MF1esV_rzs9vx.webp'
      ];
    if (avatar) urlAvatar = await uploadImages([avatar]);
    if (bg) urlBg = await uploadImages([bg]);

    let parseHobbies = hobbies.join(',');

    customAxios(auth?.token)
      .patch('/user/change_new', {
        avatar: urlAvatar[0],
        background: urlBg[0],
        hobbies: parseHobbies,
        birthday,
        andress
      })
      .then(res => {
        setState({
          loading: false
        });
        // dispatch(getUserInfo({ user: res.data.user }));
        dispatch(updateInfo({ user: res.data.user }));
        history.push('/');
      })
      .catch(() => {
        setState({
          loading: false,
          error: true
        });
      });
  };

  useEffect(() => {
    document.title = 'Welcome to Triple H';
  }, []);

  if (!auth?.user?.is_new) return <Redirect to={'/changeinfo'} />;

  return (
    <Container className={classes.infoWrapper}>
      <Typography
        variant="h5"
        style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}
      >
        Hãy thêm thông tin của bạn
      </Typography>
      <Grid
        container
        spacing={8}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Grid item md={4} sm={12}>
          <Typography variant="body1">Ảnh đại diện</Typography>
          <ChangeImage
            src={avatar}
            setSrc={setAvatar}
            textSize={16}
            className={classes.sizeAvatarInfo}
          />
        </Grid>
        <Grid item md={4} sm={12}>
          <Typography variant="body1">Ảnh bìa</Typography>
          <ChangeImage
            src={bg}
            setSrc={setBg}
            textSize={16}
            className={classes.sizeBgInfo}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={8}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Grid item md={4} sm={12} xs={12} style={{ marginTop: -40 }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="birthday"
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="birthday"
              label="Ngày sinh"
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              onChange={handleChangeDate}
              value={birthday}
              className={classes.fieldInput}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item md={4} sm={12} xs={12} style={{ marginTop: -40 }}>
          <FormControl component="fieldset" className={classes.fieldInput}>
            <FormLabel component="legend">Giới tính</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={gender}
              onChange={handleChangeGender}
              row
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Nam"
                labelPlacement="end"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Nữ"
                labelPlacement="end"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Khác"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <div>
        <TextField
          label="Địa chỉ"
          variant="outlined"
          name="andress"
          onChange={e => setAndress(e.target.value)}
          value={andress}
          className={classes.fullfieldInput}
        />
      </div>
      <Autocomplete
        multiple
        id="tags-filled"
        options={hobbiesOption}
        freeSolo
        value={hobbies}
        onChange={changeHobbies}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} color="primary" />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            variant="filled"
            label="Sở thích"
            placeholder="Favorites"
          />
        )}
        className={classes.fullfieldInput}
      />
      {state.error && <span>Có lỗi xảy ra!</span>}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 50
        }}
      >
        <div>
          <Button
            variant="contained"
            onClick={handlePass}
            disabled={state.loading}
          >
            Bỏ qua
          </Button>
        </div>
        {state.loading ? (
          <CircularProgress size={18} />
        ) : (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Xong
          </Button>
        )}
      </div>
    </Container>
  );
}
