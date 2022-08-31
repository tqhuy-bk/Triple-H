import * as postAction from '../actions/postAction';
import * as tourAction from '../actions/tourAction';
import * as imageUtils from '../../utils/uploadImage';
import customAxios from '../../utils/fetchData';
import { createNotify, deleteNotify } from './notifyCall';
import * as alertAction from '../actions/alertAction';

export const getPosts = token => async dispatch => {
  dispatch(postAction.loadingFirst());

  try {
    // call api to get post list
    const res = await customAxios(token).get('/post/posts');

    // console.log(res);

    // console.log(res.data.posts)

    dispatch(
      postAction.getPosts({
        posts: res.data.posts,
        id: 0,
        postId: res.data.postId
      })
    );
  } catch (err) {
    // console.log(err);
    dispatch(postAction.error({ error: 'Có lỗi xảy ra' }));
  }
};

export const getPostsLocation = (id, page) => async dispatch => {
  if (page === 0) {
    dispatch(postAction.loadingFirst());
  } else dispatch(postAction.loading());

  try {
    const res = await customAxios().get(`/location/${id}/posts?offset=${page}`);
    if (page === 0) {
      dispatch(postAction.getPosts({ posts: res.data.posts, id: id }));
    } else {
      dispatch(postAction.getMorePost({ posts: res.data.posts }));
    }
  } catch (err) {
    dispatch(postAction.error({ error: 'Có lỗi xảy ra' }));
  }
};

export const getUserPost = (id, token, offset) => async dispatch => {
  // dispatch(postAction.getPosts({ posts: [] }));
  // console.log(id, offset);
  if (offset === 0) {
    dispatch(postAction.loadingFirst());
  } else dispatch(postAction.loading());

  try {
    const res = await customAxios(token).get(
      `/post/user/${id}?offset=${offset}`
    );

    // console.log(res.data.posts);
    if (offset > 0) {
      dispatch(postAction.getMorePost({ posts: res.data.posts }));
    } else {
      dispatch(postAction.getPosts({ posts: res.data.posts, id: id }));
    }
  } catch (err) {
    // console.log(err.response.data.message);
    // console.log(err);
    dispatch(postAction.error({ error: 'Có lỗi xảy ra' }));
  }
};

export const getMorePost = data => async dispatch => {
  dispatch(postAction.loading());

  try {
    const { postId } = data;
    const limit = postId.length;

    const res = await customAxios().post(
      `/post/list?detail=true&limit=${limit}`,
      {
        list: postId
      }
    );

    dispatch(postAction.getMorePost({ posts: res.data.posts }));
  } catch (err) {
    dispatch(postAction.error({ error: 'Có lỗi xảy ra' }));
  }
};

export const getPostHashtag = (page, hashtag) => dispatch => {
  if (!hashtag) return;
  if (page > 0) dispatch(postAction.loading());
  return customAxios()
    .get(`/post/hashtag?hashtag=${hashtag}&page=${page}`)
    .then(res => {
      if (page > 0) dispatch(postAction.getMorePost({ posts: res.data.posts }));
      else dispatch(postAction.getPosts({ posts: res.data.posts }));
    })
    .catch(err => {
      dispatch(postAction.error({ error: 'Có lỗi xảy ra' }));
    });
};

export const getPostById = (id, token, next) => async dispatch => {
  // dispatch(postAction.getPosts({ posts: [] }));
  dispatch(postAction.loadingFirst());
  try {
    await customAxios(token)
      .get(`/post/${id}`)
      .then(res => {
        dispatch(postAction.getPosts({ posts: [res.data.post], id: id }));
      })
      .catch(err => {
        if (err.response.status === 404) {
          next();
        }
        dispatch(postAction.error({ error: 'Có lỗi xảy ra' }));
      });
  } catch (err) {
    next();
    // console.log(err);
    dispatch(postAction.error({ error: 'Có lỗi xảy ra' }));
  }
};

export const createPost =
  (data, token, type, socket, next, error, createReview) => async dispatch => {
    // post api
    try {
      let image = [];
      if (data.images && data.images.length > 0)
        image = await imageUtils.uploadImages(data.images);
      const post = {
        ...data,
        images: image
      };
      var url = '';
      if (type === 'review') {
        url = '/post/create_review';
      } else {
        url = '/post/create_post';
      }
      // call api to save post

      const res = await customAxios(token).post(url, post);

      // console.log(res.data);
      dispatch(postAction.addPost({ post: res.data.newPost }));

      if (data.isPublic) {
        const dataNotify = {
          id: res.data.newPost._id,
          text: ' thêm bài viết mới',
          recipients: res.data.newPost.userId.followers,
          content: res.data.newPost.content,
          image: image.length > 0 ? image[0] : 'empty',
          url: `/post/${res.data.newPost._id}`
        };
        dispatch(createNotify(dataNotify, token, socket));
      }

      //notify

      if (type === 'review') {
        dispatch(alertAction.success({ message: 'Tạo review thành công!' }));
        createReview(res.data.newPost._id);
      }

      next();
    } catch (err) {
      console.log(err);
      error(err);
    }
  };

