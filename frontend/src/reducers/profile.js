import { GET_ALBUM_DATA, GET_FAV_ALBUMS, SET_FAV_ALBUM } from '../actions/types'

const initialState = {
    // Must be init'd with map rather than fill since using fill to init an array of objects creates a
    // single static object
    favoriteAlbums: new Array(6).fill(null).map(() => (
        {
            albumID: '',
            fetched: false, // Update to true when response received (even if user has no album has been set at index)
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
        case GET_FAV_ALBUMS:  // Retrieves all 6 albums from backend
            const newAlbums = action.payload.albums
            let arr = []
            for (const newAlbum of newAlbums) {
                arr.push({
                    albumID: '',
                    fetched: true,
                    data: newAlbum,
                })
            }

            return {
                ...state,
                favoriteAlbums: arr,
            }
        case GET_ALBUM_DATA:
        case SET_FAV_ALBUM:
            // Keep original state array while only changing the selected index
            let favoriteAlbums = [...state.favoriteAlbums]

            favoriteAlbums[action.payload.ind] = {
                albumID: '',
                fetched: true,
                data: {
                    name: action.payload.album.name,
                    artist: action.payload.album.artist,
                    img: action.payload.album.img,
                }
            }

            return {
                ...state,
                favoriteAlbums: favoriteAlbums,
            }
        default:
            return state
    }
}