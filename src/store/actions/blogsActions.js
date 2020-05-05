/**
 * @description :  This file has blog add, edit, delete, blog detail functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  IMAGE_UPLOAD_API,
  ALL_BLOGS_API,
  DELETE_BLOG_API,
  BLOG_API,
  BLOG_ADD,
  BLOG_UPDATE,
  GET_BLOGS,
  GET_SINGLE_BLOG,
  DELETE_SINGLE_BLOG,
  BLOG_IMAGE_UPLOAD
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure, reset } from './index';

export function blogAdd(postObj, token) {
  return dispatch => {
    dispatch(getRequest(BLOG_ADD.BLOG_ADD_REQUEST));
    const getUrl = BLOG_API;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(BLOG_ADD.BLOG_ADD_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(BLOG_ADD.BLOG_ADD_FAILURE, {
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

// update blog

export function blogsUpdate(obj, id, token) {
  return dispatch => {
    dispatch(getRequest(BLOG_UPDATE.BLOG_UPDATE_REQUEST));
    const getUrl = `${BLOG_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('blogsUpdate', data);
        if (data.success) {
          dispatch(getSuccess(BLOG_UPDATE.BLOG_UPDATE_SUCCESS, data));
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
          getFailure(BLOG_UPDATE.BLOG_UPDATE_FAILURE, {
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

// get all blogs

export function blogs(token, type, page, count, sortType, sort, search) {
  return dispatch => {
    dispatch(getRequest(GET_BLOGS.GET_BLOGS_REQUEST));
    const getUrl = `${ALL_BLOGS_API}?type=${type}&search=${search}&page=${page}&count=${10}&sortBy=${sortType} ${sort}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(GET_BLOGS.GET_BLOGS_SUCCESS, data));
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
          getFailure(GET_BLOGS.GET_BLOGS_FAILURE, {
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

// get single blog detail

export function singleBlog(id, token) {
  return dispatch => {
    dispatch(getRequest(GET_SINGLE_BLOG.GET_SINGLE_BLOG_REQUEST));
    const getUrl = `${BLOG_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('singleBlog', data);
        if (data.success) {
          dispatch(
            getSuccess(GET_SINGLE_BLOG.GET_SINGLE_BLOG_SUCCESS, data.data)
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
          getFailure(GET_SINGLE_BLOG.GET_SINGLE_BLOG_FAILURE, {
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

// delete the single blog

export function deleteBlog(obj, token) {
  return dispatch => {
    dispatch(getRequest(DELETE_SINGLE_BLOG.DELETE_SINGLE_BLOG_REQUEST));
    const getUrl = `${DELETE_BLOG_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` }, data: obj };
    AXIOS_INSTANCE.delete(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('deleteUser', data);
        if (data.success) {
          dispatch(
            getSuccess(DELETE_SINGLE_BLOG.DELETE_SINGLE_BLOG_SUCCESS, data.data)
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
          getFailure(DELETE_SINGLE_BLOG.DELETE_SINGLE_BLOG_FAILURE, {
            data: {
              statusCode: 403,
              message: errorMessage
            }
          })
        );
      });
  };
}

// image upload for blogs

export function uploadImage(obj, token) {
  console.log('uploadImageobj', obj);
  return dispatch => {
    dispatch(getRequest(BLOG_IMAGE_UPLOAD.BLOG_IMAGE_UPLOAD_REQUEST));
    const getUrl = `${IMAGE_UPLOAD_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('uploadImage', data);
        if (data.success) {
          dispatch(
            getSuccess(BLOG_IMAGE_UPLOAD.BLOG_IMAGE_UPLOAD_SUCCESS, data)
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
          getFailure(BLOG_IMAGE_UPLOAD.BLOG_IMAGE_UPLOAD_FAILURE, {
            data: {
              statusCode: 403,
              message: errorMessage
            }
          })
        );
      });
  };
}

// resets the blog

export function resetDeleteBlog() {
  return dispatch => {
    dispatch(reset(DELETE_SINGLE_BLOG.DELETE_SINGLE_BLOG_RESET));
  };
}

export function resetAddBlog() {
  return dispatch => {
    dispatch(reset(BLOG_ADD.BLOG_ADD_RESET));
  };
}

export function resetSingleBlog() {
  return dispatch => {
    dispatch(reset(GET_SINGLE_BLOG.GET_SINGLE_BLOG_RESET));
  };
}

export function resetUpdateBlog() {
  return dispatch => {
    dispatch(reset(BLOG_UPDATE.BLOG_UPDATE_RESET));
  };
}
