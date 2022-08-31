import {
  InputBase,
  RadioGroup,
  FormControlLabel,
  Avatar,
  Backdrop,
  Box,
  Button,
  List,
  ListItem,
  Radio,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  MenuList,
  Modal,
  Paper,
  Popper,
  Typography
} from '@material-ui/core';
import { MoreVert, Report, Edit, Delete, Close } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, reportPost } from '../../redux/callApi/postCall';

import { postStyles } from '../../style';
import { timeAgo } from '../../utils/date';
import UpdatePostForm from '../Forms/UpdatePost';
import UpdateReviewForm from '../Forms/UpdateReview';
import ImageList from '../Modal/ImageList';
import { SeeMoreText } from '../SeeMoreText';

const menuType = [
  'Ảnh khỏa thân',
  'Bạo lực',
  'Quấy rối',
  'Tự tử/Tự gây thương tích',
  'Thông tin sai lệch',
  'Bán hàng trái phép',
  'Ngôn từ gây thù ghét',
  'Spam',
  'Khủng bố',
  'Vấn đề khác'
];
function Header(props) {
  const { post, share } = props;

  const dispatch = useDispatch();

  const { auth, socket } = useSelector(state => state);

  const [anchorEl, setAnchorEl] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const handleShowMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    handleCloseMenu();
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    handleCloseMenu();
  };

  const handleDeletePost = () => {
    setState({
      loading: true,
      error: false
    });
    dispatch(
      deletePost(
        post,
        auth.token,
        socket,
        () => {
          setState({
            loading: false,
            error: false
          });
          handleCloseDelete();
          handleCloseMenu();
        },
        () => {
          setState({
            loading: false,
            error: true
          });
        }
      )
    );
  };

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const classes = postStyles();

  const refPost = React.createRef();
  const refTour = React.createRef();

  const UpdatePostRef = React.forwardRef((props, ref) => (
    <UpdatePostForm {...props} innerRef={ref} />
  ));

  const UpdateReviewRef = React.forwardRef((props, ref) => (
    <UpdateReviewForm {...props} innerRef={ref} />
  ));
  const [contextReport, setContextReport] = useState({
    type: menuType[0],
    content: ''
  });
  const handleChangeInput = e => {
    setContextReport({
      ...contextReport,
      [e.target.name]: e.target.value
    });
  };

  const handleReport = () => {
    setState({
      loading: true,
      error: false
    });
    dispatch(
      reportPost(
        contextReport.type,
        contextReport.content,
        post._id,
        auth.token,
        () => {
          setState({
            loading: false,
            error: false
          });
          handleCloseEdit();
          handleCloseMenu();
        },
        () => {
          setState({
            loading: false,
            error: true
          });
        }
      )
    );
  };
  return (
    <CardHeader
      className={classes.cardHeader}
      avatar={<Avatar alt="avatar" src={post.userId.avatar} />}
      action={
        <>
          {auth.user && auth.user._id === post.userId._id && !share && (
            <>
              <IconButton
                aria-label="settings"
                onClick={handleShowMenu}
                className={classes.action}
                size="small"
                controls={anchorEl ? 'post-menu' : undefined}
              >
                <MoreVert />
              </IconButton>
              <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                disablePortal
                className={classes.menuWrap}
              >
                <ClickAwayListener onClickAway={handleCloseMenu}>
                  <Paper>
                    <MenuList>
                      <MenuItem onClick={handleShowEdit}>
                        {' '}
                        <Edit className={classes.menuIcon} /> Chỉnh sửa bài viết
                      </MenuItem>
                      <Modal
                        aria-labelledby="transition-modal-edit"
                        aria-describedby="transition-modal-edit-description"
                        open={showEdit}
                        className={classes.modal}
                        onClose={handleCloseEdit}
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500
                        }}
                      >
                        {post.isPostReview ? (
                          <UpdateReviewRef
                            ref={refPost}
                            review={post}
                            handleClose={handleCloseEdit}
                          />
                        ) : (
                          <UpdatePostRef
                            ref={refTour}
                            post={post}
                            handleClose={handleCloseEdit}
                          />
                        )}
                      </Modal>
                      <MenuItem onClick={handleShowDelete}>
                        {' '}
                        <Delete className={classes.menuIcon} />
                        Xóa bài viết
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
                            onClick={handleDeletePost}
                            className={classes.delete}
                            disabled={state.loading}
                          >
                            {state.loading ? (
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
            </>
          )}
          {auth.user && auth.user._id !== post.userId._id && !share && (
            <>
              <IconButton
                aria-label="settings"
                onClick={handleShowMenu}
                className={classes.action}
                size="small"
                controls={anchorEl ? 'post-menu' : undefined}
              >
                <MoreVert />
              </IconButton>
              <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                disablePortal
                className={classes.menuWrap}
              >
                <ClickAwayListener onClickAway={handleCloseMenu}>
                  <Paper>
                    <MenuList>
                      <MenuItem onClick={handleShowEdit}>
                        <Report className={classes.menuIcon} /> Báo cáo
                      </MenuItem>
                      <Modal
                        aria-labelledby="transition-modal-edit"
                        aria-describedby="transition-modal-edit-description"
                        open={showEdit}
                        className={classes.modal}
                        onClose={handleCloseEdit}
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500
                        }}
                      >
                        <div className={classes.reportWrap}>
                          <div className={classes.reportHeader}>
                            <div className={classes.reportHeader_text}>
                              <Typography
                                variant="h5"
                                style={{ fontWeight: 500 }}
                              >
                                Báo cáo
                              </Typography>
                            </div>
                            <IconButton onClick={handleCloseEdit}>
                              <Close />
                            </IconButton>
                          </div>
                          <div className={classes.reportBody}>
                            <Typography>
                              Hãy chọn vấn đề nếu bạn cảm thấy bài viết có vi
                              phạm tiêu chuẩn cộng đồng!
                            </Typography>
                            <div className={classes.reportList}>
                              <RadioGroup
                                id="type"
                                className={classes.reportListForm}
                                row
                                aria-label="type"
                                name="type"
                                value={contextReport.type}
                                onChange={handleChangeInput}
                              >
                                <List component="nav" aria-label="main folders">
                                  {menuType &&
                                    menuType.map((item, index) => (
                                      <ListItem
                                        key={index}
                                        button
                                        className={classes.reportListItem}
                                      >
                                        <FormControlLabel
                                          className={
                                            classes.reportListItemRadio
                                          }
                                          value={item}
                                          control={<Radio color="primary" />}
                                          label={item}
                                        />
                                      </ListItem>
                                    ))}
                                </List>
                              </RadioGroup>
                            </div>
                            <InputBase
                              placeholder="Nội dung cụ thể..."
                              title="Nội dung cụ thể"
                              rows={3}
                              name="content"
                              id="content"
                              multiline
                              className={classes.input}
                              value={contextReport.content}
                              onChange={handleChangeInput}
                            />
                            <Button
                              onClick={handleReport}
                              className={classes.reportIcon}
                              disabled={state.loading}
                            >
                              {state.loading ? (
                                <CircularProgress size={15} color="inherit" />
                              ) : (
                                'Gửi'
                              )}
                            </Button>
                          </div>
                        </div>
                      </Modal>
                    </MenuList>
                  </Paper>
                </ClickAwayListener>
              </Popper>
            </>
          )}
        </>
      }
      title={
        <Typography
          component={Link}
          to={`/u/${post.userId._id}`}
          noWrap={false}
          className={classes.userName}
        >
          {post.userId.fullname}
        </Typography>
      }
      subheader={
        <Link to={`/post/${post._id}`} className={classes.subheader}>
          {timeAgo(new Date(post.createdAt))}
        </Link>
      }
    />
  );
}

