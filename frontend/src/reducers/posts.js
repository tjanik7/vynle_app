import { GET_POSTS, DELETE_POST, ADD_POST } from '../actions/types.js';

const initialState = {
    posts: []
};

export default function (state = initialState, action) {
    // evaluate action type that is sent via switch block
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
            };
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload] // append created post to state array
            };
        default:
            return state;
    }

}