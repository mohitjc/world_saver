/**
 * @description :  This file has blogs update reducer
 * @param: initial states and payload
 * @return : new states for store
 * @author JC Software Solution PVT. LTD.
 */

import { createReducer } from '../../utils/helpers';
import { BLOG_UPDATE } from '../constants';

const initialState = {
  isRequesting: false,
  isError: false,
  isSuccess: false,
  data: null
};

export default createReducer(initialState, {
  [BLOG_UPDATE.BLOG_UPDATE_REQUEST]: state => {
    return {
      ...state,
      isRequesting: true,
      isSuccess: false,
      isError: false,
      data: null
    };
  },
  [BLOG_UPDATE.BLOG_UPDATE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: true,
      isError: false,
      data: payload
    };
  },
  [BLOG_UPDATE.BLOG_UPDATE_FAILURE]: (state, payload) => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: true,
      data: payload
    };
  },
  [BLOG_UPDATE.BLOG_UPDATE_RESET]: state => {
    return {
      ...state,
      isRequesting: false,
      isSuccess: false,
      isError: false,
      data: null
    };
  }
});
