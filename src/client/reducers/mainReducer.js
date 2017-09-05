import { combineReducers } from 'redux-immutable';
import userReducer from './userReducer';

export default combineReducers({
    user: userReducer,
});
