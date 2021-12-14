import { GET_ALBUM_DATA } from '../actions/types'

const initialState = {
    // Must be init'd with map rather than fill since using fill to init an array of objects creates a
    // single static object
    favoriteAlbums: new Array(6).fill(null).map(() => (
        {
            albumID: '',
            data: {
                name: null,
                artist: null,
                img: null,
            },
        }
    ))
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALBUM_DATA:
            // Keep original state array while only changing the selected index
            let favoriteAlbums = [...state.favoriteAlbums]
            favoriteAlbums[action.payload.ind].data = action.payload.album
            return {
                ...state,
                favoriteAlbums: favoriteAlbums,
            }
        default:
            return state
    }
}