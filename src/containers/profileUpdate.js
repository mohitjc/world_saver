import React, { useState, useRef, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl } from '../environment';
import { imageUpload } from '../actions/common';
import {
  updateprofile,
  uploadCoverImage,
  updateProject,
} from '../actions/user';
import SimpleReactValidator from 'simple-react-validator';
import 'react-datepicker/dist/react-datepicker.css';
import { is_loading } from '../actions/category';
import { Card, Row, Col, FormGroup, InputGroup } from 'reactstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { maxDate, minDate } from './../components/common/DateManipulation';
import './profileUpdate.scss';
import Loader from '../components/Loader';
import load from '../components/loaderMethod';
// import { history } from '../main/history';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = (props) => {
  const history = useNavigate();
  const [image, setImage] = useState(props.user.image);
  const [coverImage, setCoverImage] = useState(props.user.coverImage);
  const [isImgUploading, setImgUploading] = useState(false);
  const [isCoverImgUploading, setImgCoverUploading] = useState(false);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [email, setEmail] = useState(props.user.email);
  const [gender, setGender] = useState(props.user.gender);
  const [allowPostingAndComment, setAllowPostingAndComment] = useState(
    props.user.allowPostingAndComment || 'everyone'
  );

  const [allowCommentOnWall, setAllowCommentOnWall] = useState(
    props.user.allowCommentOnWall || 'everyone'
  );

  const [showProfileOnWorldServer, setShowProfileOnWorldServer] = useState(
    props.user.showProfileOnWorldServer
  );

  const [showEmail, setShowEmail] = useState(props.user.showEmail);

  const [showFirstName, setShowFirstName] = useState(props.user.showFirstName);

  const [showLastName, setShowLastName] = useState(props.user.showLastName);

  const [showDOB, setShowDOB] = useState(props.user.showDOB);

  let pdob = '';
  if (props.user.date_of_birth) pdob = new Date(props.user.date_of_birth);

  const [dob, setDob] = useState(pdob);

  const [country, selectCountry] = useState(props.user.country);

  const [region, selectRegion] = useState(props.user.state);

  const [city, setcity] = useState(props.user.city);
  const [state, setState] = useState(true);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [option, setOptions] = useState([
    { value: 'null', label: 'My Journeys' },
  ]);

  const dispatch = useDispatch();

  const inputFile = useRef(null);
  const coverImageInput = useRef(null);

  const [isloader, setLoader] = useState(false);
  let userId = props.user.id;

  const handleDateChange = (date) => {
    setDob(date);
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
          setImage(res.data.imagePath);

          props.updateProject(
            { image: res.data.imagePath },
            props.user.access_token
          );
        } else {
        }
      });
    };
  };

  const uploadCoverImage = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgCoverUploading(true);
      const onSuccess = (res) => {
        // console.log('Result: ', res);
        setImgCoverUploading(false);
        setCoverImage(res.data.updatedUser[0].coverImage);
        props.updateProject(
          { coverImage: res.data.coverImage },
          props.user.access_token
        );
      };
      const onError = (err) => {
        setImgCoverUploading(false);
      };
      // console.log('base 64:', reader.result);
      props.uploadCoverImage(
        { data: reader.result },
        props.user.access_token,
        onSuccess,
        onError
      );
    };
    reader.onerror = function (error) {
      // console.log('Error: ', error);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateProfilePayload = {
      image: image,
      firstName: firstName,
      lastName: lastName,
      date_of_birth: dob,
      email: email,
      country: country,
      state: region,
      city: city,
      gender: gender,
      image: image,
      allowPostingAndComment,
      allowCommentOnWall,
      showProfileOnWorldServer,
      showEmail,
      showFirstName,
      showLastName,
      showDOB,
    };

    if (simpleValidator.current.allValid()) {
      setLoader(true);
      load(true);
      props.updateprofile(
        updateProfilePayload,
        props.user.access_token,
        (res) => {
          if (res.success) {
            setLoader(false);
            toast?.success('Saved Sucessfully');
          }
          load(false);
        }
      );
    } else {
      simpleValidator.current.showMessages();
      setState(!state);
    }
  };
  is_loading(false);

  return (
    <>
      <div
        className="page--header pt--60 pb--60 text-center"
        data-bg-img="img/preview-img/banner-bg.jpg"
        data-overlay="0.85"
      >
        <div className="container">
          <div className="title">
            <h2 className="h1 text-white">View/Update Profile</h2>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="col-md-12 px-0">
          <Card className="login-box-shadow border-0">
            <form>
              <Row className="form-row">
                <div className="col-md-6 mb-3">
                  <div className="text-center">
                    <img
                      src={image ? apiUrl + image : '/assets/img/banner.jpg'}
                      className="profile-img mb-3"
                      onClick={() => inputFile.current.click()}
                    />
                    <div>
                      <div>
                        {isImgUploading ? (
                          <div className="font-weight-bold">uploading...</div>
                        ) : (
                          <label className="btn btn-primary mb-3 w-auto">
                            <input
                              ref={inputFile}
                              type="file"
                              className="d-none"
                              accept="image/*"
                              onChange={(e) => upload(e.target.files[0], 'img')}
                            />
                            Upload Image
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3 position-relative">
                  <div className="text-center tainer">
                    <img
                      src={
                        coverImage
                          ? apiUrl +
                            '/images/user_cover/thumbnail/200/' +
                            coverImage
                          : '/assets/img/banner.jpg'
                      }
                      className="profile-img mb-3"
                      onClick={() => coverImageInput.current.click()}
                    />
                  </div>
                  <div className="d-flex  justify-content-center gap-4">
                    <div className="flex-shrink-0">
                      {isCoverImgUploading ? (
                        <div className="font-weight-bold">uploading...</div>
                      ) : (
                        <label className="btn btn-primary mb-3 w-auto custom-btn">
                          <input
                            ref={coverImageInput}
                            type="file"
                            className="d-none"
                            accept="image/*"
                            onChange={(e) =>
                              uploadCoverImage(e.target.files[0])
                            }
                          />
                          Upload Cover Image
                        </label>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      history('/deleteaccount');
                    }}
                    className="profile-settings"
                    title="Delete Account"
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
                <Col md={6}>
                  <label>
                    First Name<sapn className="redstar">*</sapn>
                  </label>
                  <input
                    className="form-group-text"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {simpleValidator.current.message(
                    'firstName',
                    firstName,
                    'required'
                  )}
                </Col>
                <Col md={6}>
                  <label>
                    Last Name<sapn className="redstar">*</sapn>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="form-group-text"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {simpleValidator.current.message(
                    'lastName',
                    lastName,
                    'required'
                  )}
                </Col>
                <Col md={6}>
                  <label>Gender</label>
                  <select
                    className="form-group-text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </Col>
                <Col md={6}>
                  <label>DOB</label>
                  <DatePicker
                    selected={dob}
                    onChange={handleDateChange}
                    className="form-group-text"
                    placeholderText="Birthday"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={maxDate()}
                    minDate={minDate()}
                  />
                </Col>

                <Col md={12}>
                  <label>
                    Email<sapn className="redstar">*</sapn>
                  </label>
                  <input
                    type="text"
                    value={email}
                    className="form-group-text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {simpleValidator.current.message(
                    'email',
                    email,
                    'required|email'
                  )}
                </Col>

                <Col md={4}>
                  <label>Country</label>
                  <CountryDropdown
                    defaultOptionLabel="Country"
                    value={country}
                    onChange={selectCountry}
                    className="form-group-text"
                    priorityOptions={['US', 'CA', 'IN', 'GB']}
                  />
                </Col>

                <Col md={4}>
                  <FormGroup className="mb-3">
                    <label>State</label>
                    <InputGroup className="input-group-alternative">
                      <RegionDropdown
                        blankOptionLabel="State (No country is selected)"
                        defaultOptionLabel="Select your state"
                        country={country}
                        value={region}
                        onChange={selectRegion}
                        className="form-group-text"
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <label>City</label>

                  <input
                    type="text"
                    className="form-group-text"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                    options={props.user.city}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12} className="custom-form">
                  <h5>Privacy Settings</h5>
                </Col>
                <Row className="privacy-profile-form">
                  <Col md={12}>
                    <h6>Personal Information</h6>
                  </Col>
                  <Col md={2} className="custom-form">
                    <input
                      type="checkbox"
                      className="Emailcheck"
                      placeholder="city"
                      checked={showEmail}
                      onChange={(e) => {
                        setShowEmail(!showEmail);
                      }}
                    />
                    <label>Show Email</label>
                  </Col>
                  <Col md={2} className="custom-form">
                    <input
                      type="checkbox"
                      className="Emailcheck"
                      // placeholder="city"
                      checked={showFirstName}
                      onChange={(e) => {
                        setShowFirstName(!showFirstName);
                      }}
                    />
                    <label>Show First Name</label>
                  </Col>
                  <Col md={2} className="custom-form">
                    <input
                      type="checkbox"
                      className="Emailcheck"
                      placeholder="city"
                      checked={showLastName}
                      onChange={(e) => {
                        setShowLastName(!showLastName);
                      }}
                    />
                    <label>Show Last Name</label>
                  </Col>
                  <Col md={2} className="custom-form">
                    <input
                      type="checkbox"
                      className="Emailcheck"
                      placeholder="city"
                      checked={showDOB}
                      disabled
                      onChange={(e) => {
                        setShowDOB(!showDOB);
                      }}
                    />
                    <label>Show DOB</label>
                  </Col>

                  <Col md={12}>
                    <h6 style={{ marginTop: '10px' }}>Profile Page</h6>
                    <p className="sub-heading">
                      {' '}
                      Your Wall Postings and comments
                    </p>
                  </Col>
                  <div></div>
                  <Col md={2} className="custom-form">
                    <input
                      type="checkbox"
                      className="Emailcheck"
                      placeholder="city"
                      checked={allowPostingAndComment === 'everyone'}
                      value={'everyone'}
                      onChange={(e) => {
                        setAllowPostingAndComment(e.target.value);
                      }}
                    />
                    <label>Everyone</label>
                  </Col>
                  <Col md={2} className="custom-form">
                    <input
                      type="checkbox"
                      className="Emailcheck"
                      placeholder="city"
                      checked={allowPostingAndComment === 'friends'}
                      value={'friends'}
                      onChange={(e) => {
                        setAllowPostingAndComment(e.target.value);
                      }}
                    />
                    <label>Friends</label>
                  </Col>
                  <Col md={2} className="custom-form">
                    <input
                      type="checkbox"
                      className="Emailcheck"
                      placeholder="city"
                      value={'onlyMeAllow'}
                      checked={allowPostingAndComment === 'onlyMeAllow'}
                      onChange={(e) => {
                        setAllowPostingAndComment(e.target.value);
                      }}
                    />
                    <label>Only Me</label>
                  </Col>

                  <Col md={12}>
                    <p className="sub-heading"> Comments on my wall from</p>
                  </Col>
                  <Col md={2} className="custom-form">
                    <input
                      type="checkbox"
                      className="Emailcheck"
                      placeholder="city"
                      value={'everyone'}
                      checked={allowCommentOnWall === 'everyone'}
                      onChange={(e) => {
                        setAllowCommentOnWall(e.target.value);
                      }}
                    />
                    <label>Everyone</label>
                  </Col>
                  <Col md={2} className="custom-form">
                    <input
                      type="checkbox"
                      className="Emailcheck"
                      placeholder="city"
                      value={'friends'}
                      checked={allowCommentOnWall === 'friends'}
                      onChange={(e) => {
                        setAllowCommentOnWall(e.target.value);
                      }}
                    />
                    <label>Friends</label>
                  </Col>
                  <Col md={2} className="custom-form">
                    <input
                      type="checkbox"
                      className="Emailcheck"
                      placeholder="city"
                      value={'onlyMeAllow'}
                      checked={allowCommentOnWall === 'onlyMeAllow'}
                      onChange={(e) => {
                        setAllowCommentOnWall(e.target.value);
                      }}
                    />
                    <label>Only Me</label>
                  </Col>

                  <Col md={12}>
                    <h6 style={{ marginTop: '10px' }}>Search Results</h6>
                  </Col>
                  <Col md={4} className="custom-form">
                    <input
                      type="checkbox"
                      className="Emailcheck"
                      placeholder="city"
                      checked={showProfileOnWorldServer}
                      onChange={(e) => {
                        setShowProfileOnWorldServer(true);
                      }}
                    />
                    <label>Show profile in world saver search results.</label>
                  </Col>
                  <Col md={4} className="custom-form">
                    <input
                      type="checkbox"
                      className="Emailcheck"
                      checked={!showProfileOnWorldServer}
                      value={'false'}
                      onChange={(e) => {
                        setShowProfileOnWorldServer(false);
                      }}
                    />
                    <label>
                      Hide profile from world savers search results.
                    </label>
                  </Col>
                </Row>
              </Row>
              <Row>
                <div className="text-right col-md-12">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </Row>
            </form>
          </Card>
        </div>
      </div>
      {isloader ? <Loader /> : <></>}
    </>
  );
};

// export default ProjectModal;
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  imageUpload,
  updateprofile,
  uploadCoverImage,
  updateProject,
})(ProfileUpdate);
