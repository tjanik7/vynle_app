import { combineReducers } from 'redux'
import posts from './posts'
import auth from './auth'
import errors from './errors'
import spotify from './spotify'
import { USER_LOGGED_OUT } from '../actions/types'

// ORIGINAL
// export default combineReducers({
//     posts,
//     auth,
//     errors,
//     spotify,
// })  // FIGURE OUT HOW TO COMPLETELY RESET REDUX STATE WHEN A USER LOGS OUT
// END ORIGINAL

const appReducer = combineReducers({
    posts,
    auth,
    errors,
    spotify,
})

const rootReducer = (state, action) => {
    if (action.type === USER_LOGGED_OUT) {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer