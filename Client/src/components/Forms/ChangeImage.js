import { IconButton, Typography } from '@material-ui/core';
import { Cancel, PhotoCamera } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { formStyles } from '../../style';
import { checkImage } from '../../utils/uploadImage';

export default function ChangeImage(props) {
  const [error, setError] = useState(null);
  const { src, setSrc, className, textSize } = props;

  const classes = formStyles();

  useEffect(() => {
    const holder = document.getElementById('upload-holder');
    if (holder) {
      holder.ondragover = function () {
        this.className = clsx(className, classes.borderDashHover);
        // console.log("on drag")
        return false;
      };
      holder.ondragend = function (e) {
        this.className = clsx(className, classes.borderDash);
      };
      holder.ondrop = function (e) {
        // console.log("on drop")
        this.className = clsx(className, classes.borderDash);
        e.preventDefault();
        setError(null);
        const image = e.dataTransfer.files[0];
        const check = checkImage(image);
        if (check === '') setSrc(image);
        else setError(check);
      };
    }
  }, [classes, src, setSrc, className]);

  const changeImage = e => {
    if (e.target.files) {
      setError(null);
      const image = e.target.files[0];
      const check = checkImage(image);
      if (check === '') setSrc(image);
      else {
        setError(check);
      }
    }
  };

  const removeImage = () => {
    setSrc(null);
  };

  return (
    <div>
      {src ? (
        <div className={classes.changeContainer}>
          <img
            src={typeof src === 'string' ? src : URL.createObjectURL(src)}
            alt="Could not load"
            className={className}
            height={300}
            width={300}
          />
          <IconButton
            title="Xoá"
            onClick={removeImage}
            className={classes.removeButton}
            size="small"
          >
            <Cancel style={{ color: 'red' }} />
          </IconButton>
        </div>
      ) : (
        <div className={clsx(className, classes.borderDash)} id="upload-holder">
          <div className={classes.uploadWrap}>
            <Typography style={{ fontSize: textSize }}>
              Kéo hình vào đây hoặc
            </Typography>
            <input
              name="images"
              style={{ display: 'none' }}
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={changeImage}
              className={classes.imageChageInput}
            />
            <div className={classes.center}>
              <label htmlFor="icon-button-file">
                <IconButton variant="raised" component="span">
                  <PhotoCamera titleAccess="Thêm ảnh" />
                </IconButton>
              </label>
            </div>
          </div>
        </div>
      )}
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
    </div>
  );
}
