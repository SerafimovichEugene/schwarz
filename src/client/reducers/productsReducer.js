import { fromJS } from 'immutable';
import { FETCH_PRODUCTS, FETCH_PRODUCTS_COMPLETE, FETCH_PRODUCTS_THROTTLE } from '../constants/productsConstants';

const productsReducerInitialState = fromJS({
    products: [],
    isLoading: false,
});

const productsReducer = (state = productsReducerInitialState, action) => {
    switch (action.type) {
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
