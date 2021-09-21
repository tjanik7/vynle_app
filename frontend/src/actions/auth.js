import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios
        .get('/users/auth/account', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
        console.log(err);
        dispatch({
            type: AUTH_ERROR
        });
    });
};


// LOGIN USER
export const login = (email, password) => dispatch => { // getState not needed since we aren't including a token with the request
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    // identical to {email: email, password: password}
    const body = { email, password };

    axios
        .post('/users/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
        console.log(err);
        dispatch({
            type: LOGIN_FAIL
        });
    });
};

// REGISTER USER
export const register = ({ email, password, username, first, last }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = { email, password, username, first, last };

    axios
        .post('/users/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
        console.log(err);
        dispatch({
            type: REGISTER_FAIL
        });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios
        .post('/users/auth/logout', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        }).catch(err => {
        console.log('error logging out');
        console.log(err);
    });
};

// Setup config with token (helper function)
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
};
