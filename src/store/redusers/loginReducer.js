

const initialState = {
    username: '',
    token: '',
    error: null,
    form: {
    }
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'auth':
            console.log(action.subtype === 'success', action.saveToken)
            if (action.subtype === 'success' && action.saveToken){
                localStorage.setItem('token', action.token)
            }
            return {
                ...state,
                token: action.subtype === 'success' ? action.token : null,
                username: action.subtype === 'success' ? action.username : null,
                loading: action.subtype === 'loading',
                error: action.subtype === 'failed' ? action.error : null
            }
        case 'updateForm':
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.fields
                }
            }
        case 'loadLocalToken':
            return {
                ...state,
                token: action.token
            }
        default:
            return state
    }
}
