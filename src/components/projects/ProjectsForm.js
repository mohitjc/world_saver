import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import Yup, {
  object as yupObject,
  string as yupString,
  number as yupNumber
} from 'yup';
import swal from 'sweetalert';

import {
  skillAdd,
  skillUpdate,
  singleSkill,
  resetAddSkill,
  resetUpdateSkill,
  skills
} from '../../store/actions/skillsActions';
import ImageUpload from '../global/ImageUpload';
import LocationSearchInput from '../global/LocationSearchInput';
import BannerImageUpload from '../global/BannerImageUpload';
import { countryList } from '../../store/constants';
import ApiClient from '../apiClient';

const ProjectForm = ({
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
  skills,
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  skillId,
  singleSkill,
  singleSkillData,
  resetAddSkill,
  resetUpdateSkill,
  setFieldValue,
  catByTypeData
}) => {
  const token = localStorage.getItem('token');

console.log(values,"hello");
  useEffect(() => {
    if (isSuccess) {
      swal('New Project added!', '', 'success');
      handleFormVisibilty();
      resetAddSkill();
      setReloadToggle(!reloadToggle);
    }
    if (isError) {
      swal(data && data.data && data.data.message, '', 'warning');
      resetUpdateSkill();
    }
    if (isUpdateSuccess) {
      swal('Project updated!', '', 'success');
      handleFormVisibilty();
      resetUpdateSkill();
      setReloadToggle(!reloadToggle);
    }
  }, [
    isSuccess,
    isError,
    isUpdateSuccess,
    handleFormVisibilty,
    resetAddSkill,
    setReloadToggle,
    reloadToggle,
    data,
    resetUpdateSkill
  ]);

  useEffect(() => {
    getCategory()
    if (!isAddForm) {
      singleSkill(skillId, token);
      // swal('New user added!', '', 'success');
    }
  }, [isAddForm, singleSkill, skillId, token]);

  // console.log('data', data);

  const [imageType, setImageType] = useState(null);
  const [category, setCategory] = useState();

  const getImage = value => {
    console.log('getImage', value);
    if (imageType === 'Add banner') {
      setFieldValue('banner_image', value);
    }
    if (imageType === 'Add Project image') {
      setFieldValue('image', value);
    }
  };

  const getAddressDetails = value => {
    // console.log('address', value.latLng);
    setFieldValue('address', value.address);
    setFieldValue('lat', value.latLng.lat);
    setFieldValue('lng', value.latLng.lng);
    console.log("=================>",value)
  };

  const getCategory=()=>{
    ApiClient.get('/allcategory',{page:1,count:500}).then(res=>{
      if(res.data.success){
        setCategory(res.data.data.category)
      }
    })
  }

  return (
    <div className="">
      <button className="btn btn-primary mb-3" onClick={handleFormVisibilty}>
        View Projects
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? 'Add' : 'Edit'} Projects</h4>
          </div>
          <div className="card-body">
            <div className="d-flex">
              <ImageUpload
                imageType={imageType}
                getImage={getImage}
                type="projects"
                value={values.image}
                placeholder="Add Project image"
                setImageType={setImageType}
              />
              <div className="ml-4">
                <ImageUpload
                  imageType={imageType}
                  getImage={getImage}
                  value={values.banner_image}
                  type="projects"
                  placeholder="Add banner"
                  setImageType={setImageType}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4 col-12">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  // value="john"

                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="form-group col-md-4 col-12">
                <label>Category</label>
                <select
                  name="category"
                  className="form-control"
                  value={values.category}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option>Select category</option>
                  {category &&
                    category.map(item => {
                      if(item.category=='project'){
                       return <option value={item.id}>{item.name}</option>
                      }
                      
                    })}

                  {/* {allTypes &&
                    allTypes.result.map(item => (
                      <option value={item.id}>{item.name}</option>
                    ))} */}
                </select>
                {errors.category && touched.category && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    Please select type
                  </div>
                )}
              </div>
              <div className="form-group col-md-8 col-12">
                <label>Description</label>
                <textarea
                  className="form-control fit-height"
                  name="description"
                  rows="4"
                  cols="50"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.description && touched.description && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.description}
                  </div>
                )}
              </div>
              <div className="form-group col-md-8 col-12">
                <label>Address</label>
                <LocationSearchInput
                  getAddressDetails={getAddressDetails}
                  value={values.address}
                />
                {errors.address && touched.address && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.address}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4 col-12">
                <label>Country</label>
                <select
                  name="country"
                  className="form-control"
                  value={values.country}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option>Select country</option>
                  {countryList.map(item => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {errors.country && touched.country && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.country}
                  </div>
                )}
              </div>
              <div className="form-group col-md-4 col-12">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  // value="john"

                  value={values.city}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.city && touched.city && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.city}
                  </div>
                )}
              </div>
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

const ProjectFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singleSkillData }) => {
    console.log('singleSkillData', singleSkillData);
    return {
      name: (singleSkillData && singleSkillData.name) || '',
      description: (singleSkillData && singleSkillData.description) || '',
      category: (singleSkillData && singleSkillData.category) || '',
      image: (singleSkillData && singleSkillData.image) || '',
      banner_image: (singleSkillData && singleSkillData.banner_image) || '',
      address: (singleSkillData && singleSkillData.address) || '',
      lat: (singleSkillData && singleSkillData.lat) || '',
      lng: (singleSkillData && singleSkillData.lat) || '',
      city: (singleSkillData && singleSkillData.city) || '',
      country: (singleSkillData && singleSkillData.country) || ''
    };
  },

  validationSchema: yupObject().shape({
    name: yupString()
      .max(50)
      .required(),
    description: yupString().required(),
    category: yupString().required(),
    address: yupString().required(),
    city: yupString().required(),
    country: yupString().required()
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // const { router } = props;
    const token = localStorage.getItem('token');
    console.log('state values', values);
    if (props.isAddForm) {
      props.skillAdd(
        {
          name: values.name,
          description: values.description,
          category: values.category,
          address: values.address,
          city: values.city,
          country: values.country,
          lat: values.lat,
          lng: values.lng,
          image: values.image,
          banner_image: values.banner_image
        },
        token
      );
    } else {
      props.skillUpdate(
        {
          name: values.name,
          description: values.description,
          category: values.category,
          address: values.address,
          city: values.city,
          country: values.country,
          lat: values.lat,
          lng: values.lng,
          image: values.image,
          banner_image: values.banner_image,
          id: props.skillId
        },
        props.skillId,
        token
      );
    }

    resetForm();
  },

  displayName: 'ProjectForm' // helps with React DevTools
})(ProjectForm);

const mapStateToProps = state => ({
  data: state.skillsAdd.data,
  isRequesting: state.skillsAdd.isRequesting,
  isUpdateRequesting: state.skillsUpdate.isRequesting,
  isSuccess: state.skillsAdd.isSuccess,
  isUpdateSuccess: state.skillsUpdate.isSuccess,
  isError: state.skillsAdd.isError,
  singleSkillData: state.skill.data
});

export default connect(mapStateToProps, {
  skillAdd,
  skillUpdate,
  singleSkill,
  resetAddSkill,
  resetUpdateSkill,
  skills
})(ProjectFormFormik);
