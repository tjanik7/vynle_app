import { GET_SPOTIFY_AUTH_STATUS } from '../actions/types'

const initialState = {
    isSpotifyAuthenticated: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SPOTIFY_AUTH_STATUS:
            return {
                ...state,
                isSpotifyAuthenticated: action.payload.status,
            }
        default:
            return state
    }
}