import React, { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Typography
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { profileStyles } from '../../style';
import { confirmAccount } from '../../redux/callApi/authCall';
import { uploadImages } from '../../utils/uploadImage';
import ChangeImage from './ChangeImage';

export default function ConfirmAccount(props) {
  const classes = profileStyles();

  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);
  const [text, setText] = useState(
    user.confirmAccount ? user.confirmAccount.cmnd : ''
  );
  const [imageFront, setImageFront] = useState(
    user.confirmAccount ? user.confirmAccount.cmndFront : null
  );
  const [imageBack, setImageBack] = useState(
    user.confirmAccount ? user.confirmAccount.cmndBack : null
  );
  const [imageFace, setImageFace] = useState(
    user.confirmAccount ? user.confirmAccount.cmndFace : null
  );
  const [state, setState] = useState({
    loading: false,
    error: null
  });

  const handleChange = e => {
    if (!user.confirmAccount) {
      setText(e.target.value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setState({
      loading: true,
      error: null
    });
    const cmndFront = await uploadImages([imageFront]);
    const cmndBack = await uploadImages([imageBack]);
    const cmndFace = await uploadImages([imageFace]);
    if (
      text !== '' &&
      imageFront != null &&
      imageBack != null &&
      imageFace != null
    ) {
      dispatch(
        confirmAccount(
          token,
          {
            cmnd: text,
            cmndFront: cmndFront[0],
            cmndBack: cmndBack[0],
            cmndFace: cmndFace[0]
          },
          () => {
            setState({
              loading: false,
              error: null
            });
          },
          err => {
            setState({
              loading: false,
              error: err
            });
          }
        )
      );
    }
  };
  return (
    <div className={classes.confirmAccount}>
      <Typography variant="h5">X??c minh t??i kho???n</Typography>
      {user.confirmAccount && user.confirmAccount.state === 0 ? (
        <Typography className={classes.state0}>
          B???n ???? g???i th??ng tin x??c nh???n, c???n ch??? admin x??c nh???n
        </Typography>
      ) : (
        <></>
      )}
      {user.confirmAccount && user.confirmAccount.state === 1 ? (
        <Typography className={classes.state1}>
          T??i kho???n ???? ???????c x??c minh
        </Typography>
      ) : (
        <></>
      )}
      {user.confirmAccount && user.confirmAccount.state === 2 ? (
        <Typography className={classes.state2}>
          Th??ng tin ch??a ???????c x??c minh, b???n c???n g???i l???i th??ng tin
        </Typography>
      ) : (
        <></>
      )}
      <Typography>
        B???n c???n x??c minh t??i kho???n ????? b???o m???t c??ng nh?? t???o uy t??n trong c???ng
        ?????ng
      </Typography>
      <div className={classes.confirm_form}>
        <form>
          <TextField
            value={text}
            label="S??? CMND/CCCD/H??? chi???u"
            variant="outlined"
            name="cmnd_number"
            className={classes.input_cmnd_number}
            onChange={e => handleChange(e)}
            required
          />
          <Typography>???nh ch???p ph???i r?? n??t, kh??ng b??? m???</Typography>
          <Typography>
            CMND/CCCD/H??? chi???u{' '}
            <span className={classes.cmnd_textStrong}>m???t tr?????c</span>:{' '}
          </Typography>
          <div className={classes.cmnd_front}>
            <ChangeImage
              src={imageFront}
              setSrc={setImageFront}
              className={classes.sizeImageChange}
              textSize={14}
            />
          </div>

          <Typography>
            CMND/CCCD/H??? chi???u{' '}
            <span className={classes.cmnd_textStrong}>m???t sau</span>:{' '}
          </Typography>
          <div className={classes.cmnd_front}>
            <ChangeImage
              src={imageBack}
              setSrc={setImageBack}
              className={classes.sizeImageChange}
              textSize={14}
            />
          </div>
          <Typography>Ch???p ???nh m???t c???a b???n: </Typography>
          <div className={classes.cmnd_front}>
            <ChangeImage
              src={imageFace}
              setSrc={setImageFace}
              className={classes.sizeImageChange}
              textSize={14}
            />
          </div>
          <div className={classes.btnWrap}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.updateBtn}
              onClick={handleSubmit}
              disabled={user.confirmAccount || state.loading}
            >
              {state.loading ? (
                <CircularProgress size="25px" color="inherit" />
              ) : (
                'C???p nh???t'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
