import {
  Grid,
  CircularProgress,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  TextField
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import LeftBar from '../components/Leftbar'
import SpeedDialButton from '../components/SpeedDialBtn';
// import { homeMenu } from '../constant/menu'
import { useDispatch } from 'react-redux';
import { resetPassword } from '../redux/callApi/authCall';
import { authStyles } from '../style';
import { NotFound } from './404';
import Loading from '../components/Loading';

export default function ResetPage() {
  const classes = authStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const [state, setState] = useState({
    notFound: false,
    error: false,
    loading: true
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleInputPassword = e => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    document.title = 'Đặt lại mật khẩu';
  }, []);
  const handleClickShowPassword = () => {
    setShowPassword(state => !state);
  };

  useEffect(() => {
    if (token) {
      setState({
        notFound: false,
        error: false,
        loading: false
      });
    } else {
      setState({
        notFound: true,
        error: true,
        loading: false
      });
    }
  }, [token]);

  const handleSubmitPassword = e => {
    e.preventDefault();
    setState({
      error: false,
      loading: true
    });
    dispatch(
      resetPassword(
        token,
        password,
        () => {
          setState({
            error: false,
            loading: false
          });
          history.push('/login');
        },
        err => {
          setState({
            error: true,
            loading: false
          });
        }
      )
    );
    setPassword('');
  };
  return (
    <Grid container style={{ margin: 0, padding: 0 }}>
      <SpeedDialButton />
      {/* <Grid item md={3} sm={2} xs={2} >
                <LeftBar menuList={homeMenu} />
            </Grid> */}
      <Grid
        item
        md={9}
        sm={10}
        xs={10}
        style={{
          paddingTop: 70,
          margin: '0 auto',
          maxWidth: 600,
          overflow: 'hidden'
        }}
      >
        {state.loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 50
            }}
          >
            <Loading />
          </div>
        ) : state.error ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: 50
            }}
          >
            {state.notFound ? <NotFound /> : <Button>Thử lại</Button>}
          </div>
        ) : (
          <div style={{ marginTop: 80, fontSize: 25 }}>
            <form
              onSubmit={handleSubmitPassword}
              className={classes.forgot_form}
            >
              <Typography>Đặt lại mật khẩu của bạn!</Typography>
              <TextField
                autoComplete=""
                label="Mật khẩu"
                variant="outlined"
                required
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                // error={Boolean(errors?.password)}
                // helperText={errors?.password}
                className={classes.formInputEmail}
                value={password}
                onChange={handleInputPassword}
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
              <Button
                variant="contained"
                type="submit"
                className={classes.forgotButton}
                disabled={state.loading}
              >
                {state.loading ? (
                  <CircularProgress size="25px" color="inherit" />
                ) : (
                  'Đặt mật khẩu'
                )}
              </Button>
            </form>
          </div>
        )}
      </Grid>
    </Grid>
  );
}
