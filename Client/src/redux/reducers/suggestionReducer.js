import * as SUGGESTION_TYPES from '../constants/suggestionConstant';

const INIT_STATE = {
    suggestions: [],
    loading: false,
    error: null,
}

const suggestionReducer = (state, action) => {
    switch (action.type) {
        case SUGGESTION_TYPES.GET_SUGGESTION: {
            return {
                ...state,
                loading: false,
                error: null,
                suggestions: action.payload.suggestion
            }
        }
        case SUGGESTION_TYPES.LOADING: {
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case SUGGESTION_TYPES.ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        }
    }
}