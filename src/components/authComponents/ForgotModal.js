import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import logo from './../../assets/img/logo.png';
import { toastAction } from '../../actions/toast-actions';
import ApiClient from '../../api-client';
import { apiUrl } from '../../environment';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';
import commonModel from '../common.model';
import { Link } from 'react-router-dom';

const ForgotModal = ({ toggleForgotModal }) => {
  const toggle = () => {
    toggleForgotModal(false);
  };

  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const forgotSubmit = (e) => {
    const payload = {
      email: email,
    };

    let error = !commonModel.validateEmail(email);

    if (error) {
      toast.error('Please provide valid email id.');
      return;
    }

    ApiClient.post(`${apiUrl}/web/forgotpassword`, payload).then((result) => {
      if (result?.success) {
        toast.success('Verification code has been sent on email.');
        document.getElementById('resetModalOpen').click();
        toggle();
        document.getElementById('closeForgot').click();
        document.getElementById('closeLogin').click();
        localStorage.setItem('userID', result?.data?.id);
      } else {
        const errMsg =
          result?.error && result?.error?.message
            ? result.error.message
            : 'Something went wrong. Kindly try again later !!!';
        toastAction(false, errMsg);
      }
    });
  };

  return (
    <>
      <div
        className="modal fade loginmodal"
        id="forgotModal"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-overlay"
          data-dismiss="modal"
          aria-label="Close"
        ></div>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close d-none"
              id="closeForgot"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-login p-3">
              <Link to="/dashboard">
                <img src={logo} className="modal-logo mt-4" />
              </Link>
              {/* <i className="fa fa-times close" onClick={() => toggle()}></i> */}
              <div className="text-center color-white mb-4">
                <span>
                  <b>Forgot Password</b>
                </span>
              </div>

              <Form
                name="email"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={forgotSubmit}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      validateEmail: true,
                      message: 'Please provide valid email id.',
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Enter Email"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn btn-primary w-100"
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotModal;
