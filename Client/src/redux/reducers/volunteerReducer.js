import * as VOLUNTEER_TYPES from '../constants/volunteerConstant';

const INIT_STATE = {
  volunteers: null,
  loading: false,
  error: null,
  page: 0
};

const volunteerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case VOLUNTEER_TYPES.GET_VOLUNTEERS: {
      return {
        ...state,
        volunteers: action.payload.volunteers,
        page: 1,
        loading: false,
        error: null
      };
    }

    case VOLUNTEER_TYPES.ADD_VOLUNTEER: {
      return {
        ...state,
        volunteers: [...state.volunteers, action.payload.volunteer],
        loading: false,
        error: null
      };
    }

    case VOLUNTEER_TYPES.GET_MORE_VOLUNTEER: {
      return {
        ...state,
        volunteers: [...state.volunteers, ...action.payload.volunteers],
        page: state.page + 1,
        loading: false,
        error: null
      };
    }
    case VOLUNTEER_TYPES.LOADING_VOLUNTEER: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case VOLUNTEER_TYPES.DELETE_VOLUNTEER: {
      return {
        ...state,
        error: null,
        volunteers: state.volunteers.filter(
          volunteer => volunteer._id !== action.payload.id
        )
      };
    }
    case VOLUNTEER_TYPES.ERROR_VOLUNTEER: {
      return {
        ...state,
        loading: false,
        volunteers: [],
        page: 0,
        error: action.payload.error
      };
    }
    case VOLUNTEER_TYPES.UPDATE_JOIN: {
      return {
        ...state,
        volunteers: state.volunteers.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                users: action.payload.users
              }
            : item
        )
      };
    }
    case VOLUNTEER_TYPES.UPDATE_JOIN_ONE: {
      return {
        ...state,
        volunteers: state.volunteers.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                location: item.location.map(element =>
                  element._id === action.payload.locationId
                    ? {
                        ...element,
                        users: action.payload.users
                      }
                    : element
                )
              }
            : item
        )
      };
    }
    case VOLUNTEER_TYPES.LOAD_COMMENT_VOLUNTEER: {
      return {
        ...state,
        volunteers: state.volunteers.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                comments: [...item.comments, ...action.payload.comments]
              }
            : item
        )
      };
    }
    case VOLUNTEER_TYPES.ADD_COMMENT_VOLUNTEER: {
      return {
        ...state,
        volunteers: state.volunteers.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                comments: [...item.comments, action.payload.comment]
              }
            : item
        )
      };
    }
    case VOLUNTEER_TYPES.UPDATE_COMMENT_VOLUNTEER: {
      return {
        ...state,
        volunteers: state.volunteers.map(item =>
          item._id === action.payload.volunteerId
            ? {
                ...item,
                comments: item.comments.map(comment =>
                  comment._id === action.payload.comment._id
                    ? action.payload.comment
                    : comment
                )
              }
            : item
        )
      };
    }
    case VOLUNTEER_TYPES.DELETE_COMMENT_VOLUNTEER: {
      return {
        ...state,
        volunteers: state.volunteers.map(item =>
          item._id === action.payload.volunteerId
            ? {
                ...item,
                comments: item.comments.filter(
                  comment => comment._id !== action.payload.id
                )
              }
            : item
        )
      };
    }
    default: {
      return state;
    }
  }
};

export default volunteerReducer;
