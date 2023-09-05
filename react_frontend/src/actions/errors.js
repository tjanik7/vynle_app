import { CLEAR_ERRORS, GET_ERRORS } from './types'

// Clear all errors stored in redux state
export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}

// Add a new error to redux state
export const createError = err => dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: err
    })
}