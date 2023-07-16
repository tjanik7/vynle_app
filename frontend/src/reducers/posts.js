import { GOT_POSTS, GET_POSTS, DELETE_POST, ADD_POST , CLEAR_SUBMISSION_STATUS} from '../actions/types.js'

const initialState = {
    submissionStatus: '',  // One of {'', 'submitting', 'submitted', 'error'}
    posts: [],
    postsLoading: null,
}

export default function (state = initialState, action) {
    // evaluate action type that is sent via switch block
    switch (action.type) {
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