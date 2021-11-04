import { SEARCH_SPOTIFY } from '../actions/types'

const initialState = {
    albums: [],
    tracks: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_SPOTIFY:
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
        default:
            return state
    }
}