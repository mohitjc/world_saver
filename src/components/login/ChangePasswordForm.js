import React from 'react';

import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';

import changePassword from '../../store/actions/changePasswordActions';

const ChangePasswordForm = ({
  handleSubmit,
  handleBlur,
  handleChange,
  values,
  isRequesting,
  errors,
  touched,
  data
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Current Password</label>
        <input
          // id="email"
          type="password"
          className="form-control"
          name="oldPassword"
          tabIndex="1"
          required
          autoFocus
          value={values.oldPassword}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">New Password</label>
        <input
          id="password"
          type="password"
          className="form-control pwstrength"
          data-indicator="pwindicator"
          name="currentPassword"
          tabIndex="2"
          required
          value={values.currentPassword}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div id="pwindicator" className="pwindicator">
          <div className="bar" />
          <div className="label" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="password-confirm">Confirm Password</label>
        <input
          id="password-confirm"
          type="password"
          className="form-control"
          name="confirmPassword"
          tabIndex="2"
          required
          value={values.confirmPassword}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <button
          type="submit"
          className={`btn btn-primary btn-lg btn-block   ${
            isRequesting ? 'btn-progress disabled' : ''
          }`}
          tabIndex="4"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};

const ChangePasswordFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => {
    return {
      oldPassword: '',
      currentPassword: '',
      confirmPassword: ''
    };
  },

  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    props.changePassword({
      oldPassword: values.oldPassword,
      currentPassword: values.currentPassword,
      confirmPassword: values.confirmPassword
    });
    resetForm();
  },
  displayName: 'ForgotPassword' // helps with React DevTools
})(ChangePasswordForm);

const mapStateToProps = state => ({
  data: state.changePassword.data,
  isRequesting: state.changePassword.isRequesting,
  isSuccess: state.changePassword.isSuccess
});

export default connect(mapStateToProps, { changePassword })(
  ChangePasswordFormFormik
);
