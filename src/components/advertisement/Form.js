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

import { isNull, isEmpty } from 'lodash';
import {
  Add,
  Update,
  single,
  resetAdd,
  resetUpdate,
  categories
} from '../../store/actions/advertiseActions';
import ImageUpload from '../global/ImageUpload';

const Form = ({
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
  setFieldValue,
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  Id,
  single,
  singleData,
  resetAdd,
  resetUpdate,
  allTypes,
  categories
}) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (isSuccess) {
      swal('New advertise added!', '', 'success');
      handleFormVisibilty();
      resetAdd();
      setReloadToggle(!reloadToggle);
    }
    if (isError) {
      swal(data && data.data && data.data.message, '', 'warning');
      // handleFormVisibilty();
      resetAdd();
      // setReloadToggle(!reloadToggle);
    }
    if (isUpdateSuccess) {
      swal('Adertise updated!', '', 'success');
      handleFormVisibilty();
      resetUpdate();
      setReloadToggle(!reloadToggle);
    }
  }, [
    isSuccess,
    isError,
    isUpdateSuccess,
    handleFormVisibilty,
    resetAdd,
    setReloadToggle,
    reloadToggle,
    data,
    resetUpdate
  ]);

  useEffect(() => {
    if (!isAddForm) {
      single(Id, token);
      // swal('New user added!', '', 'success');
    }
  }, [Id, isAddForm, single, token]);

  const getImage = value => {
    setFieldValue('image', value);
  };

  // console.log('values', values);

  return (
    <div className="">
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          handleFormVisibilty();
        }}
      >
        View Advertise
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? 'Add' : 'Edit'} Advertise</h4>
          </div>
          <div className="card-body">
            <ImageUpload
              getImage={getImage}
              type="advertise"
              value={values.image}
            />
            <div className="row">
              <div className="form-group col-md-12 mb-3">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  // value="john"

                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.title && touched.title && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.title}
                  </div>
                )}
              </div>

              <div className="form-group col-md-12 mb-3">
                <label>Description</label>
                <textarea
                  type="text"
                  name="description"
                  className="form-control"
                  // value="john"

                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.description && touched.description && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.description}
                  </div>
                )}
              </div>

              <div className="form-group col-md-12 mb-3">
                <label>URL</label>
                <input
                  type="text"
                  name="url"
                  className="form-control"
                  // value="john"

                  value={values.url}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.url && touched.url && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.url}
                  </div>
                )}
              </div>
              
              
            </div>
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

const CatgeoryFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singleData }) => {
    // console.log('singleCategoryData', singleCategoryData);
    return {
      title: (singleData && singleData.title) || '',
      image: (singleData && singleData.image) || '',
      description: (singleData && singleData.description) || '',
      url: (singleData && singleData.url) || ''
    };
  },

  validationSchema: yupObject().shape({
    title: yupString().required(),
    image: yupString().required(),
    description:yupString().required(),
    url:yupString().required()
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // const { router } = props;
    const token = localStorage.getItem('token');
    // console.log('state values', values);
    if (props.isAddForm) {
      props.Add(
        {
          title: values.title,
          image:values.image,
          description: values.description,
          url:values.url         
        },
        token
      );
    } else {
      props.Update(
        {
          itle: values.title,
          image:values.image,
          description: values.description,
          url:values.url  
        },
        props.Id,
        token
      );
    }

    // resetForm();
  },

  displayName: 'Form' // helps with React DevTools
})(Form);

const mapStateToProps = state => ({
  data: state.Add.data,
  isRequesting: state.Add.isRequesting,
  isUpdateRequesting: state.Update.isRequesting,
  isSuccess: state.Add.isSuccess,
  isUpdateSuccess: state.Update.isSuccess,
  isError: state.Add.isError,
  singleData: state.advertise.data
});

export default connect(mapStateToProps, {
  Add,
  Update,
  single,
  resetAdd,
  resetUpdate
})(CatgeoryFormFormik);
