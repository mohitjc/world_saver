import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import Yup, {
  object as yupObject,
  string as yupString,
  number as yupNumber
} from 'yup';
import swal from 'sweetalert';

import { isNull } from 'lodash';
import {
  nameAdd,
  nameUpdate,
  singleName,
  resetAddName,
  resetUpdateName,
  names
} from '../../../store/actions/planNameActions';

const NameForm = ({
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
  names,
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  nameId,
  singleName,
  singleNameData,
  resetAddName,
  resetUpdateName
}) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (isSuccess) {
      swal('Name added!', '', 'success');
      handleFormVisibilty();
      resetAddName();
      setReloadToggle(!reloadToggle);
    }
    if (isError) {
      swal(data && data.data && data.data.message, '', 'warning');
      // handleFormVisibilty();
      resetUpdateName();
      // setReloadToggle(!reloadToggle);
    }
    if (isUpdateSuccess) {
      swal('Name updated!', '', 'success');
      handleFormVisibilty();
      resetUpdateName();
      setReloadToggle(!reloadToggle);
    }
  }, [
    isSuccess,
    isError,
    isUpdateSuccess,
    handleFormVisibilty,
    resetAddName,
    setReloadToggle,
    reloadToggle,
    data,
    resetUpdateName
  ]);

  useEffect(() => {
    if (!isAddForm) {
      singleName(nameId, token);
      // swal('New user added!', '', 'success');
    }
  }, [isAddForm, nameId, singleName, token]);

  // console.log('data', data);

  return (
    <div className="">
      <button className="btn btn-primary mb-3" onClick={handleFormVisibilty}>
        View names
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? 'Add' : 'Edit'} names</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="form-group col-md-4 col-12">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  // value="john"

                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.name}
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

const NameFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singleNameData }) => {
    // console.log('singleNameData', singleNameData);
    return {
      name: (singleNameData && singleNameData.name) || ''
    };
  },
  validationSchema: yupObject().shape({
    name: yupString()
      .max(50)
      .required()
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // const { router } = props;
    const token = localStorage.getItem('token');
    // console.log('state values', values);
    if (props.isAddForm) {
      props.nameAdd(
        {
          name: values.name
          // type: 'common'
        },
        token
      );
    } else {
      props.nameUpdate(
        {
          name: values.name
          // type: values.type
        },
        props.nameId,
        token
      );
    }

    // resetForm();
  },

  displayName: 'QuestionForm' // helps with React DevTools
})(NameForm);

const mapStateToProps = state => ({
  data: state.nameAdd.data,
  isRequesting: state.nameAdd.isRequesting,
  isUpdateRequesting: state.nameUpdate.isRequesting,
  isSuccess: state.nameAdd.isSuccess,
  isUpdateSuccess: state.nameUpdate.isSuccess,
  isError: state.nameAdd.isError,
  singleNameData: state.name.data
});

export default connect(mapStateToProps, {
  nameAdd,
  nameUpdate,
  singleName,
  resetAddName,
  resetUpdateName,
  names
})(NameFormFormik);
