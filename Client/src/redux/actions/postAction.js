import * as POST_TYPES from '../constants/postConstant';

export const getPosts = props => {
  return {
    type: POST_TYPES.GET_POSTS,
    payload: props
  };
};

export const addPost = props => {
  return {
    type: POST_TYPES.ADD_POST,
    payload: props
  };
};

export const getMorePost = props => {
  return {
    type: POST_TYPES.GET_MORE_POSTS,
    payload: props
  };
};

export const updatePost = props => {
  return {
    type: POST_TYPES.UPDATE_POST,
    payload: props
  };
};

export const deletePost = props => {
  return {
    type: POST_TYPES.DELETE_POST,
    payload: props
  };
};

export const loading = props => {
  return {
    type: POST_TYPES.LOADING_POST,
    payload: props
  };
};

export const error = props => {
  return {
    type: POST_TYPES.ERROR_POST,
    payload: props
  };
};

export const updateLike = props => {
  return {
    type: POST_TYPES.UPDATE_LIKE_POST,
    payload: props
  };
};

export const loadingFirst = props => {
  return {
    type: POST_TYPES.LOADING_FISRT
  };
};
