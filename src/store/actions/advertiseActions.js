/**
 * @description :  This file has category add, edit, delete, blog detail functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  // ADVERTISE_ADD,
  ADVERTISE_ADD,
  // ADVERTISE_UPDATE,
  ADVERTISE_UPDATE,
  // GET_CATEGORIES,
  GET_ADVERTISE,
  // GET_SINGLE_ADVERTISE,
  GET_SINGLE_ADVERTISE,
  // DELETE_SINGLE_ADVERTISE,
  DELETE_SINGLE_ADVERTISE,
  // ADVERTISE_API,
  ADVERTISE_API,
  // ALL_ADVERTISE_API,
  ALL_ADVERTISE_API,
  // GET_ADVERTISE_BY_TYPE,
  GET_ADVERTISE_BY_TYPE,
  // ADVERTISE_BY_TYPE_API,
  ADVERTISE_BY_TYPE_API
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure, reset } from './index';

// add the

export function Add(postObj, token) {
  return dispatch => {
    dispatch(getRequest(ADVERTISE_ADD.ADVERTISE_ADD_REQUEST));
    const getUrl = ADVERTISE_API;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(ADVERTISE_ADD.ADVERTISE_ADD_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(ADVERTISE_ADD.ADVERTISE_ADD_FAILURE, {
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

// update the

export function Update(obj, id, token) {
  return dispatch => {
    dispatch(getRequest(ADVERTISE_UPDATE.ADVERTISE_UPDATE_REQUEST));
    const getUrl = `${ADVERTISE_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('updateUser', data);
        if (data.success) {
          dispatch(getSuccess(ADVERTISE_UPDATE.ADVERTISE_UPDATE_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(ADVERTISE_UPDATE.ADVERTISE_UPDATE_FAILURE, {
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

// get all categories

export function items(token, type, page, count, sortType, sort, search) {
  return dispatch => {
    dispatch(getRequest(GET_ADVERTISE.GET_ADVERTISE_REQUEST));
    const getUrl = `${ALL_ADVERTISE_API}?type=${type}&search=${search}&page=${page}&count=${10}&sortBy=${sortType} ${sort}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(GET_ADVERTISE.GET_ADVERTISE_SUCCESS, data));
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
          getFailure(GET_ADVERTISE.GET_ADVERTISE_FAILURE, {
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

// get single

export function single(id, token) {
  return dispatch => {
    dispatch(getRequest(GET_SINGLE_ADVERTISE.GET_SINGLE_ADVERTISE_REQUEST));
    const getUrl = `${ADVERTISE_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('singleCategory', data);
        if (data.success) {
          dispatch(
            getSuccess(
              GET_SINGLE_ADVERTISE.GET_SINGLE_ADVERTISE_SUCCESS,
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
          getFailure(GET_SINGLE_ADVERTISE.GET_SINGLE_ADVERTISE_FAILURE, {
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

export function getCatByType(id, token) {
  return dispatch => {
    dispatch(getRequest(GET_ADVERTISE_BY_TYPE.GET_ADVERTISE_BY_TYPE_REQUEST));
    const getUrl = `${ADVERTISE_BY_TYPE_API}?typeid=${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        console.log('getCatByType', data);
        if (data.success) {
          dispatch(
            getSuccess(
              GET_ADVERTISE_BY_TYPE.GET_ADVERTISE_BY_TYPE_SUCCESS,
              data.data
            )
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
          getFailure(GET_ADVERTISE_BY_TYPE.GET_ADVERTISE_BY_TYPE_FAILURE, {
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

// delete single

export function Delete(id, token) {
  return dispatch => {
    dispatch(getRequest(DELETE_SINGLE_ADVERTISE.DELETE_SINGLE_ADVERTISE_REQUEST));
    const getUrl = `${ADVERTISE_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.delete(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('deleteUser', data);
        if (data.success) {
          dispatch(
            getSuccess(
              DELETE_SINGLE_ADVERTISE.DELETE_SINGLE_ADVERTISE_SUCCESS,
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
          getFailure(DELETE_SINGLE_ADVERTISE.DELETE_SINGLE_ADVERTISE_FAILURE, {
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

export function resetDelete() {
  return dispatch => {
    dispatch(reset(DELETE_SINGLE_ADVERTISE.DELETE_SINGLE_ADVERTISE_RESET));
  };
}

export function resetAdd() {
  return dispatch => {
    dispatch(reset(ADVERTISE_ADD.ADVERTISE_ADD_RESET));
  };
}

export function resetSingle() {
  return dispatch => {
    dispatch(reset(GET_SINGLE_ADVERTISE.GET_SINGLE_ADVERTISE_RESET));
  };
}

export function resetUpdate() {
  return dispatch => {
    dispatch(reset(ADVERTISE_UPDATE.ADVERTISE_UPDATE_RESET));
  };
}
