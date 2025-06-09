/*
 * @file: index.js
 * @description: Auth functions here
 * @date: 10 June 2020
 * @author: Poonam
 * */

import crendentialModel from "../components/credentialsModel";

/******** Get User from store  ***********/
export const User = (store) => {
  return store.getState().user;
};

/******** Routing authentication middleware ***********/
export const Auth = (store) => {
  // return false;
  return User(store).loggedIn;
};
/******** Set Authorization token in header ***********/
export const setAuthorizationToken = (axios, t) => {

  let token = t
  if (!token) {
    token = `Bearer ${localStorage.getItem('headertoken')}`
  }

  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
