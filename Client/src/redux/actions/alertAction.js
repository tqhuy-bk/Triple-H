import * as ALERT_TYPES from '../constants/alertConstant';

export const loading = (props) => {
    return {
        type: ALERT_TYPES.LOADING_NOTIFY,
    }
}

export const success = (props) => {
    return {
        type: ALERT_TYPES.SUCCESS_NOTIFY,
        payload: props,
    }
}

export const error = (props) => {
    return {
        type: ALERT_TYPES.ERROR_NOTIFY,
        payload: props,
    }
}

export const reset = (props) => {
    return {
        type: ALERT_TYPES.RESET_NOTIFY,
        payload: props,
    }
}

