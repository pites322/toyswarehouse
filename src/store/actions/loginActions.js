export const updateForm = (fields) => {
    return {
        type: 'updateForm',
        fields
    }
}

export const loadLocalToken = (token) => {
    return {
        type: 'loadLocalToken',
        token
    }
}
