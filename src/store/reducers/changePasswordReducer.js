/**
 * @description :  This file has change password reducer
 * @param: initial states and payload
 * @return : new states for store
 * @author JC Software Solution PVT. LTD.
 */

import { createReducer } from '../../utils/helpers';
import { CHANGE_PASSWORD } from '../constants';

const initialState = {
  isRequesting: false,
  isError: false,
  isSuccess: false,
  data: null
};

export default createReducer(initialState, {
  [CHANGE_PASSWORD.CHANGE_PASSWORD_REQUEST]: (state, payload) => {
    return {
      ...state,
      isRequesting: true,
      isSuccess: false,
      isError: false,
      data: null
    };
  },
  [CHANGE_PASSWORD.CHANGE_PASSWORD_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: true,
      isError: false,
      data: payload
    };
  },
  [CHANGE_PASSWORD.CHANGE_PASSWORD_FAILURE]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: true,
      data: payload
    };
  },
  [CHANGE_PASSWORD.CHANGE_PASSWORD_RESET]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: false,
      data: payload
    };
  }
});
