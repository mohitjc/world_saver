/**
 * @description :  This file has question add, edit, delete, blog detail functions
 * @param: CRUD values and access token
 * @return : Boolean and success, error message
 * @author JC Software Solution PVT. LTD.
 */

import {
  AXIOS_INSTANCE,
  QUESTION_ADD,
  QUESTION_UPDATE,
  GET_QUESTIONS,
  GET_SINGLE_QUESTION,
  DELETE_SINGLE_QUESTION,
  QUESTION_API,
  ADD_QUESTION_API,
  ALL_QUESTION_API,
  DELETE_QUESTION_API
} from '../constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';
import { getRequest, getSuccess, getFailure, reset } from './index';

// add questions

export function questionsAdd(postObj, token) {
  return dispatch => {
    dispatch(getRequest(QUESTION_ADD.QUESTION_ADD_REQUEST));
    const getUrl = ADD_QUESTION_API;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.post(getUrl, postObj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(QUESTION_ADD.QUESTION_ADD_SUCCESS, data));
        }
      })
      .catch(error => {
        // console.log('error', error.response);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Something went wrong!';
        dispatch(
          getFailure(QUESTION_ADD.QUESTION_ADD_FAILURE, {
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

// update questions

export function questionsUpdate(obj, id, token) {
  return dispatch => {
    dispatch(getRequest(QUESTION_UPDATE.QUESTION_UPDATE_REQUEST));
    const getUrl = `${QUESTION_API}/?id=${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.put(getUrl, obj, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('updateUser', data);
        if (data.success) {
          dispatch(getSuccess(QUESTION_UPDATE.QUESTION_UPDATE_SUCCESS, data));
        }
      })
      .catch(error => {
        console.log('error', error.response);
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(QUESTION_UPDATE.QUESTION_UPDATE_FAILURE, {
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

// get all questions

export function questions(token, type, page, count, sortType, sort, search) {
  return dispatch => {
    dispatch(getRequest(GET_QUESTIONS.GET_QUESTIONS_REQUEST));
    const getUrl = `${ALL_QUESTION_API}?type=${type}&search=${search}&page=${page}&count=${10}&sortBy=${sortType} ${sort}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('response', data);
        if (data.success) {
          dispatch(getSuccess(GET_QUESTIONS.GET_QUESTIONS_SUCCESS, data));
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
          getFailure(GET_QUESTIONS.GET_QUESTIONS_FAILURE, {
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

// get single question detail

export function singleQuestion(id, token) {
  return dispatch => {
    dispatch(getRequest(GET_SINGLE_QUESTION.GET_SINGLE_QUESTION_REQUEST));
    const getUrl = `${QUESTION_API}/?id=${id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('singleCategory', data);
        if (data.success) {
          dispatch(
            getSuccess(
              GET_SINGLE_QUESTION.GET_SINGLE_QUESTION_SUCCESS,
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
          getFailure(GET_SINGLE_QUESTION.GET_SINGLE_QUESTION_FAILURE, {
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

// delete single question

export function deleteQuestion(obj, token) {
  return dispatch => {
    dispatch(getRequest(DELETE_SINGLE_QUESTION.DELETE_SINGLE_QUESTION_REQUEST));
    const getUrl = `${DELETE_QUESTION_API}`;
    const config = { headers: { Authorization: `Bearer ${token}` }, data: obj };
    AXIOS_INSTANCE.delete(getUrl, config)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(data => {
        // console.log('deleteUser', data);
        if (data.success) {
          dispatch(
            getSuccess(
              DELETE_SINGLE_QUESTION.DELETE_SINGLE_QUESTION_SUCCESS,
              data.data
            )
          );
        }
      })
      .catch(error => {
        console.log('error', error.response);
        const errorMessage =
          error.response &&
          error.response.data &&
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        dispatch(
          getFailure(DELETE_SINGLE_QUESTION.DELETE_SINGLE_QUESTION_FAILURE, {
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

export function resetDeleteQuestion() {
  return dispatch => {
    dispatch(reset(DELETE_SINGLE_QUESTION.DELETE_SINGLE_QUESTION_RESET));
  };
}

export function resetAddQuestion() {
  return dispatch => {
    dispatch(reset(QUESTION_ADD.QUESTION_ADD_RESET));
  };
}

export function resetSingleQuestion() {
  return dispatch => {
    dispatch(reset(GET_SINGLE_QUESTION.GET_SINGLE_QUESTION_RESET));
  };
}

export function resetUpdateQuestion() {
  return dispatch => {
    dispatch(reset(QUESTION_UPDATE.QUESTION_UPDATE_RESET));
  };
}
