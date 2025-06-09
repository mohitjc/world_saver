/*
 * @file: index.js
 * @description: It Contain user Related Action Creators.
 * @author: Mandeep
 */
import * as TYPE from '../constants';
import ApiClient from '../../api-client';
import { apiUrl } from '../../environment';
import { toastAction } from '../toast-actions';
import { toast } from 'react-toastify';


export const is_loading = (status) => ({ type: TYPE.IS_LOADING, status });

// Thunk Action Creators For Api

/****** action creator for Get all category without pagination ********/
export function CreatePostAction(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/createPost`;

    ApiClient.post(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          toastAction(true, 'Post added successfully');
          res(result);
        } else {
          const errMsg =
            result.error && result.error.message
              ? result.error.message
              : 'Something went wrong. Kindly try again later !!!';
          toastAction(false, errMsg);
        }

        setTimeout(() => {
          dispatch(is_loading(false));
        }, 1200)

      })
      .catch((error) => { });
  };
}

export function getUserPosts(params, token, res) {
  let offset = 0;
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/userposts`;
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

export function getUserWallPosts(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/userWallPosts`;
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

export function saveCommentAction(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/comment`;

    ApiClient.post(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          toastAction(true, 'Comment saved successfully');
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
      .catch((error) => { });
  };
}

export function savePostAction(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/post/update`;

    ApiClient.post(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          toastAction(true, 'post saved successfully');
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
      .catch((error) => { });
  };
}


export function deleteCommentAction(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/deleteComment`;
    ApiClient.delete(getUrl, `Bearer ${token}`, params)
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
      .catch((error) => { });
  };
}

export function deletePostAction(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/delete`;
    ApiClient.delete(getUrl, `Bearer ${token}`, params)
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
      .catch((error) => { });
  };
}

export function updateCommentAction(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/updateComment?id=${params.id}`;
    ApiClient.put(getUrl, params, `Bearer ${token}`)
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
      .catch((error) => { });
  };
}

export function updatePostAction(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/post/update`;
    ApiClient.put(getUrl, params, `Bearer ${token}`)
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
      .catch((error) => { });
  };
}

export function saveCommentOnThreadAction(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/commentOnThread`;

    ApiClient.post(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          toastAction(true, 'Comment saved successfully');
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
      .catch((error) => { });
  };
}

export function getPostCommentsAction(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/getPostComments`;

    ApiClient.get(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          toastAction(true, 'Comment saved successfully');
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
      .catch((error) => { });
  };
}
// const geUserPosts = () => {

//   setLoader(true);
//   let prm = {
//     createdBy: props.user.id,
//   };

//   ApiClient.get(`${apiUrl}/WallPosts`, prm)
//     .then((res) =>

//       res.json())
//     .then(
//       (res) => {
//         setLoader(false);
//         setPostData1(res.data);

//       },
//       (err) => {
//         setLoader(false);
//       }
//     );

// };


export function sharePost(params, token, res) {
  return (dispatch) => {
    dispatch(is_loading(true));
    const getUrl = `${apiUrl}/sharePost`;
    ApiClient.post(getUrl, params, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          toast.success('Post shared successfully.');
          toastAction(true, 'Comment saved successfully');
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
      .catch((error) => { });

  };

}

// http://198.251.65.146:4502/sharePost?sharedBy=5fcdc1dad047703a46ec98b8&post_id=6078731ba343ef06676c9c5d&share_with=Friends
