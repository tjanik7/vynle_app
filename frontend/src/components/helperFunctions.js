import { serverLocation } from "../api/serverLocation"

export const getFieldHasErrorObj = (fields, errors) => {
    let fieldHasError = {}
    for (const field of fields) {
        fieldHasError[field] = false
    }
    if (errors.status === null) {
        return fieldHasError
    }
    for (const field of fields) {
        fieldHasError[field] = field in errors.msg
    }
    return fieldHasError
}

export const buildStaticUrl = (file) => {
    // return serverLocation + '/static/' + file
    return 'https://vynle.com' + '/static/' + file
}