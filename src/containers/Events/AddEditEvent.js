import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../../api-client';
import LocationSearchInput from '../../components/global/LocationSearchInput';
import moment from 'moment';
import methodModel from '../../models/method.model';
import { toast } from 'react-toastify';

const AddEditEvent = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [form, setform] = useState({
    title: '',
    description: '',
    category_id: '',
    timetype: '',
    journey: '',
    images: [],
    featuredImage: '',
    startDate: '',
    endDate: '',
    groupName: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    lat: '',
    lng: '',
    cost: '',
    sizeOfVenue: '',
    location: {},
    eventType: '',
    cost: '',
    tags: [],
    time: '',
  });
  const [lat, setlat] = useState('');
  const [lng, setlng] = useState('');
  const [loc, setloc] = useState([]);
  const [zip, setzip] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [country, setcountry] = useState('');
  const [tags, settag] = useState([]);
  const [Uploading1, setUploading1] = useState(false);
  const [Uploading2, setUploading2] = useState(false);
  const [Image, setImage] = useState('');
  const [Images, setImages] = useState('');
  const [event, setevent] = useState([]);
  const [journey, setjourney] = useState([]);
  const navigate = useNavigate();
  const [myJourney, setMyJourney] = useState([]);
  useEffect(() => {
    ApiClient.get(
      'https://endpoint.crowdsavetheworld.com/allcategory?types=event&search=&page=1&count=100'
    ).then((res) => {
      setevent(res?.data?.category);
    });
    ApiClient.get(
      `https://endpoint.crowdsavetheworld.com/my/project?page=1&count=1000&sortBy=createdAt%20desc&user_id=${user?.id}`
    ).then((res) => {
      setjourney(res?.result);
    });
    if (id) getEventDetail();
  }, []);

  const getEventDetail = () => {
    ApiClient.get(`https://endpoint.crowdsavetheworld.com/event?id=${id}`).then(
      (res) => {
        if (res.success) {
          setform(res?.data);
          settag(res?.data?.tags);
        }
      }
    );
  };

  const getAddressDetails = (value) => {
    setlat(value.latLng.lat);
    setlng(value.latLng.lng);
    setloc(value);
    let res = value?.result?.address_components||[];

    const getCountry = () => {
      let value = '';
      res.map((item) => {
        if (item.types[0] == 'country') {
          value = item.long_name;
        }
      });
      return value;
    };
    const getCity = () => {
      let value = '';
      res.map((item) => {
        if (item.types[0] == 'locality') {
          value = item.long_name;
        }
      });
      return value;
    };
    const getState = () => {
      let value = '';
      res.map((item) => {
        if (item.types[0] == 'administrative_area_level_1') {
          value = item.long_name;
        }
      });
      return value;
    };
    const getPostalCode = () => {
      let value = '';
      res.map((item) => {
        if (item.types[0] == 'postal_code') {
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
        type: 'Point',
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

  const AddTag = () => {
    tags.push({
      name: '',
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

  const uploadImage = (e) => {
    let files = e.target.files;
    let file = files.item(0);
    if (file) {
      setUploading1(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        ApiClient.postForm_Data('/upload', reader.result, 'blogs').then(
          (res) => {
            console.log('uploadImage', res);
            if (res.success) {
              let image = res.data.imagePath;
              setImage(image);
              setform({ ...form, featuredImage: image });
            }
            setUploading1(false);
          }
        );
      };
    }
  };

  const uploadImages = (e) => {
    let files = e.target.files;
    let file = files.item(0);
    if (file) {
      setUploading2(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        ApiClient.postForm_Data('/upload', reader.result, 'blogs').then(
          (res) => {
            if (res.success) {
              let image = res.data.imagePath;
              setImages(image);
              setform({ ...form, images: [image] });
            }
            setUploading2(false);
          }
        );
      };
    }
  };

  const handleEvent = (e) => {
    e.preventDefault();
    if (!form?.address) {
      toast.error('Address is required');
      return;
    }
    let payload = {
      ...form,
      addedBy: user?.id,
    };
    delete payload?.location;
    if (!id) {
      ApiClient.post(
        `https://endpoint.crowdsavetheworld.com/event`,
        payload
      ).then((res) => {
        if (res.success) {
          navigate(`/events`);
        }
      });
    } else {
      payload = {
        ...payload,
        id: id,
      };
      ApiClient.put(
        `https://endpoint.crowdsavetheworld.com/event`,
        payload
      ).then((res) => {
        if (res.success) {
          navigate(`/events`);
        }
      });
    }
  };

  const GetUserJoruney = () => {
    ApiClient.get(
      `https://endpoint.crowdsavetheworld.com/journylist?user_id=${user?.id}`
    ).then((res) => {
      if (res.success) {
        console.log(res?.data, '---------------------');
        setMyJourney(res?.data);
      }
    });
  };
  useEffect(() => {
    GetUserJoruney();
  }, []);
  return (
    <>
      <div className="container">
        <h2 className="my-3">{id ? 'Edit' : 'Add'} Event</h2>
        <form onSubmit={handleEvent}>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label>
                Title <span className="text-danger">*</span>
              </label>
              <input
                src="text"
                value={form?.title}
                onChange={(e) => setform({ ...form, title: e.target.value })}
                className="form-control"
                placeholder="Title"
                required
              />
            </div>
            <div className="col-md-6 mb-2">
              <label>
                Description <span className="text-danger">*</span>
              </label>
              <input
                src="text"
                value={form?.description}
                onChange={(e) =>
                  setform({ ...form, description: e.target.value })
                }
                className="form-control"
                placeholder="Description"
                required
              />
            </div>
            <div className="col-md-6 mb-2">
              <label>
                Category <span className="text-danger">*</span>
              </label>
              <select
                class="form-select"
                value={form?.category_id}
                onChange={(e) =>
                  setform({ ...form, category_id: e.target.value })
                }
                aria-label="Default select example"
                required
              >
                <option value="">Select Category</option>
                {event &&
                  event.map((item) => {
                    return <option value={item?.id}>{item?.name}</option>;
                  })}
              </select>
            </div>
            <div className="col-md-6 mb-2">
              <label>
                Event Type <span className="text-danger">*</span>
              </label>
              <select
                class="form-select"
                value={form?.eventType}
                onChange={(e) =>
                  setform({ ...form, eventType: e.target.value })
                }
                aria-label="Default select example"
                required
              >
                <option value="">Select Event Type</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            {form?.eventType == 'paid' ? (
              <div className="col-md-6 mb-2">
                <label>
                  Cost <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={form?.cost}
                  onChange={(e) =>
                    setform({ ...form, cost: methodModel?.isNumber(e) })
                  }
                  maxLength="7"
                  className="form-control"
                  placeholder="Cost"
                  required
                />
              </div>
            ) : null}
            <div className="col-md-6 mb-2">
              <label>
                Journey <span className="text-danger">*</span>
              </label>
              <select
                class="form-select"
                value={form?.journey}
                onChange={(e) => setform({ ...form, journey: e.target.value })}
                aria-label="Default select example"
                required
              >
                <option value="">Select Journey</option>
                {journey &&
                  journey.map((item) => {
                    return <option value={item?.id}>{item?.name}</option>;
                  })}
              </select>
            </div>
            <div className="col-md-6 mb-2">
              <label>URl</label>
              <input
                type="text"
                value={form?.url}
                onChange={(e) => setform({ ...form, url: e.target.value })}
                className="form-control"
                placeholder="URL"
              />
            </div>
            <div className="col-md-6 mb-2">
              <label>
                Start Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                value={moment(form?.startDate).format('YYYY-MM-DD')}
                onChange={(e) =>
                  setform({ ...form, startDate: e.target.value })
                }
                min={new Date()}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-2">
              <label>
                End Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                value={moment(form?.endDate).format('YYYY-MM-DD')}
                onChange={(e) => setform({ ...form, endDate: e.target.value })}
                min={form?.startDate || new Date()}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-2">
              <label>
                Select Time <span className="text-danger">*</span>
              </label>
              <input
                type="time"
                value={form?.time}
                onChange={(e) => setform({ ...form, time: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-2">
              <label>
                Time <span className="text-danger">*</span>
              </label>
              <select
                class="form-select"
                value={form?.timetype}
                onChange={(e) => setform({ ...form, timetype: e.target.value })}
                aria-label="Default select example"
                required
              >
                <option value="">Select Time</option>
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>
            {/* <div className="col-md-6 mb-2">
                            <label>Journey Name</label>
                            <select class="form-select" value={form?.groupName} onChange={e => setform({ ...form, groupName: e.target.value })} aria-label="Default select example" required>
                                <option value=''>Select Journey</option>
                                {
                                    myJourney?.map((itm) => {
                                        return (

                                            <option value={itm?.name}>{itm?.name}</option>
                                        )
                                    })
                                }

                            </select>                        </div> */}
            <div className="col-md-12 mb-2">
              <label>
                Address <span className="text-danger">*</span>
              </label>
              <LocationSearchInput
                getAddressDetails={getAddressDetails}
                value={form?.address}
              />
            </div>
            <div className="col-md-6 mb-2">
              <label>City</label>
              <input
                type="text"
                value={city || form?.city}
                onChange={(e) => setform({ ...form, city: e.target.value })}
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="col-md-6 mb-2">
              <label>State</label>
              <input
                type="text"
                value={state || form?.state}
                onChange={(e) => setform({ ...form, state: e.target.value })}
                className="form-control"
                placeholder="State"
              />
            </div>
            <div className="col-md-6 mb-2">
              <label>Zip Code</label>
              <input
                type="number"
                value={zip || form?.zipcode}
                onChange={(e) => setform({ ...form, zipcode: e.target.value })}
                className="form-control"
                placeholder="Zip Code"
              />
            </div>
            <div className="col-md-6 mb-2">
              <label>Country</label>
              <input
                type="text"
                value={country || form?.country}
                onChange={(e) => setform({ ...form, country: e.target.value })}
                className="form-control"
                placeholder="Country"
              />
            </div>
            {/* <div className="col-md-6 mb-2">
              <label>Latitude</label>
              <input
                type="number"
                value={lat || form?.lat}
                onChange={(e) => setform({ ...form, lat: e.target.value })}
                className="form-control"
                placeholder="Latitude"
              />
            </div>
            <div className="col-md-6 mb-2">
              <label>Longitude</label>
              <input
                type="number"
                value={lng || form?.lng}
                onChange={(e) => setform({ ...form, lng: e.target.value })}
                className="form-control"
                placeholder="Longitude"
              />
            </div> */}
            <div className="col-md-6 mb-2">
              <label>
                Size of Venue <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                value={form?.sizeOfVenue}
                onChange={(e) =>
                  setform({ ...form, sizeOfVenue: e.target.value })
                }
                className="form-control"
                placeholder="Size of Venue"
                required
              />
            </div>

            {/* Tags */}
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
                        updatetag(i, 'name', e.target.value);
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
            <div className="col-md-12 mb-2">
              <button
                type="button"
                className="btn btn-light light_white mt-3"
                onClick={AddTag}
              >
                <i class="fa fa-plus mr-2" aria-hidden="true"></i>Add Tag
              </button>
            </div>

            {/* Featured Images */}
            <div className="col-md-6 mb-2">
              <div className="my-4">
                <label className="btn btn-primary ">
                  <input
                    type="file"
                    className="d-none"
                    disabled={Uploading1}
                    accept="image/*"
                    name="featuredImage"
                    // multiple="multiple"
                    onChange={uploadImage}
                  />
                  {!Uploading1 ? ' Upload Featured Image' : 'Uploading...'}
                </label>
                {form?.featuredImage || id ? (
                  <>
                    <img
                      src={`https://endpoint.crowdsavetheworld.com/${form?.featuredImage}`}
                      className="ml-3"
                      width={100}
                      height={100}
                      alt="Select Image"
                    />
                    <svg
                      onClick={() => {
                        setform({ ...form, featuredImage: '' });
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
                  ''
                )}
              </div>
            </div>
            {/* Upload Image */}
            <div className="col-md-6 mb-2">
              <label className="btn btn-primary ">
                <input
                  type="file"
                  className="d-none"
                  accept="image/*"
                  disabled={Uploading2}
                  name="featuredImage"
                  onChange={uploadImages}
                />
                {!Uploading2 ? 'Upload Image' : 'Uploading...'}
              </label>

              {form?.images?.[0] || id ? (
                <>
                  <img
                    src={`https://endpoint.crowdsavetheworld.com/${form.images?.[0]}`}
                    width={100}
                    height={100}
                    className="ml-3"
                  />
                  <svg
                    onClick={() => {
                      setform({ ...form, images: [''] });
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
                ''
              )}
            </div>
            <div className="col-md-12 mb-2 text-right">
              <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={(e) => {
                  navigate(-1);
                }}
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary ml-2">
                {id ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEditEvent;
