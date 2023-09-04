// postDetail actions
import axiosInstance from "../api/axiosInstance"
import { ADD_COMMENT, CLEAR_POST_DETAIL, GET_POST, GOT_COMMENTS, GOT_POST, POST_NOT_FOUND } from "./types"
import { tokenConfig } from "./auth"

export const clearPostDetail = () => (dispatch, getState) => {
    dispatch({ type: CLEAR_POST_DETAIL })
}

export const getPost = post_id => (dispatch, getState) => {
    dispatch({type: GET_POST})  // Marks state as loading

    axiosInstance.get(`/api/post?post_id=${post_id}`, tokenConfig(getState))
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

export const getComments = post_id => (dispatch, getState) => {
    axiosInstance.get(`/api/comment?post_id=${post_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GOT_COMMENTS,
                payload: res.data,
            })
        }).catch(err => {
            console.log(err)
    })
}

export const addComment = (post_id, body) => (dispatch, getState) => {
    const requestBody = {
        'body': body,
        'post_id': post_id,
    }

    axiosInstance.post('/api/comment', requestBody, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_COMMENT,
                payload: res.data,
            })
        })
        .catch(err => {
            console.log(err)
        })
}