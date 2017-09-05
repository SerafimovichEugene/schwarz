import { FETCH_USER, FETCH_USER_COMPLETE } from '../constants/userConstants';

export const fetchUser = () => ({ type: FETCH_USER });
export const fetchUserComplete = (user) => ({ type: FETCH_USER_COMPLETE, user });
