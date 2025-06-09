/*
 * @file: index.js
 * @description: It Contain user Related Action Creators.
 * @author: Poonam
 */
import * as TYPE from '../constants';
import ApiClient from '../../api-client';
import { apiUrl } from '../../environment';
import message from '../../utilities/message';
import { toast } from 'react-toastify';
import { toastAction } from '../toast-actions';
import crendentialModel from '../../components/credentialsModel';
import load from '../../components/loaderMethod';

export const login_success = (data) => ({ type: TYPE.LOGIN_SUCCESS, data });
export const is_loading = (status) => ({ type: TYPE.IS_LOADING, status });

const getNotificationsRequest = () => ({
  type: TYPE.GET_NOTIFICATION_REQUEST,
});
const getNotificationsSuccess = (data) => ({
  type: TYPE.GET_NOTIFICATION_SUCCESS,
  data,
});
const getNotificationsFailure = () => ({
  type: TYPE.GET_NOTIFICATION_FAILURE,
});

export const logout_success = () => ({ type: TYPE.LOG_OUT });

// Thunk Action Creators For Api
/****** action creator for login ********/
export const login = (params, history) => {
  return (dispatch) => {
    load(true);
    ApiClient.post(`${apiUrl}/signinUser`, params).then((result) => {
      if (result.success || result?.code == 200) {
        toast?.success(result?.message);
        localStorage.setItem('headertoken', result?.data.access_token);
        history(`/dashboard`);
        dispatch(login_success(result.data));
        crendentialModel.setUser(result.data);
        document.getElementById('loginModal').click();
        let el = document.getElementById('ChatNotification');
        if (el) el.click();
      } else {
        toast.error(result.error.message);
      }

      load(false);
    });
  };
};

//forgot password

export const forgotpassword = (params) => {
  return (dispatch) => {
    dispatch(is_loading(true));
    ApiClient.post(`${apiUrl}/forgotpassword`, params).then((result) => {
      alert('hello');
      if (result.success) {
        localStorage.setItem('userID', result.data.id);
      }

      dispatch(is_loading(false));
    });
  };
};

/****** action creator for register ********/
export const register = (params, cb) => {
  return (dispatch) => {
    load(true);
    ApiClient.post(`${apiUrl}/register`, params).then((result) => {
      if (result.success) {
        toastAction(true, message.registerationSuccess, false);
        document.getElementById('signupModal').click();
        cb(true);
      } else {
        const errMsg =
          result.error && result.error.message
            ? result.error.message
            : 'Something went wrong. Kindly try again later !!!';
        toastAction(false, errMsg);
      }

      load(false);
    });
  };
};
/****** action creator for login ********/
export const resetpassword = (params, cb) => {
  return (dispatch) => {
    load(true);
    ApiClient.put(`${apiUrl}/resetPassword`, params).then((result) => {
      if (result?.success) {
        toast.success('Password reset successfully.');
        document.getElementById('loginModal').click();
        toastAction(result?.message);
        cb(true);
      } else {
        const errMsg =
          result?.error && result?.error?.message
            ? result.error.message
            : 'Something went wrong. Kindly try again later !!!';
        toastAction(false, errMsg);
      }

      load(false);
    });
  };
};
/****** action creator for login ********/
export const logout = (history) => {
  return (dispatch, getState) => {
    dispatch(logout_success());
    history('/signin');
    localStorage.clear();
  };
};

export function UserList(token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/usersForSelect`;
    // const config = { headers: { Authorization: `Bearer ${token}` } };
    ApiClient.get(getUrl, {}, `Bearer ${token}`)
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
        toastAction(true, errorMessage);
      });
  };
}

export function getUserById(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));

    const userId = params.id;

    const empId = localStorage.getItem('userID');

    const getUrl = params.id ? `${apiUrl}/user/${userId}` : `${apiUrl}/user`;

    ApiClient.get(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);

          //  (result, "resultccv");
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
        toastAction(true, errorMessage);
      });
  };
}


export function updateprofile(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/updateprofile`;

    // const config = { headers: { Authorization: `Bearer ${token}` } };
    ApiClient.put(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          dispatch(login_success(result.data.user[0]));
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
        toastAction(true, errorMessage);
      });
  };
}

export function updateProject(params, token, res) {
  const userID = localStorage.getItem('userID');

  return (dispatch) => {
    dispatch(is_loading(true));
    const userId = params.id;
    const getUrl = `${apiUrl}/project?id=${params.id}`;

    ApiClient.put(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          // (res.success, "done123")
          // dispatch(login_success(result.data.user[0]));
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
        toastAction(true, errorMessage);
      });
  };
}

export function uploadCoverImage(params, token, onSuccess, onFail) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/coverImage`;
    // const config = { headers: { Authorization: `Bearer ${token}` } };
    ApiClient.put(getUrl, params, `Bearer ${token}`).then((result) => {
      if (result.success) {
        dispatch(login_success(result.data.updatedUser[0]));
        onSuccess(result);
      } else {
        const errorMessage =
          result.error && result.error.message
            ? result.error.message
            : 'Something went wrong. Kindly try again later !!!';
        toastAction(false, errorMessage, true);
      }
      dispatch(is_loading(false));
    });
  };
}

export function uploadBannerImage(params, token, onSuccess, onFail) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/project`;
    // const config = { headers: { Authorization: `Bearer ${token}` } };
    ApiClient.put(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          dispatch(login_success(result.data.updatedUser[0]));
          onSuccess(result);
        } else {
          const errorMessage =
            result.error && result.error.message
              ? result.error.message
              : 'Something went wrong. Kindly try again later !!!';
          toastAction(false, errorMessage, true);
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
        toastAction(true, errorMessage, true);
        onFail(errorMessage);
      });
  };
}

export function getUserRoles(token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/permission`;
    // const config = { headers: { Authorization: `Bearer ${token}` } };

    ApiClient.get(getUrl, {}, `Bearer ${token}`).then((result) => {
      if (result?.success) {
        res(result);
      } else {
        const errMsg =
          result?.error && result?.error?.message
            ? result?.error?.message
            : 'Something went wrong. Kindly try again later !!!';
        toastAction(false, errMsg);
      }
      dispatch(is_loading(false));
    });
  };
}

export function getUserNotifications(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    dispatch(getNotificationsRequest());
    const getUrl = `${apiUrl}/getUserNotifications`;
    ApiClient.get(getUrl, params, `Bearer ${token}`).then((result) => {
      // (result, ",not")
      if (result && result.success) {
        res(result);

        dispatch(getNotificationsSuccess(result));
      }

      // load(false)
      dispatch(is_loading(false));
    });
  };
}

// Get all those users who are my friends
export function getFriends(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    dispatch(getNotificationsRequest());
    const getUrl = `${apiUrl}/friends`;
    ApiClient.get(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
          // dispatch(getNotificationsSuccess(result));
          // projects_success(result);
        } else {
          dispatch(getNotificationsFailure());
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

// Get all those users who are my friends
export function getFriendChat(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/fetch-messeges`;
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
      });
  };
}

// Get all those users who are my friends
export function getUserMedia(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    dispatch(getNotificationsRequest());
    const getUrl = `${apiUrl}/user_media`;
    ApiClient.get(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
          // dispatch(getNotificationsSuccess(result));
          // projects_success(result);
        } else {
          dispatch(getNotificationsFailure());
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
