/*
 * @file: index.js
 * @description: It Contain user Related Action Creators.
 * @author: Mandeep
 */
import * as TYPE from '../constants';
import ApiClient from '../../api-client';
import { apiUrl } from '../../environment';
import { toastAction } from '../toast-actions';

export const login_success = (data) => ({ type: TYPE.LOGIN_SUCCESS, data });
export const is_loading = (status) => ({ type: TYPE.IS_LOADING, status });

// Thunk Action Creators For Api

/****** action creator for Get all category without pagination ********/
export function createProject(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/createProject`;

    ApiClient.post(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          toastAction(true, 'Project added successfully');
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

export function updateProject(params, token, res) {
  return (dispatch) => {
    // dispatch(is_loading(true));

    const getUrl = `${apiUrl}/project?id=${params.id}`;

    ApiClient.put(getUrl, params, `Bearer ${token}`).then((result) => {
      if (result.success) {
        // dispatch(login_success(result.data[0].user));
        toastAction(true, 'Update Project added successfully');
        // res(result);
      } else {
        const errMsg =
          result.error && result.error.message
            ? result.error.message
            : 'Something went wrong. Kindly try again later !!!';

        toastAction(false, errMsg);
      }
      dispatch(is_loading(false));
    });
  };
}

export function getUserProjects(params, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/getUserProjects`;
    ApiClient.get(getUrl, { ...params, isDeleted: false })
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

export const projects_success = (data) => ({
  type: TYPE.PROJECTS_SUCCESS,
  data,
});

export function getprojectList(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/project`;
    ApiClient.get(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
          projects_success(result);
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

export function getCommonSearchList(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    let id = localStorage.getItem('userID');
    const getUrl = `${apiUrl}/commonSearch`;
    ApiClient.get(getUrl, { ...params, user_id: id }, `Bearer ${token}`)
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

export function getprojectDetail(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));

    const getUrl = `${apiUrl}/projectData`;

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

export function sendInvites(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/sendInvite`;
    ApiClient.post(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
          toastAction(true, 'Invites has been sent successfully.');
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

export function addFriend(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/addFriend`;
    ApiClient.post(getUrl, params, `Bearer ${token}`).then((result) => {
      if (result?.success) {
        res(result);
        // toastAction(true, 'Invites has been sent successfully.', true);

        toastAction(true, 'Friend Request has been sent successfully.', true);
      } else {
        const errMsg =
          result?.error && result?.error?.message
            ? result.error.message
            : 'Something went wrong. Kindly try again later !!!';
        toastAction(false, errMsg);
      }
      dispatch(is_loading(false));
    });
  };
}

export function SaveProfile(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/SaveProfile`;

    ApiClient.post(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
          toastAction(true, 'Data Save successfully.', true);
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

// /getProjectMembers?project_id=5f9a79dd2c94791b557c2e84&page=1&count=5
export function getProjectMembers(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/getProjectMembers`;
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

export function addFriendAction(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/addFriend`;

    ApiClient.post(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
          toastAction(true, 'Friend request has been sent successfully.');
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

export function SaveProfileAction(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/SaveProfile`;
    ApiClient.post(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
          toastAction(true, 'Data Save  successfully.');
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

export function unFriend(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/unjoinProject`;
    ApiClient.put(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
          toastAction(true, 'Journey request has been sent successfully.');
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

export function joinProject(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/joinProject`;
    ApiClient.post(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          res(result);
          toastAction(true, 'Journey request has been sent successfully.');
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

export function getJourneyMedia(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/journey_media`;
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

export function getprojectPosts(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/projectPosts`;
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
