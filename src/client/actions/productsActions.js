import { FETCH_PRODUCTS, FETCH_PRODUCTS_COMPLETE, FETCH_PRODUCTS_THROTTLE } from '../constants/productsConstants';

export const fetchProducts = (query) => ({ type: FETCH_PRODUCTS, query });
export const fetchProductsThrottle = (query) => ({ type: FETCH_PRODUCTS_THROTTLE, query });
export const fetchProductsComplete = (products) => ({type: FETCH_PRODUCTS_COMPLETE, products });
