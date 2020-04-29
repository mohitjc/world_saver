/**
 * @description :  This file has forgot password functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  FORGOT_PASSWORD,
  LOGIN_API,
  FORGOT_PASSWORD_API
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure } from './index';

// triggers forgot password

function forgotPassword(postObj) {
  return dispatch => {
    dispatch(getRequest(FORGOT_PASSWORD.FORGOT_PASSWORD_REQUEST));
    const getUrl = FORGOT_PASSWORD_API;
    AXIOS_INSTANCE.post(getUrl, postObj)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(FORGOT_PASSWORD.FORGOT_PASSWORD_SUCCESS, data));
          // dispatch(authenticate('token-xyz'));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(FORGOT_PASSWORD.FORGOT_PASSWORD_FAILURE, {
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

export default forgotPassword;
