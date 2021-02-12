/**
 * @description :  This file has user CRUD related functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  USER_ADD,
  USER_API,
  YOUTUBE_API,
  API_SLUG,
  GET_YOUTUBE,
  USER_UPDATE,
  GET_SINGLE_USER,
  DELETE_SINGLE_USER,
  GET_USERS_FOR_INVITE,
  GET_USERS_LIST_API,
  SEND_USERS_INVITATION_API,
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure, reset } from './index';

export function Add(postObj, token) {
  return (dispatch) => {
    dispatch(getRequest(USER_ADD.USER_ADD_REQUEST));
    const getUrl = YOUTUBE_API;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(getSuccess(USER_ADD.USER_ADD_SUCCESS, data));
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(USER_ADD.USER_ADD_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function Update(obj, id, token) {
  return (dispatch) => {
    dispatch(getRequest(USER_UPDATE.USER_UPDATE_REQUEST));
    const getUrl = `${YOUTUBE_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(getSuccess(USER_UPDATE.USER_UPDATE_SUCCESS, data));
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(USER_UPDATE.USER_UPDATE_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function youtube(token, type, page, count, sortType, roles, sort, search) {
  return (dispatch) => {
    dispatch(getRequest(GET_YOUTUBE.GET_YOUTUBE_REQUEST));
    // const getUrl = `${YOUTUBE_API}?type=${type}&search=${search}&page=${page}&count=${10}&roles=${roles}&sortBy=${sortType} ${sort}`;
    const getUrl = `${API_SLUG}/allyouTubeLink`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(getSuccess(GET_YOUTUBE.GET_YOUTUBE_SUCCESS, data));
          console.log("yotube data", data)
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(GET_YOUTUBE.GET_YOUTUBE_RESET, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function singleUser(id, token) {
  return (dispatch) => {
    dispatch(getRequest(GET_SINGLE_USER.GET_SINGLE_USER_REQUEST));
    const getUrl = `${YOUTUBE_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(
            getSuccess(GET_SINGLE_USER.GET_SINGLE_USER_SUCCESS, data.data)
          );
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(GET_SINGLE_USER.GET_SINGLE_USER_RESET, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function deleteUser(id, token) {
  return (dispatch) => {
    dispatch(getRequest(DELETE_SINGLE_USER.DELETE_SINGLE_USER_REQUEST));
    const getUrl = `${YOUTUBE_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.delete(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(
            getSuccess(DELETE_SINGLE_USER.DELETE_SINGLE_USER_SUCCESS, data.data)
          );
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(DELETE_SINGLE_USER.DELETE_SINGLE_USER_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function resetDeleteUser() {
  return (dispatch) => {
    dispatch(reset(DELETE_SINGLE_USER.DELETE_SINGLE_USER_RESET));
  };
}

export function resetAddUser() {
  return (dispatch) => {
    dispatch(reset(USER_ADD.USER_ADD_RESET));
  };
}

export function resetSingleUser() {
  return (dispatch) => {
    dispatch(reset(GET_SINGLE_USER.GET_SINGLE_USER_RESET));
  };
}

export function resetUpdateUser() {
  return (dispatch) => {
    dispatch(reset(USER_UPDATE.USER_UPDATE_RESET));
  };
}

export function List() {
  return (dispatch) => {
    dispatch(getRequest(GET_USERS_FOR_INVITE.REQUEST));
    const getUrl = GET_USERS_LIST_API;
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(getSuccess(GET_USERS_FOR_INVITE.SUCCESS, data));
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(GET_USERS_FOR_INVITE.FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function sendInvites(postObj, cb) {
  return (dispatch) => {
    const getUrl = SEND_USERS_INVITATION_API;
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          return cb(true);
          // dispatch(getSuccess(USER_ADD.USER_ADD_SUCCESS, data));
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(USER_ADD.USER_ADD_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}
