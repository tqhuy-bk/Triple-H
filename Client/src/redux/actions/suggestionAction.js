import * as SUGGESTION_TYPES from '../constants/suggestionConstant';

export const getSuggestion = (props) => {
    return {
        type: SUGGESTION_TYPES.GET_SUGGESTION,
        payload: props,
    }
}

export const loading = (props) => {
    return {
        type: SUGGESTION_TYPES.LOADING,
    }
}

export const error = (props) => {
    return {
        type: SUGGESTION_TYPES.ERROR,
        payload: props,
    }
}