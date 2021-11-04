import axios from 'axios'
import { tokenConfig } from './auth'
import { SEARCH_SPOTIFY } from './types'

// Make a search query using the Spotify API
export const search = (q) => (dispatch, getState) => {
    //axios.get('/spotify/search-spotify?q=rodeo&type=album', tokenConfig(getState))
    const data = {
        headers: tokenConfig(getState).headers,
        params: { q: q, type: 'album,track' }
    }
    axios.get('/spotify/search-spotify', data)
        .then(res => {
            dispatch({
                type: SEARCH_SPOTIFY,
                payload: res.data
            })
        }).catch(err => console.log(err))
}