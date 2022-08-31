import {
  InputBase,
  Typography,
  Button,
  Paper,
  IconButton,
  CircularProgress,
  Chip,
  Switch,
  FormControlLabel
} from '@material-ui/core';
import { Create, Close, CameraAltOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost } from '../../redux/callApi/postCall';

import { formStyles } from '../../style';
import { checkImage } from '../../utils/uploadImage';
import EmojiPicker from '../Input/EmojiPicker';
import LoginModal from '../Modal/Login';

export default function CreatePostForm(props) {
  const { handleClose } = props;

  const dispatch = useDispatch();

  const history = useHistory();
  const [state, setState] = useState({
    loading: false,
    error: null
  });

  const { auth, socket } = useSelector(state => state);

  const [imageUpload, setImageUpload] = useState([]);

  const [text, setText] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [hashtagArr, setHashtagArr] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleChangeImageUpload = e => {
    let error = '';
    for (const file of e.target.files) {
      const check = checkImage(file);
      if (check !== '') {
        error = check;
        break;
      }
    }
    if (error === '') {
      setState({
        ...state,
        error: null
      });
      setImageUpload(oldImage => [...oldImage, ...e.target.files]);
    } else
      setState({
        ...state,
        error: error
      });
  };

  const removeImage = index => {
    setImageUpload(oldImage => [
      ...oldImage.slice(0, index),
      ...oldImage.slice(index + 1)
    ]);
  };

  const hashtagSplit = text => {
    var ht = text.split(' ');
    return ht.filter(item => item !== '');
  };

  const handleSubmit = e => {
    e.preventDefault();
    var ht = hashtagSplit(hashtag);
    ht = [...hashtagArr, ...ht];
    if (text !== '' || imageUpload.length > 0 || ht.length > 0) {
      setState({
        loading: true,
        error: null
      });
      dispatch(
        createPost(
          { content: text, images: imageUpload, hashtags: ht, isPublic },
          auth.token,
          'post',
          socket,
          () => {
            setState({
              loading: false,
              error: null
            });
            handleClose();
            history.push('/');
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

  const addHashtag = e => {
    e.preventDefault();
    let arr = hashtagSplit(hashtag);
    arr = [...hashtagArr, ...arr];
    setHashtagArr(arr);
    setHashtag('');
  };

  const removeHashtag = index => {
    let temp = [...hashtagArr];
    temp.splice(index, 1);
    setHashtagArr(temp);
  };

  const classes = formStyles();

  return (
    <>
      {auth.token ? (
        <Paper className={classes.paperContainer}>
          <div className={classes.modal_header}>
            <Typography variant="h5" style={{ marginLeft: '35%' }}>
              Tạo bài viết
            </Typography>
            <IconButton size="small" onClick={handleClose}>
              <Close className={classes.modal_header_closeIcon} />
            </IconButton>
          </div>
          <div className={classes.create}>
            <div className={classes.createWrapper}>
              <div className={classes.compose}>
                <div className={classes.composeForm}>
                  <img
                    className={classes.composeFormImage}
                    src={auth.user.avatar}
                    alt="avatar"
                  />
                  <InputBase
                    placeholder="Bạn đang nghĩ gì?..."
                    title="Bạn đang nghĩ gì"
                    rows={5}
                    name="content"
                    id="content"
                    multiline
                    className={classes.createText}
                    value={text}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <div style={{ padding: '5px 0 5px 0' }}>
                {hashtagArr.map((value, idx) => (
                  <Chip
                    label={'#' + value}
                    onDelete={() => removeHashtag(idx)}
                    key={idx}
                    style={{
                      marginInline: 5,
                      marginBottom: 5,
                      backgroundColor: '#A5DEC8'
                    }}
                  />
                ))}
              </div>
              <form
                onSubmit={addHashtag}
                style={{ borderBottom: '1px solid #e8e8e8' }}
              >
                <InputBase
                  placeholder="Hashtag"
                  title="Hashtag"
                  variant="outlined"
                  name="hashtag"
                  id="hashtag"
                  className={classes.hashtag}
                  value={hashtag}
                  onChange={e => setHashtag(e.target.value)}
                />
              </form>
              <FormControlLabel
                control={
                  <Switch
                    checked={isPublic}
                    onChange={e => setIsPublic(e.target.checked)}
                    name="isPublic"
                    color="primary"
                  />
                }
                label={isPublic ? 'Công khai' : 'Chỉ mình tôi'}
              />
              <div className={classes.composeOptions}>
                <input
                  accept="image/*"
                  className={classes.input}
                  style={{ display: 'none' }}
                  id="input-image"
                  name="images"
                  multiple
                  type="file"
                  onChange={handleChangeImageUpload}
                />
                <label className={classes.composeOption} htmlFor="input-image">
                  <CameraAltOutlined className={classes.composeIcon} />
                  <span>Hình ảnh</span>
                </label>
                <EmojiPicker content={text} setContent={setText} />
              </div>
            </div>
          </div>
          <Button
            className={classes.button}
            onClick={handleSubmit}
            disabled={state.loading}
          >
            {state.loading ? (
              <CircularProgress size="25px" color="inherit" />
            ) : (
              <>
                <Create style={{ marginRight: 10 }} />
                Đăng
              </>
            )}
          </Button>
          <div className={classes.error}>
            <Typography variant="caption" color="inherit">
              {state.error}
            </Typography>
          </div>

          <div className={classes.imageInputContainer}>
            {imageUpload.length > 0 && (
              <ScrollMenu height="300px">
                {imageUpload.map((item, index) => (
                  <img
                    key={index}
                    alt="Error"
                    className={classes.imageInput}
                    onClick={() => removeImage(index)}
                    src={URL.createObjectURL(item)}
                    title={'Xoá'}
                  />
                ))}
              </ScrollMenu>
            )}
          </div>
        </Paper>
      ) : (
        <LoginModal handleClose={handleClose} />
      )}
    </>
  );
}
