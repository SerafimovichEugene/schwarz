import { post, get } from 'axios';
import config from '../config/config';

const { HOST, API_BASE_URL } = config;
export const updateProducts = (products) => post(`${API_BASE_URL}/products`, products);

export const addProductsDocument = (doc) => post(`${API_BASE_URL}/documents`, doc);

export const getDistinctProductTypes = () => get(`${API_BASE_URL}/distinct`).then(response => response.data);
