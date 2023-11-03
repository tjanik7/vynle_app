// Actions for profile
import { tokenConfig } from './auth'
import { GOT_USER_PROFILE, MARK_NOT_FETCHED, SET_FAV_ALBUM } from './types'
import axiosInstance from "../api/axiosInstance"


export const setFavAlbum = (albumObj, ind) => (dispatch, getState) => {
    const albumData = getState().profile.favoriteAlbums[ind]

    // Mark album in state as not fetched to induce loading animation
    dispatch({
        type: MARK_NOT_FETCHED,
        payload: {
            album: albumData,
            ind: ind,
        }
    })

    const headers = tokenConfig(getState)
    const params = {
        album_id: albumObj.spotify_release_uri,
        ind: ind,
    }

    axiosInstance.post('/spotify/set-fav-album', params, headers)
        .then(res => {
            dispatch({
                type: SET_FAV_ALBUM,
                payload: {
                    album: res.data,
                    ind: ind,
                }
            })
        })
}

export const getUserProfile = username => (dispatch, getState) => {
    axiosInstance.get(`/users/${username}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GOT_USER_PROFILE,
                payload: res.data,
            })
        }).catch(err => {
            console.log(err)
        })
}
