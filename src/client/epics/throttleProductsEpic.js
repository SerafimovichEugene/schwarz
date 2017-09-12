import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/throttle';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/debounceTime';
import { fetchProductsComplete } from '../actions/productsActions';
import { FETCH_PRODUCTS_THROTTLE } from '../constants/productsConstants';
import config from '../config/config';

const { API_BASE_URL } = config;

export const throttleFetchProductsEpic = action$ =>
    action$.ofType(FETCH_PRODUCTS_THROTTLE)
        .debounceTime(2000)
        .mergeMap(action =>
            ajax.getJSON(`${API_BASE_URL}/products${action.query}`)
                .map(response => fetchProductsComplete(response))
        );
