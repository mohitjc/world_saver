export function parseJSON(response) {
  return response.data;
}

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    if (!response.data.success && response.data.error) {
      // this.handleLogoutRedirect();
      const error = new Error(response.data.error.message);
      error.response = response;
      throw error;
    } else {
      return response;
    }
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function logOut() {
  localStorage.removeItem('token');
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action.payload) : state;
  };
}
