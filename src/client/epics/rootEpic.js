import { combineEpics } from 'redux-observable';
import { fetchUserEpic } from './userEpics';

export default combineEpics(fetchUserEpic);
