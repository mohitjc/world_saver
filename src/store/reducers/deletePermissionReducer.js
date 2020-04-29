/**
 * @description :  This file has delete permission reducer
 * @param: initial states and payload
 * @return : new states for store
 * @author JC Software Solution PVT. LTD.
 */

import { createReducer } from '../../utils/helpers';
import { DELETE_SINGLE_PERMISSION } from '../constants';

const initialState = {
  isRequesting: false,
  isError: false,
  isSuccess: false,
  data: null
};

export default createReducer(initialState, {
  [DELETE_SINGLE_PERMISSION.DELETE_SINGLE_PERMISSION_REQUEST]: state => {
    return {
      ...state,
      isRequesting: true,
      isSuccess: false,
      isError: false,
      data: null
    };
  },
  [DELETE_SINGLE_PERMISSION.DELETE_SINGLE_PERMISSION_SUCCESS]: (
    state,
    payload
  ) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: true,
      isError: false,
      data: payload
    };
  },
  [DELETE_SINGLE_PERMISSION.DELETE_SINGLE_PERMISSION_FAILURE]: (
    state,
    payload
  ) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: true,
      data: payload
    };
  },
  [DELETE_SINGLE_PERMISSION.DELETE_SINGLE_PERMISSION_RESET]: state => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: false,
      data: null
    };
  }
});
