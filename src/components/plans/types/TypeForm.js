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
  typeAdd,
  typeUpdate,
  singleType,
  resetAddType,
  resetUpdateType,
  types
} from '../../../store/actions/planTypeActions';

const TypeForm = ({
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
  types,
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  typeId,
  singleType,
  singleTypeData,
  resetAddType,
  resetUpdateType
}) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (isSuccess) {
      swal('Type added!', '', 'success');
      handleFormVisibilty();
      resetAddType();
      setReloadToggle(!reloadToggle);
    }
    if (isError) {
      swal(data && data.data && data.data.message, '', 'warning');
      // handleFormVisibilty();
      resetUpdateType();
      // setReloadToggle(!reloadToggle);
    }
    if (isUpdateSuccess) {
      swal('Type updated!', '', 'success');
      handleFormVisibilty();
      resetUpdateType();
      setReloadToggle(!reloadToggle);
    }
  }, [isSuccess, isError, isUpdateSuccess]);

  useEffect(() => {
    if (!isAddForm) {
      singleType(typeId, token);
      // swal('New user added!', '', 'success');
    }
  }, [singleType]);

  // console.log('data', data);

  return (
    <div className="">
      <button className="btn btn-primary mb-3" onClick={handleFormVisibilty}>
        View type
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? 'Add' : 'Edit'} type</h4>
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

const TypeFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singleTypeData }) => {
    // console.log('singleTypeData', singleTypeData);
    return {
      name: (singleTypeData && singleTypeData.name) || ''
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
      props.typeAdd(
        {
          name: values.name
          // type: 'common'
        },
        token
      );
    } else {
      props.typeUpdate(
        {
          name: values.name
          // type: values.type
        },
        props.typeId,
        token
      );
    }

    // resetForm();
  },

  displayName: 'TypeForm' // helps with React DevTools
})(TypeForm);

const mapStateToProps = state => ({
  data: state.typeAdd.data,
  isRequesting: state.typeAdd.isRequesting,
  isUpdateRequesting: state.nameUpdate.isRequesting,
  isSuccess: state.typeAdd.isSuccess,
  isUpdateSuccess: state.typeUpdate.isSuccess,
  isError: state.typeAdd.isError,
  singleTypeData: state.type.data
});

export default connect(
  mapStateToProps,
  {
    typeAdd,
    typeUpdate,
    singleType,
    resetAddType,
    resetUpdateType,
    types
  }
)(TypeFormFormik);
