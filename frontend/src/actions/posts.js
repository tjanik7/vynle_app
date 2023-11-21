// post actions
import axiosInstance from "../api/axiosInstance"

import {
    ADD_POST,
    CLEAR_SUBMISSION_STATUS,
    DELETE_POST,
    GET_ERRORS,
    GET_POSTS,
    GOT_POSTS,
    RESET_POSTS_LOADING,
    SPOTIFY_UNAUTHORIZED
} from './types'
import { tokenConfig } from "../api/tokenConfig"
import { formatHeader } from "../api/formatHeader"

export const resetPostsLoading = () => (dispatch, getState) => {
    dispatch({ type: RESET_POSTS_LOADING })
}

export const getPosts = () => (dispatch, getState) => {
    dispatch({type: GET_POSTS})  // Marks state as loading

    axiosInstance.get('/posts/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GOT_POSTS,
                payload: res.data
            })
        }).catch(err => {
            if(err.response.status === 401) { // If user not authenticated with Spotify
                dispatch({type: SPOTIFY_UNAUTHORIZED})

            } else {
                console.log(err)
            }
        })
}

// Keep in mind this is not using redux
export const getUserPosts = (username, setPosts, token) => {
    let resp_code = null
    // Gets posts by a certain user (used within Profile component)
    axiosInstance.get(`/posts/user-posts/${username}`, formatHeader(token))
        .then(res => {
            setPosts(res.data)
            resp_code = res.status
        }).catch(err => {
        console.log(err)
        resp_code = err.response.status
    })
    return resp_code
}

export const deletePost = id => (dispatch, getState) => {
    axiosInstance.delete(`/posts/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        }).catch(err => console.log(err))
}

export const addPost = post => (dispatch, getState) => {

    axiosInstance.post('/posts/', post, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        }).catch(err => {
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

export const clearPostSubmissionStatus = () => dispatch => {
    dispatch({
        type: CLEAR_SUBMISSION_STATUS,
    })
}