function ShareContent({ post }) {
  const classes = postStyles();
  return (
    <>
      <Header post={post} />
      <CardContent>
        <SeeMoreText variant="body1" maxText={100} text={post.content} />
        <div className={classes.hashtagWrap}>
          {post.hashtags.map((item, index) => (
            <Typography
              className={classes.hashtag}
              key={index}
              component={Link}
              to={`/post/hashtag?hashtag=${item}`}
            >
              #{item}
            </Typography>
          ))}
        </div>
        <Box
          style={{
            border: '1px solid #e8e8e8',
            borderBottomColor: 'transparent'
          }}
        >
          {post.shareId ? (
            <>
              <BaseContent post={post.shareId} share={true} />
              {post.shareId.images?.length > 0 && (
                <CardMedia>
                  <ImageList
                    imageList={post.shareId.images}
                    show2Image={true}
                    defaultHeight={500}
                    isPost={true}
                  />
                </CardMedia>
              )}
            </>
          ) : (
            'Bài viết không tồn tại'
          )}
        </Box>
      </CardContent>
    </>
  );
}

function BaseContent(props) {
  const { post, share } = props;
  const classes = postStyles();

  return (
    <>
      <Header post={post} share={share} />
      <CardContent>
        {post.isPostReview && (
          <>
            <div>
              <Typography
                variant="body1"
                component={Link}
                to={`/location/${post.locationId.name}`}
              >
                {post.locationId.fullname}
              </Typography>
            </div>
            <Rating
              name="location-rating"
              value={post.rate}
              readOnly
              style={{ marginBottom: 10 }}
            />
          </>
        )}
        <SeeMoreText variant="body1" maxText={100} text={post.content} />
        <div className={classes.hashtagWrap}>
          {post.hashtags.map((item, index) => (
            <Typography
              className={classes.hashtag}
              key={index}
              component={Link}
              to={`/post/hashtag?hashtag=${item}`}
            >
              #{item}
            </Typography>
          ))}
        </div>
      </CardContent>
      {/* {
                post.images.length > 0 &&
                <CardMedia>
                    <ImageList imageList={post.images} show2Image={true} defaultHeight={500} />
                </CardMedia>
            } */}
    </>
  );
}

export default function PostContent({ post }) {
  return (
    <>
      {post && post.isShare ? (
        <ShareContent post={post} />
      ) : (
        <BaseContent post={post} share={false} />
      )}
    </>
  );
}
