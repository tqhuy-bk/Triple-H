import * as TOUR_TYPES from '../constants/tourConstant';

const INIT_STATE = {
  id: 0,
  tours: null,
  tourHot: null,
  loading: false,
  loadingFirst: false,
  error: null,
  page: 0,
  hasMore: true
};

const tourReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TOUR_TYPES.GET_TOURS: {
      return {
        ...state,
        tours: action.payload.tours,
        page: 1,
        loadingFirst: false,
        error: null,
        hasMore: action.payload.tours.length >= 5,
        id: action.payload.id
      };
    }
    case TOUR_TYPES.GET_MORE_TOUR: {
      return {
        ...state,
        tours: [...state.tours, ...action.payload.tours],
        page: state.page + 1,
        loading: false,
        error: null,
        hasMore: action.payload.tours.length >= 5
      };
    }
    case TOUR_TYPES.ADD_TOUR: {
      let newTours;
      if (!state.tours) newTours = [action.payload.tour];
      else newTours = [...state.tours, action.payload.tour];

      return {
        ...state,
        tours: newTours,
        loading: false,
        error: null
      };
    }
    case TOUR_TYPES.LOADING_TOUR: {
      return {
        ...state,
        loading: true,
        error: null,
        hasMore: true
      };
    }
    case TOUR_TYPES.DELETE_TOUR: {
      if (!state.tours)
        return {
          ...state
        };

      return {
        ...state,
        error: null,
        tours: state.tours?.filter(tour => tour._id !== action.payload.id),
        tourHot: state.tourHot?.filter(tour => tour._id !== action.payload.id)
      };
    }
    case TOUR_TYPES.UPDATE_TOUR: {
      let newTours = null;
      if (state.tours)
        newTours = state.tours.map(tour =>
          tour._id === action.payload.tour._id ? action.payload.tour : tour
        );
      let tourHots = null;
      if (state.tourHot)
        tourHots = state.tourHot.map(tour =>
          tour._id === action.payload.tour._id ? action.payload.tour : tour
        );

      return {
        ...state,
        error: null,
        tours: newTours,
        tourHot: tourHots
      };
    }
    case TOUR_TYPES.UPDATE_LIKE_TOUR: {
      return {
        ...state,
        tours: state.tours.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                likes: action.payload.likes
              }
            : item
        ),
        tourHot: state.tourHot.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                likes: action.payload.likes
              }
            : item
        )
      };
    }
    case TOUR_TYPES.LOAD_COMMENT_TOUR: {
      let comment =
        state.tours.find(item => item._id === action.payload.id)
          ?.commentDetail || [];
      if (comment.length === 0) {
        comment =
          state.tourHot.find(item => item._id === action.payload.id)
            ?.commentDetail || [];
      }
      return {
        ...state,
        tours: state.tours.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                commentDetail: [...comment, ...action.payload.comments]
              }
            : item
        ),
        tourHot: state.tourHot.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                commentDetail: [...comment, ...action.payload.comments]
              }
            : item
        )
      };
    }
    case TOUR_TYPES.ADD_COMMENT_TOUR: {
      let comment =
        state.tours.find(item => item._id === action.payload.id)
          ?.commentDetail || [];
      if (comment.length === 0) {
        comment =
          state.tourHot.find(item => item._id === action.payload.id)
            ?.commentDetail || [];
      }
      return {
        ...state,
        tours: state.tours.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                commentDetail: [...comment, action.payload.comment],
                comments: [...item.comments, action.payload.comment._id]
              }
            : item
        ),
        tourHot: state.tourHot.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                commentDetail: [...comment, action.payload.comment],
                comments: [...item.comments, action.payload.comment._id]
              }
            : item
        )
      };
    }
    case TOUR_TYPES.UPDATE_COMMENT_TOUR: {
      return {
        ...state,
        tours: state.tours.map(item =>
          item._id === action.payload.tourId
            ? {
                ...item,
                commentDetail: item.commentDetail.map(comment =>
                  comment._id === action.payload.comment._id
                    ? action.payload.comment
                    : comment
                )
              }
            : item
        ),
        tourHot: state.tourHot.map(item =>
          item._id === action.payload.tourId
            ? {
                ...item,
                commentDetail: item.commentDetail.map(comment =>
                  comment._id === action.payload.comment._id
                    ? action.payload.comment
                    : comment
                )
              }
            : item
        )
      };
    }
    case TOUR_TYPES.DELETE_COMMENT_TOUR: {
      return {
        ...state,
        tours: state.tours.map(item =>
          item._id === action.payload.tourId
            ? {
                ...item,
                commentDetail: item.commentDetail.filter(
                  comment => comment._id !== action.payload.id
                ),
                comments: item.comments.filter(
                  comment => comment !== action.payload.id
                )
              }
            : item
        ),
        tourHot: state.tourHot.map(item =>
          item._id === action.payload.tourId
            ? {
                ...item,
                commentDetail: item.commentDetail.filter(
                  comment => comment._id !== action.payload.id
                ),
                comments: item.comments.filter(
                  comment => comment !== action.payload.id
                )
              }
            : item
        )
      };
    }
    case TOUR_TYPES.GET_TOURS_HOT: {
      return {
        ...state,
        tourHot: action.payload,
        loading: false
      };
    }
    case TOUR_TYPES.ERROR_TOUR: {
      return {
        ...state,
        loading: false,
        tours: [],
        page: 0,
        error: action.payload.error
      };
    }
    case TOUR_TYPES.LOADING_TOUR_FIRST: {
      return {
        ...state,
        loadingFirst: true,
        tours: null,
        page: 0
      };
    }
    default: {
      return state;
    }
  }
};

export default tourReducer;
