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
  blogAdd,
  blogsUpdate,
  singleBlog,
  resetAddBlog,
  resetUpdateBlog,
  uploadImage,
  blogs
} from '../../store/actions/blogsActions';
import ImageUpload from '../global/ImageUpload';

const ArticleForm = ({
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
  blogs,
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  blogId,
  singleBlog,
  singleBlogData,
  resetAddBlog,
  resetUpdateBlog,
  uploadImage
}) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (isSuccess) {
      swal('New blog added!', '', 'success');
      handleFormVisibilty();
      resetAddBlog();
      setReloadToggle(!reloadToggle);
    }
    if (isError) {
      swal(data && data.data && data.data.message, '', 'warning');
      // handleFormVisibilty();
      resetUpdateBlog();
      // setReloadToggle(!reloadToggle);
    }
    if (isUpdateSuccess) {
      swal('Blog updated!', '', 'success');
      handleFormVisibilty();
      resetUpdateBlog();
      setReloadToggle(!reloadToggle);
    }
  }, [
    isSuccess,
    isError,
    isUpdateSuccess,
    handleFormVisibilty,
    resetAddBlog,
    setReloadToggle,
    reloadToggle,
    data,
    resetUpdateBlog
  ]);

  useEffect(() => {
    if (!isAddForm) {
      singleBlog(blogId, token);
      // swal('New user added!', '', 'success');
    }
  }, [blogId, isAddForm, singleBlog, token]);

  return (
    <div className="">
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={handleFormVisibilty}
      >
        View Articles
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? 'Add' : 'Edit'} article</h4>
          </div>
          <div className="card-body">
            <label>Image</label>
            <div className="dropzone image-upload" id="mydropzone">
              <div className="fallback">
                <input name="file" type="file" multiple />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4 col-12">
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
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
              />
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

const ArticleFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singleBlogData }) => {
    return {
      title: (singleBlogData && singleBlogData.title) || '',
      description: (singleBlogData && singleBlogData.description) || ''
    };
  },

  validationSchema: yupObject().shape({
    title: yupString()
      .max(50)
      .required(),
    description: yupString().required()
    // slug: yupString()
    //   .max(20)
    //   .required()
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // const { router } = props;
    const token = localStorage.getItem('token');
    if (props.isAddForm) {
      props.blogAdd(
        {
          title: values.title,
          // slug: values.slug,
          description: values.description
        },
        token
      );
    } else {
      props.blogsUpdate(
        {
          title: values.title,
          // slug: values.slug,
          description: values.description
        },
        props.blogId,
        token
      );
    }

    // resetForm();
  },

  displayName: 'BlogForm' // helps with React DevTools
})(ArticleForm);

const mapStateToProps = state => ({
  data: state.blogAdd.data,
  isRequesting: state.blogAdd.isRequesting,
  isUpdateRequesting: state.blogUpdate.isRequesting,
  isSuccess: state.blogAdd.isSuccess,
  isUpdateSuccess: state.blogUpdate.isSuccess,
  isError: state.blogAdd.isError,
  singleBlogData: state.blog.data
});

export default connect(mapStateToProps, {
  blogAdd,
  blogsUpdate,
  singleBlog,
  resetAddBlog,
  resetUpdateBlog,
  uploadImage,
  blogs
})(ArticleFormFormik);
