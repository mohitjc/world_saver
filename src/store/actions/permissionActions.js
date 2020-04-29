/**
 * @description :  This file has permission add, edit, delete, blog detail functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  PERMISSION_ADD,
  PERMISSION_API,
  PERMISSION_UPDATE,
  GET_PERMISSIONS,
  GET_SINGLE_PERMISSION,
  DELETE_SINGLE_PERMISSION
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure, reset } from './index';

// add permission

export function permissionAdd(postObj, token) {
  return dispatch => {
    dispatch(getRequest(PERMISSION_ADD.PERMISSION_ADD_REQUEST));
    const getUrl = PERMISSION_API;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(PERMISSION_ADD.PERMISSION_ADD_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(PERMISSION_ADD.PERMISSION_ADD_FAILURE, {
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

// update the permissions

export function permissionUpdate(obj, token) {
  return dispatch => {
    dispatch(getRequest(PERMISSION_UPDATE.PERMISSION_UPDATE_REQUEST));
    const getUrl = `${PERMISSION_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('updateUser', data);
        if (data.success) {
          dispatch(
            getSuccess(PERMISSION_UPDATE.PERMISSION_UPDATE_SUCCESS, data)
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
          getFailure(PERMISSION_UPDATE.PERMISSION_UPDATE_FAILURE, {
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

// get all permissions

export function permissions(token, type, page, count, sortType, sort, search) {
  return dispatch => {
    dispatch(getRequest(GET_PERMISSIONS.GET_PERMISSIONS_REQUEST));
    const getUrl = `${PERMISSION_API}?type=${type}&search=${search}&page=${page}&count=${10}&sortBy=${sortType} ${sort}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data && data.data);
        if (data.success) {
          dispatch(getSuccess(GET_PERMISSIONS.GET_PERMISSIONS_SUCCESS, data));
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
          getFailure(GET_PERMISSIONS.GET_PERMISSIONS_FAILURE, {
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

// get single permission

export function singlepermission(id, token) {
  // console.log('singlePackage', id, token);
  return dispatch => {
    dispatch(getRequest(GET_SINGLE_PERMISSION.GET_SINGLE_PERMISSION_REQUEST));
    const getUrl = `${PERMISSION_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('singlePackage', data);
        if (data.success) {
          dispatch(
            getSuccess(
              GET_SINGLE_PERMISSION.GET_SINGLE_PERMISSION_REQUEST,
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
          getFailure(GET_SINGLE_PERMISSION.GT, {
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

// delete the permission

export function deletePermission(obj, token) {
  return dispatch => {
    dispatch(
      getRequest(DELETE_SINGLE_PERMISSION.DELETE_SINGLE_PACKAGE_REQUEST)
    );
    const getUrl = `${PERMISSION_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` }, data: obj };
    AXIOS_INSTANCE.delete(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('deleteUser', data);
        if (data.success) {
          dispatch(
            getSuccess(
              DELETE_SINGLE_PERMISSION.DELETE_SINGLE_PERMISSION_REQUEST,
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
          getFailure(
            DELETE_SINGLE_PERMISSION.DELETE_SINGLE_PERMISSION_FAILURE,
            {
              data: {
                statusCode: 403,
                // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
                message: errorMessage
              }
            }
          )
        );
      });
  };
}

export function resetDeletePermission() {
  return dispatch => {
    dispatch(reset(DELETE_SINGLE_PERMISSION.DELETE_SINGLE_PERMISSION_RESET));
  };
}

export function resetAddPermission() {
  return dispatch => {
    dispatch(reset(PERMISSION_ADD.PERMISSION_ADD_RESET));
  };
}

export function resetSinglePermission() {
  return dispatch => {
    dispatch(reset(GET_SINGLE_PERMISSION.GET_SINGLE_PERMISSION_REQUEST));
  };
}

export function resetUpdatePermission() {
  return dispatch => {
    dispatch(reset(GET_SINGLE_PERMISSION.GET_SINGLE_PERMISSION_RESET));
  };
}
