import {
  Button,
  Chip,
  CircularProgress,
  InputBase,
  Paper,
  Typography
} from '@material-ui/core';
import { Update } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { formStyles } from '../../style';
import EmojiPicker from '../Input/EmojiPicker';
import LoginModal from '../Modal/Login';
import { updatePost } from '../../redux/callApi/postCall';
import { updateTour } from '../../redux/callApi/tourCall';

export default function ShareUpdateForm(props) {
  const { object, type, handleClose } = props;

  const dispatch = useDispatch();

  const { auth, socket } = useSelector(state => state);
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const [text, setText] = useState(object.content);

  const [hashtag, setHashtag] = useState('');
  const [hashtagArr, setHashtagArr] = useState(object.hashtags);

  const classes = formStyles();

  const hashtagSplit = text => {
    var ht = text.split(' ');
    return ht.filter(item => item !== '');
  };

  const updateShare = async () => {
    var ht = hashtagSplit(hashtag);
    ht = [...hashtagArr, ...ht];
    setState({
      loading: true,
      error: false
    });

    if (type === 'post') {
      dispatch(
        updatePost(
          object._id,
          { content: text, images: [], hashtags: ht },
          auth.token,
          socket,
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
    } else if (type === 'tour') {
      dispatch(
        updateTour(
          object._id,
          { tour: [], content: text, hashtags: ht },
          null,
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

  const handleShare = e => {
    e.preventDefault();
    updateShare();
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

  return (
    <>
      {auth.token && object ? (
        <Paper className={classes.paperContainer}>
          <div className={classes.textTitle}>
            <Typography variant="h5">Chỉnh sửa nội dung chia sẻ</Typography>
          </div>
          <div>
            <div className={classes.formContainer}>
              <div className={classes.postContentInput}>
                <InputBase
                  placeholder="Viết gì đó..."
                  rows={10}
                  name="content"
                  id="content"
                  multiline
                  className={classes.input}
                  value={text}
                  onChange={e => setText(e.target.value)}
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
                <EmojiPicker content={text} setContent={setText} />
                <div>
                  <Button
                    className={classes.button}
                    onClick={handleShare}
                    disabled={state.loading}
                  >
                    {state.loading ? (
                      <CircularProgress size="25px" color="inherit" />
                    ) : (
                      <>
                        <Update style={{ marginRight: 10 }} />
                        Cập nhật
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      ) : (
        <LoginModal handleClose={handleClose} />
      )}
    </>
  );
}
