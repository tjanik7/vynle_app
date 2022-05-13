import axios from 'axios'
import { tokenConfig } from './auth'
import { SEND_QUERY, UPDATE_SELECTION, CLEAR_SEARCH_RESULTS, SEARCH_VISIBLE, SEARCH_INVISIBLE } from './types'

// Make a search query using the Spotify API
export const search = (q, mediaType) => (dispatch, getState) => {
    const data = {
        headers: tokenConfig(getState).headers,
        params: { q: q, type: mediaType }
    }
    axios.get('/spotify/search-spotify', data)
        .then(res => {
            dispatch({
                type: SEND_QUERY,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const setSearchVisibility = visibility => dispatch => {
    if (visibility) {
        dispatch({
            type: SEARCH_VISIBLE,
        })
    } else {
        dispatch({
            type: SEARCH_INVISIBLE,
        })
    }
}

export const updateSelection = s => dispatch => {
    dispatch({
        type: UPDATE_SELECTION,
        payload: s,
    })
}

export const clearSearchResults = () => dispatch => {
    dispatch({
        type: CLEAR_SEARCH_RESULTS,
    })
}