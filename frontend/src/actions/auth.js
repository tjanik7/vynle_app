import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

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

    axios
        .get('/users/auth/account', config)
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

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
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

    axios
        .post('/users/auth/logout', null, config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        }).catch(err => {
        console.log('error logging out');
        console.log(err);
    });
};
