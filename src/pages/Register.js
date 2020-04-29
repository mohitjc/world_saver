import React from 'react';

import Layout from '../components/global/Layout';

// import LoginForm from '../components/login/LoginForm';
// import LoginBanner from '../components/login/LoginBanner';

export default () => (
  <Layout title="Login" noHeader>
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src="img/img-01.png" alt="IMG" />
          </div>

          <form className="login100-form validate-form">
            <span className="login100-form-title">Sign Up</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input className="input100" type="text" name="email" placeholder="Email" />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input className="input100" type="password" name="pass" placeholder="Password" />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Proceed</button>
            </div>

            <div className="text-center p-t-136">
              <a className="txt2" href="#"></a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout>
);
