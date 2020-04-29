import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';
import swal from 'sweetalert';

import forgotPassword from '../../store/actions/forgotPasswordActions';

const ForgotPasswordForm = ({
  handleSubmit,
  handleBlur,
  handleChange,
  values,
  forgotPassword,
  isRequesting,
  isSuccess,
  isError,
  errors,
  touched,
  data
}) => {
  useEffect(() => {
    if (isSuccess) {
      swal(data && data.data && data.data.message, {
        buttons: false,
        timer: 1500
      });
    } else if (isError) {
      swal(data && data.data && data.data.message, {
        buttons: false,
        timer: 1500
      });
    }
  }, [isSuccess, isError]);

  // console.log('isError', isError);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="form-control"
          name="email"
          tabIndex="1"
          required
          autoFocus
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button
          type="submit"
          className={`btn btn-primary btn-lg btn-block  ${
            isRequesting ? 'btn-progress disabled' : ''
          }`}
          tabIndex="4"
        >
          Forgot Password
        </button>
      </div>
    </form>
  );
};

const ForgotPasswordFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => {
    return {
      email: ''
    };
  },
  validationSchema: yupObject().shape({
    email: yupString().email('Email Required ')
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // console.log('state values123', values);
    props.forgotPassword({
      username: values.email
    });
    resetForm();
  },
  displayName: 'ForgotPassword' // helps with React DevTools
})(ForgotPasswordForm);

const mapStateToProps = state => ({
  data: state.forgotPassword.data,
  isRequesting: state.forgotPassword.isRequesting,
  isSuccess: state.forgotPassword.isSuccess,
  isError: state.forgotPassword.isError
});

export default connect(
  mapStateToProps,
  { forgotPassword }
)(ForgotPasswordFormFormik);
