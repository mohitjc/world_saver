/**
 * @description :  This file has forgot password reducer
 * @param: initial states and payload
 * @return : new states for store
 * @author JC Software Solution PVT. LTD.
 */

import { createReducer } from '../../utils/helpers';
import { FORGOT_PASSWORD } from '../constants';

const initialState = {
  isRequesting: false,
  isError: false,
  isSuccess: false,
  data: null
};

export default createReducer(initialState, {
  [FORGOT_PASSWORD.FORGOT_PASSWORD_REQUEST]: (state, payload) => {
    return {
      ...state,
      isRequesting: true,
      isSuccess: false,
      isError: false,
      data: null
    };
  },
  [FORGOT_PASSWORD.FORGOT_PASSWORD_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: true,
      isError: false,
      data: payload
    };
  },
  [FORGOT_PASSWORD.FORGOT_PASSWORD_FAILURE]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: true,
      data: payload
    };
  },
  [FORGOT_PASSWORD.FORGOT_PASSWORD_RESET]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: false,
      data: payload
    };
  }
});
