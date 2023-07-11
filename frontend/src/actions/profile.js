// Actions for profile
import { tokenConfig } from './auth'
import { GET_ALBUM_DATA, GET_FAV_ALBUMS, MARK_NOT_FETCHED, SET_FAV_ALBUM } from './types'
import axios from 'axios'


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
        album_id: albumObj.albumID,
        ind: ind,
    }

    axios.post('/spotify/set-fav-album', params, headers)
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

export const getFavAlbums = () => (dispatch, getState) => {
    axios.get('/spotify/get-fav-albums', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_FAV_ALBUMS,
                payload: {
                    albums: res.data,
                }
            })
        }).catch(err => console.log(err))
}

export const getAlbumData = (ind) => (dispatch, getState) => {
    const data = {
        headers: tokenConfig(getState).headers,
        params: {
            ind,
        }
    }
    axios.get('/spotify/get-album', data)
        .then(res => {
            dispatch({
                type: GET_ALBUM_DATA,
                payload: {
                    album: res.data,
                    ind: ind,
                }
            })
        }).catch(err => console.log(err))
}