import { data, image } from "@tensorflow/tfjs";
import Axios from "axios";
import { Formik } from "formik";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import ApiClient from "../../apiClient";
import Layout from "../../global/Layout";
import MainSidebar from "../../global/MainSidebar";
import SectionHeader from "../../global/SectionHeader";
import * as yup from "yup";
import swal from "sweetalert";
import { eventModel } from "../../../models/category.model";
import PlacesAutocomplete from "react-places-autocomplete";
import LocationSearchInput from "../../global/LocationSearchInput";
import TimePicker from "react-time-picker";
import moment from "moment";

export default function EventNew({ item }) {
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
  const [form, setform] = useState({ ...eventModel });
  const [Uploading1, setUploading1] = useState("");
  const [Uploading2, setUploading2] = useState("");
  const [Image, setImage] = useState("");
  const [Images, setImages] = useState("");
  const [value, onChange] = useState();
  const [loc, setloc] = useState([]);
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");

  const [state, setstate] = useState("");
  const [zip, setzip] = useState("");
  const [lat, setlat] = useState("");
  const [lng, setlng] = useState("");
  const [event, setevent] = useState([]);
  const [tags, settag] = useState([]);
  const [paid, setpaid] = useState(false);
  const [journey, setjourney] = useState([]);
  const param = useParams();

  const [eventdata, seteventdata] = useState([]);

  useEffect(() => {
    console.log(value);
    setform({ ...form, time: value });
  }, [value]);

  // For navigating the user to the another route
  const history = useHistory();
  const { id } = useParams();

  // For Getting the Event List
  const getdatabyid = () => {
    ApiClient.get(`/event?id=${id}`)
      .then((res) => {
        setform(res.data.data);
        console.log(res.data.data);
        console.log(form);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    ApiClient.get(
      "/allcategory?types=event&search=&page=1&count=10&sortBy=createdAt%20desc"
    ).then((res) => {
      setevent(res?.data?.data.category);
    });
    ApiClient.get(
      "/project?type=I&search=&page=1&count=10&sortBy=createdAt%20desc"
    ).then((res) => {
      setjourney(res.data.result);
    });
  }, []);

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
          setform({ ...form, featuredImage: image });
        }
        setUploading1(false);
      });
    };
  };

  // setFieldValue('address', value.address);
  const getAddressDetails = (value) => {
    setlat(value.latLng.lat);
    setlng(value.latLng.lng);
    setloc(value);

    let res = value?.result?.address_components;
    const getCountry = () => {
      let value = "";

      res.map((item) => {
        if (item.types[0] == "country") {
          value = item.long_name;
        }
      });

      return value;
    };
    const getCity = () => {
      let value = "";
      res.map((item) => {
        if (item.types[0] == "locality") {
          value = item.long_name;
        }
      });
      return value;
    };
    const getState = () => {
      let value = "";
      res.map((item) => {
        if (item.types[0] == "administrative_area_level_1") {
          value = item.long_name;
        }
      });
      return value;
    };
    const getPostalCode = () => {
      let value = "";
      res.map((item) => {
        if (item.types[0] == "postal_code") {
          value = item.long_name;
        }
      });
      return value;
    };

    getPostalCode();
    getState();
    getCity();
    getCountry();
    setcountry(getCountry());
    setcity(getCity());
    setstate(getState());
    setzip(getPostalCode());

    setform({
      ...form,
      location: {
        type: "Point",
        coordinates: [value.latLng.lat, value.latLng.lng],
      },
      country: getCountry(),
      city: getCity(),
      state: getState(),
      lat: value.latLng.lat,
      lng: value.latLng.lng,
      address: value.address,
      zipcode: getPostalCode(),
    });
  };

  const SubmitData = () => {
    ApiClient.put("/event", form).then((res) => {});
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

          setform({ ...form, images: [image] });
        }
        setUploading2(false);
      });
    };
  };

  const AddTag = () => {
    tags.push({
      name: "",
    });
    settag([...tags]);
  };

  const removetag = (index) => {
    settag([...tags.filter((itm, i) => i != index)]);
    setform({
      ...form,
      tags: [...tags.filter((itm, i) => i != index)],
    });
  };

  const updatetag = (index, key, value) => {
    let arr = tags;
    arr[index][key] = value;
    settag([...arr]);
    setform({ ...form, tags: [...arr] });
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
                catagory: !eventdata ? "" : eventdata.catagory,
                journey: !eventdata ? "" : eventdata.journey,
                groupName: !eventdata ? "" : eventdata.groupName,
                address: !eventdata ? "" : eventdata.address,
                city: !eventdata ? "" : eventdata.city,
                state: !eventdata ? "" : eventdata.state,
                zipcode: !eventdata ? "" : eventdata.zipcode,
                country: !eventdata ? "" : eventdata.country,
                lat: !eventdata ? "" : eventdata.lat,
                long: !eventdata ? "" : eventdata.long,
                cost: !eventdata ? "" : eventdata.cost,
                sizeOfVenue: !eventdata ? "" : eventdata.sizeOfVenue,
                location: !eventdata ? {} : eventdata.location,
                eventType: !eventdata ? {} : eventdata.eventType,
                tags: !eventdata ? [] : eventdata.tags,
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
                      swal("Add Message", "Event Added Successfully!!");
                      resetForm();
                    })
                    .catch((err) => {
                      swal(
                        "Error Message",
                        "Some Error While Adding Event. So Try After Some Time!!"
                      );
                      console.log(err);
                    });
                } else {
                  // When User is Updating Something then this function is called
                  const newdata = {
                    title: values.title,
                    description: values.description,
                    url: values.url,
                    images: Images == "" ? eventdata.images : Images,
                    featuredImage:
                      Image == "" ? eventdata.featuredImage : Image,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    id: id,
                  };
                  ApiClient.put(`/event`, newdata)
                    .then((res) => {
                      history.push("/list/event");
                      swal("Update Message", "Event Updated Successfully!!");
                    })
                    .catch((err) =>
                      swal(
                        "Error Message",
                        "Some Error While Updating Event. So Try After Some Time!!"
                      )
                    );
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    if (!id) {
                      ApiClient.post("/event", form).then((res) => {
                        if (res.data.success) {
                          history.push("/list/event");
                        }
                      });
                    }
                  }}
                >
                  <label
                    htmlFor="title"
                    className="form-label"
                    onClick={() => {
                      getAddressDetails();
                    }}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={form.title}
                    onChange={(e) => {
                      setform({ ...form, title: e.target.value });
                    }}
                    onBlur={handleBlur}
                  />

                  <label htmlFor="description" className="form-label">
                    Description
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => {
                      setform({ ...form, description: e.target.value });
                    }}
                    name="description"
                    value={form.description}
                    onBlur={handleBlur}
                  />
                  <label className="form-label">Catagory</label>
                  <select
                    value={form.category_id}
                    onChange={(e) => {
                      setform({ ...form, category_id: e.target.value });
                    }}
                    class="form-control"
                    aria-label="Default select example"
                  >
                    <option selected>Select Catagory</option>
                    {event?.map((itm, key) => {
                      return <option value={itm.id}>{itm.name}</option>;
                    })}
                  </select>
                  <label className="form-label">Event Type</label>
                  <select
                    value={form.eventType}
                    onChange={(e) => {
                      setform({ ...form, eventType: e.target.value });
                      if (e.target.value == "free") {
                        setpaid(false);
                      } else {
                        setpaid(true);
                      }
                    }}
                    class="form-control"
                    aria-label="Default select example"
                  >
                    <option selected>Select Event Type</option>

                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                  <label className="form-label">Journey</label>
                  <select
                    value={form.journey}
                    onChange={(e) => {
                      setform({ ...form, journey: e.target.value });
                    }}
                    class="form-control"
                    aria-label="Default select example"
                  >
                    <option selected>Select Journey</option>
                    {journey?.map((itm, key) => {
                      return <option value={itm.id}>{itm.name}</option>;
                    })}
                  </select>

                  <label htmlFor="url" className="form-label">
                    URl
                  </label>
                  <input
                    type="url"
                    required
                    className="form-control"
                    onChange={(e) => {
                      setform({ ...form, url: e.target.value });
                    }}
                    name="url"
                    value={form.url}
                    onBlur={handleBlur}
                  />

                  <label htmlFor="startDate" className="form-label">
                    Startdate
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    onChange={(e) => {
                      setform({ ...form, startDate: e.target.value });
                    }}
                    name="startDate"
                    value={moment(form.startDate).utc().format("YYYY-MM-DD")}
                    // onBlur={handleBlur}
                  />

                  <label htmlFor="endDate" className="form-label">
                    EndDate
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    onChange={(e) => {
                      console.log(e.target.value);
                      console.log(JSON.stringify(loc));
                      console.log(form);
                      setform({ ...form, endDate: e.target.value });
                    }}
                    name="endDate"
                    value={moment(form.endDate).utc().format("YYYY-MM-DD")}
                    // onBlur={handleBlur}
                  />

                  <label htmlFor="endDate" className="form-label">
                    Select Time
                  </label>
                  <div style={{ width: "100%" }}>
                    <TimePicker onChange={onChange} value={form.time} />
                  </div>

                  <label htmlFor="groupName" className="form-label">
                    Group Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => {
                      setform({ ...form, groupName: e.target.value });
                    }}
                    name="groupName"
                    value={form.groupName}
                    onBlur={handleBlur}
                  />

                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <LocationSearchInput
                    getAddressDetails={getAddressDetails}
                    value={values.address || form.address}
                  />
                  <label htmlFor="city" className="form-label">
                    city
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    onChange={(e) => {
                      setform({ ...form, city: e.target.value });
                    }}
                    name="city"
                    value={city || form.city}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="state" className="form-label">
                    state
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    onChange={(e) => {
                      setform({ ...form, state: e.target.value });
                    }}
                    name="state"
                    value={state || form.state}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="zipcode" className="form-label">
                    zipcode
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    onChange={(e) => {
                      setform({ ...form, zipcode: e.target.value });
                    }}
                    name="zipcode"
                    value={zip || form.zipcode}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="country" className="form-label">
                    country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => {
                      setform({ ...form, country: e.target.value });
                    }}
                    name="country"
                    value={country || form.country}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="lat" className="form-label">
                    latitude
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      setform({ ...form, lat: e.target.value });
                    }}
                    name="lat"
                    value={lat || form.lat}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="long" className="form-label">
                    longitude
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    onChange={(e) => {
                      setform({ ...form, lng: e.target.value });
                    }}
                    name="long"
                    value={lng || form.lng}
                    onBlur={handleBlur}
                  />
                  {paid ? (
                    <>
                      <label htmlFor="cost" className="form-label">
                        cost
                      </label>
                      <input
                        type="number"
                        required
                        className="form-control"
                        onChange={(e) => {
                          setform({
                            ...form,
                            cost: e.target.value < 0 ? "0" : e.target.value,
                          });
                          console.log(form);
                        }}
                        name="long"
                        value={form.cost}
                        onBlur={handleBlur}
                      />
                    </>
                  ) : null}
                  <label htmlFor="sizeOfVenue" className="form-label">
                    sizeOfVenue
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    onChange={(e) => {
                      setform({
                        ...form,
                        sizeOfVenue: e.target.value < 0 ? "0" : e.target.value,
                      });
                    }}
                    name="sizeOfVenue"
                    value={form.sizeOfVenue}
                  />
                  {tags.map((itm, i) => {
                    return (
                      <div className="row mb-3 border mt-4 p-2 mx-0 w-[120%] rounded">
                        <h6>Tag</h6>
                        <div className="col-md-6 mb-3">
                          <label>Name Of Tag</label>
                          <input
                            type="text"
                            value={itm.name}
                            className="form-control"
                            onChange={(e) => {
                              updatetag(i, "name", e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="col-md-12 mb-3 text-right">
                          <i
                            className="fa fa-trash"
                            onClick={(e) => removetag(i)}
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                  <div>
                    <button
                      type="button"
                      className="btn btn-light light_white mt-3"
                      onClick={AddTag}
                    >
                      <i class="fa fa-plus mr-2" aria-hidden="true"></i>Add Tag
                    </button>
                  </div>

                  {/* Here we start uploading file function and setting there some conditions\ */}
                  <div className="my-4">
                    <label className="btn btn-primary ">
                      <input
                        type="file"
                        className="d-none"
                        required
                        disabled={Uploading1}
                        accept="image/*"
                        name="featuredImage"
                        multiple="multiple"
                        onChange={uploadImage}
                      />
                      {!Uploading1 ? " Upload Featured Image" : "Uploading..."}
                    </label>
                    {form?.featuredImage || id ? (
                      <>
                        <img
                          className="ml-3"
                          width={100}
                          height={100}
                          alt="Select Image"
                          src={`https://endpoint.crowdsavetheworld.com/${
                            eventdata.featuredImage || form.featuredImage
                          }`}
                        />
                        <svg
                          onClick={() => {
                            setform({ ...form, featuredImage: "" });
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi pointer bi-trash ml-3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="mb-2">
                    <label className="btn btn-primary ">
                      <input
                        type="file"
                        className="d-none "
                        required
                        accept="image/*"
                        disabled={Uploading2}
                        name="featuredImage"
                        multiple="multiple"
                        onChange={uploadImages}
                      />
                      {!Uploading2 ? "  Upload Image" : "Uploading..."}
                    </label>

                    {form?.images[0] || id ? (
                      <>
                        <img
                          width={100}
                          height={100}
                          className="ml-3"
                          src={`https://endpoint.crowdsavetheworld.com/${
                            eventdata.images || form.images[0]
                          }`}
                        />
                        <svg
                          onClick={() => {
                            setform({ ...form, images: [""] });
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash ml-3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="card-footer d-flex my-2 justify-content-between">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        history.push("/list/event");
                      }}
                    >
                      {/* On clcking cancel the user will redirected to the List/event Page */}

                      <span className="text-white">Cnacel</span>
                    </button>

                    {/* Disabling the button when yup is giving the error or errors are setted  */}
                    {id ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          if (id) {
                            ApiClient.put("/event", form).then((res) => {
                              console.log(res);
                              if (res.data.success) {
                                console.log(res);
                                history.push("/list/event");
                              }
                            });
                          }
                        }}
                      >
                        Update
                      </button>
                    ) : (
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    )}
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
