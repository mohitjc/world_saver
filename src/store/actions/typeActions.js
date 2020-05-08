/**
 * @description :  This file has plan type add, edit, delete, blog detail functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import { isUndefined } from 'lodash';
import {
  AXIOS_INSTANCE,
  TYPE_ADD,
  SINGLE_TYPE_API,
  DELETE_API,
  TYPE_UPDATE,
  GET_TYPES,
  GET_SINGLE_TYPE,
  DELETE_SINGLE_TYPE,
  TYPES_API
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure, reset } from './index';

// add plan type

export function typeAdd(postObj, token) {
  return dispatch => {
    dispatch(getRequest(TYPE_ADD.TYPE_ADD_REQUEST));
    const getUrl = TYPES_API;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(TYPE_ADD.TYPE_ADD_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(TYPE_ADD.TYPE_ADD_FAILURE, {
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

// update plan type

export function typeUpdate(obj, id, token) {
  return dispatch => {
    dispatch(getRequest(TYPE_UPDATE.TYPE_UPDATE_REQUEST));
    const getUrl = `${TYPES_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('updateUser', data);
        if (data.success) {
          dispatch(getSuccess(TYPE_UPDATE.TYPE_UPDATE_SUCCESS, data));
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
          getFailure(TYPE_UPDATE.TYPE_UPDATE_FAILURE, {
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

// get all plan types

export function types(token, type, page, count, sortType, sort, search) {
  return dispatch => {
    dispatch(getRequest(GET_TYPES.GET_TYPES_REQUEST));

    let getUrl = `${TYPES_API}?type=${type}&search=${search}&page=${page}&count=${10}&sortBy=${sortType} ${sort}`;
    if (
      isUndefined(type) ||
      isUndefined(page) ||
      isUndefined(sortType) ||
      isUndefined(sort) ||
      isUndefined(search)
    ) {
      getUrl = `${TYPES_API}`;
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(GET_TYPES.GET_TYPES_SUCCESS, data));
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
          getFailure(GET_TYPES.GET_TYPES_FAILURE, {
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

// get single plan type

export function singleType(id, token) {
  return dispatch => {
    dispatch(getRequest(GET_SINGLE_TYPE.GET_SINGLE_TYPE_REQUEST));
    const getUrl = `${SINGLE_TYPE_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('singleCategory', data);
        if (data.success) {
          dispatch(
            getSuccess(GET_SINGLE_TYPE.GET_SINGLE_TYPE_SUCCESS, data.data)
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
          getFailure(GET_SINGLE_TYPE.GET_SINGLE_TYPE_SUCCESS, {
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

// delete single plan type

export function deleteType(obj, token) {
  return dispatch => {
    dispatch(getRequest(DELETE_SINGLE_TYPE.DELETE_SINGLE_TYPE_REQUEST));
    const getUrl = `${DELETE_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` }, data: obj };
    AXIOS_INSTANCE.delete(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('deleteUser', data);
        if (data.success) {
          dispatch(
            getSuccess(DELETE_SINGLE_TYPE.DELETE_SINGLE_TYPE_SUCCESS, data.data)
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
          getFailure(DELETE_SINGLE_TYPE.DELETE_SINGLE_TYPE_FAILURE, {
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

export function resetDeleteType() {
  return dispatch => {
    dispatch(reset(DELETE_SINGLE_TYPE.DELETE_SINGLE_TYPE_REQUEST));
  };
}

export function resetAddType() {
  return dispatch => {
    dispatch(reset(TYPE_ADD.TYPE_ADD_RESET));
  };
}

export function resetSingleType() {
  return dispatch => {
    dispatch(reset(GET_SINGLE_TYPE.GET_SINGLE_TYPE_RESET));
  };
}

export function resetUpdateType() {
  return dispatch => {
    dispatch(reset(TYPE_UPDATE.TYPE_UPDATE_RESET));
  };
}
