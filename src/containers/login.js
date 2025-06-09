import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from '../components/authComponents/LoginModal';
import SignUpModal from '../components/authComponents/SignUpModal';
import ResetPassModal from '../components/authComponents/ResetPassModal';
import ForgotModal from '../components/authComponents/ForgotModal';
import logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../api-client';
import { apiUrl } from '../environment';
import crendentialModel from '../components/credentialsModel';
import methodModel from '../models/method.model';

export default () => {
  const history = useNavigate();
  const user = useSelector((state) => state.user);
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('isverified');
  const uid = new URLSearchParams(search).get('uid');
  const vToken = new URLSearchParams(search).get('token');
  const [forgotModal, toggleForgotModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSuccesSignup, setIsSuccesSignup] = useState(false);
  const [isreset, setReset] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const login_success = (data) => ({ type: 'LOGIN_SUCCESS', data });
  const dispatch = useDispatch();

  const onSuccessSignup = () => {
    setIsSuccesSignup(true);
  };

  const resetpass = () => {
    setReset(true);
  };

  useEffect(() => {
    let credentials = localStorage.getItem('crendentials');
    if (credentials) {
      history('/dashboard');
    } else {
      isVerify();
    }

    let code=methodModel.getParams('code')
    if(code){
      console.log("code",code)
      setTimeout(()=>{
        document.getElementById("resetModalOpen")?.click()
      },100)
    }
  }, []);

  const login = () => {
    setIsLogin(true)
    document.getElementById('loginBtn').click();
    history('/signin');
  };

  const signup = () => {
    setIsLogin(true)
    document.getElementById('signupBtn').click();
    setShowForm(false);
    history('/signup');
  };

  const isVerify = () => {
    if (name == true || name == 'true') {
      toast.success('Your account has been verified', {
        position: toast.POSITION.TOP_CENTER,
      });

      //console.log('uid', uid);
      ApiClient.get(
        `${apiUrl}/user/${uid}`,
        { id: uid },
        'Bearer ' + vToken
      ).then((res) => {
        if (res.success) {
          let user = res.data;
          user.access_token = vToken;
          //console.log('user detail', user);
          dispatch(login_success(user));
          crendentialModel.setUser(user);
          history('/dashboard');
        }
      });
    }
  };

  return (
    <React.Fragment>
      <div className="social_section">
        <div className="wrapper d-flex flex-wrap justify-content-center align-items-center min-height-container bg-black pt-4 pb-4">
          <Link to="/dashboard">
            <div>
              <img src="/assets/img/logo.png" className="homelogo" />
            </div>
          </Link>

          <div className="container-fluid login-container position-relative ">
            <div
              className="d-flex align-items-center justify-content-between login-inner "
              style={{ left: '10%' }}
            >
              {' '}
              <div
                style={{}}
                className="d-flex flex-column align-items-center text-end buttons-center "
              >
                <div className="videoCard">
                  <iframe
                    width=""
                    height="250"
                    src="https://www.youtube.com/embed/odQI4iZlAWY"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>

                <div className="d-flex d-flex justify-content-between">
                  <div
                    className="text-gray mx-2 loginbtn py-1 "
                    style={{ marginBottom: '10px' }}
                  >
                    <i
                      class="fas fa-door-open"
                      style={{ color: 'rgb(53 97 114)', fontSize: '20px' }}
                    ></i>

                    <a
                      style={{
                        fontSize: '16px',
                        fontFamily: 'revert',
                        fontWeight: '14px',
                        textDecoration: 'none',
                        borderRadius: '25px',
                        backgroundColor: 'rgb(40 85 102)',
                        padding: '7px',
                      }}
                      className="text-white  loginbtn ml-2 px-2 strong font-weight-bold login_btn"
                      onClick={() => login()}
                      to={`/login`}
                    >
                      Log In
                    </a>
                  </div>
                  <div
                    className="text-gray mx-2 loginbtn py-1"
                    style={{ marginBottom: '10px' }}
                  >
                    <i
                      class="fa fa-user-plus  "
                      style={{ color: 'rgb(53 97 114)', fontSize: '20px' }}
                      aria-hidden="true"
                    ></i>
                    <a
                      style={{
                        fontSize: '16px',
                        fontFamily: 'revert',
                        fontWeight: '14px',
                        textDecoration: 'none',
                        borderRadius: '25px',
                        backgroundColor: 'rgb(40 85 102)',
                        padding: '7px',
                      }}
                      className="text-white  loginbtn ml-2 px-2 strong font-weight-bold login_btn"
                      onClick={() => signup()}
                      to={`/signup`}
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>{' '}
              <img src="/assets/img/blackbgearth.png" className="bgimg" />;
            </div>
            <div className="row">
              <div className="col-md-6  text-white">
                {/* <img src="/static/media/logo.e91aa241.png" className="homelogo" /> */}
                {/* <h1 className="h1 headinglg mb-5">Create Your Journey</h1>

              <h2 className="h2 headinglg mb-5">Join with People</h2> */}

                {/* <h2 className="h2 headinglg mb-5">Want to Help</h2>

                <p className="h3 headinglg">Save The World?</p> */}
              </div>

              {/* <div className="col-md-6"></div> */}
            </div>
            <div className="text-center position-relative">
              <span className="login-buttons">
                <a
                  data-toggle="modal"
                  id="signupBtn"
                  data-target="#signupModal"
                ></a>
                <a
                  data-toggle="modal"
                  id="loginBtn"
                  data-target="#loginModal"
                ></a>
              </span>
            </div>

            <footer style={{}} className="mainFooter d-none d-md-block">
              <Link to="/dashboard">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/terms">Terms and Conditions</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </footer>
            <footer className="mainFooter d-md-none mt-3">
              <Link to="/about">About Us</Link>
              <Link to="/terms">Terms and Conditions</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </footer>
            {/* //playstore and app store               */}
            <div className="d-flex set_gaps justify-content-end align-items-center ">
              <button
                className="btn_bx"
                onClick={() => {
                  window.open(
                    'https://play.google.com/store/apps/details?id=com.crowdsavetheworld'
                  );
                }}
              >
                <img src="assets/img/playstore.png" class=" set_imgs" />
              </button>

              <button
                className="btn_bx"
                onClick={() => {
                  window.open(
                    'https://apps.apple.com/in/app/crowd-save-the-world/id6477443629'
                  );
                }}
              >
                <img src="/assets/img/appstore.png" class=" set_imgs" />
              </button>
            </div>

            <LoginModal toggleForgotModal={toggleForgotModal} show={isLogin} onShow={setIsLogin} />
            <ResetPassModal resetpass={resetpass} />
            <SignUpModal
              showForm={showForm}
              setShowForm={setShowForm}
              onSuccessSignup={onSuccessSignup}
            />
            <ForgotModal
              modal={forgotModal}
              toggleForgotModal={toggleForgotModal}
            />
          </div>

          <div
            className={`signup-success-modal ${
              isSuccesSignup ? ' active' : ''
            }`}
          >
            <div className="modal-header">
              <img src={logo} className="modal-logo" />
            </div>
            <div className="modal-body">
              <p>
                {/* A verification was sent your email address */}A verification
                message has been sent to your email address.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => setIsSuccesSignup(false)}>
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
