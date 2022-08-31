import * as NOTIFY_TYPES from '../constants/notifyConstant';
const INIT_STATE = {
    loading: false,
    data: []
}

const notifyReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case NOTIFY_TYPES.CREATE_NOTIFY:
            return {
                ...state,
                data: [action.payload, ...state.data]
            }
        case NOTIFY_TYPES.GET_NOTIFIES:
            return {
                ...state,
                data: action.payload
            }

        case NOTIFY_TYPES.UPDATE_NOTIFY:
            return {
                ...state,
                data: state.data.map(item => item._id === action.payload._id ?
                    {
                        ...item,
                        seen: action.payload.seen
                    } : item
                )
            }

        case NOTIFY_TYPES.DELETE_NOTIFY:
            return {
                ...state,
                data: state.data.filter(item => item._id !== action.payload._id)
            }
        case NOTIFY_TYPES.MARK_ALL_READ:
            return {
                ...state,
                data: state.data.map(item => ({
                    ...item,
                    seen: item.seen.map(item => item.id_recipient === action.payload.userId ? {
                        ...item,
                        isSeen: true
                    } : item)
                }))
            }
        default:
            return state;

    }
}

export default notifyReducer;