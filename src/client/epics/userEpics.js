import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap';
import { fetchUserComplete } from '../actions/userActions';
import { FETCH_USER } from '../constants/userConstants';
import config from '../config/config';

const { API_BASE_URL } = config;

export const fetchUserEpic = action$ =>
    action$.ofType(FETCH_USER)
        .mergeMap(action =>
            ajax.getJSON(`${API_BASE_URL}/who`)
                .map(response => fetchUserComplete(response))
        );
