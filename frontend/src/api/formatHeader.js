// Similar to tokenConfig, but token is directly passed to this function (useful when not sending request through redux)
export const formatHeader = (token, params = null) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }
    if (params) {  // Optionally add query params to config object if supplied
        config.params = params
    }

    return config
}