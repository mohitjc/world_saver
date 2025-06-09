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
export const get_category = (data) => ({ type: TYPE.GET_CATEGORY, data });

// Thunk Action Creators For Api

/****** action creator for Get all category without pagination ********/
export function allNormalCategories(res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/allnormalcategory`;
    ApiClient.get(getUrl, '')
      .then((result) => {

        if (result && result.success) {

          if (result.data.length) {
            localStorage.setItem("categories", JSON.stringify(result.data))
            dispatch(get_category(result.data))
          }
          // toastAction(true, message.loginSuccessfull);
        } else {
          const errMsg =
            result && result.error && result.error.message
              ? result.error.message
              : 'Something went wrong. Kindly try again later !!!';
          toastAction(false, errMsg);
        }
        dispatch(is_loading(false));
      })

  };
}
