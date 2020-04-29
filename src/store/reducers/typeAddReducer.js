/**
 * @description :  This file has  plan type add  reducer
 * @param: initial states and payload
 * @return : new states for store
 * @author JC Software Solution PVT. LTD.
 */

import { createReducer } from '../../utils/helpers';
import { TYPE_ADD } from '../constants';

const initialState = {
  isRequesting: false,
  isError: false,
  isSuccess: false,
  data: null
};

export default createReducer(initialState, {
  [TYPE_ADD.TYPE_ADD_REQUEST]: state => {
    return {
      ...state,
      isRequesting: true,
      isSuccess: false,
      isError: false,
      data: null
    };
  },
  [TYPE_ADD.TYPE_ADD_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: true,
      isError: false,
      data: payload
    };
  },
  [TYPE_ADD.TYPE_ADD_FAILURE]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: true,
      data: payload
    };
  },
  [TYPE_ADD.TYPE_ADD_RESET]: state => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: false,
      data: null
    };
  }
});
