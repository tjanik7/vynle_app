import { SEARCH_SPOTIFY } from '../actions/types'

const initialState = {
    queryResults: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_SPOTIFY:
            return {
                ...state,
                queryResults: action.payload.albums.items,
            }
        default:
            return state
    }
}