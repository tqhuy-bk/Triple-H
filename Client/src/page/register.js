import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { Link, useHistory } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';
import { CircularProgress, Grid, Typography } from '@material-ui/core';

import { register } from '../redux/callApi/authCall';
import Validator, {
  nonSpace,
  username,
  validatePassword,
  validatePhoneNumber
} from '../utils/validator';

import { authStyles } from '../style';

export default function Register(props) {
  const classes = authStyles();

  const history = useHistory();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorServer, setErrorServer] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const [state, setState] = useState({
    username: '',
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const confirmPass = (value, field, sta) => value === sta[field];

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
      field: 'password',
      method: 'isEmpty',
      validWhen: false,
      message: 'Mật khẩu không được bỏ trống!'
    },
    {
      field: 'email',
      method: 'isEmail',
      validWhen: true,
      message: 'Email không hợp lệ!'
    },
    {
      field: 'password',
      method: nonSpace,
      validWhen: true,
      message: 'Mật khẩu không được chứa khoảng cách'
    },
    {
      field: 'password',
      method: validatePassword,
      validWhen: true,
      message:
        'Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một chữ số và có độ dài lớn hơn 6'
    },
    {
      field: 'confirmPassword',
      method: confirmPass,
      args: ['password'],
      validWhen: true,
      message: 'Xác nhận mật khẩu không khớp'
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
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: null
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmit(true);
    setErrors(validator.validate(state));
  };

  useEffect(() => {
    if (submit) {
      setLoading(true);
      setErrorServer(null);
      if (Object.keys(errors).length === 0) {
        // call api to register
        dispatch(
          register(
            {
              username: state.username,
              fullname: state.fullname,
              password: state.password.trim(),
              email: state.email,
              phone: state.phone
            },
            () => {
              setLoading(false);
              history.push('/login');
            },
            err => {
              setLoading(false);
              setErrorServer(err);
            }
          )
        );
      } else {
        setLoading(false);
      }
      setSubmit(false);
    }
  }, [errors, state, submit, dispatch, history]);

  useEffect(() => {
    document.title = 'Đăng kí';
  }, []);

  //Show password

  const handleClickShowPassword = () => {
    setShowPassword(state => !state);
  };

  const handleClickShowConfirm = () => {
    setShowConfirm(state => !state);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item md={6} className={classes.imageContainer}>
        <div className={classes.imageCover} />
      </Grid>
      <Grid item md={6} sm={12} xs={12} className={classes.formLogin}>
        {/* <h3 className="form-login-title">Triple H</h3> */}
        <div className={classes.center} style={{ marginBottom: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/Logo.png" alt="Logo" height={80} />
            <Typography
              variant="h4"
              style={{
                fontFamily: 'Leckerli One',
                color: 'black',
                marginLeft: 10
              }}
            >
              Triple H
            </Typography>
          </div>
        </div>
        <div className={classes.center} style={{ marginBottom: 20 }}>
          <Typography variant="h4">Đăng ký tài khoản</Typography>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.center}>
            <TextField
              autoComplete=""
              label="Username"
              variant="outlined"
              id="username"
              name="username"
              required
              className={classes.formInput}
              error={Boolean(errors?.username)}
              onChange={handleInput}
              helperText={errors?.username}
            />
          </div>
          <div className={classes.center}>
            <TextField
              autoComplete=""
              label="Tên đầy đủ"
              id="fullname"
              variant="outlined"
              name="fullname"
              required
              className={classes.formInput}
              error={Boolean(errors?.fullname)}
              onChange={handleInput}
              helperText={errors?.fullname}
            />
          </div>
          <div className={classes.center}>
            <TextField
              autoComplete=""
              label="Email"
              variant="outlined"
              id="email"
              name="email"
              required
              className={classes.formInput}
              error={Boolean(errors?.email)}
              onChange={handleInput}
              helperText={errors?.email}
            />
          </div>
          <div className={classes.center}>
            <TextField
              autoComplete=""
              label="Số điện thoại"
              variant="outlined"
              name="phone"
              className={classes.formInput}
              error={Boolean(errors?.phone)}
              helperText={errors?.phone}
              onChange={handleInput}
            />
          </div>
          <div className={classes.center}>
            <TextField
              autoComplete=""
              label="Mật khẩu (6+ kí tự)"
              variant="outlined"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              className={classes.formInput}
              error={Boolean(errors?.password)}
              helperText={errors?.password}
              onChange={handleInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div className={classes.center}>
            <TextField
              autoComplete=""
              label="Xác nhận mật khẩu"
              variant="outlined"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              required
              className={classes.formInput}
              error={Boolean(errors?.confirmPassword)}
              helperText={errors?.confirmPassword}
              onChange={handleInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirm}
                      edge="end"
                      size="small"
                    >
                      {showConfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
          {/* <div style={{
                        display: 'flex',
                        textAlign: 'center',
                    }}
                    >
                        <Checkbox
                            style={{
                                display: 'inline-block',
                            }}
                            name="agree"
                            // checked
                            // onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <p style={{
                            opacity: 0.5,
                            textDecoration: 'underline',
                            // color: '#f37435c4',
                            display: 'inline-block',
                        }}>
                            Tôi đồng ý với các quy định của GoGo
                        </p>
                    </div> */}

          <div className={classes.center} style={{ marginTop: 20 }}>
            <Typography>
              Bạn đã có tài khoản?{' '}
              <Link className={classes.registerText} to="/login">
                Đăng nhập
              </Link>
            </Typography>
          </div>

          <span className={classes.error}>{errorServer}</span>

          <div className={classes.loginGroup}>
            <Button
              variant="contained"
              // color="primary"
              type="submit"
              className={classes.loginButton}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size="25px" color="inherit" />
              ) : (
                'Đăng ký'
              )}
            </Button>
          </div>
        </form>
      </Grid>
    </Grid>
  );
}
