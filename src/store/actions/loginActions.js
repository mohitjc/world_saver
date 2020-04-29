/**
 * @description :  This file has login and authentication functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  LOGIN_CONST,
  LOGIN_API,
  DEAUTHENTICATE
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import {
  getRequest,
  getSuccess,
  getFailure,
  reset,
  authenticate,
  deauthenticate
} from './index';

// login user into app

export function login(postObj) {
  return dispatch => {
    dispatch(getRequest(LOGIN_CONST.LOGIN_REQUEST));
    const getUrl = LOGIN_API;
    AXIOS_INSTANCE.post(getUrl, postObj)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.roles === 'SA') {
          dispatch(getSuccess(LOGIN_CONST.LOGIN_SUCCESS, data));
          localStorage.setItem('token', data.access_token);
          dispatch(authenticate(data.access_token));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(LOGIN_CONST.LOGIN_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage
            }
          })
        );
      });
  };
}

// remove token and logout user

export function logOut() {
  return dispatch => {
    dispatch(deauthenticate(DEAUTHENTICATE));
    localStorage.removeItem('token');
  };
}

export function resetLogin() {
  return dispatch => {
    dispatch(reset(LOGIN_CONST.LOGIN_RESET));
  };
}
