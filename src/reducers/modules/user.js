/*
 * @file: user.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @date: 28.11.2019
 * @author: Poonam
 */

import * as TYPE from '../../actions/constants';

/******** Reducers ********/

const initialState = {
  loggedIn: false,
  notifications: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.LOGIN_SUCCESS:
      return { ...state, ...{ loggedIn: true }, ...action.data };
    case TYPE.LOG_OUT:
      return initialState;
    case TYPE.GET_NOTIFICATION_SUCCESS:
      return { ...state, notifications: action.data };
    default:
      return state;
  }
}
