import { CLEAR_POST_DETAIL, GET_POST, GOT_POST, POST_NOT_FOUND } from "../actions/types"

const initialState = {
    post: null,
    errorStatus: null,
    loading: null,
}

export default function(state=initialState, action) {
    switch (action.type) {
        case CLEAR_POST_DETAIL:
            return {
                ...state,
                errorStatus: null,
                post: null,
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
                postsLoading: true,
            }
        default:
            return state
    }
}