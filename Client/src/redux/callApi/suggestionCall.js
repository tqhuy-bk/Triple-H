import * as suggestionAction from '../actions/suggestionAction';

export const getSuggestion = (data) => async (dispatch) => {
    dispatch(suggestionAction.loading());

    try {

        const res = [];

        dispatch(suggestionAction.getSuggestion({ suggestion: res }))
    }
    catch (err) {
        // dispatch(suggestionAction.error({ error: err.response.data.message }));
    }

}