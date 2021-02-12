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
  categoryAdd,
  categoryUpdate,
  singleCategory,
  resetAddCategory,
  resetUpdateCategory,
  categories
} from '../../store/actions/advertiseActions';
import ImageUpload from '../global/ImageUpload';

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
  setFieldValue,
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  categoryId,
  singleCategory,
  singleCategoryData,
  resetAddCategory,
  resetUpdateCategory,
  allTypes,
  categories
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
  }, [
    isSuccess,
    isError,
    isUpdateSuccess,
    handleFormVisibilty,
    resetAddCategory,
    setReloadToggle,
    reloadToggle,
    data,
    resetUpdateCategory
  ]);

  useEffect(() => {
    if (!isAddForm) {
      singleCategory(categoryId, token);
      // swal('New user added!', '', 'success');
    }
  }, [categoryId, isAddForm, singleCategory, token]);

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
            <ImageUpload
              getImage={getImage}
              type="category"
              value={values.image}
            />
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
                <label>Category</label>
                <select
                  name="category"
                  className="form-control"
                  value={values.category}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option>Select category</option>
                  {allTypes &&
                    allTypes.result.map(item => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                </select>
                {errors.category && touched.category && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    Please select type
                  </div>
                )}
              </div>
              {categories && !isEmpty(categories) && (
                <div className="form-group col-md-4 col-12">
                  <label>Sub Category</label>
                  <select
                    name="subCategory"
                    className="form-control"
                    value={values.subCategory}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option>Select Sub Category</option>
                    {categories &&
                      categories.map(item => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  {errors.subCategory && touched.subCategory && (
                    <div
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.subCategory}
                    </div>
                  )}
                </div>
              )}
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
  mapPropsToValues: ({ singleCategoryData }) => {
    // console.log('singleCategoryData', singleCategoryData);
    return {
      name: (singleCategoryData && singleCategoryData.name) || '',
      subCategory: (singleCategoryData && singleCategoryData.parentid) || '',
      category: (singleCategoryData && singleCategoryData.typeid) || '',
      image: (singleCategoryData && singleCategoryData.image) || ''
    };
  },

  validationSchema: yupObject().shape({
    name: yupString()
      .max(15)
      .required(),
    subCategory: yupString().required(),
    category: yupString().required()

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
          typeid: values.category,
          parentid: values.subCategory,
          image: values.image
        },
        token
      );
    } else {
      props.categoryUpdate(
        {
          name: values.name,
          typeid: values.category,
          parentid: values.subCategory,
          image: values.image
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

export default connect(mapStateToProps, {
  categoryAdd,
  categoryUpdate,
  singleCategory,
  resetAddCategory,
  resetUpdateCategory
})(CatgeoryFormFormik);
