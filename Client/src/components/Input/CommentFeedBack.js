import React, { useState } from 'react';
import { IconButton, InputBase, Avatar } from '@material-ui/core';
import { Send, FiberManualRecord } from '@material-ui/icons';
import { useSelector } from 'react-redux';

import EmojiPicker from './EmojiPicker';
import { inputStyles } from '../../style';
import customAxios from '../../utils/fetchData';

export default function InputCommentFeedBack(props) {
  const {
    type,
    id,
    isUpdate,
    comment,
    handleClose,
    commentId,
    setTour,
    indexDate
  } = props;

  const classes = inputStyles();
  const [text, setText] = useState(comment ? comment : '');

  const { auth } = useSelector(state => state);

  const handleComment = async e => {
    e.preventDefault();
    setText('');
    if (text.trim() !== '') {
      if (isUpdate) {
        if (text === comment) {
          handleClose();
          return;
        }

        const res = await customAxios(auth.token).patch(
          `/comment/${commentId}`,
          {
            content: text
          }
        );
        handleClose();
        setTour(tour => ({
          ...tour,
          tour: tour.tour.map((tourDate, index) =>
            index === indexDate
              ? {
                  ...tourDate,
                  comments: tourDate.comments.map(comment =>
                    comment._id === commentId ? res.data.comment : comment
                  )
                }
              : tourDate
          )
        }));
      } else {
        const res = await customAxios(auth.token).post('/comment/create', {
          commentType: type,
          content: text,
          postId: id,
          tourId: id,
          volunteerId: id,
          tourDateId: id
        });
        const newComment = {
          ...res.data.newComment,
          userId: auth.user
        };
        setTour(tour => ({
          ...tour,
          tour: tour.tour.map((tourDate, index) =>
            index === indexDate
              ? {
                  ...tourDate,
                  comments: [...tourDate.comments, newComment]
                }
              : tourDate
          )
        }));
      }
    }
  };

  return (
    <div className={classes.writeCmtWrapper}>
      <Avatar
        src={auth.user.avatar}
        atl="Avatar"
        className={classes.writeCmtAvatar}
      />
      <FiberManualRecord className={classes.writeCmtAvatarIcon} />
      <form onSubmit={handleComment} className={classes.writeCmt}>
        <InputBase
          placeholder="Viết bình luận ..."
          className={classes.writeCmtText}
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={!auth.user}
        />
        <EmojiPicker content={text} setContent={setText} />
        <IconButton disabled={!text || text.trim() === ''} type="submit">
          <Send />
        </IconButton>
      </form>
    </div>
  );
}
