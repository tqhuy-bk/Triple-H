import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgress,
  Grid,
  Typography,
  Modal,
  Fade,
  Backdrop,
  IconButton
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Close } from '@material-ui/icons';
import Validator, { isEmpty } from '../utils/validator';
import { login, forgotPassword } from '../redux/callApi/authCall';
import { authStyles } from '../style';

export default function Login(props) {
  const classes = authStyles();

  const history = useHistory();

  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  const [context, setContext] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorServer, setErrorServer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const rules = [
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
      field: 'password',
      method: isEmpty,
      validWhen: false,
      message: 'Mật khẩu không được bỏ trống!'
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

  const handleSubmit = e => {
    e.preventDefault();
    setSubmit(true);
    setErrors(validator.validate(context));
  };

  useEffect(() => {
    if (!auth.token) return;
    if (auth.user.is_new) {
      history.push('/info');
      return;
    }
    history.push('/');
  }, [auth, history]);

  useEffect(() => {
    document.title = 'Đăng nhập';
  }, []);

  useEffect(() => {
    if (submit) {
      setLoading(true);
      setErrorServer(null);
      if (Object.keys(errors).length === 0) {
        dispatch(
          login(
            {
              email: context.email,
              password: context.password.trim()
            },
            () => {
              setLoading(false);
            },
            err => {
              setLoading(false);
              setErrorServer(err.message);
            }
          )
        );
      } else {
        setLoading(false);
      }
      setSubmit(false);
    }
  }, [errors, submit, dispatch, context]);

  const [loadingForgot, setLoadingForgot] = useState(false);
  const [emailForgot, setEmailForgot] = useState('');
  const handleInputEmail = e => {
    setEmailForgot(e.target.value);
  };
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
  };
  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
  };
  const handleSubmitEmailForgot = e => {
    e.preventDefault();
    setLoadingForgot(true);
    dispatch(
      forgotPassword(
        emailForgot,
        () => {
          setLoadingForgot(false);
          setShowForgotPassword(false);
        },
        err => {
          setLoadingForgot(false);
        }
      )
    );
    setEmailForgot('');
  };

  const handleClickShowPassword = () => {
    setShowPassword(state => !state);
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
          <Typography variant="h4">Đăng nhập</Typography>
        </div>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.center}>
            <TextField
              autoComplete=""
              label="Email"
              variant="outlined"
              name="email"
              id="email"
              type="email"
              className={classes.formInput}
              required
              error={Boolean(errors?.email)}
              helperText={errors?.email}
              value={context.email}
              onChange={handleInput}
            />
          </div>
          <div className={classes.center}>
            <TextField
              autoComplete=""
              label="Mật khẩu"
              variant="outlined"
              required
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              error={Boolean(errors?.password)}
              helperText={errors?.password}
              className={classes.formInput}
              value={context.password}
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
          <p
            className={classes.forgotPassword}
            onClick={handleShowForgotPassword}
          >
            Quên mật khẩu?
          </p>
          <div className={classes.center}>
            <Typography>
              Bạn chưa có tài khoản?{' '}
              <Link className={classes.registerText} to="/register">
                Đăng ký
              </Link>
            </Typography>
          </div>
          <span className={classes.error}>{errorServer}</span>
          <div className={classes.loginGroup}>
            <Button
              variant="contained"
              type="submit"
              className={classes.loginButton}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size="25px" color="inherit" />
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </div>
        </form>
        <Modal
          aria-labelledby="modal-add-location"
          aria-describedby="modal-add-location-description"
          open={showForgotPassword}
          className={classes.modal}
          onClose={handleCloseForgotPassword}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={showForgotPassword}>
            <div className={classes.forgot_wrap}>
              <div className={classes.forgot_heading}>
                <Typography className={classes.forgot_heading_text}>
                  Bạn quên mật khẩu?{' '}
                </Typography>
                <IconButton onClick={handleCloseForgotPassword}>
                  <Close />
                </IconButton>
              </div>
              <form
                onSubmit={handleSubmitEmailForgot}
                className={classes.forgot_form}
              >
                <Typography>Hãy điền email tài khoản của bạn!</Typography>
                <TextField
                  autoComplete=""
                  label="Email"
                  variant="outlined"
                  name="email"
                  id="email"
                  type="email"
                  className={classes.formInputEmail}
                  required
                  // error={Boolean(errors?.email)}
                  // helperText={errors?.email}
                  value={emailForgot}
                  onChange={handleInputEmail}
                />
                <Button
                  variant="contained"
                  type="submit"
                  className={classes.forgotButton}
                  disabled={loadingForgot}
                >
                  {loadingForgot ? (
                    <CircularProgress size="25px" color="inherit" />
                  ) : (
                    'Lấy mật khẩu'
                  )}
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      </Grid>
    </Grid>
  );
}
