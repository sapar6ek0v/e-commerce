import t from "../types/productTypes.js";

const localJson = JSON.parse(localStorage.getItem('meal')) || {}

const initialState = {
    products : [],
    cart: localJson,
    rates: {},
    currentRate: ['USD', "USD"],
    sortProducts: 1,
    search: '',
    isLoading: true,
}

const reducer = (state = initialState, action) => {
    switch (action.type){

        case t.GET_PRODUCTS :
            return {
                ...state,
                isLoading: false,
                products: action.products
            }

        case t.UPDATE_CART :
            return {
                ...state,
                cart: action.cart
            }

        case t.GET_RATES :
            return {
                ...state,
                rates: action.rates
            }
        case t.EXCHANGE_RATE :
            return {
                ...state,
                currentRate: action.current
            }
        case t.SORT_PRODUCTS :
            return {
                ...state,
                products: action.products,
                sortProducts: -state.sortProducts,
                cart : action.cart
            }
        case t.SEARCH_PRODUCTS :
            return {
                ...state,
                search: action.search
            }

        default: return state
    }
}

export default reducer