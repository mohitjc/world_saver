/*
 * @file: index.js
 * @description: It Contain rest functions for api call .
 * @author: Poonam
 */

import axios from 'axios';
import querystring from 'querystring';
import { setAuthorizationToken } from './auth';
// import { ToastsStore } from 'react-toasts';
import { API_SLUG } from '../store/constants';
import load from '../methods/load';

var config = {
    headers: { 'Content-Type': 'application/json' },
};

var baseUrl = API_SLUG


const handleError = (status) => {
    if (status == 400) {
        // ToastsStore.error('Not Found');
    } if (status == 500) {
        // ToastsStore.error('Error');
    } else if (status == 404) {
        // ToastsStore.error('Server Error');
    }else if(status === 401){
        localStorage.clear()
        window.location.assign('/')
    }
}

class ApiClient {
    static post(url1, params, base = '') {
        let url = baseUrl + url1
        if (base) url = base + url1

        setAuthorizationToken(axios);
        return new Promise(function (fulfill, reject) {
            axios
                .post(url, JSON.stringify(params), config)
                .then(function (response) {
                    fulfill(response);
                    load(false)
                })
                .catch(function (error) {
                    load(false)
                    if (error && error.response) {
                        let eres = error.response;
                        handleError(eres.status)
                        fulfill(eres);
                    } else {
                        // ToastsStore.error('Network Error');
                        reject(error);
                    }
                });
        });
    }

    static put(url1, params, base = '') {
        let url = baseUrl + url1
        if (base) url = base + url1
        setAuthorizationToken(axios);
        return new Promise(function (fulfill, reject) {
            axios
                .put(url, JSON.stringify(params), config)
                .then(function (response) {
                    fulfill(response);
                    load(false)
                })
                .catch(function (error) {
                    // loader(false)
                    load(false)
                    if (error && error.response) {
                        let eres = error.response;
                        handleError(eres.status)
                        fulfill(eres);
                    } else {
                        // ToastsStore.error('Network Error');
                        reject(error);
                    }
                });
        });
    }

    static get(url1, params, base = '') {

        let url = baseUrl + url1
        if (base) url = base + url1

        let query = querystring.stringify(params);
        url = query ? `${url}?${query}` : url;
        setAuthorizationToken(axios);
        return new Promise(function (fulfill, reject) {
            axios
                .get(url, config)
                .then(function (response) {
                    fulfill(response);
                    load(false)
                })
                .catch(function (error) {
                    console.log(error,'checking error here')
                    // loader(false)
                    load(false)
                    if (error && error.response) {
                        let eres = error.response;
                        console.log(eres,'here is my error check....')
                        handleError(eres.error.code)
                        
                        fulfill(eres);
                    } else {
                        // ToastsStore.error('Network Error');
                        reject(error);
                    }
                });
        });
    }

    static delete(url1, base = '') {
        let url = baseUrl + url1
        if (base) url = base + url1
        setAuthorizationToken(axios);
        return new Promise(function (fulfill, reject) {
            axios
                .delete(url, config)
                .then(function (response) {
                    fulfill(response);
                    load(false)
                })
                .catch(function (error) {
                    // loader(false)
                    load(false)
                    if (error && error.response) {
                        let eres = error.response;
                        handleError(eres.status)
                        fulfill(eres);
                    } else {
                        // ToastsStore.error('Network Error');
                        reject(error);
                    }
                });
        });
    }

    /*************** Form-Data Method ***********/
    static postFormData(url, file, type = '') {
        url = baseUrl + url
        config.headers['Content-Type'] = 'application/json' ;
        return new Promise(function (fulfill, reject) {
            var body = new FormData();
            body.append('data', file);
            body.append('type', type);

            axios
                .post(url, body, config)

                .then(function (response) {
                    fulfill(response.data);
                    load(false)
                })
                .catch(function (error) {
                    // loader(false)
                    load(false)
                    if (error && error.response) {
                        let eres = error.response;
                        handleError(eres.status)
                        fulfill(eres);
                    } else {
                        // ToastsStore.error('Network Error');
                        reject(error);
                    }
                });
        });
    }

    static allApi(url, params, method = 'get') {
        if (method === 'get') {
            return this.get(url, params)
        } else if (method === 'put') {
            return this.put(url, params)
        } if (method === 'post') {
            return this.post(url, params)
        }
    }
}

export default ApiClient;
