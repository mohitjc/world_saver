/**
 * @description :  This file has subscribe package add, edit, delete, blog detail functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  SUBSCRIBE_PACKAGE_API,
  PACKAGE_ADD,
  PACKAGE_UPDATE,
  DELETE_PACKAGE_API,
  GET_PACKAGES,
  GET_SINGLE_PACKAGE,
  DELETE_SINGLE_PACKAGE
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure, reset } from './index';

export function packageAdd(postObj, token) {
  return dispatch => {
    dispatch(getRequest(PACKAGE_ADD.PACKAGE_ADD_REQUEST));
    const getUrl = SUBSCRIBE_PACKAGE_API;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(PACKAGE_ADD.PACKAGE_ADD_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(PACKAGE_ADD.PACKAGE_ADD_FAILURE, {
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

export function packageUpdate(obj, token) {
  return dispatch => {
    dispatch(getRequest(PACKAGE_UPDATE.PACKAGE_UPDATE_REQUEST));
    const getUrl = `${SUBSCRIBE_PACKAGE_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('updateUser', data);
        if (data.success) {
          dispatch(getSuccess(PACKAGE_UPDATE.PACKAGE_UPDATE_SUCCESS, data));
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
          getFailure(PACKAGE_UPDATE.PACKAGE_UPDATE_FAILURE, {
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

export function packages(token, type, page, count, sortType, sort, search) {
  return dispatch => {
    dispatch(getRequest(GET_PACKAGES.GET_PACKAGES_REQUEST));
    const getUrl = `${SUBSCRIBE_PACKAGE_API}?type=${type}&search=${search}&page=${page}&count=${10}&sortBy=${sortType} ${sort}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data && data.data);
        if (data.success) {
          dispatch(getSuccess(GET_PACKAGES.GET_PACKAGES_SUCCESS, data));
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
          getFailure(GET_PACKAGES.GET_PACKAGES_FAILURE, {
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

export function singlePackage(id, token) {
  console.log('singlePackage', id, token);
  return dispatch => {
    dispatch(getRequest(GET_SINGLE_PACKAGE.GET_SINGLE_PACKAGE_REQUEST));
    const getUrl = `${SUBSCRIBE_PACKAGE_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('singlePackage', data);
        if (data.success) {
          dispatch(
            getSuccess(GET_SINGLE_PACKAGE.GET_SINGLE_PACKAGE_SUCCESS, data.data)
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
          getFailure(GET_SINGLE_PACKAGE.GET_SINGLE_PACKAGE_FAILURE, {
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

export function deletePackage(obj, token) {
  return dispatch => {
    dispatch(getRequest(DELETE_SINGLE_PACKAGE.DELETE_SINGLE_PACKAGE_REQUEST));
    const getUrl = `${DELETE_PACKAGE_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` }, data: obj };
    AXIOS_INSTANCE.delete(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('deleteUser', data);
        if (data.success) {
          dispatch(
            getSuccess(
              DELETE_SINGLE_PACKAGE.DELETE_SINGLE_PACKAGE_SUCCESS,
              data.data
            )
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
          getFailure(DELETE_SINGLE_PACKAGE.DELETE_SINGLE_PACKAGE_FAILURE, {
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

export function resetDeletePackage() {
  return dispatch => {
    dispatch(reset(DELETE_SINGLE_PACKAGE.DELETE_SINGLE_PACKAGE_RESET));
  };
}

export function resetAddPackage() {
  return dispatch => {
    dispatch(reset(PACKAGE_ADD.PACKAGE_ADD_RESET));
  };
}

export function resetSinglePackage() {
  return dispatch => {
    dispatch(reset(GET_SINGLE_PACKAGE.GET_SINGLE_PACKAGE_RESET));
  };
}

export function resetUpdatePackage() {
  return dispatch => {
    dispatch(reset(PACKAGE_UPDATE.PACKAGE_UPDATE_RESET));
  };
}
