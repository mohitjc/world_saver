/**
 * @description :  This file has user count functions
 * @param:  access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  TOTAL_COUNT_API,
  USER_COUNT_API,
  TOTAL_COUNT,
  USER_COUNT
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure } from './index';

export function totalCount(token) {
  return dispatch => {
    dispatch(getRequest(TOTAL_COUNT.TOTAL_COUNT_REQUEST));
    const getUrl = `${TOTAL_COUNT_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(TOTAL_COUNT.TOTAL_COUNT_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Something went wrong!';
        dispatch(
          getFailure(TOTAL_COUNT.TOTAL_COUNT_FAILURE, {
            data: {
              statusCode: 403,
              message: errorMessage
            }
          })
        );
      });
  };
}

export function userCount(token) {
  return dispatch => {
    dispatch(getRequest(USER_COUNT.USER_COUNT_REQUEST));
    const getUrl = `${USER_COUNT_API}?roles=A`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(USER_COUNT.USER_COUNT_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Something went wrong!';
        dispatch(
          getFailure(USER_COUNT.USER_COUNT_FAILURE, {
            data: {
              statusCode: 403,
              message: errorMessage
            }
          })
        );
      });
  };
}
