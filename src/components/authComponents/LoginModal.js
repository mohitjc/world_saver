import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/user';
import logo from './../../assets/img/logo.png';

const LoginModal = ({ show, onShow }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = () => {
    // setSubmitted(true)
    dispatch(login({ username: form.email, password: form.password }, navigate));
  };

  return (
    <div
      className="modal fade loginmodal"
      id="loginModal"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">

        {show ? <>
          <div className="modal-content">
            <div className="text-right">
              <i
                className="fa fa-times signupClose"
                data-dismiss="modal"
                aria-label="Close"
              ></i>
            </div>
            <button
              type="button"
              className="close d-none"
              id="closeLogin"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-login">
              <Link to="/dashboard">
                <img src={logo} className="modal-logo mt-4" alt="logo" />
              </Link>

              <div className="text-center color-white mb-4">
                <span>
                  <b>Log In</b>
                </span>
              </div>

              <form onSubmit={e => { e.preventDefault(); handleSubmit() }} className="px-3 pb-3">
                <div className='mb-3'>
                  <input
                    type='email'
                    value={form.email}
                    className={`form-control rdRev ${!form.email && submitted ? 'is-invalid' : ''
                      }`}
                    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                  {!form.email && submitted ? (
                    <div className="error">Email is required</div>
                  ) : <></>}
                </div>

                <div>
                  <input
                    type='password'
                    value={form.password}
                    className={`form-control rdRev ${!form.email && submitted ? 'is-invalid' : ''
                      }`}
                    onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  {!form.password && submitted ? (
                    <div className="error">Password is required</div>
                  ) : <></>}
                </div>


                <div className="text-right mt-1">
                  <a
                    className="text-primary"
                    data-toggle="modal"
                    data-target="#forgotModal"
                  >
                    Forgot Password?
                  </a>
                </div>

                <div className="row">
                  <div className="col-12 text-center mt-5">
                    <Button
                      type="submit"
                      className="btn btn-primary rounded"
                      style={{ width: '100%' }}
                    >
                      Log In
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </> : <></>}


      </div>
    </div>
  );
};

export default LoginModal;
