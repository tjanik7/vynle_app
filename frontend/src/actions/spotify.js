import axios from 'axios'

import { tokenConfig } from './auth'
import { GET_SPOTIFY_AUTH_STATUS, GET_SPOTIFY_AUTH_URL, SPOTIFY_AUTH_LOADED, SPOTIFY_AUTH_LOADING } from './types'

export const getSpotifyAuthStatus = () => (dispatch, getState) => {
    dispatch({ type: SPOTIFY_AUTH_LOADING })
    axios.get('/spotify/is-spotify-authenticated', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SPOTIFY_AUTH_STATUS,
                payload: res.data
            })
        })
    dispatch({ type: SPOTIFY_AUTH_LOADED })
}

export const getSpotifyAuthURL = () => (dispatch, getState) => {
    axios.get('/spotify/get-auth-url', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SPOTIFY_AUTH_URL,
                payload: res.data
            })
        })
}