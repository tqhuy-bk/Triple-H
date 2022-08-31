import * as HELP_TYPES from '../constants/helpConstant';

export const addHelp = (props) => {
    return {
        type: HELP_TYPES.ADD_HELP,
        payload: props
    }
}

export const updateHelp = (props) => {
    return {
        type: HELP_TYPES.UPDATE_HELP,
        payload: props
    }
}

export const deleteHelp = (props) => {
    return {
        type: HELP_TYPES.DELETE_HELP,
        payload: props
    }
}

export const getHelpsAction = (props) => {
    return {
        type: HELP_TYPES.GET_HELPS,
        payload: props
    }
}