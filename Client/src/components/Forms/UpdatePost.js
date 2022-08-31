import {
  InputBase,
  Typography,
  Button,
  Paper,
  IconButton,
  CircularProgress,
  Chip,
  FormControlLabel
} from '@material-ui/core';
import { Image, Update } from '@material-ui/icons';
import React, { useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { updatePost } from '../../redux/callApi/postCall';

import { formStyles } from '../../style';
import { checkImage } from '../../utils/uploadImage';
import EmojiPicker from '../Input/EmojiPicker';
import LoginModal from '../Modal/Login';

export default function UpdatePostForm(props) {
  const { post, handleClose } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const { auth } = useSelector(state => state);

  const [imageUpload, setImageUpload] = useState(post.images);

  const [text, setText] = useState(post.content);
  const [hashtag, setHashtag] = useState('');
  const [hashtagArr, setHashtagArr] = useState(post.hashtags);
  const [isPublic, setIsPublic] = useState(post.isPublic);

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
        error: false
      });
      dispatch(
        updatePost(
          {
            id: post._id,
            content: text,
            images: imageUpload,
            hashtags: ht,
            isPublic
          },
          auth.token,
          () => {
            setState({
              loading: false,
              error: false
            });
            handleClose();
          },
          () => {
            setState({
              loading: false,
              error: true
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
    // console.log([...hashtagArr, ...arr]);
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
        <Paper className={classes.paperContainer} style={{ width: 500 }}>
          <div className={classes.textTitle}>
            <Typography variant="h5">Chỉnh sửa bài viết</Typography>
          </div>
          <div>
            <div className={classes.formContainer}>
              <div className={classes.postContentInput}>
                <InputBase
                  placeholder="Bạn đang nghĩ gì?..."
                  rows={10}
                  name="content"
                  id="content"
                  multiline
                  className={classes.input}
                  value={text}
                  onChange={e => handleChange(e)}
                />
              </div>
              <div>
                <div>
                  {hashtagArr.map((value, idx) => (
                    <Chip
                      label={'#' + value}
                      onDelete={() => removeHashtag(idx)}
                      key={idx}
                      style={{ marginInline: 5 }}
                    />
                  ))}
                </div>
                <form onSubmit={addHashtag}>
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
              </div>
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
              <div className={classes.formAction}>
                <div>
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
                  <label htmlFor="input-image">
                    <IconButton variant="raised" component="span">
                      <Image titleAccess="Thêm ảnh" />
                    </IconButton>
                  </label>
                  <EmojiPicker content={text} setContent={setText} />
                </div>
                <div>
                  <Button
                    className={classes.button}
                    onClick={handleSubmit}
                    disabled={state.loading}
                  >
                    {state.loading ? (
                      <CircularProgress size="25px" color="inherit" />
                    ) : (
                      <>
                        <Update style={{ marginRight: 10 }} />
                        Xong
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

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
                    src={
                      typeof item === 'string'
                        ? item
                        : URL.createObjectURL(item)
                    }
                    title="Xóa"
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
