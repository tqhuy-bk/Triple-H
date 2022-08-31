import * as MESSAGE_TYPES from '../constants/messageConstant';

export const addUser = (props) => {
    return {
        type: MESSAGE_TYPES.ADD_USER,
        payload: props,
    }
}

export const addMessage = (props) => {
    return{
        type: MESSAGE_TYPES.ADD_MESSAGE,
        payload: props
    }
}

export const getConversations = (props) => {
    return{
        type: MESSAGE_TYPES.GET_CONVERSATIONS,
        payload: props
    }
}

export const getMessages = (props) =>{
    return{
        type: MESSAGE_TYPES.GET_MESSAGES,
        payload: props
    }
}

export const deleteConversation = (props) =>{
    return{
        type: MESSAGE_TYPES.DELETE_CONVERSATION,
        payload: props
    }
}

export const seenMessage = (props) =>{
    return{
        type: MESSAGE_TYPES.SEEN_MESSAGE,
        payload: props
    }
}

export const changeName = (props) =>{
    return{
        type: MESSAGE_TYPES.CHANGE_NAME,
        payload: props
    }
}

export const groupAdd = (props) =>{
    return{
        type: MESSAGE_TYPES.GROUP_ADD,
        payload: props
    }
}

export const groupMove = (props) =>{
    return{
        type: MESSAGE_TYPES.GROUP_MOVE,
        payload: props
    }
}
