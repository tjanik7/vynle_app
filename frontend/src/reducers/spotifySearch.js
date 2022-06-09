import {
    CLEAR_SEARCH_RESULTS,
    SEARCH_INVISIBLE,
    SEARCH_VISIBLE,
    SEND_QUERY,
    SET_SELECTED_INDEX,
    UPDATE_SELECTION
} from '../actions/types'

const initialState = {
    albums: [], // Albums returned from query
    tracks: [], // Tracks returned from query
    selection: null, // Album/track user selects with the spotify search component
    isVisible: false, // Tracks whether search tool should appear on screen
    selectedIndex: -1, // Last clicked favorite album index - sent in SetFavAlbum request to track which index to set
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
        case SET_SELECTED_INDEX:
            return {
                ...state,
                selectedIndex: action.payload,
            }
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                albums: [],
                tracks: [],
            }
        case SEARCH_VISIBLE:
            return {
                ...state,
                isVisible: true,
            }
        case SEARCH_INVISIBLE:
            return {
                ...state,
                isVisible: false,
            }
        default:
            return state
    }
}