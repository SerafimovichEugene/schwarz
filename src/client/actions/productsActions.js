import { FETCH_PRODUCTS, FETCH_PRODUCTS_COMPLETE } from '../constants/productsConstants';

export const fetchProducts = () => ({ type: FETCH_PRODUCTS });
export const fetchProductsComplete = (products) => ({type: FETCH_PRODUCTS_COMPLETE, products });
