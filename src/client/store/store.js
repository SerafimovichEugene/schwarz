import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducers/combineReducer';

const store = createStore(reducer);

Object.defineProperty(window, 'state', {
    get() {
        return store.getState();
    },
});

export default store;
