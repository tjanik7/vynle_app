import {
    GOT_POSTS,
    GET_POSTS,
    DELETE_POST,
    ADD_POST,
    CLEAR_SUBMISSION_STATUS,
    GOT_POST,
    GET_POST
} from '../actions/types.js'

const initialState = {
    submissionStatus: '',  // One of {'', 'submitting', 'submitted', 'error'}
    posts: [],
    postsLoading: null,
    postDetail: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GOT_POST:
            return {
                ...state,
                postsLoading: false,
                postDetail: action.payload,
            }
            case GET_POST:
            case GET_POSTS:
            return {
                ...state,
                postsLoading: true,
            }
        case GOT_POSTS:
            return {
                ...state,
                postsLoading: false,
                posts: action.payload,
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
            }
        case ADD_POST:
            return {
                ...state,
                submissionStatus: 'submitted',
                posts: [...state.posts, action.payload] // append created post to state array
            }
        case CLEAR_SUBMISSION_STATUS:
            return {
                ...state,
                submissionStatus: '',
            }
        default:
            return state
    }

}