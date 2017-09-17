import { fromJS } from 'immutable';
import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_COMPLETE,
    FETCH_PRODUCTS_THROTTLE,
    ADD_PRODUCT_TO_BASKET,
} from '../constants/productsConstants';

const productsReducerInitialState = fromJS({
    products: [],
    isLoading: false,
    order: 0,
});

const productsReducer = (state = productsReducerInitialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_BASKET:
            return state.set('order', fromJS(JSON.parse(window.localStorage.getItem(action.user)).length))
        case FETCH_PRODUCTS_THROTTLE:
            return state.set('isLoading', true);
        case FETCH_PRODUCTS_COMPLETE:
            return state.set('products', fromJS(action.products))
                .set('isLoading', false);
        case FETCH_PRODUCTS:
            return state.set('isLoading', true);
        default:
            return state;
    }
}

export default productsReducer;
