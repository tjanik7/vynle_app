import {
    FOLLOWED_USER,
    GET_ALBUM_DATA,
    GOT_USER_PROFILE,
    MARK_NOT_FETCHED,
    SET_FAV_ALBUM,
    UNFOLLOWED_USER
} from '../actions/types'

// Holds data for whichever profile the user is viewing in the profile detail view

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
    )),
    username: null,
    name: {
        first: null,
        last: null,
    },
    is_following: null,
    user_id: null,

}

export default function (state = initialState, action) {
    let favoriteAlbums // Declare before case statement since a variable can only be declared once

    switch (action.type) {
        case GOT_USER_PROFILE:
            const newAlbums = action.payload['favorite_albums']
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
                username: action.payload.username,
                name: {
                    first: action.payload['first'],  // .first may be a reserved word, so using []
                    last: action.payload['last'],
                },
                is_following: action.payload.is_following,
                user_id: action.payload['id'],
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
        case FOLLOWED_USER:
            return {
                ...state,
                is_following: true,
            }
        case UNFOLLOWED_USER:
            return {
                ...state,
                is_following: false,
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