// post actions
import axios from 'axios'
import { tokenConfig } from './auth'

import {
    GOT_POSTS, GET_POSTS, DELETE_POST,
    ADD_POST, GET_ERRORS, CLEAR_SUBMISSION_STATUS,
    GET_POST, GOT_POST, POST_NOT_FOUND, CLEAR_POST_DETAIL,
    RESET_POSTS_LOADING
} from './types'

export const addComment = (post_id, body) => (dispatch, getState) => {
    const requestBody = {
        'body': body,
        'post_id': post_id,
    }

    axios.post('/comment', requestBody, tokenConfig(getState))
        .then(res => {
            console.log('post created')
        })
}

export const clearPostDetail = () => (dispatch, getState) => {
    dispatch({ type: CLEAR_POST_DETAIL })
}

export const resetPostsLoading = () => (dispatch, getState) => {
    dispatch({ type: RESET_POSTS_LOADING })
}

export const getPost = post_id => (dispatch, getState) => {
    dispatch({type: GET_POST})  // Marks state as loading

    axios.get(`/api/post?post_id=${post_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GOT_POST,
                payload: res.data
            })
        }).catch(err => {
            const status = err.response.status
            if (status === 404) {
                dispatch({ type: POST_NOT_FOUND })
            }
    })
}

export const getPosts = () => (dispatch, getState) => {
    dispatch({type: GET_POSTS})  // Marks state as loading

    axios.get('/api/get-posts', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GOT_POSTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const deletePost = id => (dispatch, getState) => {
    axios.delete(`/api/posts/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        }).catch(err => console.log(err))
}

export const addPost = post => (dispatch, getState) => {

    axios.post('/api/posts/', post, tokenConfig(getState))
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