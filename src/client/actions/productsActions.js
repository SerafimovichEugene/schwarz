import { FETCH_PRODUCTS, FETCH_PRODUCTS_COMPLETE } from '../constants/productsConstants';

export const fetchProducts = (query) => ({ type: FETCH_PRODUCTS, query });
export const fetchProductsComplete = (products) => ({type: FETCH_PRODUCTS_COMPLETE, products });
