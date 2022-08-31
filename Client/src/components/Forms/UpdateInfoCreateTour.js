import {
  InputBase,
  Typography,
  TextField,
  Chip,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { formStyles } from '../../style';
// import EmojiPicker from '../Input/EmojiPicker';
import QuillEditor from '../QuillEditor';

export default function UpdateTourInfo({ tourInfo, setTourInfo, cost }) {
  const { name, hashtags, content, isPublic } = tourInfo;

  const [hashtagArr, setHashtagArr] = useState([]);

  useEffect(() => {
    setHashtagArr(hashtags);
  }, [hashtags]);

  const [hashtag, setHashtag] = useState('');

  const handleInput = e => {
    setTourInfo(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const hashtagSplit = text => {
    var ht = text.split(' ');
    return ht.filter(item => item !== '');
  };

  const changeHashtags = arr => {
    setTourInfo(state => ({
      ...state,
      hashtags: arr
    }));
  };

  const addHashtag = e => {
    e.preventDefault();
    let arr = hashtagSplit(hashtag);
    arr = [...hashtagArr, ...arr];
    changeHashtags(arr);
    setHashtag('');
  };

  const changeHashtag = e => {
    setHashtag(e.target.value);
  };

  const removeHashtag = index => {
    let temp = [...hashtagArr];
    temp.splice(index, 1);
    // setHashtagArr(temp);
    changeHashtags(temp);
  };

  const classes = formStyles();

  return (
    <div className={classes.paperUpdateInfoContainer}>
      <div className={classes.textTitle}>
        <Typography variant="h5">Thông tin hành trình</Typography>
      </div>
      <div>
        <div className={classes.formContainerTour}>
          <TextField
            name="name"
            id="name"
            label="Tên tour"
            variant="outlined"
            value={name}
            className={classes.tourNameInput}
            onChange={handleInput}
          />
          <Typography className={classes.costTotalTour}>
            <b>Tổng chi phí: </b>
            {new Intl.NumberFormat().format(cost * 1000)} VND
          </Typography>
          <div className={classes.postContentInput}>
            <QuillEditor
              value={content}
              setValue={e => setTourInfo(state => ({ ...state, content: e }))}
              placeholder="Nội dung tour ..."
            />
          </div>
          <div style={{ marginTop: 50 }}>
            <div>
              {hashtagArr.map((value, idx) => (
                <Chip
                  label={'#' + value}
                  onDelete={() => removeHashtag(idx)}
                  key={idx}
                  style={{ marginInline: 5, backgroundColor: '#a5dec8' }}
                />
              ))}
            </div>
            <form onSubmit={addHashtag}>
              <InputBase
                placeholder="Hashtag. Ex: #bien #lehoi ..."
                variant="outlined"
                name="hashtag"
                id="hashtag"
                value={hashtag}
                className={classes.hashtag}
                onChange={changeHashtag}
              />
            </form>
          </div>
          <div style={{ display: 'flex' }}>
            {/* <EmojiPicker content={content} setContent={setContent} /> */}
            <FormControlLabel
              control={
                <Switch
                  checked={isPublic}
                  onChange={e =>
                    setTourInfo(state => ({
                      ...state,
                      isPublic: !state.isPublic
                    }))
                  }
                  name="isPublic"
                  color="primary"
                />
              }
              label={isPublic ? 'Công khai' : 'Riêng tư'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
