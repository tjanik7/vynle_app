// post actions
import axios from 'axios'
import { tokenConfig } from './auth'

import { GOT_POSTS, GET_POSTS, DELETE_POST, ADD_POST, GET_ERRORS, CLEAR_SUBMISSION_STATUS } from './types'

// GET POSTS
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

// DELETE POSTS
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