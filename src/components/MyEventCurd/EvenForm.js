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









// import { data, image } from "@tensorflow/tfjs";
// import Axios from "axios";
// import { Formik } from "formik";
// import React, { useEffect, useState } from "react";
// import { NavLink, useHistory, useParams } from "react-router-dom";
// import ApiClient from "../../apiClient";
// import Layout from "../../global/Layout";
// import MainSidebar from "../../global/MainSidebar";
// import SectionHeader from "../../global/SectionHeader";
// import * as yup from "yup";
// import swal from "sweetalert";

// export default function EventNew() {
//   let schema = yup.object().shape({
//     title: yup.string().required("Please Enter  your Title"),
//     description: yup.string().required("Please Enter your Event Description "),
//     url: yup
//       .string()
//       .url("It must be a URL")
//       .required("Please Enter the URL First."),
//     startDate: yup.date().required("Please enter your Event Start Date."),
//     endDate: yup
//       .date()
//       .min(yup.ref("startDate"), "Please Enter a Valid Event EndDate")
//       .required("Please Enter the Event EndDate"),
//       featuredImage:yup.mixed().required('Please Upload a Featured Image'),
//       images:yup.mixed().required("Please upload the Image")
  
   
//   });

//   const [Uploading1, setUploading1] = useState("");
//   const [Uploading2,setUploading2]=useState("");
//   const [Image, setImage] = useState("");
//   const [Images, setImages] = useState("");

//   const [eventdata, seteventdata] = useState([]);

//   // For navigating the user to the another route
//   const history = useHistory();
//   const { id } = useParams();



