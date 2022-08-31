import * as MESSAGE_TYPES from "../constants/messageConstant";

const INIT_STATE = {
    conversations: [],
    data: [],
    firstLoad: false
}

const messageReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case MESSAGE_TYPES.ADD_USER:
            if (state.conversations.every(item => item._id !== action.payload._id)) {
                return {
                    ...state,
                    conversations: [action.payload, ...state.conversations]
                };
            }
            return state;
        case MESSAGE_TYPES.ADD_MESSAGE:{
            var tempData= [];
            if(state.data.length >0){
                if(state.data[0].conversation === action.payload.conversation){
                    tempData = [...state.data, action.payload];
                }else{
                    tempData = [...state.data]
                }
            }else{
                tempData = [action.payload]
            }
            return {
                ...state,
                data: tempData,
                conversations: state.conversations.map(item =>
                    item._id === action.payload.conversation
                        ? { ...item, latestMessage: {
                            text: action.payload.text,
                            seen: [action.payload.sender].concat(action.payload.members)
                                    .map(item => item._id === action.payload.sender._id ? {
                                    member: item._id,
                                    isSeen: true
                                }: {member: item._id, isSeen: false}),
                            createdAt: action.payload.createdAt,
                            sender: action.payload.sender
                        } }
                        : item
                )
            }
        }
        case MESSAGE_TYPES.GET_CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload,
                firstLoad: true
            }
        case MESSAGE_TYPES.SEEN_MESSAGE:
            return {
                ...state,
                conversations: state.conversations.map(conversation =>
                    conversation._id === action.payload.id
                        ? { ...conversation, latestMessage: {
                            ...conversation.latestMessage,
                            seen: conversation.latestMessage.seen?.map(item =>
                                item.member === action.payload.member ?
                                {
                                    ...item,
                                    isSeen: true
                                }:
                                    item
                                )
                        } }
                        : conversation
                )
            }
        case MESSAGE_TYPES.GET_MESSAGES:
            return {
                ...state,
                data: action.payload
            }
        case MESSAGE_TYPES.DELETE_CONVERSATION:
            return {
                ...state,
                conversations: state.conversations.filter(user => user._id !== action.payload),
                data: []
            };
        case MESSAGE_TYPES.CHANGE_NAME:
            return {
                ...state,
                conversations: state.conversations.map(conversation => conversation._id === action.payload.id ?
                        {
                            ...conversation,
                            name: action.payload.name
                        }:
                        conversation
                    )
            };
        case MESSAGE_TYPES.GROUP_ADD:
            return {
                ...state,
                conversations: state.conversations.map(conversation => conversation._id === action.payload.id ?
                        {
                            ...conversation,
                            members: [...conversation.members, action.payload.user]
                        }:
                        conversation
                    )
            };
        case MESSAGE_TYPES.GROUP_MOVE:
            return {
                ...state,
                conversations: state.conversations.map(conversation => conversation._id === action.payload.id ?
                        {
                            ...conversation,
                            members: conversation.members.filter(
                                member => member._id !== action.payload.user._id
                              )
                        }:
                        conversation
                    )
            };
        default:
            return state;

    }
}

export default messageReducer;