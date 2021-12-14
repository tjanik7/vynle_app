import { tokenConfig } from './auth'
import { GET_ALBUM_DATA } from './types'
import axios from 'axios'

export const getAlbumData = (ind, album_id) => (dispatch, getState) => {
    const data = {
        headers: tokenConfig(getState).headers,
        params: { album_id }
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