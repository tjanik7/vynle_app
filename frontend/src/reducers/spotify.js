import {
    GET_SPOTIFY_AUTH_STATUS,
    GET_SPOTIFY_AUTH_URL,
    SPOTIFY_AUTH_LOADED,
    SPOTIFY_AUTH_LOADING
} from '../actions/types'

const initialState = {
    isSpotifyAuthenticated: false,
    url: '',
    loading: true,
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
        case SPOTIFY_AUTH_LOADING:
            return {
                ...state,
                loading: true,
            }
        case SPOTIFY_AUTH_LOADED:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}