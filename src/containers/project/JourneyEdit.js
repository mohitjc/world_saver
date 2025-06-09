import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../../api-client';
import { useSelector } from 'react-redux';
import LocationSearchInput from '../../components/global/LocationSearchInput';
import { toast } from 'react-toastify';
function JourneyEdit() {
  const history = useNavigate();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [country, setcountry] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [form, setform] = useState({
    name: '',
    category: '',
    description: '',
    banner_image: '',
    image: '',
    identity: { id: user.id },
    address: '',
    location: [],
    lat: '',
    lng: '',
    identity: {},
  });
  const [Uploading1, setUploading1] = useState('');
  const [Uploading2, setUploading2] = useState('');
  const [Image, setImage] = useState('');
  const [Images, setImages] = useState('');
  const [myjrny, setmyjrny] = useState([]);
  useEffect(() => {
    let page = {
      count: 10,
      page: 1,
    };
    ApiClient.get(
      `https://endpoint.crowdsavetheworld.com/getUserProjects?id=${user.id}`
    ).then(
      (res) => {
        // setLoader(false);
        setmyjrny(res?.result?.data);
      },
      (err) => {
        // setLoader(false);
      }
    );
  }, []);

  useEffect(() => {
    const fltr = myjrny.filter((itm) => itm.id == id);

    setform({
      ...form,
      name: fltr[0]?.name,
      address: fltr[0]?.address,
      description: fltr[0]?.description,
      category: fltr[0]?.category,
      image: fltr[0]?.image,
      banner_image: fltr[0]?.banner_image,
      identity: { id: user?.id },
      lat: fltr[0]?.lat,
      lng: fltr[0]?.lng,
      location: [fltr[0]?.lat, fltr[0]?.lng],
    });
    setImage(fltr[0]?.image);
    setImages(fltr[0]?.banner_image);
  }, [myjrny]);

  const getAddressDetails = (value) => {
    let res = value?.result?.address_components;
    setform({
      ...form,
      address: value.address,
      lat: value?.latLng?.lat || '--',
      lng: value?.latLng?.lng || '--',
      location: [value?.latLng?.lat || '--', value?.latLng?.lng || '--'],
    });
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

    getState();
    getCity();
    getCountry();
    setcountry(getCountry());
    setcity(getCity());
    setstate(getState());
  };

  const uploadImage = (e) => {
    let files = e.target.files;
    let file = files.item(0);
    setUploading1(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      ApiClient.postForm_Data('/upload', reader.result, 'project').then(
        (res) => {
          if (res.success) {
            let image = res.data.imagePath;
            setImage(image);
            setform({ ...form, image: image });
          }
          setUploading1(false);
        }
      );
    };
  };

  const uploadImages = (e) => {
    let files = e.target.files;
    let file = files.item(0);
    setUploading2(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      ApiClient.postForm_Data('/upload', reader.result, 'project').then(
        (res) => {
          if (res.success) {
            let image = res.data.imagePath;
            setImages(image);

            setform({ ...form, banner_image: image });
          }
          setUploading2(false);
        }
      );
    };
  };

  const journey = [
    {
      id: '63a7a1db6c1cc3a21a06d953',
      name: 'Art & Music',
    },
    {
      id: '62ecbaaca6394a3ec34e5ca3',
      name: 'Environment',
    },
    {
      id: '63dd0ed5dfe9feb016719fad',
      name: 'Humanity',
    },
    {
      id: '62ecbac7a6394a3ec34e5ca5',
      name: 'Spiritual',
    },
    {
      id: '652d204c62182e2dbc8d8aa4',
      name: 'Trading',
    },
  ];

  const HanldeSubmit = (e) => {
    e.preventDefault();
    ApiClient.put(
      `https://endpoint.crowdsavetheworld.com/project?id=${id}`,
      form
    ).then((res) => {
      if (res.success) {
        toast.success(res?.message);
        history('/myjourney');
      }
    });
  };
  return (
    <div className="container mt-4">
      <div className="mt-2 shadow p-3">
        <h4>Edit Your Journey</h4>
        <form onSubmit={HanldeSubmit}>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            required
            type="text"
            name="title"
            value={form.name}
            className="form-control"
            onChange={(e) => {
              setform({ ...form, name: e.target.value });
            }}
          />
          <label htmlFor="title" className="form-label mt-3">
            Purpose Of Journey
          </label>
          <input
            required
            value={form.description}
            type="text"
            name="title"
            className="form-control"
            onChange={(e) => {
              setform({ ...form, description: e.target.value });
            }}
          />
          <label className="form-label">Journey</label>
          <select
            class="form-control"
            value={form.category}
            onChange={(e) => {
              setform({ ...form, category: e.target.value });
            }}
            aria-label="Default select example"
          >
            <option selected>Select Journey</option>
            {journey?.map((itm, key) => {
              return <option value={itm.id}>{itm.name}</option>;
            })}
          </select>
          <label htmlFor="title" className="form-label mt-3">
            Address
          </label>
          <LocationSearchInput
            getAddressDetails={getAddressDetails}
            value={form.address}
          />
          <div className="mb-2 mt-4">
            <label className="btn btn-primary ">
              <input
                type="file"
                disabled={Uploading1}
                className="d-none "
                accept="image/*"
                multiple="multiple"
                onChange={uploadImage}
              />
              {!Uploading1 ? '  Upload Journey Image' : 'Uploading...'}
            </label>
            {form?.image || id ? (
              <>
                {Image ? (
                  <img
                    width={100}
                    height={100}
                    className="ml-3"
                    src={`https://endpoint.crowdsavetheworld.com${form?.image}`}
                  />
                ) : null}
                {form?.image ? (
                  <svg
                    onClick={() => {
                      setform({ ...form, image: '' });
                      setImage('');
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
                ) : null}
              </>
            ) : (
              ''
            )}
          </div>
          <div className="mb-2 mt-4">
            <label className="btn btn-primary ">
              <input
                type="file"
                className="d-none "
                accept="image/*"
                multiple="multiple"
                onChange={uploadImages}
              />
              {!Uploading2 ? '  Upload Background Image' : 'Uploading...'}
            </label>
            {form?.banner_image || id ? (
              <>
                {Images ? (
                  <img
                    width={100}
                    height={100}
                    className="ml-3"
                    src={`https://endpoint.crowdsavetheworld.com/${form?.banner_image}`}
                  />
                ) : null}
                {form?.banner_image ? (
                  <svg
                    onClick={() => {
                      setform({ ...form, banner_image: '' });
                      setImages('');
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
                ) : null}
              </>
            ) : (
              ''
            )}
          </div>
          <div className="card-footer d-flex my-2 justify-content-between">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                history('/myjourney');
              }}
            >
              {/* On clcking cancel the user will redirected to the List/event Page */}

              <span className="text-white">Cancel</span>
            </button>

            {/* Disabling the button when yup is giving the error or errors are setted  */}

            <button className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
}

export default JourneyEdit;
