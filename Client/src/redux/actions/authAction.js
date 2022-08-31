import * as AUTH_TYPES from '../constants/authConstant';

export const auth = props => {
  return {
    type: AUTH_TYPES.AUTH,
    payload: props
  };
};

export const logout = prop => {
  return {
    type: AUTH_TYPES.LOGOUT
  };
};

export const updateFollowing = props => {
  return {
    type: AUTH_TYPES.UPDATE_FOLLOWING,
    payload: props
  };
};

export const updateInfo = props => {
  return {
    type: AUTH_TYPES.UPDATE_INFO,
    payload: props
  };
};

export const changeBackground = props => {
  return {
    type: AUTH_TYPES.CHANGE_BG,
    payload: props
  };
};

export const changeAvatar = props => {
  return {
    type: AUTH_TYPES.CHANGE_AVATAR,
    payload: props
  };
};

export const saveTour = props => {
  return {
    type: AUTH_TYPES.SAVE_TOUR,
    payload: props
  };
};

export const getFriendRecommend = props => {
  return {
    type: AUTH_TYPES.GET_FRIEND_RECOMMEND,
    payload: props
  };
};

export const loginLoading = props => {
  return {
    type: AUTH_TYPES.LOGIN_LOADING,
    payload: props
  };
};

export const loginFailed = props => {
  return {
    type: AUTH_TYPES.LOGIN_FAILED,
    payload: props
  };
};
