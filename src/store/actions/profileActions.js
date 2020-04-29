/**
 * @description :  This file has profile detail functions
 * @param: access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import { AXIOS_INSTANCE, USER_DETAIL_API, GET_PROFILE } from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure } from './index';

// get user profile

export default function getProfile(token) {
  return dispatch => {
    dispatch(getRequest(GET_PROFILE.GET_PROFILE_REQUEST));
    const getUrl = USER_DETAIL_API;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('getProfile', data);
        if (data.success) {
          dispatch(getSuccess(GET_PROFILE.GET_PROFILE_SUCCESS, data.data.user));
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
          getFailure(GET_PROFILE.GET_PROFILE_FAILURE, {
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
