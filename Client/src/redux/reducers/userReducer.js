import * as USER_TYPES from '../constants/userConstant';

const INIT_STATE = {
  user: null
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_TYPES.GET_USER_INFO: {
      return {
        ...state,
        user: action.payload.user
        // services: []
      };
    }
    case USER_TYPES.UPDATE_FOLLOW: {
      console.log(action.payload.followers);
      return {
        ...state,
        user: {
          ...state.user,
          followers: action.payload.followers
        }
      };
    }
    case USER_TYPES.RESET_USER: {
      return {
        ...state,
        user: null
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
