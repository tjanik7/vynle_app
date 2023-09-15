import {
    ADD_COMMENT,
    CLEAR_COMMENTS,
    CLEAR_POST_DETAIL,
    GET_POST,
    GOT_COMMENTS,
    GOT_POST,
    POST_NOT_FOUND
} from "../actions/types"

const initialState = {
    post: null,
    errorStatus: null,
    loading: null,
    comments: [],
}

export default function(state=initialState, action) {
    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        case GOT_COMMENTS:
            return {
                ...state,
                comments: [...action.payload],
            }
        case CLEAR_POST_DETAIL:
            return {
                ...state,
                errorStatus: null,
                post: null,
                loading: null,
                comments: [],
            }
        case POST_NOT_FOUND:
            return {
                ...state,
                errorStatus: '404',
            }
        case GOT_POST:
            return {
                ...state,
                loading: false,
                post: action.payload,
            }
        case GET_POST:
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }
}