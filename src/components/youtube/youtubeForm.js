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
  Add,
  Update,
  singleUser,
  resetAddUser,
  resetUpdateUser,
  youtube
} from '../../store/actions/youtubeActions';
import TagInput from '../global/TagInput';

const YouTubeForm = ({handleFormVisibilty,
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
    youtube,
    data,
    isAddForm,
    reloadToggle,
    setReloadToggle,
    userId,
    singleUser,
    singleUserData,
    resetAddUser,
    setFieldValue,
    resetUpdateUser}) =>{
console.log("values", values);

const getInput = values => {
  setFieldValue('tags', values);
};

    return (
        <div className="">
          {/* <button className="btn btn-primary mb-3" onClick={handleFormVisibilty}>
            View Youtube
          </button> */}
          <div className="card">
            <form
              onSubmit={handleSubmit}
              className="needs-validation"
              noValidate=""
            >
              <div className="card-header">
                <h4>{isAddForm ? 'Add' : 'Edit'} YouTube</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-md-12">
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
                  <div className="form-group col-md-12">
                    <label>Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="description"
                      // value="Maman"
                      required=""
                      value={values.description}
                      onBlur={handleBlur}
                      onChange={handleChange}></textarea>
                    {errors.description && touched.description && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {errors.description}
                      </div>
                    )}
                  </div>

                  <div className="form-group col-md-12">
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

                  <div className="form-group col-md-12">
                    <label>Tags</label>
                    <TagInput getInput={getInput} tags={values.tags} />

                    {errors.tags && touched.tags && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {errors.tags}
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
}


const YouTubeFormFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ singleUserData }) => {
      // console.log('singleUserData', singleUserData);
      return {
        title: (singleUserData && singleUserData.title) || '',
        description: (singleUserData && singleUserData.description) || '',
        url: (singleUserData && singleUserData.url) || '',
      };
    },
  
    validationSchema: yupObject().shape({
        title: yupString()
        .required(),
      description: yupString()
        .required(),
      // roles: yupString().required(),
      url: yupString()
        .required()
    }),
    handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
      // const { router } = props;
      const token = localStorage.getItem('token');
      // console.log('state values', values);
      if (props.isAddForm) {
        props.Add(
          {
            title: values.title,
            description: values.description,
            url: values.url
          },
          token
        );
      } else {
        props.Update(
          {
            title: values.title,
            description: values.description,
            url: values.url
          },
          props.userId,
          token
        );
      }
  
      // resetForm();
    },
  
    displayName: 'YouTubeForm' // helps with React DevTools
  })(YouTubeForm);

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
    Add,
    Update,
    singleUser,
    resetAddUser,
    resetUpdateUser
  })(YouTubeFormFormik);