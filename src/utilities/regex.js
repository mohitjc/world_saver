/*
 * @file: Regex.js
 * @description: Regex used for validation in application.
 * @date: 10 June 2020
 * @author: Poonam
 * */

const Regex = {
  required: (val) => {
    return val && val.trim().length;
  },
  maxLength: (val, len) => {
    if (val) {
      return val && val.length <= len;
    } else {
      return true;
    }
  },
  requiredDate: (val) => {
    return val && val.toString().trim().length;
  },
  validateEmail: function (val) {
    if (val) {
      // eslint-disable-next-line
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        val
      );
    } else {
      return true;
    }
  },
  validateMultipleEmail: function (val) {
    // eslint-disable-next-line
    return /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/.test(
      val
    );
  },
  validateMobile: function (val) {
    // eslint-disable-next-line
    return /^\+?\d{9,12}$/.test(val);
  },
  validName: function (val) {
    // eslint-disable-next-line
    return /^([a-zA-Z_ ]){1,15}$/.test(val);
  },
  validateFreeSpace: function (val) {
    // eslint-disable-next-line
    return /^$|^[^\s]+(\s+[^\s]+)*$/.test(val);
  },
  validateMobileWithoutCC: function (val) {
    // eslint-disable-next-line
    return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(val);
  },
  validateString: function (val) {
    // eslint-disable-next-line
    return /^([a-zA-Z ]){0,30}$/.test(val);
  },
  validatePassword: function (val) {
    // eslint-disable-next-line
    // return true;
    if (val.length < 8) {
      return false;
    } else {
      return true;
    }
  },

  validateNumbers: function (val) {
    // eslint-disable-next-line
    return /^[0-9]{1,}$/.test(val);
  },
  validateInteger: function (val) {
    // eslint-disable-next-line
    return /^\d*[1-9]\d*$/.test(val);
  },
  validateMessage: function (val) {
    // eslint-disable-next-line
    return /^[A-Za-z 0-9 @!,:]{1,100}$/.test(val);
  },
  validateURL: function (url) {
    // eslint-disable-next-line
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
      url
    );
  },
  validatePrice(val) {
    // eslint-disable-next-line
    if (val) {
      return /^\d{0,8}(\.\d{1,4})?$/.test(val);
    } else {
      return val && val.length;
    }
  },
  validateTwoDecimalPlaces(val) {
    // eslint-disable-next-line
    return /^(?:\d*\.\d{1,2}|\d+)$/.test(val);
  },
  validateAlphaNumberic(val) {
    // eslint-disable-next-line
    return /^[a-zA-Z0-9 ]{0,30}$/.test(val);
  },
  validateAlphaNumbericWithoutSpace(val) {
    // eslint-disable-next-line
    return /^[a-zA-Z0-9]{0,30}$/.test(val);
  },
  validateUsername(val) {
    return /^(?=[a-zA-Z0-9._]{1,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(val);
  },
  validateRoutingNumber(val) {
    // eslint-disable-next-line
    return /^[0-9]{6}$/.test(val);
  },
  validateAccountNumber(val) {
    // eslint-disable-next-line
    return /^[0-9]{7,8}$/.test(val);
  },
  getNumbericValuesFromString(val) {
    // eslint-disable-next-line
    return val.match(/^\d+|\d+\b|\d+(?=\w)/g);
  },
  validatePhone(val) {
    // eslint-disable-next-line
    if (val) {
      return val.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
    } else {
      return true;
    }
  },
};

module.exports = Regex;
