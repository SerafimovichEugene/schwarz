import { FETCH_USER, FETCH_USER_COMPLETE } from '../constants/userConstants';

const userReducerInitialState = {
    user: null,
};

const userReducer = (state = userReducerInitialState, action) => {
    switch (action.type) {
        case FETCH_USER_COMPLETE:
            
            break;
        default:

    }
}
