import * as HOT_TYPES from '../constants/hotConstant';

const INIT_STATE = {
  events: null,
  locations: null,
  locationRe: null
};

const alertReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case HOT_TYPES.GET_EVENT: {
      return {
        ...state,
        events: action.payload
      };
    }
    case HOT_TYPES.GET_HOT_LOCATION: {
      return {
        ...state,
        locations: action.payload
      };
    }
    case HOT_TYPES.GET_RECOMMEND_LOCATION: {
      return {
        ...state,
        locationRe: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default alertReducer;
