/**
 * @description :  This file has authentication function
 * @param: initial states and payload
 * @return : new states
 * @author JC Software Solution PVT. LTD.
 */

import { createReducer } from '../../utils/helpers';
import { AUTHENTICATE, DEAUTHENTICATE } from '../constants';

const initialState = {
  token: null,
  authenticated: false,
  user: null
};

export default createReducer(initialState, {
  [AUTHENTICATE]: (state, payload) => {
    return {
      ...state,
      token: payload,
      authenticated: true,
      user: 'xyz'
    };
  },
  [DEAUTHENTICATE]: state => {
    return {
      ...state,
      token: null,
      authenticated: false,
      user: null
    };
  }
});
