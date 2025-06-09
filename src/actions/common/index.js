/*
 * @file: index.js
 * @description: It Contain user Related Action Creators.
 * @author: Poonam
 */
import * as TYPE from '../constants';
import ApiClient from '../../api-client';
import { apiUrl } from '../../environment';
import { toastAction } from '../toast-actions';

export const is_loading = (status) => ({ type: TYPE.IS_LOADING, status });
export const get_categories = (data) => ({
  type: TYPE.GET_CATEGORY_LIST,
  data,
});

// Thunk Action Creators For Api

// /****** action creator for Get all category without pagination ********/
export function imageUpload(params, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/upload`;
    // const config = { headers: { Authorization: `Bearer ${token}` } };
    ApiClient.post(getUrl, params)
      .then((result) => {
        if (result.success) {
          toastAction(true, 'Image is uploaded successfully');
          res(result);
        } else {

        }

        dispatch(is_loading(false));
      })

  };
}

export function videoUpload(params, token, res) {

  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/uploadVideos`;
    // const config = { headers: { Authorization: `Bearer ${token}` } };

    ApiClient.post(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result?.success) {
          toastAction(true, 'Video is uploaded successfully');
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

  };
}
