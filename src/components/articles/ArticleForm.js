import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
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
import TagInput from '../global/TagInput';

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

  const [showUrlInput, setShowUrlInput] = useState(false);

  const { data: uploadData } = useSelector(state => state.imageUpload);

  console.log('uploadData', uploadData);

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

  const getInput = values => {
    console.log('values', values);
  };

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
            {!showUrlInput && <ImageUpload />}
            <div className="row">
              {!showUrlInput && (
                <div className="form-group col-md-4 col-12 mt-3">
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
              )}

              <div className="form-group col-md-4 col-12 mt-3">
                <label>Category</label>
                <select
                  name="category"
                  className="form-control"
                  value={values.category}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option>Select category</option>
                  <option value="U">Type 1</option>
                  <option value="A">Type 2</option>
                </select>
                {errors.category && touched.category && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    Please select category
                  </div>
                )}
              </div>

              {!showUrlInput && (
                <div className="form-group col-md-8 col-12">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="form-group col-md-12 col-12">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                    checked={showUrlInput}
                    onChange={() => setShowUrlInput(!showUrlInput)}
                  />
                  <label className="custom-control-label" for="customCheck1">
                    Or add your custom link for the blog
                  </label>
                </div>
              </div>
              {showUrlInput && (
                <>
                  <div className="form-group col-md-12 col-12">
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
                  <TagInput getInput={getInput} />
                </>
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
