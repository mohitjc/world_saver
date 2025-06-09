/*
 * @file: index.js
 * @description: It Contain rest functions for api call .
 * @author: Poonam
 */
import * as TYPE from '../actions/constants';
import axios from 'axios';
import querystring from 'querystring';
import { setAuthorizationToken } from '../auth';
import load from '../components/loaderMethod';
import { toast } from 'react-toastify';

var config = {
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'https://endpoint.crowdsavetheworld.com'
  },
};

export const is_loading = (status) => ({ type: TYPE.IS_LOADING, status });

const handleError = (status, msg) => {
  let message = msg ? msg : '';
  if (status == 401) {
    document.getElementById("logoutBtn")?.click()
  } else {
    if (message) toast.error(message);
  }
};

class ApiClient {
  static post(url, params, token = '') {
    setAuthorizationToken(axios, token);
    return new Promise(function (fulfill, reject) {
      axios
        .post(url, JSON.stringify(params), config)

        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          is_loading(false);

          // console.log("dfdfd", error.response)
          let eres = error?.response?.data && error?.response?.data?.error;
          handleError(eres?.code, eres?.message);

          if (error && error) {
            fulfill(error.data);
          } else {
            reject(error);
          }

          load(false);
        });
    });
  }

  static put(url, params, token = '') {
    setAuthorizationToken(axios, token);
    return new Promise(function (fulfill, reject) {
      axios
        .put(url, JSON.stringify(params), config)
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          let eres = error.response.data.error;
          handleError(eres.code, eres.message);

          if (error && error) {
            fulfill(error.data);
          } else {
            reject(error);
          }
          is_loading(false);
          load(false);
        });
    });
  }

  static get(url, params, token = '') {
    let query = querystring.stringify(params);
    url = query ? `${url}?${query}` : url;
    setAuthorizationToken(axios, token);
    return new Promise(function (fulfill, reject) {
      axios
        .get(url, config)

        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          is_loading(false);

          let eres = error.response && error.response.data.error;
          handleError(eres && eres.code, eres && eres.message);

          if (error && error) {
            fulfill(error.data);
          } else {
            reject(error);
          }

          load(false);
        });
    });
  }

  static delete(url, token = '', params) {
    setAuthorizationToken(axios, token);
    let query = querystring.stringify(params);
    url = query ? `${url}?${query}` : url;
    return new Promise(function (fulfill, reject) {
      axios
        .delete(url, config)
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          is_loading(false);

          let eres = error.response.data.error;
          handleError(eres.code, eres.message);

          if (error && error) {
            fulfill(error.data);
          } else {
            reject(error);
          }

          load(false);
        });
    });
  }

  /*************** Form-Data Method ***********/
  static postFormData(url, params, token = '') {
    config.headers['Content-Type'] = 'multipart/form-data';
    return new Promise(function (fulfill, reject) {
      var body = new FormData();
      body.append('file', params);

      axios
        .post(url, body, config)

        .then(function (response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function (error) {
          is_loading(false);

          let eres = error.response.data.error;
          handleError(eres.code, eres.message);

          if (error && error) {
            fulfill(error.data);
          } else {
            reject(error);
          }

          load(false);
        });
    });
  }
  static postForm_Data(url, file, type = '') {
    url = 'https://endpoint.crowdsavetheworld.com' + url;
    config.headers['Content-Type'] = 'application/json';
    return new Promise(function (fulfill, reject) {
      var body = new FormData();
      body.append('data', file);
      body.append('type', type);

      axios
        .post(url, body, config)

        .then(function (response) {
          fulfill(response.data);
          load(false);
        })
        .catch(function (error) {
          // loader(false)
          load(false);
          if (error && error.response) {
            let eres = error.response;
            handleError(eres.status);
            fulfill(eres);
          } else {
            // ToastsStore.error('Network Error');
            reject(error);
          }
        });
    });
  }
}

export default ApiClient;
