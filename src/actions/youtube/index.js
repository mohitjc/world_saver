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

export const youtubes_success = (data) => ({
  type: TYPE.PROJECTS_SUCCESS,
  data,
});
export function getyoutubeList(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/allyouTubeLink/?archiveStatus=true`;
    ApiClient.get(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
          youtubes_success(result);
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

export function getyoutubeDetail(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/allyouTubeLink/?archiveStatus=true&page=0&count=1`;

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

