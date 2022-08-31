import {
  IconButton,
  Button,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress
} from '@material-ui/core';
import { Close, VisibilityOff, Visibility } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { modalStyles } from '../../style';
import { login } from '../../redux/callApi/authCall';
import Validator, { isEmpty } from '../../utils/validator';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginModal({ handleClose }) {
  const classes = modalStyles();
  const dispatch = useDispatch();
  const history = useHistory();
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
    if (auth.token) {
      history.push('/');
    }
  }, [auth.token, history]);
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
              setErrorServer(err);
            }
          )
        );
      } else {
        setLoading(false);
      }
      setSubmit(false);
    }
  }, [errors, submit, dispatch, context]);

  const handleClickShowPassword = () => {
    setShowPassword(state => !state);
  };
  return (
    <Paper className={classes.loginContainer}>
      <div className={classes.loginHeader}>
        <Typography variant="h6" className={classes.loginTitle}>
          BẠN CẦN ĐĂNG NHẬP
        </Typography>
        <IconButton className={classes.loginHeaderIcon} onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <form className={classes.loginForm} onSubmit={handleSubmit}>
        <TextField
          autoComplete=""
          label="EMAIL"
          name="email"
          id="standard-basic"
          type="email"
          className={classes.loginFormText}
          required
          error={Boolean(errors?.email)}
          helperText={errors?.email}
          value={context.email}
          onChange={handleInput}
        />
        <TextField
          autoComplete=""
          label="MẬT KHẨU"
          required
          id="standard-basic"
          name="password"
          type={showPassword ? 'text' : 'password'}
          error={Boolean(errors?.password)}
          helperText={errors?.password}
          className={classes.loginFormText}
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
        <span style={{ marginLeft: 20, color: 'red' }}>{errorServer}</span>
        <Button
          variant="contained"
          className={classes.loginFormButton}
          type="submit"
        >
          {loading ? (
            <CircularProgress size="25px" color="inherit" />
          ) : (
            'ĐĂNG NHẬP'
          )}
        </Button>
      </form>
      <div className={classes.centerMarginTop}>
        <Link to="/register" className={classes.link}>
          Bạn chưa có tài khoản? ĐĂNG KÝ
        </Link>
      </div>
    </Paper>
  );
}
