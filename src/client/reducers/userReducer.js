import { fromJS } from 'immutable';
import { FETCH_USER, FETCH_USER_COMPLETE } from '../constants/userConstants';

const userReducerInitialState = fromJS({
    user: {},
    isLoading: false,
});

const userReducer = (state = userReducerInitialState, action) => {
    switch (action.type) {
        case FETCH_USER_COMPLETE:
            return state.set('user', fromJS(action.user))
                .set('isLoading', false);
        case FETCH_USER:
            return state.set('isLoading', true);
        default:
            return state;
    }
}

export default userReducer;
