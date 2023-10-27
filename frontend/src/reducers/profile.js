import { GET_ALBUM_DATA, GET_FAV_ALBUMS, MARK_NOT_FETCHED, SET_FAV_ALBUM } from '../actions/types'

const initialState = {
    // Must be init'd with map rather than fill since using fill to init an array of objects creates a
    // single static object
    favoriteAlbums: new Array(6).fill(null).map(() => (
        {
            spotify_release_uri: '',
            fetched: false, // Update to true when response received (even if user has no album has been set at index)
            release: {
                name: null,
                artist: null,
                img: null,
            },
        }
    ))
}

export default function (state = initialState, action) {
    let favoriteAlbums // Declare before case statement since a variable can only be declared once

    switch (action.type) {
        case GET_FAV_ALBUMS:  // Retrieves all 6 albums from backend
            const newAlbums = action.payload.albums
            let arr = []
            for (const newAlbum of newAlbums) {
                arr.push({
                    spotify_release_uri: '',
                    fetched: true,
                    release: newAlbum,
                })
            }

            return {
                ...state,
                favoriteAlbums: arr,
            }
        case MARK_NOT_FETCHED:
            favoriteAlbums = [...state.favoriteAlbums]

            favoriteAlbums[action.payload.ind] = {
                spotify_release_uri: '',
                fetched: false,
                release: {  // Keep this is old album data, so it doesn't disappear during load
                    name: action.payload.album.name,
                    artist: action.payload.album.artist,
                    img: action.payload.album.img,
                }
            }
            return {
                ...state,
                favoriteAlbums: favoriteAlbums,
            }
        case GET_ALBUM_DATA:
        case SET_FAV_ALBUM:
            // Keep original state array while only changing the selected index
            favoriteAlbums = [...state.favoriteAlbums]

            favoriteAlbums[action.payload.ind] = {
                spotify_release_uri: '',
                fetched: true,
                release: {
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