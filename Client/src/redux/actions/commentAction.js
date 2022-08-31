
import * as POST_TYPES from '../constants/postConstant';
import * as TOUR_TYPES from '../constants/tourConstant';
import * as VOLUNTEER_TYPES from '../constants/volunteerConstant';
export const updateCommentPost = (props) => {
    return {
        type: POST_TYPES.UPDATE_COMMENT_POST,
        payload: props
    }
}

export const updateCommentTour = (props) => {
    return {
        type: TOUR_TYPES.UPDATE_COMMENT_TOUR,
        payload: props,
    }
}

export const updateCommentVolunteer = (props) => {
    return {
        type: VOLUNTEER_TYPES.UPDATE_COMMENT_VOLUNTEER,
        payload: props,
    }
}

export const addCommentPost = (props) => {
    return {
        type: POST_TYPES.ADD_COMMENT_POST,
        payload: props,
    }
}

export const addCommentTour = (props) => {
    return {
        type: TOUR_TYPES.ADD_COMMENT_TOUR,
        payload: props,
    }
}

export const addCommentVolunteer = (props) => {
    return {
        type: VOLUNTEER_TYPES.ADD_COMMENT_VOLUNTEER,
        payload: props,
    }
}

export const deleteCommentPost = (props) => {
    return {
        type: POST_TYPES.DELETE_COMMENT_POST,
        payload: props
    }
}

export const deleteCommentTour = (props) => {
    return {
        type: TOUR_TYPES.DELETE_COMMENT_TOUR,
        payload: props
    }
}
export const deleteCommentVolunteer = (props) => {
    return {
        type: VOLUNTEER_TYPES.DELETE_COMMENT_VOLUNTEER,
        payload: props
    }
}

export const loadCommentPost = (props) => {
    return {
        type: POST_TYPES.LOAD_COMMENT_POST,
        payload: props
    }
}

export const loadCommentTour = (props) => {
    return {
        type: TOUR_TYPES.LOAD_COMMENT_TOUR,
        payload: props
    }
}

export const loadCommentVolunteer = (props) => {
    return {
        type: VOLUNTEER_TYPES.LOAD_COMMENT_VOLUNTEER,
        payload: props
    }
}