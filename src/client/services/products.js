import { post, get } from 'axios';
import config from '../config/config';

const { HOST, API_BASE_URL } = config;
export const updateProducts = (products) => post(`${API_BASE_URL}/products`, products);

export const addProductsDocument = (doc) => post(`${API_BASE_URL}/documents`, doc);

export const getDistinctProductTypes = () => get(`${API_BASE_URL}/distinct`).then(response => response.data);

export const orderComplete = (order) => post(`${API_BASE_URL}/ordercomplete`, order);

export const addhistory = (history) => post(`${API_BASE_URL}/addhistory`, history);

export const getHistories = (user) => get(`${API_BASE_URL}/orderhistory?user=${user}`).then(res => res.data);
