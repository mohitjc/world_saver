/*
 * @file: index.js
 * @description: Auth functions here
 * @date: 10 June 2020
 * @author: Poonam
 * */

/******** Set Authorization token in header ***********/
export const setAuthorizationToken = (axios) => {
    let token = localStorage.getItem("token")
    if (token) {
        axios.defaults.headers.common.Authorization = 'Bearer '+token;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};
