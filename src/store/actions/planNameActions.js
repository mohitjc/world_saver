/**
 * @description :  This file has plan name add, edit, delete, blog detail functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  NAME_ADD,
  SUBSCRIPTION_NAME_API,
  ALL_SUBSCRIPTION_NAME_API,
  NAME_UPDATE,
  GET_NAMES,
  GET_SINGLE_NAME,
  DELETE_SINGLE_NAME
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure, reset } from './index';

// add plan name

export function nameAdd(postObj, token) {
  return dispatch => {
    dispatch(getRequest(NAME_ADD.NAME_ADD_REQUEST));
    const getUrl = SUBSCRIPTION_NAME_API;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(NAME_ADD.NAME_ADD_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(NAME_ADD.NAME_ADD_FAILURE, {
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

// update plan name

export function nameUpdate(obj, id, token) {
  return dispatch => {
    dispatch(getRequest(NAME_UPDATE.NAME_UPDATE_REQUEST));
    const getUrl = `${SUBSCRIPTION_NAME_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('updateUser', data);
        if (data.success) {
          dispatch(getSuccess(NAME_UPDATE.NAME_UPDATE_SUCCESS, data));
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
          getFailure(NAME_UPDATE.NAME_UPDATE_FAILURE, {
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

// get all plan names

export function names(token, type, page, count, sortType, sort, search) {
  return dispatch => {
    dispatch(getRequest(GET_NAMES.GET_NAMES_REQUEST));
    const getUrl = `${ALL_SUBSCRIPTION_NAME_API}?type=${type}&search=${search}&page=${page}&count=${10}&sortBy=${sortType} ${sort}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(GET_NAMES.GET_NAMES_SUCCESS, data));
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
          getFailure(GET_NAMES.GET_NAMES_FAILURE, {
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

// get single plan detail

export function singleName(id, token) {
  return dispatch => {
    dispatch(getRequest(GET_SINGLE_NAME.GET_SINGLE_NAME_REQUEST));
    const getUrl = `${SUBSCRIPTION_NAME_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('singleCategory', data);
        if (data.success) {
          dispatch(
            getSuccess(GET_SINGLE_NAME.GET_SINGLE_NAME_SUCCESS, data.data)
          );
        }
      })
      .catch(error => {
        console.log('error', error.response);
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(GET_SINGLE_NAME.GET_SINGLE_NAME_FAILURE, {
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

// delete plan name

export function deleteName(obj, token) {
  return dispatch => {
    dispatch(getRequest(DELETE_SINGLE_NAME.DELETE_SINGLE_NAME_REQUEST));
    const getUrl = `${SUBSCRIPTION_NAME_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` }, data: obj };
    AXIOS_INSTANCE.delete(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('deleteUser', data);
        if (data.success) {
          dispatch(
            getSuccess(DELETE_SINGLE_NAME.DELETE_SINGLE_NAME_SUCCESS, data.data)
          );
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
          getFailure(DELETE_SINGLE_NAME.DELETE_SINGLE_NAME_FAILURE, {
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

export function resetDeleteName() {
  return dispatch => {
    dispatch(reset(DELETE_SINGLE_NAME.DELETE_SINGLE_NAME_RESET));
  };
}

export function resetAddName() {
  return dispatch => {
    dispatch(reset(NAME_ADD.NAME_ADD_RESET));
  };
}

export function resetSingleName() {
  return dispatch => {
    dispatch(reset(GET_SINGLE_NAME.GET_SINGLE_NAME_RESET));
  };
}

export function resetUpdateName() {
  return dispatch => {
    dispatch(reset(NAME_UPDATE.NAME_UPDATE_RESET));
  };
}
