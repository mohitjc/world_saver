import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';
import swal from 'sweetalert';

import { login } from '../../store/actions/loginActions';

const LoginForm = ({
  // login,
  handleSubmit,
  handleBlur,
  handleChange,
  values,
  isRequesting,
  isSuccess,
  isError,
  errors,
  touched,
  data
}) => {
  useEffect(() => {
    if (isSuccess) {
    } else if (isError) {
      swal(data && data.data && data.data.message, {
        buttons: false,
        timer: 1500
      });
    }
  }, [isSuccess, isError, data]);
  // console.log('data', data);
  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate="">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="form-control"
          name="username"
          tabIndex="1"
          required
          autoFocus
          value={values.username}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="invalid-feedback">Please fill in your email</div>
      </div>

      <div className="form-group">
        <div className="d-block">
          <label htmlFor="password" className="control-label">
            Password
          </label>
        </div>
        <input
          id="password"
          type="password"
          className="form-control"
          name="password"
          tabIndex="2"
          required
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="invalid-feedback">please fill in your password</div>
      </div>

      <div className="form-group text-right">
        <Link to="/forgot-password" className="float-left mt-3">
          Forgot Password?
        </Link>
        <button
          type="submit"
          className={`btn btn-primary btn-lg btn-icon icon-right ${
            isRequesting ? 'btn-progress disabled' : ''
          }`}
          tabIndex="4"
        >
          Login
        </button>
      </div>
    </form>
  );
};

const LoginFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => {
    return {
      username: '',
      password: ''
    };
  },

  validationSchema: yupObject().shape({
    username: yupString().email('Email Required '),
    password: yupString().min(8)
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // const { router } = props;
    // console.log('state values', values);
    props.login({
      username: values.username,
      password: values.password,
      client_id: '5x7EuN09HAeBn2pYJnvvq7szgJaULh14',
      grant_type: 'password'
    });
    // resetForm();
  },

  displayName: 'Login' // helps with React DevTools
})(LoginForm);

const mapStateToProps = state => ({
  data: state.login.data,
  isRequesting: state.login.isRequesting,
  isSuccess: state.login.isSuccess,
  isError: state.login.isError
});

export default connect(mapStateToProps, { login })(LoginFormFormik);
