import t from '../types/productTypes.js'
import {store} from "../index";
import axios from "axios";

const addToLocalStorage = (value) => {
    return localStorage.setItem('meal', JSON.stringify(value))
}

const removeFromLocalStorage = () => {
    return localStorage.removeItem('meal')
}

export const getProducts = () => {
    return (dispatch) => {
        axios('/api/v1/products/get')
            .then(({data}) => {
                dispatch({type: t.GET_PRODUCTS, products: data.products})
            })
    }
}

export const addToCart = product => {
    const cart = {...store.getState()?.products.cart}
    let newCart

    if ( cart[product._id] ) {
        newCart = {...cart, [product._id]: {...product, count: cart[product._id].count + 1}}
    } else {
        newCart = {...cart, [product._id]: {...product, count: 1}}
    }
    addToLocalStorage(newCart)
    return {type: t.UPDATE_CART, cart: newCart}
}

export const deleteCart = product => {
    let cart = {...store.getState()?.products.cart}

    if ( cart[product._id] ) {
        if ( cart[product._id].count > 1 ) {
            cart = {...cart, [product._id]: {...product, count: cart[product._id].count - 1}}
        } else {
            delete cart[product._id]
        }
    }

    addToLocalStorage(cart)
    return {type: t.UPDATE_CART, cart: cart}
}

export const deleteFromCart = id => {
    let cart = {...store.getState()?.products.cart}
    delete cart[id]
    addToLocalStorage(cart)
    return ({type: t.UPDATE_CART, cart: cart})

}

export const deleteAllCart = () => {
    removeFromLocalStorage()
    return {type: t.UPDATE_CART, cart: {}}
}

export const getRates = () => {
    return (dispatch) => {
        axios("https://api.exchangerate.host/latest?base=USD&symbols=USD,RUB,KGS")
            .then(({data}) => {
                dispatch({type: t.GET_RATES, rates: data.rates})
            })
    }
}

export const exchangeRate = (rate) => {
    return {type: t.EXCHANGE_RATE, current: rate }
}

export const sortByPrice = () => {
    return (dispatch, getState) => {
        const store = getState()
        const {products, sortProducts, cart} = store.products

        let sortedProducts
        let sortedCart

        if (sortProducts > 0) {
            sortedCart = Object.fromEntries(Object.entries(cart).sort((a,b) => a[1].price - b[1].price))
            sortedProducts = products.sort((a,b) => a.price - b.price)
        } else {
            sortedCart = Object.fromEntries( Object.entries(cart).sort((a,b) => b[1].price - a[1].price))
            sortedProducts = products.sort((a,b) => b.price - a.price)
        }

        dispatch({type: t.SORT_PRODUCTS, products : sortedProducts, cart: sortedCart})
    }

}

export const sortByName = () => {
    return (dispatch, getState) => {
        const store = getState()
        const {products, sortProducts, cart} = store.products

        let sortedProducts
        let sortedCart

        if (sortProducts > 0) {
            sortedCart = Object.fromEntries(Object.entries(cart).sort((a,b) => a[1].title.localeCompare(b[1].title)))
            sortedProducts = products.sort((a,b) => a.title.localeCompare(b.title))
        } else {
            sortedCart = Object.fromEntries(Object.entries(cart).sort((a,b) => b[1].title.localeCompare(a[1].title)))
            sortedProducts = products.sort((a,b) => b.title.localeCompare(a.title))
        }
        dispatch({type: t.SORT_PRODUCTS, products : sortedProducts, cart: sortedCart})

    }
}

export const searchValue = (value) => {
    return ({type: t.SEARCH_PRODUCTS, search: value})
}
