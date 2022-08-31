import * as POST_TYPES from '../constants/postConstant';

const INIT_STATE = {
  id: 0,
  postId: [],
  posts: null,
  page: 0,
  scrollTop: false,
  loading: false,
  error: null,
  hasMore: true,
  loadingFirst: false
};

const postRecuder = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_TYPES.GET_POSTS: {
      // tai danh sach cac post (thanh cong)
      return {
        ...state,
        posts: action.payload.posts,
        page: 1,
        loadingFirst: false,
        error: null,
        hasMore: action.payload.postId?.length > 0,
        postId: action.payload.postId,
        id: action.payload.id
      };
    }
    case POST_TYPES.LOADING_FISRT: {
      return {
        ...state,
        loadingFirst: true,
        posts: null,
        page: 0
      };
    }
    case POST_TYPES.ADD_POST: {
      let newPosts;
      if (!state.posts) newPosts = [action.payload.post];
      else newPosts = [action.payload.post, ...state.posts];
      return {
        ...state,
        posts: newPosts,
        loading: false,
        error: null
      };
    }
    case POST_TYPES.GET_MORE_POSTS: {
      const postId = state.postId.slice(10);
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        page: state.page + 1,
        loading: false,
        error: null,
        hasMore: postId.length > 0,
        postId: postId
      };
    }
    case POST_TYPES.LOADING_POST: {
      // dang tai danh sach
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case POST_TYPES.DELETE_POST: {
      if (!state.posts)
        return {
          ...state
        };
      return {
        ...state,
        error: null,
        posts: state.posts.filter(post => post._id !== action.payload.id)
      };
    }
    case POST_TYPES.UPDATE_POST: {
      if (!state.posts)
        return {
          ...state
        };
      return {
        ...state,
        error: null,
        posts: state.posts.map(post =>
          post._id === action.payload.post._id ? action.payload.post : post
        )
      };
    }
    case POST_TYPES.UPDATE_LIKE_POST: {
      return {
        ...state,
        posts: state.posts.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                likes: action.payload.likes
              }
            : item
        )
      };
    }
    case POST_TYPES.LOAD_COMMENT_POST: {
      let comment =
        state.posts.find(item => item._id === action.payload.id)
          ?.commentDetail || [];
      return {
        ...state,
        posts: state.posts.map(item =>
          item._id === action.payload.id
            ? {
                ...item,
                commentDetail: [...comment, ...action.payload.comments]
              }
            : item
        )
      };
    }
    case POST_TYPES.ADD_COMMENT_POST: {
      let comment =
        state.posts.find(item => item._id === action.payload.id)
          ?.commentDetail || [];
      return {
        ...state,
        posts: state.posts.map(item =>
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
    case POST_TYPES.UPDATE_COMMENT_POST: {
      return {
        ...state,
        posts: state.posts.map(item =>
          item._id === action.payload.postId
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
    case POST_TYPES.DELETE_COMMENT_POST: {
      return {
        ...state,
        posts: state.posts.map(item =>
          item._id === action.payload.postId
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
    case POST_TYPES.ERROR_POST: {
      // loi trong khi tai danh sach cac post
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
};

export default postRecuder;
