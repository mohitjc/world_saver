/**
 * @description :  This file has category add, edit, delete, blog detail functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  // YOUTUBE_ADD,
  YOUTUBE_ADD,
  // YOUTUBE_UPDATE,
  YOUTUBE_UPDATE,
  // GET_CATEGORIES,
  GET_YOUTUBE,
  // GET_SINGLE_YOUTUBE,
  GET_SINGLE_YOUTUBE,
  // DELETE_SINGLE_YOUTUBE,
  DELETE_SINGLE_YOUTUBE,
  // YOUTUBE_API,
  YOUTUBE_API,
  API_SLUG,
  // ALL_YOUTUBE_API,
  ALL_YOUTUBE_API,
  YOUTUBE_ARCHIVE,
  // GET_YOUTUBE_BY_TYPE,
  GET_YOUTUBE_BY_TYPE,
  // YOUTUBE_BY_TYPE_API,
  YOUTUBE_BY_TYPE_API
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure, reset } from './index';

// add the

export function Add(postObj, token) {
  return dispatch => {
    dispatch(getRequest(YOUTUBE_ADD.YOUTUBE_ADD_REQUEST));
    const getUrl = YOUTUBE_API;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(YOUTUBE_ADD.YOUTUBE_ADD_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(YOUTUBE_ADD.YOUTUBE_ADD_FAILURE, {
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
    dispatch(getRequest(YOUTUBE_UPDATE.YOUTUBE_UPDATE_REQUEST));
    const getUrl = `${YOUTUBE_API}/?id=${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('updateUser', data);
        if (data.success) {
          dispatch(getSuccess(YOUTUBE_UPDATE.YOUTUBE_UPDATE_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(YOUTUBE_UPDATE.YOUTUBE_UPDATE_FAILURE, {
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


// is Archive start
export function Archive(obj, id, token) {
  return dispatch => {
    dispatch(getRequest(YOUTUBE_ARCHIVE.YOUTUBE_ARCHIVE_REQUEST));
    const getUrl = `${API_SLUG}/changeArchiveStatus/?id=${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('updateUser', data);
        if (data.success) {
          dispatch(getSuccess(YOUTUBE_ARCHIVE.YOUTUBE_ARCHIVE_SUCCESS, data));
        }
      })
      .catch(error => {
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(YOUTUBE_ARCHIVE.YOUTUBE_ARCHIVE_FAILURE, {
            data: {
              statusCode: 403,
              message: errorMessage
            }
          })
        );
      });
  };
}
// is Archive end


// get all categories

export function items(token, type, page, count, sortType, sort, search) {
  return dispatch => {
    dispatch(getRequest(GET_YOUTUBE.GET_YOUTUBE_REQUEST));
    const getUrl = `${ALL_YOUTUBE_API}?type=${type}&search=${search}&page=${page}&count=${10}&sortBy=${sortType} ${sort}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        if (data.success) {
          dispatch(getSuccess(GET_YOUTUBE.GET_YOUTUBE_SUCCESS, data));
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
          getFailure(GET_YOUTUBE.GET_YOUTUBE_FAILURE, {
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




export function single(id, token) {
  return dispatch => {
    dispatch(getRequest(GET_SINGLE_YOUTUBE.GET_SINGLE_YOUTUBE_REQUEST));
    const getUrl = `${YOUTUBE_API}/?id=${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('singleCategory', data);
        if (data.success) {
          dispatch(
            getSuccess(
              GET_SINGLE_YOUTUBE.GET_SINGLE_YOUTUBE_SUCCESS,
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
          getFailure(GET_SINGLE_YOUTUBE.GET_SINGLE_YOUTUBE_FAILURE, {
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
    dispatch(getRequest(GET_YOUTUBE_BY_TYPE.GET_YOUTUBE_BY_TYPE_REQUEST));
    const getUrl = `${YOUTUBE_BY_TYPE_API}?typeid=${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        console.log('getCatByType', data);
        if (data.success) {
          dispatch(
            getSuccess(
              GET_YOUTUBE_BY_TYPE.GET_YOUTUBE_BY_TYPE_SUCCESS,
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
          getFailure(GET_YOUTUBE_BY_TYPE.GET_YOUTUBE_BY_TYPE_FAILURE, {
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
    dispatch(getRequest(DELETE_SINGLE_YOUTUBE.DELETE_SINGLE_YOUTUBE_REQUEST));
    const getUrl = `${YOUTUBE_API}/?id=${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.delete(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('deleteUser', data);
        if (data.success) {
          dispatch(
            getSuccess(
              DELETE_SINGLE_YOUTUBE.DELETE_SINGLE_YOUTUBE_SUCCESS,
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
          getFailure(DELETE_SINGLE_YOUTUBE.DELETE_SINGLE_YOUTUBE_FAILURE, {
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
    dispatch(reset(DELETE_SINGLE_YOUTUBE.DELETE_SINGLE_YOUTUBE_RESET));
  };
}

export function resetAdd() {
  return dispatch => {
    dispatch(reset(YOUTUBE_ADD.YOUTUBE_ADD_RESET));
  };
}

export function resetSingle() {
  return dispatch => {
    dispatch(reset(GET_SINGLE_YOUTUBE.GET_SINGLE_YOUTUBE_RESET));
  };
}

export function resetUpdate() {
  return dispatch => {
    dispatch(reset(YOUTUBE_UPDATE.YOUTUBE_UPDATE_RESET));
  };
}
