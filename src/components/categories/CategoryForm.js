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
  categoryAdd,
  categoryUpdate,
  singleCategory,
  resetAddCategory,
  resetUpdateCategory,
  categories
} from '../../store/actions/categoryActions';

const CategoryForm = ({
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
  categories,
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  categoryId,
  singleCategory,
  singleCategoryData,
  resetAddCategory,
  resetUpdateCategory
}) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (isSuccess) {
      swal('New category added!', '', 'success');
      handleFormVisibilty();
      resetAddCategory();
      setReloadToggle(!reloadToggle);
    }
    if (isError) {
      swal(data && data.data && data.data.message, '', 'warning');
      // handleFormVisibilty();
      resetAddCategory();
      // setReloadToggle(!reloadToggle);
    }
    if (isUpdateSuccess) {
      swal('Category updated!', '', 'success');
      handleFormVisibilty();
      resetUpdateCategory();
      setReloadToggle(!reloadToggle);
    }
  }, [isSuccess, isError, isUpdateSuccess]);

  useEffect(() => {
    if (!isAddForm) {
      singleCategory(categoryId, token);
      // swal('New user added!', '', 'success');
    }
  }, [singleCategory]);

  // console.log('data', data);
  return (
    <div className="">
      <button className="btn btn-primary mb-3" onClick={handleFormVisibilty}>
        View Categories
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? 'Add' : 'Edit'} category</h4>
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
              <div className="form-group col-md-4 col-12">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  // value="Maman"
                  required=""
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

const CatgeoryFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singleCategoryData }) => {
    // console.log('singleCategoryData', singleCategoryData);
    return {
      name: (singleCategoryData && singleCategoryData.name) || '',
      description: (singleCategoryData && singleCategoryData.description) || ''
    };
  },

  validationSchema: yupObject().shape({
    name: yupString()
      .max(15)
      .required(),
    description: yupString().required()

    // .required()
    // password: yupString().min(8)
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // const { router } = props;
    const token = localStorage.getItem('token');
    // console.log('state values', values);
    if (props.isAddForm) {
      props.categoryAdd(
        {
          name: values.name,
          description: values.description
        },
        token
      );
    } else {
      props.categoryUpdate(
        {
          name: values.name,
          description: values.description
        },
        props.categoryId,
        token
      );
    }

    // resetForm();
  },

  displayName: 'CategoryForm' // helps with React DevTools
})(CategoryForm);

const mapStateToProps = state => ({
  data: state.categoryAdd.data,
  isRequesting: state.categoryAdd.isRequesting,
  isUpdateRequesting: state.categoryUpdate.isRequesting,
  isSuccess: state.categoryAdd.isSuccess,
  isUpdateSuccess: state.categoryUpdate.isSuccess,
  isError: state.categoryAdd.isError,
  singleCategoryData: state.category.data
});

export default connect(
  mapStateToProps,
  {
    categoryAdd,
    categoryUpdate,
    singleCategory,
    resetAddCategory,
    resetUpdateCategory,
    categories
  }
)(CatgeoryFormFormik);
