/**
 * @description :  This file has skill add, edit, delete, blog detail functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  DELETE_API,
  SKILLS_ADD,
  SKILLS_UPDATE,
  GET_SKILLS,
  GET_SINGLE_SKILL,
  DELETE_SINGLE_SKILL,
  SKILLS_API,
  PROJECT_API
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure, reset } from './index';

// add skill

export function skillAdd(postObj, token) {
  return dispatch => {
    dispatch(getRequest(SKILLS_ADD.SKILLS_ADD_REQUEST));
    const getUrl = PROJECT_API;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(SKILLS_ADD.SKILLS_ADD_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(SKILLS_ADD.SKILLS_ADD_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage
            }
          })
        );
      });
  };
}

// update skill

export function skillUpdate(obj, token) {
  return dispatch => {
    dispatch(getRequest(SKILLS_UPDATE.SKILLS_UPDATE_REQUEST));
    const getUrl = `${PROJECT_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('updateUser', data);
        if (data.success) {
          dispatch(getSuccess(SKILLS_UPDATE.SKILLS_UPDATE_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(SKILLS_UPDATE.SKILLS_UPDATE_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage
            }
          })
        );
      });
  };
}

// get all skills

export function skills(token, type, page, count, sortType, sort, search) {
  return dispatch => {
    dispatch(getRequest(GET_SKILLS.GET_SKILLS_REQUEST));
    const getUrl = `${PROJECT_API}?type=${type}&search=${search}&page=${page}&count=${10}&sortBy=${sortType} ${sort}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(GET_SKILLS.GET_SKILLS_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(GET_SKILLS.GET_SKILLS_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage
            }
          })
        );
      });
  };
}

// get single skill

export function singleSkill(id, token) {
  return dispatch => {
    dispatch(getRequest(GET_SINGLE_SKILL.GET_SINGLE_SKILL_REQUEST));
    const getUrl = `${PROJECT_API}/${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('singleCategory', data);
        if (data.success) {
          dispatch(
            getSuccess(GET_SINGLE_SKILL.GET_SINGLE_SKILL_SUCCESS, data.data)
          );
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(GET_SINGLE_SKILL.GET_SINGLE_SKILL_FAILURE, {
            data: {
              statusCode: 403,
              // statusText: (error_message.message) ? error_message.message : "Something went wrong. Please try again later.",
              message: errorMessage
            }
          })
        );
      });
  };
}

// delete single skill

export function deleteSkill(obj, token) {
  return dispatch => {
    dispatch(getRequest(DELETE_SINGLE_SKILL.DELETE_SINGLE_SKILL_REQUEST));
    const getUrl = `${DELETE_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` }, data: obj };
    AXIOS_INSTANCE.delete(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('deleteUser', data);
        if (data.success) {
          dispatch(
            getSuccess(
              DELETE_SINGLE_SKILL.DELETE_SINGLE_SKILL_SUCCESS,
              data.data
            )
          );
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(DELETE_SINGLE_SKILL.DELETE_SINGLE_SKILL_FAILURE, {
            data: {
              statusCode: 403,
              message: errorMessage
            }
          })
        );
      });
  };
}

export function resetDeleteSkill() {
  return dispatch => {
    dispatch(reset(DELETE_SINGLE_SKILL.DELETE_SINGLE_SKILL_RESET));
  };
}

export function resetAddSkill() {
  return dispatch => {
    dispatch(reset(SKILLS_ADD.SKILLS_ADD_RESET));
  };
}

export function resetSingleSkill() {
  return dispatch => {
    dispatch(reset(GET_SINGLE_SKILL.GET_SINGLE_SKILL_RESET));
  };
}

export function resetUpdateSkill() {
  return dispatch => {
    dispatch(reset(SKILLS_UPDATE.SKILLS_UPDATE_RESET));
  };
}
