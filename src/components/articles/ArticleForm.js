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

const ArticleForm = ({
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
    category: "",
    isCustom: false,
    blogUrl: "",
    tags: "",
    image: "",
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
        let message = "Adertise added!";
        if (!isAddForm) message = "Adertise updated!";
        swal(message, "", "success");
        handleFormVisibilty();
        resetUpdateBlog();
        setReloadToggle(!reloadToggle);
      } else {
        swal(res.data.message, "", "Warning");
      }
    });
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
            <h4>{isAddForm ? "Add" : "Edit"} article</h4>
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

              <div className="form-group col-md-4 col-12 mt-3">
                <label>Category</label>
                {/* {form.category} */}
                <select
                  name="category"
                  className="form-control"
                  value={form.category}
                  required
                  onBlur={handleBlur}
                  onChange={(e) =>
                    setform({ ...form, category: e.target.value })
                  }
                  
                >
                  <option>Select category</option>
                  {catglist &&
                    catglist.category.map((item) => {
                      if (item.category == "blog") {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      }
                    })}
                </select>
                {form.category===''  && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    Please select category
                  </div>
                )}
              </div>

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
                      Please select description
                    </div>
                  )}
                </div>
              )}
              <div className="form-group col-md-12 col-12">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                    name="isCustom"
                    checked={form.isCustom}
                    value={form.isCustom}
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setform({ ...form, isCustom: e.target.checked })
                    }
                  />
                  <label className="custom-control-label" for="customCheck1">
                    Or add your custom link for the blog
                  </label>
                </div>
              </div>
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
                 {
                   form.isCustom? <></>:<TagInput getInput={getInput} tags={values.tags} />
                 }

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

const ArticleFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singleBlogData }) => {
    // console.log('singleBlogData', singleBlogData);
    return {
      title: (singleBlogData && singleBlogData.title) || "",
      description: (singleBlogData && singleBlogData.description) || "",
      image: (singleBlogData && singleBlogData.image) || "",
      category: (singleBlogData && singleBlogData.category?.id) || "",
      blogUrl: (singleBlogData && singleBlogData.blogUrl) || "",
      tags: (singleBlogData && singleBlogData.tags) || [],
      isCustom: (singleBlogData && singleBlogData.isCustom) || false,
    };
  },

  validationSchema: yupObject().shape({
    // title: yupString()
    //   .max(50)
    //   .required(),
    // description: yupString().required(),
    category: yupString().required(),
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // console.log('values', values);
    // const { router } = props;
    const token = localStorage.getItem("token");
    if (props.isAddForm) {
      props.blogAdd(
        {
          title: values.title,
          category: values.category,
          image: values.image,
          tags: values.tags,
          blogUrl: values.blogUrl,
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
          category: values.category,
          image: values.image,
          tags: values.tags,
          blogUrl: values.blogUrl,
          isCustom: values.isCustom,
          // slug: values.slug,
          description: values.description,
        },
        props.blogId,
        token
      );
    }

    resetForm();
  },

  displayName: "BlogForm", // helps with React DevTools
})(ArticleForm);

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
})(ArticleFormFormik);
