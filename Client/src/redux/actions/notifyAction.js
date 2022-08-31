import * as NOTIFY_TYPES from '../constants/notifyConstant';

export const getNotifies = (props) => {
    return {
        type: NOTIFY_TYPES.GET_NOTIFIES,
        payload: props,
    }
}

export const updateNotify = (props) => {
    return {
        type: NOTIFY_TYPES.UPDATE_NOTIFY,
        payload: props,
    }
}

export const createNotify = (props) => {
    return {
        type: NOTIFY_TYPES.CREATE_NOTIFY,
        payload: props
    }
}

export const deleteNotify = (props) => {
    return {
        type: NOTIFY_TYPES.DELETE_NOTIFY,
        payload: props
    }
}

export const markAllRead = (props) => {
    return {
        type: NOTIFY_TYPES.MARK_ALL_READ,
        payload: props
    }
}