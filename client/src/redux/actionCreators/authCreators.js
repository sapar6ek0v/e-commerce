import Cookies from "js-cookie";
import {LOG_OUT, SIGN_IN} from "../types/authTypes.js";

export const signIn = (data) => {
    return {type: SIGN_IN, user: data.user, token: data.token}
}

export const logOut = () => {
    Cookies.remove('token')
    return {type: LOG_OUT}
}