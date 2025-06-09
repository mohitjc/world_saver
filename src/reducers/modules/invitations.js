/* eslint-disable array-callback-return */
/*
 * @file: serviceType.js
 * @description: Reducers and actions for store/manipulate competition's  data
 * @date: 10 Jun 2020
 * @author: Poonam
 */

import * as TYPE from '../../actions/constants';
/******** Reducers ********/

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.GET_INVITATIONS:
      // console.log(); ("Action Called ", action);
      return action.data;
    case TYPE.ACCEPT_INVITATION: {
      const invitations = [];
      // console.log(); ('state', state.invitations);
      return invitations;
    }

    case TYPE.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
