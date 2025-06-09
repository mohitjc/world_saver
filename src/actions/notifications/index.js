import * as TYPE from '../constants';
import ApiClient from '../../api-client';
import { apiUrl } from '../../environment';
import message from '../../utilities/message';
import { toastAction } from '../toast-actions';
import { notification } from 'antd';

export const get_invitations = (data) => {
  return { type: TYPE.GET_INVITATIONS, data };
};
export const accept_invitation = (data) => ({
  type: TYPE.ACCEPT_INVITATION,
  data,
});
export const is_loading = (status) => ({ type: TYPE.IS_LOADING, status });
/****** action creator for get all the service types for admin ********/
export const getInvitations = (params) => {
  return (dispatch, getState) => {
    const {
      user: { access_token },
    } = getState();
    dispatch(is_loading(true));
    ApiClient.get(
      `${apiUrl}/getUserNotifications`,
      params,
      `Bearer ${access_token}`
    ).then((result) => {

      localStorage.setItem('total', result.data)
      // (result, 'aoi');
      // if (result && result.success) {
      //   dispatch(get_invitations(result.data));
      // } else {
      //   toastAction(false, message.commonError);
      // }
      dispatch(is_loading(false));
    });
  };
};

export const getJurney = (data) => ({
  type: TYPE.JURNY_LIST,
  payload: data,
});

export const getJournyList = (params, id) => {

  return (dispatch, getState) => {
    const {
      user: { access_token },
    } = getState();
    dispatch(is_loading(true));
    ApiClient.get(
      `${apiUrl}/journylist`,
      params,
      `Bearer ${access_token}`
    ).then((result) => {
      // console.log
      dispatch(getJurney(result));
      localStorage.setItem('newobject', JSON.stringify(result));
      dispatch(is_loading(false));
    });
  };
};

export function acceptOrRejectInvitations(params, token, res) {
  return (dispatch) => {
    // dispatch(is_loading(true));
    const getUrl = `${apiUrl}/${!params.friend_id ? 'acceptRejectInvitation' : 'acceptRejectRequest'
      }`;

    const apiCAll = !params.friend_id
      ? ApiClient.post(getUrl, params, `Bearer ${token}`)
      : ApiClient.put(getUrl, params, `Bearer ${token}`);

    apiCAll
      .then((result) => {
        if (result.success) {
          res(result);
          notification.open({
            message: result.message
            // message: 'Friend request accepted successfully.',
          });

        } else {
          const errMsg =
            result.error && result.error.message
              ? result.error.message
              : 'Something went wrong. Kindly try again later !!!';
          toastAction(false, errMsg);
        }
      })
  };
}

// To Accept a journey invitation
export const acceptInvitations = (params, cb) => {
  return (dispatch, getState) => {
    const {
      user: { access_token },
    } = getState();

    dispatch(is_loading(true));

    ApiClient.post(
      `${apiUrl}/acceptInvitation`,
      params,
      `Bearer ${access_token}`
    ).then((result) => {
      if (result && result.success) {
        toastAction(true, 'Invitation accepted successfully');
        // cb(true);
      } else {
        toastAction(false, message.commonError);
      }
      dispatch(is_loading(false));
    });
  };
};

// To reject an journey invite
export const rejectInvitations = (params, cb, token) => {
  return (dispatch, getState) => {
    const {
      user: { access_token },
    } = getState();
    dispatch(is_loading(true));

    ApiClient.post(
      `${apiUrl}/rejectInvitation`,
      params,
      `Bearer ${access_token}`
    ).then((result) => {
      if (result && result.success) {
        toastAction(true, 'Invitation rejected successfully');
        // cb(true);
      } else {
        toastAction(false, message.commonError);
      }
      dispatch(is_loading(false));
    });
  };
};
