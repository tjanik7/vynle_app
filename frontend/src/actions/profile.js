import { tokenConfig } from './auth'
import { GET_ALBUM_DATA, SET_FAV_ALBUM } from './types'
import axios from 'axios'


export const setFavAlbum = (album_id, ind) => (dispatch, getState) => {
    const headers = tokenConfig(getState)
    const params = { album_id, ind }
    axios.post('/spotify/set-fav-album', params, headers)
        .then(res => {
            dispatch({
                type: GET_ALBUM_DATA,
                payload: {
                    album: res.data,
                    ind: ind,
                }
            })
        })
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