import * as VOLUNTEER_TYPES from '../constants/volunteerConstant';

export const getVolunteers = (props) => {
    return {
        type: VOLUNTEER_TYPES.GET_VOLUNTEERS,
        payload: props,
    }
}

export const addVolunteer = (props) => {
    return {
        type: VOLUNTEER_TYPES.ADD_VOLUNTEER,
        payload: props,
    }
}

export const updateVolunteer = (props) => {
    return {
        type: VOLUNTEER_TYPES.UPDATE_VOLUNTEER,
        payload: props,
    }
}

export const deleteVolunteer = (props) => {
    return {
        type: VOLUNTEER_TYPES.DELETE_VOLUNTEER,
        payload: props,
    }
}

export const updateJoin = (props) => {
    return {
        type: VOLUNTEER_TYPES.UPDATE_JOIN,
        payload: props,
    }
}

export const updateJoinOne = (props) => {
    return {
        type: VOLUNTEER_TYPES.UPDATE_JOIN_ONE,
        payload: props,
    }
}

export const loading = (props) => {
    return {
        type: VOLUNTEER_TYPES.LOADING_VOLUNTEER,
        payload: props,
    }
}

export const error = (props) => {
    return {
        type: VOLUNTEER_TYPES.ERROR_VOLUNTEER,
        payload: props,
    }
}