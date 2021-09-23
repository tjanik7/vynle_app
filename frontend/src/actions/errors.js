import { CLEAR_ERRORS } from './types'

// Clear all errors stored in redux state
export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}