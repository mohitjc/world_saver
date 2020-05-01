import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import Yup, {
  object as yupObject,
  string as yupString,
  number as yupNumber
} from 'yup';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';

import { isNull } from 'lodash';
import {
  skillAdd,
  skillUpdate,
  singleSkill,
  resetAddSkill,
  resetUpdateSkill,
  skills
} from '../../store/actions/skillsActions';

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
  resetUpdateSkill
}) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (isSuccess) {
      swal('New skill added!', '', 'success');
      handleFormVisibilty();
      resetAddSkill();
      setReloadToggle(!reloadToggle);
    }
    if (isError) {
      swal(data && data.data && data.data.message, '', 'warning');
      // handleFormVisibilty();
      resetUpdateSkill();
      // setReloadToggle(!reloadToggle);
    }
    if (isUpdateSuccess) {
      swal('Skill updated!', '', 'success');
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
    if (!isAddForm) {
      singleSkill(skillId, token);
      // swal('New user added!', '', 'success');
    }
  }, [isAddForm, singleSkill, skillId, token]);

  // console.log('data', data);

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
            </div>

            {/* <div className="row">
              <div className="form-group col-12">
                <label>Bio</label>
                <textarea className="form-control summernote-simple">
                  asdkahjs
                </textarea>
              </div>
            </div> */}
            {/* <div className="row">
              <div className="form-group mb-0 col-12">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    name="remember"
                    className="custom-control-input"
                    id="newsletter"
                  />
                  <label className="custom-control-label" htmlFor="newsletter">
                    Subscribe to newsletter
                  </label>
                  <div className="text-muted form-text">
                    You will get new information about products, offers and
                    promotions
                  </div>
                </div>
              </div>
            </div> */}
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
    // console.log('singleSkillData', singleSkillData);
    return {
      name: singleSkillData && singleSkillData.skill.name
    };
  },

  validationSchema: yupObject().shape({
    name: yupString()
      .max(50)
      .required()
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // const { router } = props;
    const token = localStorage.getItem('token');
    // console.log('state values', values);
    if (props.isAddForm) {
      props.skillAdd(
        {
          name: values.name
        },
        token
      );
    } else {
      props.skillUpdate(
        {
          name: values.name,
          id: props.skillId
        },

        token
      );
    }

    // resetForm();
  },

  displayName: 'SkillsForm' // helps with React DevTools
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
