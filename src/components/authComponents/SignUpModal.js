import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from '../../utilities/regex';
import logo from './../../assets/img/logo.png';
import * as TYPE from '../../actions/constants';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { maxDate, minDate } from '../common/DateManipulation';
import { register } from '../../actions/user';
import ApiClient from '../../api-client';
import { apiUrl } from '../../environment';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import crendentialModel from '../credentialsModel';
export const login_success = (data) => ({ type: TYPE.LOGIN_SUCCESS, data });

const SignUpModal = ({ onSuccessSignup, showForm, setShowForm }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    // confirm_password: '',
    state: '',
    city: '',
    gender: '',
    dob: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [exist, setExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eyes, setEyes] = useState({ password: false });
  const [eyes1, setEyes1] = useState({ password: false });

  // check password
  const checkPassword = (password, confirmPass) => {
    if (password === confirmPass) {
      return true;
    } else {
      return false;
    }
  };
  const handleCreateAccountClick = () => {
    setShowForm(true);
  };

  // var subtitle;

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let values = form;

    if (
      !form.username ||
      // !form.lastName ||
      // !form.state ||
      !form.email ||
      // !form.confirm_password ||
      !form.password ||
      // !form.gender ||
      !form.dob
    ) {
      toast.error('All fields are required', {
        autoClose: 2000,
      });
    }

    if (
      !validateUsername(form.username) ||
      !validatePassword(form.password) ||
      // !checkPassword(form.password, form.confirm_password) ||
      !validateEmail(form.email)
    )
      return;
    console.log('form', form);

    let saveObj = { ...form };
    saveObj.date_of_birth = form.dob ? form.dob : undefined;

    if (!exist) {
      dispatch(
        register(saveObj, (res) => {
          if (res) {
            onSuccessSignup();
            document.getElementById('closeSignup').click();
          }
        })
      );
    }
  };

  const existCheck = (username) => {
    setExist(false);
    setLoading(true);
    ApiClient.post(apiUrl + '/check/username', { username: username }).then(
      (res) => {
        if (!res.success) {
          setExist(true);
          // toast.error("Username already Exist")
        }
        setLoading(false);
      }
    );
  };

  const usernameChange = (value) => {
    setForm({ ...form, username: value });
    if (validateUsername(value)) {
      existCheck(value);
    }
  };

  const handleSocialLogin = (data) => {
    const decoded = decodeJwt(data.credential);
    const {
      email: email,
      given_name: firstName,
      family_name: lastName,
      sub: googleAuthId,
    } = decoded;
    setLoading(true);
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      google_auth_id: googleAuthId,
    };
    ApiClient.post(apiUrl + '/user/social/login', payload).then((res) => {
      if (res.success) {
        localStorage.setItem('headertoken', res?.data.access_token);
        history(`/dashboard`);
        dispatch(login_success(res.data));
        crendentialModel.setUser(res.data);
        history('/dashboard');
      }
      setLoading(false);
    });
  };

  const base64UrlDecode = (str) => {
    // Replace characters and decode Base64 URL to standard Base64
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    // Decode Base64 string into a UTF-8 string
    const decoded = atob(base64);
    // Parse the JSON string into an object
    return JSON.parse(decoded);
  };

  const decodeJwt = (token) => {
    const [header, payload, signature] = token.split('.'); // Split the JWT into parts
    const decodedPayload = base64UrlDecode(payload); // Decode the payload part
    return decodedPayload;
  };

  return (
    <div
      className="modal fade signup-modal"
      id="signupModal"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="text-right">
            <i
              className="fa fa-times signupClose"
              data-dismiss="modal"
              aria-label="Close"
              id="SignUpClose"
            ></i>
          </div>
          <div>
            {showForm ? (
              <div className="py-3 px-5">
                <Link to="/dashboard">
                  <img src={logo} className="modal-logo" />
                </Link>
                <div className="text-center color-white mb-4">
                  <h4>Create your account</h4>
                  <button
                    type="button"
                    className="close d-none"
                    id="closeSignup"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCreateAccountClick}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="heightOne"></div>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    {/* <div className="col-md-12 mb-3">
                      <input
                        type="text"
                        className="form-control rdRev"
                        minLength={3}
                        placeholder="Name"
                        value={form.firstName}
                        onChange={(e) =>
                          setForm({ ...form, firstName: e.target.value })
                        }
                        required
                      />
                    </div> */}

                    {/* <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control rdRev"
                        minLength={3}
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={(e) =>
                          setForm({ ...form, lastName: e.target.value })
                        }
                        required
                      />
                    </div> */}
                    <div className="col-md-12 mb-3">
                      <input
                        type="text"
                        className="form-control rdRev"
                        minLength={3}
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => usernameChange(e.target.value)}
                        required
                      />
                      {submitted && !validateUsername(form.username) ? (
                        <div className="text-danger">
                          A username should be 8 to 20 characters long and
                          contain only alphanumeric characters,
                          underscore,hyphen and dots. (e.g. username, user_name,
                          user.name, username1)
                        </div>
                      ) : exist ? (
                        <div className="text-danger">
                          Username already exist
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="col-md-12 mb-3">
                      <input
                        type="email"
                        className="form-control rdRev"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                      />
                      {submitted && !validateEmail(form.email) ? (
                        <div className="text-danger">
                          Enter Valid Email Address
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-md-12 mb-3">
                      <input
                        type={eyes.password ? 'text' : 'password'}
                        minLength={8}
                        className="form-control rdRev"
                        placeholder="Password "
                        maxLength="30"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        required
                      />
                      <i
                        className={
                          eyes.password
                            ? 'fa fa-eye eyeicon'
                            : 'fa fa-eye-slash iconslash'
                        }
                        onClick={() =>
                          setEyes({ ...eyes, password: !eyes.password })
                        }
                      ></i>
                      {submitted && !validatePassword(form.password) ? (
                        <div className="text-danger">
                          A password should be between eight and thirty
                          characters long.
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    {/* <div className="col-md-12 mb-3">
                      <input
                        type={eyes1.password ? 'text' : 'password'}
                        minLength={8}
                        className="form-control rdRev"
                        placeholder="Confirm Password"
                        value={form.confirm_password}
                        onChange={(e) =>
                          setForm({ ...form, confirm_password: e.target.value })
                        }
                        required
                      />
                      <i
                        className={
                          eyes1.password
                            ? 'fa fa-eye eyeicon'
                            : 'fa fa-eye-slash iconslash'
                        }
                        onClick={() =>
                          setEyes1({ ...eyes1, password: !eyes1.password })
                        }
                      ></i>
                      {submitted &&
                      !checkPassword(form.password, form.confirm_password) ? (
                        <div className="text-danger">
                          The password confirmation did not match.
                        </div>
                      ) : (
                        <></>
                      )}
                    </div> */}

                    {/* <div className="col-md-6 mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                      />
                      {submitted && !validateEmail(form.email) ? (
                        <div className="text-danger">
                          Enter Valid Email Address
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                   
                    

                    {/* <div className="col-md-6 mb-3">
                      <CountryDropdown
                        defaultOptionLabel="Country"
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e })}
                        className="form-control rdRev"
                        priorityOptions={['US', 'CA', 'IN', 'GB']}
                        required
                      />
                    </div> */}

                    {/* <div className="col-md-6 mb-3">
                      <RegionDropdown
                        blankOptionLabel="First Select Country"
                        defaultOptionLabel="Select your state"
                        country={form.country}
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e })}
                        className="form-control rdRev"
                        required
                      />
                    </div> */}

                    {/* <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        minLength={3}
                        className="form-control rdRev"
                        placeholder="City"
                        value={form.city}
                        onChange={(e) =>
                          setForm({ ...form, city: e.target.value })
                        }
                      />
                    </div> */}

                    {/* <div className="col-md-6 mb-3">
                      <select
                        required
                        className="form-control rdRev"
                        value={form.gender}
                        onChange={(e) =>
                          setForm({ ...form, gender: e.target.value })
                        }
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div> */}

                    <div className="col-md-12 mb-3 overlap">
                      <DatePicker
                        selected={form.dob}
                        onChange={(e) => setForm({ ...form, dob: e })}
                        className="form-control rdRev"
                        placeholderText="Date of birth"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        maxDate={maxDate()}
                        minDate={minDate()}
                        required
                      />
                    </div>
                    <div className="heightOne"></div>
                    <div className="col-md-12 mt-5 pt-3">
                      <button
                        className="btn btn-primary text-center w-100 rounded"
                        disabled={loading}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-3 px-4">
                <Link to="/dashboard">
                  <img src={logo} className="modal-logo" />
                </Link>
                <div className="heightOne"></div>
                <p className="solveP">
                  Solve real world <br></br> problems in the online <br></br>{' '}
                  and real world.
                </p>
                <div className="heighttwo"></div>
                <div className="loginGoogle">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(
                        credentialResponse,
                        'responseeeeeeeeeeeeeeeeee'
                      );
                      handleSocialLogin(credentialResponse);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div>
                {/* <button class=" btn-primary googlebtn text-center w-100 rounded">
                  {' '}
                  <img src="/assets/img/google.png" /> Countinue with Google
                </button> */}
                <div className="d-flex align-items-center">
                  <div className="borderDiv mr-1"></div>{' '}
                  <div className="text-gray">or </div>
                  <div className="borderDiv ml-1"></div>
                </div>
                <button
                  onClick={handleCreateAccountClick}
                  class="btn btn-primary text-center w-100 rounded crebgnA"
                >
                  Create account
                </button>
                {/* <p className="signPp">
                  By signing up, you agree to our <a href="#">Terms</a>,
                  <a href="#">Privacy Policy</a> and <a href="#">Cookie Use</a>{' '}
                </p> */}
                <p className="signPp mt-3 text-center">
                  Have an account already?
                  <a
                    className="pl-1"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('loginBtn').click();
                      document.getElementById('SignUpClose').click();
                      history('/signin');
                    }}
                  >
                    Log in
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
