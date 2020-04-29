/**
 * @name : action creators
 *
 * @description : These functions create actions which update the store
 *
 * @
 * @param : types and api data
 * @author JC Software Solution PVT. LTD.
 * @return : object
 */

// handle state when request is send and resposen is awaited
export function getRequest(REQUEST) {
  return {
    type: REQUEST
  };
}

// handle state in case of resposen is success
export function getSuccess(SUCCESS, data) {
  return {
    type: SUCCESS,
    payload: data
  };
}

// handle state in case of resposen is reset
export function getFailure(FAILURE, error) {
  return {
    type: FAILURE,
    payload: error
  };
}

export function reset(RESET) {
  return {
    type: RESET
  };
}

// set local storage with access token

export function authenticate(token) {
  return {
    type: 'AUTHENTICATE',
    payload: token
  };
}

// remove local storage with access token

export function deauthenticate() {
  return {
    type: 'DEAUTHENTICATE'
  };
}
