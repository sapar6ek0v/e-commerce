import Cookies from 'js-cookie'
import {LOG_OUT, SIGN_IN} from "../types/authTypes.js";

const initialState = {
    token : Cookies.get('token'),
    user : null,
    isAuth : !!Cookies.get('token')
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                token: action.token,
                user: action.user,
                isAuth: !!action.token
            }
        case LOG_OUT:
            return {
                ...state,
                token: null,
                user: null,
                isAuth: false
            }

        default : return state
    }
}

export default reducer