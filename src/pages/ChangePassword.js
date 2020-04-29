import React from 'react';

// import ForgotPasswordForm from '../components/login/ForgotPasswordForm';
import ChangePasswordForm from '../components/login/ChangePasswordForm';

export default () => (
  <div id="app">
    <section className="section">
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <div className="login-brand">
              <img
                src="../assets/img/stisla-fill.svg"
                alt="logo"
                width="100"
                className="shadow-light rounded-circle"
              />
            </div>

            <div className="card card-primary">
              <div className="card-header">
                <h4>Reset Password</h4>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  We will send a link to reset your password
                </p>
                <ChangePasswordForm />
              </div>
            </div>
            <div className="simple-footer">Copyright &copy; Stisla 2018</div>
          </div>
        </div>
      </div>
    </section>
  </div>
);
