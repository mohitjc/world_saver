import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import Yup, {
  object as yupObject,
  string as yupString,
  number as yupNumber
} from 'yup';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';

import { isNull } from 'lodash';
import {
  userAdd,
  userUpdate,
  singleUser,
  resetAddUser,
  resetUpdateUser,
  users
} from '../../store/actions/userActions';

const UserEditForm = ({
  handleFormVisibilty,
  handleSubmit,
  handleBlur,
  handleChange,
  values,
  isRequesting,
  isUpdateRequesting,
  isSuccess,
  isUpdateSuccess,
  isError,
  errors,
  touched,
  users,
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  userId,
  singleUser,
  singleUserData,
  resetAddUser,
  resetUpdateUser
}) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (isSuccess) {
      swal('New user added!', '', 'success');
      handleFormVisibilty();
      resetAddUser();
      setReloadToggle(!reloadToggle);
    }
    if (isError) {
      swal(data && data.data && data.data.message, '', 'warning');
      // handleFormVisibilty();
      resetAddUser();
      // setReloadToggle(!reloadToggle);
    }
    if (isUpdateSuccess) {
      swal('User updated!', '', 'success');
      handleFormVisibilty();
      resetUpdateUser();
      setReloadToggle(!reloadToggle);
    }
  }, [
    isSuccess,
    isError,
    isUpdateSuccess,
    handleFormVisibilty,
    resetAddUser,
    setReloadToggle,
    reloadToggle,
    data,
    resetUpdateUser
  ]);

  useEffect(() => {
    if (!isAddForm) {
      singleUser(userId, token);
      // swal('New user added!', '', 'success');
    }
  }, [isAddForm, singleUser, token, userId]);

  // console.log('data', data);

  return (
    <div className="">
      <button className="btn btn-primary mb-3" onClick={handleFormVisibilty}>
        View Users
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? 'Add' : 'Edit'} user</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="form-group col-md-4 col-12">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  // value="john"

                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.firstName && touched.firstName && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="form-group col-md-4 col-12">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  // value="Maman"
                  required=""
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.lastName && touched.lastName && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4 col-12">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  // value="ujang@maman.com"
                  name="email"
                  required=""
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    Please fill in the email
                  </div>
                )}
              </div>
              <div className="form-group col-md-4 col-12">
                <label>Phone</label>
                <input
                  type="number"
                  className="form-control"
                  // value=""
                  name="mobile"
                  value={values.mobile}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.mobile && touched.mobile && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.mobile}
                  </div>
                )}
              </div>
            </div>
            {/* <div className="row">
              <div className="form-group col-12">
                <label>Bio</label>
                <textarea className="form-control summernote-simple">
                  asdkahjs
                </textarea>
              </div>
            </div> */}
            {/* <div className="row">
              <div className="form-group mb-0 col-12">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    name="remember"
                    className="custom-control-input"
                    id="newsletter"
                  />
                  <label className="custom-control-label" htmlFor="newsletter">
                    Subscribe to newsletter
                  </label>
                  <div className="text-muted form-text">
                    You will get new information about products, offers and
                    promotions
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="card-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleFormVisibilty}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary   ${
                isRequesting || isUpdateRequesting
                  ? 'btn-progress disabled'
                  : ''
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UserEditFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singleUserData }) => {
    // console.log('singleUserData', singleUserData);
    return {
      firstName: (singleUserData && singleUserData.firstName) || '',
      lastName: (singleUserData && singleUserData.lastName) || '',
      email: (singleUserData && singleUserData.email) || '',
      mobile: (singleUserData && singleUserData.mobile) || '',
      roles: (singleUserData && singleUserData.roles) || ''
    };
  },

  validationSchema: yupObject().shape({
    firstName: yupString()
      .max(15)
      .required(),
    lastName: yupString()
      .max(15)
      .required(),
    // roles: yupString().required(),
    email: yupString()
      .email()
      .required(),
    mobile: yupString()
      .length(10)
      .required()
    // .required()
    // password: yupString().min(8)
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // const { router } = props;
    const token = localStorage.getItem('token');
    // console.log('state values', values);
    if (props.isAddForm) {
      props.userAdd(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobile: values.mobile,
          roles: 'U'
        },
        token
      );
    } else {
      props.userUpdate(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          mobile: values.mobile,
          roles: 'U'
        },
        props.userId,
        token
      );
    }

    // resetForm();
  },

  displayName: 'UserEditForm' // helps with React DevTools
})(UserEditForm);

const mapStateToProps = state => ({
  data: state.userAdd.data,
  isRequesting: state.userAdd.isRequesting,
  isUpdateRequesting: state.userUpdate.isRequesting,
  isSuccess: state.userAdd.isSuccess,
  isUpdateSuccess: state.userUpdate.isSuccess,
  isError: state.userAdd.isError,
  singleUserData: state.user.data
});

export default connect(mapStateToProps, {
  userAdd,
  userUpdate,
  singleUser,
  resetAddUser,
  resetUpdateUser
})(UserEditFormFormik);
