/**
 * @description :  This file has user CRUD related functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  USER_ADD,
  USER_API,
  GET_USERS,
  USER_UPDATE,
  GET_SINGLE_USER,
  DELETE_SINGLE_USER,
  GET_USERS_FOR_INVITE,
  GET_USERS_LIST_API,
  SEND_USERS_INVITATION_API,
  ALL_POST,
  DELETE_POST,
  DELETE_SINGLE_BLOG,
  GET_POSTS,
  POST_API,
  DELETE_POST_USER,
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure, reset } from './index';

export function userAdd(postObj, token) {
  return (dispatch) => {
    dispatch(getRequest(USER_ADD.USER_ADD_REQUEST));
    const getUrl = USER_API;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(getSuccess(USER_ADD.USER_ADD_SUCCESS, data));
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(USER_ADD.USER_ADD_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function userUpdate(obj, id, token) {
  return (dispatch) => {
    dispatch(getRequest(USER_UPDATE.USER_UPDATE_REQUEST));
    const getUrl = `${USER_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(getSuccess(USER_UPDATE.USER_UPDATE_SUCCESS, data));
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(USER_UPDATE.USER_UPDATE_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function users(token, type, page, count, sortType, roles, sort, search) {
  return (dispatch) => {
    dispatch(getRequest(GET_USERS.GET_USERS_REQUEST));
    const getUrl = `${USER_API}?type=${type}&search=${search}&page=${page}&count=${10}&roles=${roles}&sortBy=${sortType} ${sort}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(getSuccess(GET_USERS.GET_USERS_SUCCESS, data));
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(GET_USERS.GET_USERS_RESET, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function posts(token, type, page, count, sortType, roles, sort, search) {
  return (dispatch) => {
    dispatch(getRequest(GET_POSTS.GET_POSTS_REQUEST));
    const getUrl = `${POST_API}?type=${type}&search=${search}&page=${page}&count=${10}&roles=${roles}&sortBy=${sortType} ${sort}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        console.log(data, 'resultdata');

        if (data.success) {
          console.log(data.success, 'data.success');
          dispatch(getSuccess(GET_POSTS.GET_POSTS_SUCCESS, data));
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(GET_POSTS.GET_POSTS_RESET, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function singleUser(id, token) {
  return (dispatch) => {
    dispatch(getRequest(GET_SINGLE_USER.GET_SINGLE_USER_REQUEST));
    const getUrl = `${USER_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(
            getSuccess(GET_SINGLE_USER.GET_SINGLE_USER_SUCCESS, data.data)
          );
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(GET_SINGLE_USER.GET_SINGLE_USER_RESET, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function deleteUser(id, token) {
  // console.log("ankul");
  return (dispatch) => {
    dispatch(getRequest(DELETE_SINGLE_USER.DELETE_SINGLE_USER_REQUEST));
    const getUrl = `${USER_API}/delete?id=${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.delete(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(
            getSuccess(DELETE_SINGLE_USER.DELETE_SINGLE_USER_SUCCESS, data.data)
          );
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(DELETE_SINGLE_USER.DELETE_SINGLE_USER_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function deletePost(id, token) {
  return (dispatch) => {
    dispatch(getRequest(DELETE_POST_USER.DELETE_POST_USER_REQUEST));
    const getUrl = `${POST_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.delete(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(
            getSuccess(DELETE_POST_USER.DELETE_POST_USER_SUCCESS, data.data)
          );
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(DELETE_POST_USER.DELETE_POST_USER_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

export function resetDeleteUser() {
  return (dispatch) => {
    dispatch(reset(DELETE_SINGLE_USER.DELETE_SINGLE_USER_RESET));
  };
}

export function resetAddUser() {
  return (dispatch) => {
    dispatch(reset(USER_ADD.USER_ADD_RESET));
  };
}

export function resetSingleUser() {
  return (dispatch) => {
    dispatch(reset(GET_SINGLE_USER.GET_SINGLE_USER_RESET));
  };
}

export function resetUpdateUser() {
  return (dispatch) => {
    dispatch(reset(USER_UPDATE.USER_UPDATE_RESET));
  };
}

export function usersList() {
  return (dispatch) => {
    dispatch(getRequest(GET_USERS_FOR_INVITE.REQUEST));
    const getUrl = GET_USERS_LIST_API;
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          dispatch(getSuccess(GET_USERS_FOR_INVITE.SUCCESS, data));
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(GET_USERS_FOR_INVITE.FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}

// export function allPost() {
//   return (dispatch) => {
//     dispatch(getRequest(GET_USERS_FOR_INVITE.REQUEST));
//     const getUrl = `${ALL_POST}/allposts`;

//     const token = localStorage.getItem('token');
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     AXIOS_INSTANCE.get(getUrl, config)
//       .then(checkHttpStatus)
//       .then(parseJSON)
//       .then((data) => {
//         if (data.success) {
//           dispatch(getSuccess(GET_USERS_FOR_INVITE.SUCCESS, data));
//         }
//       })
//       .catch((error) => {
//         const errorMessage =
//           error.response &&
//           error.response.data &&
//           error.response.data.error_description
//             ? error.response.data.error_description
//             : 'Something went wrong!';
//         dispatch(
//           getFailure(GET_USERS_FOR_INVITE.FAILURE, {
//             data: {
//               statusCode: 403,
//               // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
//               message: errorMessage,
//             },
//           })
//         );
//       });
//   };
// }

// export function deletePost(obj, token) {
//   return dispatch => {
//     dispatch(getRequest(DELETE_SINGLE_BLOG.DELETE_SINGLE_BLOG_REQUEST));
//     const getUrl = `${DELETE_POST}`;
//     const config = { headers: { Authorization: `Bearer ${token}` }, data: obj };
//     AXIOS_INSTANCE.delete(getUrl, config)
//       .then(checkHttpStatus)
//       .then(parseJSON)
//       .then(data => {
//         // console.log('deleteUser', data);
//         if (data.success) {
//           dispatch(
//             getSuccess(DELETE_SINGLE_BLOG.DELETE_SINGLE_BLOG_SUCCESS, data.data)
//           );
//         }
//       })
//       .catch(error => {
//         // console.log('error', error.response);
//         const errorMessage =
//           error.response &&
//           error.response.data &&
//           error.response.data.error_description
//             ? error.response.data.error_description
//             : 'Something went wrong!';
//         dispatch(
//           getFailure(DELETE_SINGLE_BLOG.DELETE_SINGLE_BLOG_FAILURE, {
//             data: {
//               statusCode: 403,
//               message: errorMessage
//             }
//           })
//         );
//       });
//   };
// }


export function sendInvites(postObj, cb) {
  return (dispatch) => {
    const getUrl = SEND_USERS_INVITATION_API;
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((data) => {
        if (data.success) {
          return cb(true);
          // dispatch(getSuccess(USER_ADD.USER_ADD_SUCCESS, data));
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(USER_ADD.USER_ADD_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage,
            },
          })
        );
      });
  };
}
