import { combineReducers } from 'redux'
import posts from './posts'
import auth from './auth'
import errors from './errors'
import spotify from './spotify'
import spotifySearch from './spotifySearch'
import profile from './profile'
import { USER_LOGGED_OUT } from '../actions/types'
import postDetail from "./postDetail"

const appReducer = combineReducers({
    posts,
    auth,
    errors,
    spotify,
    spotifySearch,
    profile,
    postDetail,
})

const rootReducer = (state, action) => {
    if (action.type === USER_LOGGED_OUT) {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer