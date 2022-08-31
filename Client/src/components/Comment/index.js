import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  CircularProgress,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography
} from '@material-ui/core';

import { commentStyles } from '../../style';
import { SeeMoreText } from '../SeeMoreText';
import { timeAgo, timeAgoShort } from '../../utils/date';
// import { auth } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteComment,
  likeComment,
  unlikeComment
} from '../../redux/callApi/commentCall';
import { MoreVert } from '@material-ui/icons';
import InputComment from '../Input/Comment';

export default function Comment(props) {
  const { comment, type, id } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleShowMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    setEdit(true);
  };

  const editDone = () => {
    setEdit(false);
  };

  const [like, setLike] = useState(false);
  const [numLike, setNumLike] = useState(0);

  const classes = commentStyles({ like });

  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  const likePress = () => {
    if (!auth.user) return;
    if (like) {
      handleUnlike();
    } else handleLike();
  };

  const handleLike = () => {
    setLike(true);
    setNumLike(state => state + 1);
    // call api
    dispatch(likeComment(comment._id, auth, type, id, socket));
  };

  const handleUnlike = () => {
    setLike(false);
    setNumLike(state => state - 1);
    // call api
    dispatch(unlikeComment(comment._id, auth, type, id, socket));
  };

  useEffect(() => {
    if (auth.user && comment.likes.find(like => like._id === auth.user._id)) {
      setLike(true);
    }
    setNumLike(comment.likes.length);
  }, [comment.likes, auth.user]);

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    handleCloseMenu();
  };

  const handleDelete = () => {
    setLoadingDelete(true);
    dispatch(
      deleteComment(comment._id, auth, type, id, socket, () => {
        setLoadingDelete(false);
      })
    );
  };

  return (
    <div className={classes.comment}>
      {!edit && (
        <div className={classes.avatar}>
          <Avatar src={comment.userId?.avatar} atl="Avatar" />
        </div>
      )}
      <div style={{ display: 'flex' }}>
        {edit ? (
          <div>
            <InputComment
              isUpdate={true}
              type={type}
              id={id}
              handleClose={editDone}
              commentId={comment._id}
              comment={comment.content}
            />
            <Typography
              noWrap={true}
              className={classes.cancelBtn}
              onClick={editDone}
            >
              Hủy
            </Typography>
          </div>
        ) : (
          <div className={classes.cmtInfo}>
            <Typography
              noWrap={false}
              variant="subtitle2"
              className={classes.userName}
              component={Link}
              to={`/u/${comment.userId?._id}`}
            >
              {comment.userId?.fullname}
            </Typography>
            <div className={classes.content}>
              <SeeMoreText
                variant="body2"
                maxText={100}
                text={comment.content}
              />
            </div>
            <div className={classes.cmtSubinfo}>
              <div className={classes.like}>
                <Typography className={classes.smallText}>{numLike}</Typography>
                <Typography
                  className={`${classes.smallText} ${classes.likeBtn}`}
                  onClick={likePress}
                >
                  Like
                </Typography>
              </div>
              <div className={classes.time}>
                <Typography className={classes.dateComment}>
                  {timeAgo(new Date(comment.createdAt))}
                </Typography>
                <Typography className={classes.dateCommentShort}>
                  {timeAgoShort(new Date(comment.createdAt))}
                </Typography>
              </div>
            </div>
          </div>
        )}

        {auth.user && auth.user._id === comment.userId._id && (
          <div>
            <IconButton onClick={handleShowMenu} size="small">
              <MoreVert />
            </IconButton>
            <Popper
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleCloseMenu}
              disablePortal
            >
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <Paper>
                  <MenuList>
                    <MenuItem className={classes.menuItem} onClick={handleEdit}>
                      Chỉnh sửa bình luận
                    </MenuItem>
                    <MenuItem
                      className={classes.menuItem}
                      onClick={handleShowDelete}
                    >
                      Xóa bình luận
                    </MenuItem>
                    <Dialog
                      open={showDelete}
                      onClose={handleCloseDelete}
                      aria-labelledby="show-delete-dialog"
                      aria-describedby="show-delete-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {'Bạn có chắc chắn muốn xóa?'}
                      </DialogTitle>

                      <DialogContent>
                        Bạn sẽ không thể khôi phục lại dữ liệu sau khi xóa!
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseDelete}>Hủy</Button>
                        <Button
                          onClick={handleDelete}
                          className={classes.delete}
                          disabled={loadingDelete}
                        >
                          {loadingDelete ? (
                            <CircularProgress size={15} color="inherit" />
                          ) : (
                            'Xóa'
                          )}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </MenuList>
                </Paper>
              </ClickAwayListener>
            </Popper>
          </div>
        )}
      </div>
    </div>
  );
}
