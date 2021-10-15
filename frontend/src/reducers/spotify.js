import {
    GET_SPOTIFY_AUTH_STATUS,
    GET_SPOTIFY_AUTH_URL,
    SPOTIFY_AUTH_LOADED,
    SPOTIFY_AUTH_LOADING,
} from '../actions/types'

const initialState = {
    isSpotifyAuthenticated: null, // null by default until auth status is loaded
    url: '', // used for redirect if user needs to authenticate with spotify
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
        default:
            return state
    }
}