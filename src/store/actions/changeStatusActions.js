/**
 * @description :  This file change active status functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import { AXIOS_INSTANCE, CHANGE_STATUS_API, CHANGE_STATUS } from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure, reset } from './index';

// change the active status

export function changeStatus(obj, token) {
  // console.log('changeStatusobj', obj);
  return dispatch => {
    dispatch(getRequest(CHANGE_STATUS.CHANGE_STATUS_REQUEST));
    const getUrl = `${CHANGE_STATUS_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('changeStatus', data);
        if (data.success) {
          dispatch(getSuccess(CHANGE_STATUS.CHANGE_STATUS_SUCCESS, data));
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
          getFailure(CHANGE_STATUS.CHANGE_STATUS_FAILURE, {
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

export function resetStatus() {
  return dispatch => {
    dispatch(reset(CHANGE_STATUS.CHANGE_STATUS_RESET));
  };
}
