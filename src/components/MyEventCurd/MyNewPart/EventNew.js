import { data, image } from "@tensorflow/tfjs";
import Axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import ApiClient from "../../apiClient";
import Layout from "../../global/Layout";
import MainSidebar from "../../global/MainSidebar";
import SectionHeader from "../../global/SectionHeader";
import * as yup from "yup";

export default function EventNew() {
  let schema = yup.object().shape({
    title: yup.string().required("Please Enter  your Title"),
    description: yup.string().required("Please Enter your Event Description "),
    url: yup
      .string()
      .url("It must be a URL")
      .required("Please Enter the URL First."),
    startDate: yup.date().required("Please enter your Event Start Date."),
    endDate: yup
      .date()
      .min(yup.ref("startDate"), "Please Enter a Valid Event EndDate")
      .required("Please Enter the Event EndDate"),
  });

  const [Uploading1, setUploading1] = useState("");
  const [Uploading2,setUploading2]=useState("");
  const [Image, setImage] = useState("");
  const [Images, setImages] = useState("");

  const [eventdata, seteventdata] = useState([]);

  // For navigating the user to the another route
  const history = useHistory();
  const { id } = useParams();



  // For Getting the Event List
  const getdatabyid = () => {
    ApiClient.get(`/event?id=${id}`)
      .then((res) => {
        seteventdata(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const uploadImage = (e) => {
    let files = e.target.files;
    let file = files.item(0);
    setUploading1(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      ApiClient.postFormData("/upload", reader.result, "blogs").then((res) => {
        console.log("uploadImage", res);
        if (res.success) {
          let image = res.data.imagePath;
          setImage(image);
        }
        setUploading1(false);
      });
    };
  };

  // For Uploading Image
  const uploadImages = (e) => {
    let files = e.target.files;
    let file = files.item(0);
    setUploading2(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      ApiClient.postFormData("/upload", reader.result, "blogs").then((res) => {
        console.log("uploadImage", res);
        if (res.success) {
          let image = res.data.imagePath; 
          setImages(image);
        }
        setUploading2(false);
      });
    };
  };

  useEffect(() => {
    if (id) {
      getdatabyid();
    }
  }, []);

  return (
    <Layout title="Events">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Events" />
          <button className="btn btn-primary mb-3">
            <NavLink to="/list/event">
              <span className="text-white">Event List</span>
            </NavLink>
          </button>
          <div>
            <Formik
              enableReinitialize
              validationSchema={schema}
              initialValues={{
                title: id ? eventdata.title : "",
                description: !eventdata ? "" : eventdata.description,
                url: !eventdata ? "" : eventdata.url,
                images: !eventdata ? [] : eventdata.images,
                featuredImage: !eventdata ? "" : eventdata.featuredImage,
                startDate: !eventdata ? "" : eventdata.startDate,
                endDate: !eventdata ? "" : eventdata.endDate,
              }}
              onSubmit={async (values, { resetForm }) => {
                //  If user isAdding something then this function called 
                const data = {
                  title: values.title,
                  description: values.description,
                  url: values.url,
                  images: Images,
                  featuredImage: Image,
                  startDate: values.startDate,
                  endDate: values.endDate,
                };
                if (!id) {
                  ApiClient.post("/event", data)
                    .then((res) => {
                      history.push("/list/event");
                      resetForm();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {

                  // When User is Updating Something then this function is called 
                  const newdata = {
                    title: values.title,
                    description: values.description,
                    url: values.url,
                    images: Images,
                    featuredImage: Image,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    id: id,
                  };
                  ApiClient.put(`/event`, newdata)
                    .then((res) => {
                      history.push("/list/event");
                    })
                    .catch((err) => console.log(err));
                }
              }}
            >
              {({
                values,
                handleBlur,
                handleSubmit,
                handleChange,
                errors,
                touched,
                handleReset,
              }) => (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter your Event Title here..."
                    className="form-control"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <b>
                      <p className="text-danger ">{errors.title}</p>
                    </b>
                  ) : null}
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Event Description here..."
                    onChange={handleChange}
                    name="description"
                    value={values.description}
                    onBlur={handleBlur}
                  />
                  {errors.description && touched.description ? (
                    <b>
                      <p className="text-danger ">
                        {errors.description}
                      </p>
                    </b>
                  ) : null}
                  <label htmlFor="url" className="form-label">
                    URl
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="Enter your URL here...."
                    onChange={handleChange}
                    name="url"
                    value={values.url}
                    onBlur={handleBlur}
                  />
                  {errors.url && touched.url ? (
                    <b>
                      <p className="text-danger ">{errors.url}</p>
                    </b>
                  ) : null}
                  <label htmlFor="startDate" className="form-label">
                    Startdate
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={handleChange}
                    name="startDate"
                    value={values.startDate}
                    onBlur={handleBlur}
                  />
                  {errors.startDate && touched.startDate ? (
                    <b>
                      <p className="text-danger ">
                        {errors.startDate}
                      </p>
                    </b>
                  ) : null}

                  <label htmlFor="endDate" className="form-label">
                    EndDate
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={handleChange}
                    name="endDate"
                    value={values.endDate}
                    onBlur={handleBlur}
                  />
                  {errors.endDate && touched.endDate ? (
                    <b>
                      <p className="text-danger ">
                        {errors.endDate}
                      </p>
                    </b>
                  ) : null}

                  {/* Here we start uploading file function and setting there some conditions\ */}
                  <div className="my-4">
                    <label className="btn btn-primary ">
                      <input
                        type="file"
                        className="d-none"
                        disabled={Uploading1}
                        accept="image/*"
                        name="featuredImage"
                        multiple="multiple"
                        onChange={uploadImage} 
                      />
                    {!Uploading1?" Upload FeaturedImage Image":"Uploading..."}
                    </label>
                    {Image||id? (
                      <img
                        width={100}
                        height={100}
                        src={`https://endpoint.crowdsavetheworld.com/${!Image?eventdata.featuredImage:Image}`}
                      />
                    ) : (
                      "Please Upload a Featured Image"
                    )}
                  </div>

                  <div className="my-4">
                    <label className="btn btn-primary ">
                      <input
                        type="file"
                        className="d-none"
                        accept="image/*"
                        disabled={Uploading2} 
                        name="featuredImage"
                        multiple="multiple"
                        onChange={uploadImages}
                      />
                    {!Uploading2?"  Upload Image":"Uploading..."}
                    </label>

                    {Images||id ? (
                      <img
                        width={100}
                        height={100}
                        src={`https://endpoint.crowdsavetheworld.com/${!Images?eventdata.images:Images}`}
                        alt="No Image"
                      />
                    ) : (
                      "Please Upload a Image"
                    )}
                  </div>

                  <div className="card-footer d-flex my-2 justify-content-between">
                    <button type="button" className="btn btn-danger">
                      {/* On clcking cancel the user will redirected to the List/event Page */}
                      <NavLink
                        to="/list/event"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="text-white">Cnacel</span>
                      </NavLink>
                    </button>

 {/* Disabling the button when yup is giving the error or errors are setted  */}
                    <button
                      className="btn btn-primary"
                 
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </section>
      </div>
    </Layout>
  );
}
