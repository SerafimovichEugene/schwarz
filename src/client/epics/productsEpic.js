import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap';
import { fetchProductsComplete } from '../actions/productsActions';
import { FETCH_PRODUCTS } from '../constants/productsConstants';
import config from '../config/config';

const { API_BASE_URL } = config;

export const fetchProductsEpic = action$ =>
    action$.ofType(FETCH_PRODUCTS)
        .mergeMap(action =>
            ajax.getJSON(`${API_BASE_URL}/products`)
                .map(response => fetchProductsComplete(response))
        );
