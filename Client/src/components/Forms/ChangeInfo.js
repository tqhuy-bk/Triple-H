import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Radio,
  CircularProgress,
  Backdrop,
  Modal,
  Fade,
  IconButton,
  Chip
} from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { RadioGroup, FormControlLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete } from '@material-ui/lab';

import Validator, {
  username,
  validatePhoneNumber
} from '../../utils/validator';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { profileStyles } from '../../style';
import { changeInfo } from '../../redux/callApi/authCall';
import UpdateAvatarBg from './UpdateAvatarBg';

const hobbiesOption = [
  'Biển',
  'Núi',
  'Lễ hội',
  'Lịch sử',
  'Văn hóa',
  'Thiên nhiên',
  'Con người'
];

export default function ChangeInfo(props) {
  const classes = profileStyles();

  const { user, token } = useSelector(state => state.auth);

  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [errorServer, setErrorServer] = useState(null);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const [context, setContext] = useState({
    username: user.username,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    birthday: user.birthday,
    gender: user?.gender || '',
    hobbies: user.hobbies?.split(',') || [],
    andress: user?.andress || ''
  });

  useEffect(() => {
    document.title = 'Thay đổi thông tin';
  }, []);

  const rules = [
    {
      field: 'username',
      method: username,
      validWhen: true,
      message: 'Tên tài khoản không hợp lệ!'
    },
    {
      field: 'fullname',
      method: 'isEmpty',
      validWhen: false,
      message: 'Tên đầy đủ không được bỏ trống!'
    },
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'Email không được bỏ trống!'
    },
    {
      field: 'email',
      method: 'isEmail',
      validWhen: true,
      message: 'Email không hợp lệ!'
    },
    {
      field: 'phone',
      method: validatePhoneNumber,
      validWhen: true,
      message: 'Số điện thoại không hợp lệ'
    }
  ];

  const validator = new Validator(rules);

  const handleInput = e => {
    setContext({
      ...context,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: null
    });
  };

  const handleChangeHobbies = (e, value) => {
    setContext({
      ...context,
      hobbies: value
    });
  };

  const handleChangeDate = value => {
    setContext({
      ...context,
      birthday: value
    });
    setErrors({
      birthday: null
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmit(true);
    setErrors(validator.validate(context));
  };

  const [showChangeBg, setShowChangeBg] = useState(false);

  const handleShowChangeBg = () => {
    setShowChangeBg(true);
  };
  const handleCloseChangeBg = () => {
    setShowChangeBg(false);
  };

  const [showChangeAvatar, setShowChangeAvatar] = useState(false);

  const handleShowChangeAvatar = () => {
    setShowChangeAvatar(true);
  };
  const handleCloseChangeAvatar = () => {
    setShowChangeAvatar(false);
  };

  useEffect(() => {
    if (submit) {
      setLoading(true);
      setErrorServer(null);
      if (Object.keys(errors).length === 0) {
        dispatch(
          changeInfo(
            token,
            {
              username: context.username,
              fullname: context.fullname,
              email: context.email,
              phone: context.phone,
              birthday: context.birthday,
              gender: context.gender,
              andress: context.andress,
              hobbies: context.hobbies.join(',')
            },
            () => {
              setLoading(false);
            },
            msg => {
              setLoading(false);
              setErrorServer(msg);
            }
          )
        );
      } else {
        setLoading(false);
      }
      setSubmit(false);
    }
  }, [submit, errors, context, dispatch, token]);

  const refBg = React.createRef();
  const refAv = React.createRef();

  const ChangeImageRef = React.forwardRef((props, ref) => (
    <UpdateAvatarBg innerRef={ref} {...props} />
  ));

  return (
    <div className={classes.change_info}>
      <div className={classes.change_background}>
        <div className={classes.change_background_upload}>
          <Button
            variant="contained"
            className={classes.buttonChangeImage}
            startIcon={<PhotoCamera />}
            onClick={handleShowChangeBg}
          >
            Thay đổi ảnh bìa
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={showChangeBg}
            onClose={handleCloseChangeBg}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={showChangeBg}>
              <ChangeImageRef
                ref={refBg}
                title={'Thay đổi ảnh bìa'}
                img={user?.background}
                handleClose={handleCloseChangeBg}
                type="background"
              />
            </Fade>
          </Modal>
        </div>
        <img className={classes.change_bg} src={user?.background} alt="cover" />
      </div>
      <div className={classes.change_wrapper}>
        <div className={classes.change_avatar}>
          <div className={classes.change_avatar_upload}>
            <IconButton onClick={handleShowChangeAvatar}>
              <PhotoCamera />
            </IconButton>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={showChangeAvatar}
              onClose={handleCloseChangeAvatar}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={showChangeAvatar}>
                <ChangeImageRef
                  ref={refAv}
                  title={'Thay đổi đại diện'}
                  img={user?.avatar}
                  handleClose={handleCloseChangeAvatar}
                  type="avatar"
                />
              </Fade>
            </Modal>
          </div>
          <img
            className={classes.change_avatar_img}
            src={user?.avatar}
            alt="avatar"
          />
        </div>
        <div className={classes.change_form}>
          <form onSubmit={handleSubmit}>
            <TextField
              value={context.username}
              label="Tên tài khoản"
              variant="outlined"
              name="username"
              className={classes.fullField}
              required
              error={Boolean(errors?.username)}
              helperText={errors?.username}
              onChange={handleInput}
            />
            <TextField
              value={context.fullname}
              label="Họ và Tên"
              variant="outlined"
              name="fullname"
              className={classes.fullField}
              required
              error={Boolean(errors?.fullname)}
              helperText={errors?.fullname}
              onChange={handleInput}
            />
            <TextField
              value={context.email}
              label="Email"
              variant="outlined"
              name="email"
              className={classes.fullField}
              required
              error={Boolean(errors?.email)}
              helperText={errors?.email}
              onChange={handleInput}
            />
            <TextField
              value={context.phone}
              label="Số điện thoại"
              variant="outlined"
              name="phone"
              className={classes.fullField}
              error={Boolean(errors?.phone)}
              helperText={errors?.phone}
              onChange={handleInput}
            />
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
                error={Boolean(errors?.birthday)}
                helperText={errors?.birthday}
                value={context.birthday}
                // className={classes.fullField}
              />
            </MuiPickersUtilsProvider>
            <Autocomplete
              multiple
              id="tags-filled"
              options={hobbiesOption}
              freeSolo
              value={context.hobbies}
              onChange={handleChangeHobbies}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    color="primary"
                  />
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
            />
            <div>
              <TextField
                label="Địa chỉ"
                variant="outlined"
                name="andress"
                onChange={handleInput}
                value={context.andress}
                className={classes.fullField}
              />
            </div>
            <RadioGroup
              id="gender"
              className={classes.fullField}
              row
              aria-label="gender"
              name="gender"
              value={context?.gender}
              onChange={handleInput}
            >
              <FormControlLabel
                value="male"
                control={<Radio color="primary" />}
                label="Nam"
              />
              <FormControlLabel
                value="female"
                control={<Radio color="primary" />}
                label="Nữ"
              />
              <FormControlLabel
                value="other"
                control={<Radio color="primary" />}
                label="Khác"
              />
            </RadioGroup>

            <span className={classes.error}>{errorServer}</span>
            <div className={classes.btnWrap}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.updateBtn}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size="25px" color="inherit" />
                ) : (
                  'Cập nhật'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
