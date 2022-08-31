import {
  InputBase,
  Typography,
  Button,
  Paper,
  IconButton,
  CircularProgress,
  Chip
} from '@material-ui/core';
import { Image, Update } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useDispatch, useSelector } from 'react-redux';

import { formStyles } from '../../style';
import LoginModal from '../Modal/Login';
import EmojiPicker from '../Input/EmojiPicker';
import { updatePost } from '../../redux/callApi/postCall';
import { checkImage } from '../../utils/uploadImage';

export default function UpdateReviewForm(props) {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const { review, handleClose } = props;
  const [state, setState] = useState({
    loading: false,
    error: ''
  });

  const [imageUpload, setImageUpload] = useState(review.images);

  const [hashtag, setHashtag] = useState('');
  const [hashtagArr, setHashtagArr] = useState(review.hashtags);
  const [rate, setRate] = useState(review.rate);
  const [text, setText] = useState(review.content);

  const handleChangeRate = e => {
    setRate(e.target.value);
  };

  const handleChange = e => {
    setText(e.target.value);
  };

  const hashtagSplit = text => {
    var ht = text.split(' ');
    return ht.filter(item => item !== '');
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

  const handleSubmit = e => {
    e.preventDefault();

    if (!rate || rate === 0) {
      setState({
        loading: false,
        error: 'Hãy thêm đánh giá sao!'
      });
      return;
    }
    setState({
      loading: true,
      error: ''
    });
    var ht = hashtagSplit(hashtag);
    ht = [...hashtagArr, ...ht];
    dispatch(
      updatePost(
        {
          id: review._id,
          content: text,
          images: imageUpload,
          hashtags: ht,
          rate: rate,
          oldRate: review.rate,
          locationId: review.locationId._id,
          isPublic: true
        },
        auth.token,
        () => {
          setState({
            loading: false,
            error: ''
          });
          handleClose();
        },
        () => {
          setState({
            loading: false,
            error: 'Có lỗi xảy ra'
          });
        }
      )
    );
  };

  const classes = formStyles();

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

  return (
    <>
      {auth.token ? (
        <Paper className={classes.paperContainer}>
          <div className={classes.textTitle}>
            <Typography variant="h5">
              Chỉnh sửa review {review.locationId.fullname}
            </Typography>
          </div>
          <form>
            <div className={classes.formContainer}>
              <div className={classes.formCreateReview}>
                <Rating name="rate" value={rate} onChange={handleChangeRate} />
              </div>
              <div className={classes.postContentInput}>
                <InputBase
                  placeholder="Bạn cảm thấy địa điểm này như thế nào?..."
                  rows={10}
                  multiline
                  name="content"
                  className={classes.input}
                  value={text}
                  onChange={handleChange}
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
          </form>
          <div className={classes.center}>
            <span
              style={{
                fontSize: '15px',
                color: 'red',
                marginInline: '20px',
                marginTop: '10px'
              }}
            >
              {state.error}
            </span>
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
                    title="Xoá"
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
