/**
 * @description :  This file change password functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  CHANGE_PASSWORD,
  LOGIN_API,
  CHANGE_PASSWORD_API
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import {
  getRequest,
  getSuccess,
  getFailure,
  reset,
  authenticate
} from './index';

// change password

function changePassword(postObj) {
  return dispatch => {
    dispatch(getRequest(CHANGE_PASSWORD.CHANGE_PASSWORD_REQUEST));
    const getUrl = CHANGE_PASSWORD_API;
    AXIOS_INSTANCE.post(getUrl, postObj)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(CHANGE_PASSWORD.CHANGE_PASSWORD_SUCCESS, data));
          //   dispatch(authenticate('token-xyz'));
        }
      })
      .catch(error => {
        // console.log('error', error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Something went wrong!';
        dispatch(
          getFailure(CHANGE_PASSWORD.CHANGE_PASSWORD_FAILURE, {
            response: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              statusText: errorMessage
            }
          })
        );
      });
  };
}

export default changePassword;
