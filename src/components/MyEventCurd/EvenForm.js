import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { withFormik } from "formik";
import Yup, {
  object as yupObject,
  string as yupString,
  number as yupNumber,
} from "yup";
import swal from "sweetalert";
import {
  blogAdd,
  blogsUpdate,
  singleBlog,
  resetAddBlog,
  resetUpdateBlog,
  uploadImage,
  blogs,
} from "../../store/actions/blogsActions";
import ImageUpload from "../global/ImageUpload";
import TagInput from "../global/TagInput";
import ApiClient from "../apiClient";

const EventForm = ({
  handleFormVisibilty,
  // handleSubmit,
  handleBlur,
  // handleChange,
  values,
  isRequesting,
  isUpdateRequesting,
  isSuccess,
  isUpdateSuccess,
  isError,
  errors,
  touched,
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  blogId,
  singleBlog,
  resetAddBlog,
  resetUpdateBlog,
  setFieldValue,
  // categories
}) => {
  const token = localStorage.getItem("token");
  const [catglist, setcategories] = useState();
  const [myimage, setimage] = useState();
  const [form, setform] = useState({
    title: "", 
description:"",
 url:"",
images:[],
featuredImage:"",
startDate :"",
endDate : "",
    
  });
  useEffect(() => {
    if (isSuccess) {
      swal("New blog added!", "", "success");
      handleFormVisibilty();
      resetAddBlog();
      setReloadToggle(!reloadToggle);
    }
    if (isError) {
      swal(data && data.data && data.data.message, "", "warning");
      // handleFormVisibilty();
      resetUpdateBlog();
      // setReloadToggle(!reloadToggle);
    }
    if (isUpdateSuccess) {
      swal("Blog updated!", "", "success");
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
    resetUpdateBlog,
  ]);

  useEffect(() => {
    // console.log(catglist,'here u are ')
  }, [catglist]);

  useEffect(() => {
    if (!isAddForm) {
      ApiClient.get("/blogs/" + blogId).then((res) => {
        if (res.data.success) {
          console.log(res.data.data, "here we have data peoples");
          setform({
            ...form,
            ...res.data.data,
            category: res.data.data?.category?.id,
          });
          setimage(res.data.data.image);
        }
      });
    }
  }, [blogId, isAddForm, token]);

  useEffect(() => {
    getCategorylist();
    if (!isAddForm) {
      singleBlog(blogId, token);

      // swal('New user added!', '', 'success');
    }
    // console.log(categories,'checking categories here')
  }, [blogId, isAddForm, singleBlog, token]);

  const getCategorylist = () => {
    ApiClient.get("/allcategory", { page: 1, count: 100 }).then((res) => {
      if (res.data.success) {
        setcategories(res.data.data);
        console.log(res.data, "am here for u");
      }
    });
  };

  const getInput = (values) => {
    setform({ ...form, tags: values });
  };

  const getImage = (value) => {
    setimage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form", form);
    let method = "post";
    let url = "/blogs";
    let payload = {
      blogUrl: form.blogUrl,
      category: form.category,
      description: form.description,
      image: myimage,
      isCustom: form.isCustom,
      tags: form.tags,
      title: form.title,
    };
    if (!isAddForm) {
      method = "put";
      payload.id = blogId;
      url = "/blogs/" + blogId;
    }
    ApiClient.allApi(url, payload, method).then((res) => {
      if (res.data.success) {
        let message = "Event added!";
        if (!isAddForm) message = "Event updated!";
        swal(message, "", "success");
        handleFormVisibilty();
        resetUpdateBlog();
        setReloadToggle(!reloadToggle);
      } else {
        swal(res.data.message, "", "Warning");
      }
    });
  };

const getdata=()=>{
  ApiClient.get(`event?id=`).then(res=>{
    if(res.success){
      
    }
  })
}

  return (
    <div className="">
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={handleFormVisibilty}
      >
        View Events
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? "Add" : "Edit"} Event</h4>
          </div>

          <div className="card-body">
            {!form.isCustom && (
              <ImageUpload getImage={getImage} type="blogs" value={myimage} />
            )}
            <div className="row">
              <div className="form-group col-md-4 col-12 mt-3">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  // value="john"
                  required
                  value={form.title}
                  onBlur={handleBlur}
                  onChange={(e) => setform({ ...form, title: e.target.value })}
                />
                {errors.title && touched.title && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {errors.title}
                  </div>
                )}
              </div>
              {/* )} */}

           

              {!form.isCustom && (
                <div className="form-group col-md-8 col-12">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={form.description}
                    required
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setform({ ...form, description: e.target.value })
                    }
                  />
                  {errors.description && touched.description && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      Please Enter  description
                    </div>
                  )}
                </div>
              )}
              
              {form.isCustom && (
                <>
                  <div className="form-group col-md-12 col-12">
                    <label>URL</label>
                    <input
                      type="text"
                      name="blogUrl"
                      className="form-control"
                      // value="john"
                      required
                      value={form.blogUrl}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setform({ ...form, blogUrl: e.target.value })
                      }
                    />
                    {errors.blogUrl && touched.blogUrl && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        {errors.blogUrl}
                      </div>
                    )}
                  </div>
                </>
              )}
                 
                  <TagInput getInput={getInput} tags={values.tags} />
                 

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
              disabled={form.category===''}
              className={`btn btn-primary   ${
                isRequesting || isUpdateRequesting
                  ? "btn-progress disabled"
                  : ""
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

const EventFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singleBlogData }) => {
    // console.log('singleBlogData', singleBlogData);
    return {
      title: (singleBlogData && singleBlogData.title) || "",
      description: (singleBlogData && singleBlogData.description) || "",
      image: (singleBlogData && singleBlogData.url) || "",
      category: (singleBlogData && singleBlogData.startDate) || "",
      blogUrl: (singleBlogData && singleBlogData.endDate) || "",
      tags: (singleBlogData && singleBlogData.tags) || [],
      isCustom: (singleBlogData && singleBlogData.isCustom) || false,
    };
  },

  validationSchema: yupObject().shape({
    // title: yupString()
    //   .max(50)
    //   .required(),
    // description: yupString().required(),
    description: yupString().required(),
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // console.log('values', values);
    // const { router } = props;
    const token = localStorage.getItem("token");
    if (props.isAddForm) {
      props.blogAdd(
        {
          title: values.title, 
          featuredImage: values.featuredImage,
          startDate: values.startDate,
          endDate: values.endDate,
          // slug: values.slug,
          isCustom: values.isCustom,
          description: values.description,
        },
        token
      );
    } else {
      props.blogsUpdate(
        {
          title: values.title,
          description: values.description,
          featuredImage: values.featuredImage,
          startDate: values.startDate,
          endDate: values.endDate, 
        },
        props.blogId,
        token
      );
    }

    resetForm();
  },

  displayName: "BlogForm", // helps with React DevTools
})(EventForm);

const mapStateToProps = (state) => ({
  data: state.blogAdd.data,
  isRequesting: state.blogAdd.isRequesting,
  isUpdateRequesting: state.blogUpdate.isRequesting,
  isSuccess: state.blogAdd.isSuccess,
  isUpdateSuccess: state.blogUpdate.isSuccess,
  isError: state.blogAdd.isError,
  singleBlogData: state.blog.data,
});

export default connect(mapStateToProps, {
  blogAdd,
  blogsUpdate,
  singleBlog,
  resetAddBlog,
  resetUpdateBlog,
  uploadImage,
  blogs,
})(EventFormFormik);
