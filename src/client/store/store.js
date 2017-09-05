import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger'
import rootEpic from '../epics/rootEpic';
import mainReducer from '../reducers/mainReducer';

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(mainReducer, applyMiddleware(epicMiddleware, logger));

Object.defineProperty(window, 'state', {
    get() {
        return store.getState();
    },
});

export default store;
