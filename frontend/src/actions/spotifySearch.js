// Actions for <Search/>

import axiosInstance from "../api/axiosInstance"
import {
    SEND_QUERY,
    UPDATE_SELECTION,
    CLEAR_SEARCH_RESULTS,
    SEARCH_VISIBLE,
    SEARCH_INVISIBLE,
    SET_SELECTED_INDEX,
} from './types'
import { tokenConfig } from "../api/tokenConfig"

// Make a search query using the Spotify API
export const search = (q) => (dispatch, getState) => {
    const data = {
        headers: tokenConfig(getState).headers,
        params: { q: q }
    }
    axiosInstance.get('/spotify/search-spotify', data)
        .then(res => {
            dispatch({
                type: SEND_QUERY,
                payload: res.data
            })
        }).catch(err => console.log(err))
}


export const setSelectedIndex = selectedIndex => dispatch => {
    dispatch({
        type: SET_SELECTED_INDEX,
        payload: selectedIndex,
    })
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