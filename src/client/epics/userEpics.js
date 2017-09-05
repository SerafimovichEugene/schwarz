import { ofType } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { fetchUserComplete } from '../actions/userActions';
import { FETCH_USER } from '../constants/userConstants';
import config from '../config/config';

const { API_BASE_URL } = config;
const { ajax } = Observable;


export const fetchUserEpic = action$ => {
    action$.ofType(FETCH_USER)
        .mergeMap(action =>
            ajax.getJSON(`${API_BASE_URL}/who`)
                .map(response => fetchUserComplete(response))
        );
}
