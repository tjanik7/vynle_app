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
    return 'http://localhost:8001/static/' + file
}