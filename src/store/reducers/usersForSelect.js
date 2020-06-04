/**
 * @description :  This file has  get all users reducer
 * @param: initial states and payload
 * @return : new states for store
 * @author JC Software Solution PVT. LTD.
 */

import { createReducer } from '../../utils/helpers';
import { GET_USERS_FOR_INVITE } from '../constants';

const initialState = {
  isRequesting: false,
  isError: false,
  isSuccess: false,
  data: null,
};

export default createReducer(initialState, {
  [GET_USERS_FOR_INVITE.REQUEST]: (state, payload) => {
    return {
      ...state,
      isRequesting: true,
      isSuccess: false,
      isError: false,
      data: null,
    };
  },
  [GET_USERS_FOR_INVITE.SUCCESS]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: true,
      isError: false,
      data: payload,
    };
  },
  [GET_USERS_FOR_INVITE.FAILURE]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: true,
      data: payload,
    };
  },
});