export const updatePost = (data, token, next, error) => async dispatch => {
  try {
    // call api to update post

    let oldImages = data.images.filter(item => typeof item === 'string');
    let newImages = data.images.filter(item => typeof item !== 'string');
    let images = [];
    if (newImages.length > 0) {
      images = await imageUtils.uploadImages(newImages);
    }
    images = [...oldImages, ...images];
    const post = {
      ...data,
      images: images
    };

    const res = await customAxios(token).put(`/post/${data.id}`, post);

    dispatch(postAction.updatePost({ post: res.data.post }));
    dispatch(alertAction.success({ message: 'Cập nhật thành công!' }));
    next();
  } catch (err) {
    error();
  }
};

export const deletePost =
  (post, token, socket, next, error) => async dispatch => {
    try {
      // Notify
      const dataNotify = {
        id: post._id,
        url: `/post/${post._id}`,
        type: 'deletePost'
      };
      dispatch(deleteNotify(dataNotify, token, socket));

      await customAxios(token).delete(`/post/${post._id}`);
      dispatch(postAction.deletePost({ id: post._id }));

      next();
    } catch (err) {
      error();
    }
  };

export const likePost = (id, auth, socket, next) => async dispatch => {
  try {
    const res = await customAxios(auth.token).patch(`/post/${id}/like`);
    dispatch(postAction.updateLike({ id: id, likes: res.data.likes }));
    socket.emit('like', { type: 'post', id, likes: res.data.likes });

    if (auth.user._id !== res.data.post.userId) {
      const dataNotify = {
        id: auth.user._id,
        text: ' thích bài viết của bạn',
        recipients: [res.data.post.userId],
        content: res.data.post.content,
        image:
          res.data.post.images.length > 0 ? res.data.post.images[0] : 'empty',
        url: `/post/${id}`
      };
      dispatch(createNotify(dataNotify, auth.token, socket));
    }
  } catch (err) {
    next();
    // console.log(err);
    if (err.response && err.response.data && err.response.data.message)
      dispatch(alertAction.error({ message: err.response.data.message }));
    else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
  }
};

export const unlikePost = (id, auth, socket, next) => async dispatch => {
  try {
    const res = await customAxios(auth.token).patch(`/post/${id}/unlike`);
    dispatch(postAction.updateLike({ id: id, likes: res.data.likes }));
    socket.emit('unlike', { type: 'post', id, likes: res.data.likes });

    // Notify
    if (auth.user._id !== res.data.post.userId) {
      const dataNotify = {
        id: auth.user._id,
        url: `/post/${id}`
      };
      dispatch(deleteNotify(dataNotify, auth.token, socket));
    }
  } catch (err) {
    next();
    if (err.response && err.response.data && err.response.data.message)
      dispatch(alertAction.error({ message: err.response.data.message }));
    else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
  }
};

export const share =
  (type, token, shareId, content, hashtags, next, error) => async dispatch => {
    try {
      const res = await customAxios(token).post(`/${type}/share`, {
        shareId: shareId,
        content: content,
        hashtags: hashtags
      });
      next();

      if (type === 'post') {
        dispatch(postAction.addPost({ post: res.data.newPost }));
      } else if (type === 'tour') {
        dispatch(tourAction.addTour({ tour: res.data.newTour }));
      }
      dispatch(alertAction.success({ message: 'Chia sẻ thành công!' }));
    } catch (err) {
      console.log(err);
      error();
      if (err.response && err.response.data && err.response.data.message)
        dispatch(alertAction.error({ message: err.response.data.message }));
      else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
    }
  };

export const reportPost =
  (type, content, postId, token, next, error) => async dispatch => {
    try {
      await customAxios(token).post(`/report/create`, {
        postId: postId,
        content: content,
        type: type
      });
      next();
      dispatch(alertAction.success({ message: 'Gửi báo cáo thành công!' }));
    } catch (err) {
      error();
      if (err.response && err.response.data && err.response.data.message)
        dispatch(alertAction.error({ message: err.response.data.message }));
      else dispatch(alertAction.error({ message: 'Có lỗi xảy ra' }));
    }
  };
