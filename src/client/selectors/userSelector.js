// import { createSelector } from 'reselect';
import { toObject, toJS } from 'immutable';

export const getUserSelector = (state) => state.get('user').toJS();
