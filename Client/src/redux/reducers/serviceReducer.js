import * as SERVICE_TYPES from '../constants/serviceConstant';

const INIT_STATE = {
  services: [],
  page: 0,
  loading: false,
  error: false,
  hasMore: true
};

const serviceReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SERVICE_TYPES.GET_SERVICES: {
      return {
        ...state,
        services: action.payload.services,
        page: 1,
        loading: false,
        error: false,
        hasMore: action.payload.services.length >= 5
      };
    }
    case SERVICE_TYPES.LOAD_MORE_SERVICE: {
      return {
        ...state,
        services: [...state.services, ...action.payload.services],
        page: state.page + 1,
        loading: false,
        error: false,
        hasMore: action.payload.services.length >= 5
      };
    }
    case SERVICE_TYPES.LOADING_SERVICE: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case SERVICE_TYPES.ERROR_SERVICE: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    case SERVICE_TYPES.GET_DETAIL: {
      return {
        ...state,
        services: state.services.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                rate: action.payload.rate,
                attribute: action.payload.attribute
              }
            : item
        )
      };
    }
    case SERVICE_TYPES.REVIEW_SERVICE: {
      return {
        ...state,
        services: state.services.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                rate: [...item.rate, action.payload.review],
                star: action.payload.star
              }
            : item
        )
      };
    }
    case SERVICE_TYPES.ADD_SERVICE: {
      return {
        ...state,
        services: [...state.services, action.payload.newService]
      };
    }
    case SERVICE_TYPES.UPDATE_SERVICE: {
      return {
        ...state,
        services: state.services.map(item =>
          item._id === action.payload.service._id
            ? action.payload.service
            : item
        )
      };
    }
    case SERVICE_TYPES.DELETE_SERVICE: {
      return {
        ...state,
        services: state.services.filter(item => item._id !== action.payload.id)
      };
    }
    default: {
      return state;
    }
  }
};

export default serviceReducer;
