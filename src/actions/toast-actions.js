/*
 * @file: toast-actions.js
 * @description: It Contain toasts Action function.
 * @author: Poonam
 */

import { push } from 'react-router-redux';
import { toast } from 'react-toastify';
import { history } from '../main/history';

export const toastAction = (status, message, showMessage = false) => {
  if (status) {
    // console.log(message, "message");
    showMessage &&
      toast.success(message, {
        autoClose: 2000,
      });
  } else {
    // console.log(message, "message");
    toast.error(message, {
      autoClose: 2000,
    });
  }
};

export const toastErrorAction = (dispatch, message) => {
  toast.error(message, {
    autoClose: 2000,
    onClose: () => {
      dispatch(push('/'));
    },
  });
  dispatch({ type: 'LOG_OUT' });
};
