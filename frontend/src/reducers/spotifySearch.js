import { SEND_QUERY, UPDATE_SELECTION } from '../actions/types'

const initialState = {
    albums: [], // Albums returned from query
    tracks: [], // Tracks returned from query
    selection: null, // Album/track user selects with the spotify search component
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SEND_QUERY:
            let albums = []
            let tracks = []
            if ('albums' in action.payload) {
                albums = action.payload.albums.items
            }
            if ('tracks' in action.payload) {
                tracks = action.payload.tracks.items
            }


            return {
                ...state,
                albums: albums,
                tracks: tracks,
            }
        case UPDATE_SELECTION:
            return {
                ...state,
                selection: action.payload,
            }
        default:
            return state
    }
}