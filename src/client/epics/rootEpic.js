import { combineEpics } from 'redux-observable';
import { fetchUserEpic } from './userEpics';
import { fetchProductsEpic } from './productsEpic';

export default combineEpics(fetchUserEpic, fetchProductsEpic);
