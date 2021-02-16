/**
 * @description :  This file has active status change reducer
 * @param: initial states and payload
 * @return : new states for store
 * @author JC Software Solution PVT. LTD.
 */

import { createReducer } from '../../utils/helpers';
import { DELETE_SINGLE_ADVERTISE } from '../constants';

const initialState = {
  isRequesting: false,
  isError: false,
  isSuccess: false,
  data: null
};

export default createReducer(initialState, {
  [DELETE_SINGLE_ADVERTISE.DELETE_SINGLE_ADVERTISE_REQUEST]: state => {
    return {
      ...state,
      isRequesting: true,
      isSuccess: false,
      isError: false,
      data: null
    };
  },
  [DELETE_SINGLE_ADVERTISE.DELETE_SINGLE_ADVERTISE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: true,
      isError: false,
      data: payload
    };
  },
  [DELETE_SINGLE_ADVERTISE.DELETE_SINGLE_ADVERTISE_FAILURE]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: true,
      data: payload
    };
  },
  [DELETE_SINGLE_ADVERTISE.DELETE_SINGLE_ADVERTISE_RESET]: state => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: false,
      data: null
    };
  }
});
