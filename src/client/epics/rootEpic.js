import { combineEpics } from 'redux-observable';
import { fetchUserEpic } from './userEpics';
import { fetchProductsEpic } from './productsEpic';
import { throttleFetchProductsEpic } from './throttleProductsEpic';

export default combineEpics(fetchUserEpic, fetchProductsEpic, throttleFetchProductsEpic);
