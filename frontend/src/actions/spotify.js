import axios from 'axios'

import { tokenConfig } from './auth'
import { GET_SPOTIFY_AUTH_STATUS, GET_SPOTIFY_AUTH_URL, GET_CURRENT_USER_SPOTIFY_PROFILE } from './types'

export const getCurrentUserSpotifyProfile = () => (dispatch, getState) => {
    axios.get('spotify/get-current-user-spotify-profile', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CURRENT_USER_SPOTIFY_PROFILE,
                payload: res.data
            })
        })
}

export const getSpotifyAuthStatus = () => (dispatch, getState) => {
    axios.get('/spotify/is-spotify-authenticated', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SPOTIFY_AUTH_STATUS,
                payload: res.data
            })
        })
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