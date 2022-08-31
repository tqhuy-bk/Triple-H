import {
    InputBase,
    Typography,
    Button,
    Paper,
    IconButton,
    CircularProgress,
  } from '@material-ui/core';
  import { Create, Image } from '@material-ui/icons';
  import { Rating } from '@material-ui/lab';
  import React, { useState } from 'react';
  import { ScrollMenu } from 'react-horizontal-scrolling-menu';
  import {  useSelector } from 'react-redux';
  import * as imageUtils from '../../utils/uploadImage';
  import { formStyles } from '../../style';
  import LoginModal from '../Modal/Login';
  import EmojiPicker from '../Input/EmojiPicker';
  import { checkImage } from '../../utils/uploadImage';
  import customAxios from '../../utils/fetchData';
  
  export default function CreateRateForm(props) {
    const { auth} = useSelector(state => state);
    const { service, handleClose, tourDateId, eventId, addRate } = props;
    const [state, setState] = useState({
      loading: false,
      error: ''
    });
  
    const [imageUpload, setImageUpload] = useState([]);
    const [rate, setRate] = useState(0);
    const [text, setText] = useState('');
  
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!rate || rate === 0) {
        setState({
          ...state,
          error: 'Hãy thêm đánh giá sao!'
        });
        return;
      }
      setState({
        loading: true,
        error: false
      });
      let images = [];
      if (imageUpload.length > 0)
        images = await imageUtils.uploadImages(imageUpload);
      customAxios(auth.token).post(`/service/review/${service._id}`,{
          rate,
          content: text,
          images,
          tourDateId,
          eventId
      }).then(
        (res)=>{
            addRate(res.data.newRate._id, eventId, tourDateId);
            setState({
                loading: false,
                error: false
              });
              handleClose();
        }
        ).catch(
          ()=>{
            setState({
                loading: false,
                error: true
              });
          }
        )
    };
  
    const classes = formStyles();
    return (
      <>
        {auth.token ? (
          <Paper className={classes.paperContainer}>
            <div className={classes.textTitle}>
              <Typography variant="h5">Tạo review {service.name}</Typography>
            </div>
            <div>
              <div className={classes.formContainer}>
                <div className={classes.formCreateReview}>
                  <Rating
                    name="rate-location"
                    value={rate}
                    onChange={e => setRate(parseInt(e.target.value))}
                  />
                </div>
                <div className={classes.postContentInput}>
                  <InputBase
                    placeholder="Bạn cảm thấy dịch vụ này như thế nào?..."
                    rows={10}
                    multiline
                    name="content"
                    className={classes.input}
                    value={text}
                    onChange={handleChange}
                  />
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
                          <Create style={{ marginRight: 10 }} />
                          Đăng
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
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
                      src={URL.createObjectURL(item)}
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
  