import axiosInstance from "../api/axiosInstance"
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_ERRORS,
    USER_LOGGED_OUT,
} from './types'

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING })

    axiosInstance
        .get('/users/auth/account', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
        dispatch({
            type: AUTH_ERROR
        })
    })
}


// LOGIN USER
export const login = (email, password) => dispatch => { // getState not needed since we aren't including a token with the request
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    // Request Body
    // identical to {email: email, password: password}
    const body = { email, password }

    axiosInstance
        .post('/users/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
        dispatch({
            type: LOGIN_FAIL
        })

        const errors = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })
}

// Create new user account
export const register = ({ email, password, username, first, last }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    // Request Body
    const body = { email, password, username, first, last }

    axiosInstance
        .post('/users/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
        dispatch({
            type: REGISTER_FAIL
        })

        const errors = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })
}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axiosInstance
        .post('/users/auth/logout', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            })
        }).catch(err => {
        console.log('error logging out')
        console.log(err)
    })

    dispatch({ type: USER_LOGGED_OUT })
}

// Setup config with token (helper function)
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }
    return config
}