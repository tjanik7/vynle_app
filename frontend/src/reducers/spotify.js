import {
    GET_SPOTIFY_AUTH_STATUS,
    GET_SPOTIFY_AUTH_URL,
    GET_CURRENT_USER_SPOTIFY_PROFILE,
} from '../actions/types'

const initialState = {
    isSpotifyAuthenticated: null, // null by default until auth status is loaded
    url: '', // used for redirect if user needs to authenticate with spotify
    id: '', // user's spotify username
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SPOTIFY_AUTH_STATUS:
            return {
                ...state,
                isSpotifyAuthenticated: action.payload.status,
            }
        case GET_SPOTIFY_AUTH_URL:
            return {
                ...state,
                url: action.payload.url,
            }
        case GET_CURRENT_USER_SPOTIFY_PROFILE:
            return {
                ...state,
                id: action.payload.id
            }
        default:
            return state
    }
}