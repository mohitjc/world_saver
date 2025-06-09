import React, { useState, useRef, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
// import { history } from '../main/history';
import { useNavigate } from 'react-router-dom';
import { allNormalCategories } from '../actions/category';
import { createProject, updateProject } from '../actions/project';
import { imageUpload } from '../actions/common';
import { is_loading } from '../actions/category';
import { uploadCoverImage } from '../actions/user';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { apiUrl } from '../environment';
import ApiClient from '../api-client';

const ProjectModal = (props) => {
  const history = useNavigate();
  const [step, setStep] = useState(1);
  const [isImgUploading, setImgUploading] = useState(false);
  const [isCoverImgUploading, setImgCoverUploading] = useState(false);

  const [category, setCategory] = useState('');
  const [projectName, setName] = useState('');
  const [location, setLocation] = useState({});
  const [placeId, setPlaceId] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');

  const [bannerImage, setBannerImage] = useState('');
  const [journeyCheck, setJourneyCheck] = useState(false);
  const coverImageInput = useRef(null);
  const [option, setOptions] = useState([
    { value: 'null', label: 'My Journeys' },
  ]);
  const dispatch = useDispatch();

  const handleAddressSelect = (address) => {
    setAddress(address);

    geocodeByAddress(address)
      .then((results) => {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        getLatLng(results[0])
          .then((latLng) => {
            setLocation([lng, lat]);
          })
          .catch((error) => console.error('Error', error));
        setPlaceId(results[0].place_id);
      })
      .catch((error) => console.error('Error', error));
  };

  const upload = (file, name) => {
    // const token = props.user.access_token
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImgUploading(true);
      props.imageUpload({ type: 'project', data: reader.result }, (res) => {
        if (res.success) {
          setImgUploading(false);
          if (name === 'img') {
            setImage(res.data.imagePath);
          } else if (name === 'banner') {
            setBannerImage(res.data.imagePath);
          }
        }
      });
    };
  };

  const uploadCoverImage = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImgCoverUploading(true);
      props.imageUpload({ type: 'project', data: reader.result }, (res) => {
        if (res.success) {
          setImgCoverUploading(false);

          if (name === 'img') {
            setImage(res.data.imagePath);
          } else if (name === 'banner') {
            setBannerImage(res.data.imagePath);
          }
        }
      });
    };
  };

  const handleSubmit = () => {
    const token122 = localStorage.getItem('headertoken');

    //console.log(location, "dfd");

    let params = {
      name: projectName,
      category: category,
      placeId: placeId,
      description: description,
      image: image,
      banner_image: bannerImage,
      identity: { id: props.user.id },
      address: address,
    };

    if (location.length > 0) {
      params.lat = location[0].toFixed(4);
      params.lng = location[1].toFixed(4);
      params.location = location;
    }

    props.createProject(params, token122, (res) => {
      localStorage.setItem('projectId', res.data.id);
      if (res.success) {
        props.close(false);
        join();
      }
    });
  };

  const join = () => {
    const projectId = localStorage.getItem('projectId');
    // const getUrl = `${apiUrl}/joinProject`;
    ApiClient.post(
      `${apiUrl}/joinProject`,
      { user_id: userId, project_id: projectId },
      `Bearer ${props.user.access_token}`
    ).then((result) => {
      if (result.success) {
        history(`/journeyList`);
        headerJourneyList();
      }
      dispatch(is_loading(false));
    });
  };

  const headerJourneyList = () => {
    let el = document.getElementById('getJourney');
    if (el) el.click();
  };

  const getData = () => {
    const token31 = localStorage.getItem('userID');
    // const getUrl = params.id ? `${apiUrl}/user/${userId}` : `${apiUrl}/user`;
    if (token31) {
      ApiClient.get(
        `${apiUrl}/getUserProjects`,
        { id: props.user.id },
        `Bearer ${props.user.access_token}`
      )
        .then((result) => {
          if (result.success) {
          } else {
            const errMsg =
              result.error && result.error.message
                ? result.error.message
                : 'Something went wrong. Kindly try again later !!!';
          }
          dispatch(is_loading(false));
        })
        .catch((error) => {
          const errorMessage =
            error.response &&
            error.response.data &&
            error.response.data.error_description
              ? error.response.data.error_description
              : 'Something went wrong!';
          if (error) {
          }
        });
    }
  };

  let userId = props.user.id;

  useEffect(() => {
    getData();
    headerJourneyList();
    props.allNormalCategories();
    setStep(1);
  }, [props.modal]);
  return (
    <div>
      {props.modal ? (
        <div className="modal d-block bg">
          <div className="modal-dialog">
            <div className="modal-content journy">
              <div className="modal-header bg1 align-items-center">
                <h5 className="modal-title text-white" id="exampleModalLabel">
                  Start a Journey
                </h5>
                <button
                  type="button"
                  className="close ic1"
                  title="Close"
                  onClick={() => props.close(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul className="steps">
                  <li className={step === 1 ? 'active' : ''}></li>
                  <li className={step === 2 ? 'active' : ''}></li>
                  <li className={step === 3 ? 'active' : ''}></li>
                  <li className={step === 4 ? 'active' : ''}></li>
                </ul>

                <div className={step === 1 ? 'form-row' : 'd-none'}>
                  <div className="col-md-12 mb-3">
                    <h3 className="text-center mb-3">
                      Thank you for taking this journey to Save the World
                    </h3>

                    <label>
                      Give your Journey a Name (example save the tigers)
                    </label>

                    <input
                      type="text"
                      placeholder="Journey Name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label>Journey Category</label>
                    <select
                      className="form-control"
                      required
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Journey Category</option>
                      {props.data.length &&
                        props.data.map((obj, i) => {
                          if (obj.category == 'project') {
                            return (
                              <option key={i} value={obj.id}>
                                {obj.name}
                              </option>
                            );
                          }
                        })}
                    </select>
                  </div>

                  <div className="col-md-12 text-right">
                    {projectName === '' || category === '' ? (
                      <button
                        className="btn btn-primary bg"
                        onClick={() => setStep(2)}
                        disabled
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary bg"
                        onClick={() => setStep(2)}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>

                <div className={step === 2 ? 'form-row' : 'd-none'}>
                  <div className="col-md-12 mb-3">
                    <h3 className="text-center mb-3">
                      Describe the purpose of your Journey
                    </h3>

                    <textarea
                      className="form-control"
                      required
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>

                  <div className="col-md-12 d-flex justify-content-between">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setStep(1)}
                    >
                      Prev
                    </button>
                    {description === '' ? (
                      <button
                        className="btn btn-primary bg"
                        onClick={() => setStep(3)}
                        disabled
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary bg"
                        onClick={() => setStep(3)}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>

                <div className={step === 3 ? 'form-row' : 'd-none'}>
                  <div className="col-md-12 mb-3">
                    <h3 className="text-center mb-3">
                      Where is your Journey located or based?
                    </h3>
                    {/* <input type="text" className="form-control" placeholder="City, Country" /> */}
                    {!journeyCheck && (
                      <PlacesAutocomplete
                        name="address"
                        required
                        autoComplete="nope"
                        value={address}
                        onChange={(address) => {
                          setAddress(address);
                        }}
                        onSelect={(address) => {
                          handleAddressSelect(address);
                        }}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <div className="form-group">
                            <input
                              // className={`location-search-input form-control form-control-user ${touched.address && errors.address ? 'is-invalid' : ''}`}
                              {...getInputProps({
                                required: 'required',
                                placeholder: 'Enter address',
                                name: 'address',
                                autoComplete: 'nope',
                                className: 'input-filed w-100',
                                autoComplete: 'off',
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item';
                                const style = suggestion.active
                                  ? {
                                      backgroundColor: '#fafafa',
                                      cursor: 'pointer',
                                    }
                                  : {
                                      backgroundColor: '#ffffff',
                                      cursor: 'pointer',
                                    };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                    )}
                  </div>

                  <div className="col-md-12 mb-3">
                    <input
                      type="checkbox"
                      onClick={() =>
                        journeyCheck
                          ? setJourneyCheck(false)
                          : setJourneyCheck(true)
                      }
                    />{' '}
                    Check this box if your Journey is an online Journey only
                    (your Journey will not be added to map)
                  </div>

                  <div className="col-md-12 d-flex justify-content-between">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setStep(2)}
                    >
                      Prev
                    </button>
                    <button
                      className="btn btn-primary bg"
                      onClick={() => setStep(4)}
                    >
                      Next
                    </button>
                  </div>
                </div>

                <div className={step === 4 ? 'form-row' : 'd-none'}>
                  <div className="col-md-12 mb-3">
                    <h3 className="text-center mb-3">
                      Add photos for your Journey page
                    </h3>
                    <p className="lableFont">Maximum Upload file size:10MB</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    {isImgUploading ? (
                      <div className="font-weight-bold">uploading...</div>
                    ) : (
                      <label>Journey Image</label>
                    )}
                    <br />
                    <div className="btn btn-primary upload-input mb-3">
                      <input
                        accept=".png, .jpg, .jpeg"
                        type="file"
                        onChange={(e) => upload(e.target.files[0], 'img')}
                      />
                      Upload Image
                    </div>

                    <br />

                    <div className="up-image">
                      <img
                        src={image ? apiUrl + image : '/assets/img/banner.jpg'}
                      />
                      {/* <img src={coverImage ? apiUrl + '/images/user_cover/thumbnail/200/' + coverImage : '/assets/img/banner.jpg'} className="cover-img mb-3" onClick={() => coverImageInput.current.click()} /> */}
                      {/* <a className="crose"><i className="fa fa-times"></i></a> */}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    {isCoverImgUploading ? (
                      <div className="font-weight-bold">uploading...</div>
                    ) : (
                      <label>Page Background Image</label>
                    )}
                    <br />
                    <div className="btn btn-primary upload-input mb-3">
                      <input
                        // accept=".png, .jpg, .jpeg"
                        // className="d-none"
                        accept="image/*"
                        ref={coverImageInput}
                        type="file"
                        onChange={(e) =>
                          uploadCoverImage(e.target.files[0], 'banner')
                        }

                        // onChange={uploadCoverImage}
                      />
                      Upload Image
                    </div>

                    <br />

                    <div className="up-image">
                      <img
                        src={
                          bannerImage
                            ? apiUrl + bannerImage
                            : '/assets/img/banner.jpg'
                        }
                      />

                      {/* <img className="cover-img mb-3" onClick={() => coverImageInput.current.click()} /> */}
                      {/* <a className="crose"><i className="fa fa-times"></i></a> */}
                    </div>
                  </div>

                  <div className="col-md-12 d-flex justify-content-between">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setStep(3)}
                    >
                      Prev
                    </button>
                    <button
                      type=""
                      className="btn btn-primary bg"
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

// export default ProjectModal;

const mapStateToProps = (state) => ({
  data: state.category,
  user: state.user,
});

export default connect(mapStateToProps, {
  allNormalCategories,
  createProject,
  updateProject,
  imageUpload,
  uploadCoverImage,
})(ProjectModal);
