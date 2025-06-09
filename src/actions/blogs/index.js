/*
 * @file: index.js
 * @description: It Contain user Related Action Creators.
 * @author: Mandeep
 */
import * as TYPE from '../constants';
import ApiClient from '../../api-client';
import { apiUrl } from '../../environment';
import { toastAction } from '../toast-actions';

export const is_loading = (status) => ({ type: TYPE.IS_LOADING, status });

// Thunk Action Creators For Api

export const blogs_success = (data) => ({
  type: TYPE.PROJECTS_SUCCESS,
  data,
});
export function getblogList(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/blogs/`;
    ApiClient.get(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
          blogs_success(result);
        } else {
          const errMsg =
            result.error && result.error.message
              ? result.error.message
              : 'Something went wrong. Kindly try again later !!!';
          toastAction(false, errMsg);
        }
        dispatch(is_loading(false));
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
            error.response.data &&
            error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        // if (error) {
        //   toastAction(false, errorMessage);
        // }
      });
  };
}

export function getblogListByCat(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/blogs/?cat_id=${params}`;
    ApiClient.get(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
          blogs_success(result);
        } else {
          const errMsg =
            result.error && result.error.message
              ? result.error.message
              : 'Something went wrong. Kindly try again later !!!';
          toastAction(false, errMsg);
        }
        dispatch(is_loading(false));
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
            error.response.data &&
            error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        // if (error) {
        //   toastAction(false, errorMessage);
        // }
      });
  };
}

export function getblogDetail(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/blog/${params}`;
    ApiClient.get(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
        } else {
          const errMsg =
            result.error && result.error.message
              ? result.error.message
              : 'Something went wrong. Kindly try again later !!!';
          toastAction(false, errMsg);
        }
        dispatch(is_loading(false));
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
            error.response.data &&
            error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        if (error) {
          toastAction(false, errorMessage);
        }
      });
  };
}

export function getblogSearch(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/blogs?search=${params}`;
    ApiClient.get(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
        } else {
          const errMsg =
            result.error && result.error.message
              ? result.error.message
              : 'Something went wrong. Kindly try again later !!!';
          toastAction(false, errMsg);
        }
        dispatch(is_loading(false));
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
            error.response.data &&
            error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        if (error) {
          toastAction(false, errorMessage);
        }
      });
  };
}