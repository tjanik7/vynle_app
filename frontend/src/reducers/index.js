import { combineReducers } from 'redux'
import posts from './posts'
import auth from './auth'
import errors from './errors'
import spotify from './spotify'

export default combineReducers({
    posts,
    auth,
    errors,
    spotify,
})