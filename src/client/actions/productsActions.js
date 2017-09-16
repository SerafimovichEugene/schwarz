import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_COMPLETE,
    FETCH_PRODUCTS_THROTTLE,
    ADD_PRODUCT_TO_BASKET,
} from '../constants/productsConstants';

export const fetchProducts = (query) => ({ type: FETCH_PRODUCTS, query });
export const fetchProductsThrottle = (query) => ({ type: FETCH_PRODUCTS_THROTTLE, query });
export const fetchProductsComplete = (products) => ({type: FETCH_PRODUCTS_COMPLETE, products });
export const addProductToBasket = (user) => ({type: ADD_PRODUCT_TO_BASKET, user});
