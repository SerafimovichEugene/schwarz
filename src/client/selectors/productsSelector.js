// import { createSelector } from 'reselect';
import { toObject, toJS } from 'immutable';

export const getProductsSelector = (state) => state.get('products').toJS();
