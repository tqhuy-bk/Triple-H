import * as ALERT_TYPES from '../constants/alertConstant';

const INIT_STATE = {
    loading: false,
    success: false,
    error: false,
    message: "",
}

const alertReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ALERT_TYPES.LOADING_NOTIFY: { // bat dau goi api
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                message: "",
            }
        }
        case ALERT_TYPES.SUCCESS_NOTIFY: {
            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                message: action.payload.message,
            }
        }
        case ALERT_TYPES.ERROR_NOTIFY: {
            return {
                ...state,
                loading: false,
                success: false,
                error: true,
                message: action.payload.message,
            }
        }
        case ALERT_TYPES.RESET_NOTIFY: {
            return INIT_STATE
        }
        default: {
            return state
        }
    }
}

export default alertReducer;