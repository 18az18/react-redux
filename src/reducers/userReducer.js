import * as actions from '../actions/types'

const initialState = {
    user: {},
    token: '',
    csrfToken: '',
    isAuthenticated: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case actions.SET_TOKEN:
            return{
                ...state,
                token: action.payload
            }
        case actions.SET_CSRFTOKEN:
            return {
                ...state,
                csrfToken: action.payload
            }
        case actions.SET_ISAUTH:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        default:
            return state;
    }
}

export default userReducer
