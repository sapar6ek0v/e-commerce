import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly.js";
import thunk from "redux-thunk";
import products from "./reducers/productsReducer";
import auth from "./reducers/authReducer";


const initialState = {}

const rootReducer = combineReducers({
    products,
    auth,
})



export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk)
    ))