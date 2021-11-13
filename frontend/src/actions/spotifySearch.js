import axios from 'axios'
import { tokenConfig } from './auth'
import { SEND_QUERY, UPDATE_SELECTION } from './types'

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

export const updateSelection = s => (dispatch, getState) => {
    dispatch({
        type: UPDATE_SELECTION,
        payload: s,
    })
}