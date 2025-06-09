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
export function getWorldSavers(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/getWorldSavers`;
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
  };
}
