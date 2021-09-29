import axios from 'axios'

import { tokenConfig } from './auth'
import { GET_SPOTIFY_AUTH_STATUS } from './types'

export const getSpotifyAuthStatus = () => (dispatch, getState) => {
    axios.get('/spotify/is-spotify-authenticated', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SPOTIFY_AUTH_STATUS,
                payload: res.data
            })
        })
}