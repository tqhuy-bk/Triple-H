import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Typography
} from '@material-ui/core';
import { Close, CloudUpload } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeAvatar, changeBackground } from '../../redux/callApi/authCall';
import { formStyles } from '../../style';
import ChangeImage from './ChangeImage';

export default function UpdateAvatarBg(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { title, img, handleClose, type } = props;
  const [src, setSrc] = useState(img);

  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  const classes = formStyles();

  const handleSubmit = () => {
    if (src === img) {
      handleClose();
      return;
    }
    setLoading(true);
    if (type === 'background') {
      dispatch(
        changeBackground(
          token,
          src,
          () => {
            setLoading(false);
            handleClose();
          },
          err => {
            setError(err);
          }
        )
      );
    } else if (type === 'avatar') {
      dispatch(
        changeAvatar(
          token,
          src,
          () => {
            setLoading(false);
            handleClose();
          },
          err => {
            setError(err);
          }
        )
      );
    }
  };

  return (
    <Paper className={classes.paperContainer}>
      <div className={classes.title}>
        <div></div>
        <Typography variant="h5">{title}</Typography>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </div>
      <div className={classes.bodyChangeImage}>
        <div className={classes.center}>
          <ChangeImage
            src={src}
            setSrc={setSrc}
            textSize={20}
            className={
              type === 'avatar' ? classes.sizeImageAvatar : classes.sizeImageBg
            }
          />
        </div>
        <span
          style={{
            fontSize: '15px',
            color: 'red',
            marginInline: '20px',
            marginTop: '10px'
          }}
        >
          {error}
        </span>
        <div className={classes.buttonWrap}>
          <Button
            onClick={handleSubmit}
            startIcon={<CloudUpload />}
            variant="contained"
            color="primary"
            disabled={!src || loading}
          >
            {loading ? (
              <CircularProgress size="25px" color="inherit" />
            ) : (
              'Tải lên'
            )}
          </Button>
        </div>
      </div>
    </Paper>
  );
}