//   // For Getting the Event List
//   const getdatabyid = () => {
//     ApiClient.get(`/event?id=${id}`)
//       .then((res) => {
//         seteventdata(res.data.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   const uploadImage = (e) => {
//     let files = e.target.files;
//     let file = files.item(0);
//     setUploading1(true);
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       ApiClient.postFormData("/upload", reader.result, "blogs").then((res) => {
//         console.log("uploadImage", res);
//         if (res.success) {
//           let image = res.data.imagePath;
//           setImage(image);
//         }
//         setUploading1(false);
//       });
//     };
//   };

//   // For Uploading Image
//   const uploadImages = (e) => {
//     let files = e.target.files;
//     let file = files.item(0);
//     setUploading2(true);
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       ApiClient.postFormData("/upload", reader.result, "blogs").then((res) => {
//         console.log("uploadImage", res);
//         if (res.success) {
//           let image = res.data.imagePath; 
//           setImages(image);
//         }
//         setUploading2(false);
//       });
//     };
//   };

//   useEffect(() => {
//     if (id) {
//       getdatabyid();
//     }
//   }, []);

//   return (
//     <Layout title="Events">
//       <MainSidebar />
//       <div className="main-content">
//         <section className="section">
//           <SectionHeader title="Events" />
//           <button className="btn btn-primary mb-3">
//             <NavLink to="/list/event">
//               <span className="text-white">Event List</span>
//             </NavLink>
//           </button>
//           <div>
//             <Formik
//               enableReinitialize
//               validationSchema={schema}
//               initialValues={{
//                 title: id ? eventdata.title : "",
//                 description: !eventdata ? "" : eventdata.description,
//                 url: !eventdata ? "" : eventdata.url,
//                 images: !eventdata ? [] : eventdata.images,
//                 featuredImage: !eventdata ? "" : eventdata.featuredImage,
//                 startDate: !eventdata ? "" : eventdata.startDate,
//                 endDate: !eventdata ? "" : eventdata.endDate,
//               }}
//               onSubmit={async (values, { resetForm }) => {
//                 //  If user isAdding something then this function called 
//                 const data = {
//                   title: values.title,
//                   description: values.description,
//                   url: values.url,
//                   images: Images,
//                   featuredImage: Image,
//                   startDate: values.startDate,
//                   endDate: values.endDate,
//                 };
//                 if (!id) {
//                   ApiClient.post("/event", data)
//                     .then((res) => {
//                       history.push("/list/event");
//                       swal("Add Message!","Added Successfully!!");
//                       resetForm();
//                     })
//                     .catch((err) => {
//                       swal("Error Message","Some Error Ocurred While Adding the Event. Try After Some")
//                       console.log(err);
//                     });
//                 } else {

//                   // When User is Updating Something then this function is called 
//                   const newdata = {
//                     title: values.title,
//                     description: values.description,
//                     url: values.url,
//                     images:Images==""?eventdata.images:Images,
//                     featuredImage: Image==""?eventdata.featuredImage:Image,
//                     startDate: values.startDate,
//                     endDate: values.endDate,
//                     id: id,
//                   };
//                   ApiClient.put(`/event`, newdata)
//                     .then((res) => {
//                       swal("Update Message","Updated Successfully!!");
//                       history.push("/list/event");
//                     })
//                     .catch((err) => {console.log(err); swal("Error","Some Error Occurred While Updating")});
//                 }
//               }}
//             >
//               {({
//                 values,
//                 handleBlur,
//                 handleSubmit,
//                 handleChange,
//                 errors,
//                 touched,
//                 handleReset,
//               }) => (
//                 <form onSubmit={handleSubmit}>
//                   <label htmlFor="title" className="form-label">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title" 
//                     className="form-control"
//                     value={values.title}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   {errors.title && touched.title ? (
//                     <b>
//                       <p className="text-danger ">{errors.title}</p>
//                     </b>
//                   ) : null}
//                   <label htmlFor="description" className="form-label">
//                     Description
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control" 
//                     onChange={handleChange}
//                     name="description"
//                     value={values.description}
//                     onBlur={handleBlur}
//                   />
//                   {errors.description && touched.description ? (
//                     <b>
//                       <p className="text-danger ">
//                         {errors.description}
//                       </p>
//                     </b>
//                   ) : null}
//                   <label htmlFor="url" className="form-label">
//                     URL
//                   </label>
//                   <input
//                     type="url"
//                     className="form-control" 
//                     onChange={handleChange}
//                     name="url"
//                     value={values.url}
//                     onBlur={handleBlur}
//                   />
//                   {errors.url && touched.url ? (
//                     <b>
//                       <p className="text-danger ">{errors.url}</p>
//                     </b>
//                   ) : null}
//                   <label htmlFor="startDate" className="form-label">
//                     Startdate
//                   </label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     onChange={handleChange}
//                     name="startDate"
//                     value={values.startDate}
//                     onBlur={handleBlur}
//                   />
//                   {errors.startDate && touched.startDate ? (
//                     <b>
//                       <p className="text-danger ">
//                         {errors.startDate}
//                       </p>
//                     </b>
//                   ) : null}

//                   <label htmlFor="endDate" className="form-label">
//                     EndDate
//                   </label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     onChange={handleChange}
//                     name="endDate"
//                     value={values.endDate}
//                     onBlur={handleBlur}
//                   />
//                   {errors.endDate && touched.endDate ? (
//                     <b>
//                       <p className="text-danger ">
//                         {errors.endDate}
//                       </p>
//                     </b>
//                   ) : null}

//                   {/* Here we start uploading file function and setting there some conditions\ */}
//                   <div className="my-4">
//                     <label className="btn btn-primary ">
//                       <input
//                         type="file"
//                         className="d-none"
//                         disabled={Uploading1}
//                         accept="image/*"
//                         name="featuredImage"
//                         multiple="multiple"
//                         onChange={uploadImage} 
//                       />
//                     {!Uploading1?" Upload FeaturedImage Image":"Uploading..."}
//                     </label>
//                     {Image||id? (
//                       <img
//                         width={100}
//                         height={100}
//                         src={`https://endpoint.crowdsavetheworld.com/${!Image?eventdata.featuredImage:Image}`}
//                       />
//                     ) : (
//                       ""
//                     )}
//                          {errors.featuredImage && touched.featuredImage ? (
//                     <b>
//                       <p className="text-danger ">
//                         {errors.featuredImage}
//                       </p>
//                     </b>
//                   ) : null}
//                   </div>

//                   <div className="my-4">
//                     <label className="btn btn-primary ">
//                       <input
//                         type="file"
//                         className="d-none"
//                         accept="image/*"
//                         disabled={Uploading2} 
//                         name="featuredImage"
//                         multiple="multiple"
//                         onChange={uploadImages}
//                       />
//                     {!Uploading2?"  Upload Image":"Uploading..."}
//                     </label>

//                     {Images||id ? (
//                       <img
//                         width={100}
//                         height={100}
//                         src={`https://endpoint.crowdsavetheworld.com/${!Images?eventdata.images:Images}`}
//                         alt="No Image"
//                       />
//                     ) : (
//                      ""
//                     )}
//                     {errors.images&&touched.images?<b><p className="text-danger">{errors.images}</p></b>:""}
//                   </div>

//                   <div className="card-footer d-flex my-2 justify-content-between">
//                     <button type="button" className="btn btn-danger">
//                       {/* On clcking cancel the user will redirected to the List/event Page */}
//                       <NavLink
//                         to="/list/event"
//                         style={{ textDecoration: "none" }}
//                       >
//                         <span className="text-white">Cnacel</span>
//                       </NavLink>
//                     </button>

//  {/* Disabling the button when yup is giving the error or errors are setted  */}
//                     <button
//                       className="btn btn-primary"
                 
//                       type="submit"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </Formik>
//           </div>
//         </section>
//       </div>
//     </Layout>
//   );
// }
