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
  typeAdd,
  typeUpdate,
  singleType,
  resetAddType,
  resetUpdateType,
  types
} from '../../store/actions/typeActions';

const TypeForm = ({
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
  questions,
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  questionId,
  singleType,
  singleTypeData,
  resetAddType,
  resetUpdateType
}) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (isSuccess) {
      swal('New Type added!', '', 'success');
      handleFormVisibilty();
      resetAddType();
      setReloadToggle(!reloadToggle);
    }
    if (isError) {
      swal(data && data.data && data.data.message, '', 'warning');
      // handleFormVisibilty();
      resetUpdateType();
      // setReloadToggle(!reloadToggle);
    }
    if (isUpdateSuccess) {
      swal('Type updated!', '', 'success');
      handleFormVisibilty();
      resetUpdateType();
      setReloadToggle(!reloadToggle);
    }
  }, [
    isSuccess,
    isError,
    isUpdateSuccess,
    handleFormVisibilty,
    setReloadToggle,
    reloadToggle,
    data,
    resetAddType,
    resetUpdateType
  ]);

  useEffect(() => {
    if (!isAddForm) {
      singleType(questionId, token);
      // swal('New user added!', '', 'success');
    }
  }, [isAddForm, questionId, singleType, token]);

  // console.log('data', data);

  return (
    <div className="">
      <button className="btn btn-primary mb-3" onClick={handleFormVisibilty}>
        View Type
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? 'Add' : 'Edit'} type</h4>
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

const TypeFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singleQuestionData }) => {
    console.log('singleQuestionData', singleQuestionData);
    return {
      name: (singleQuestionData && singleQuestionData.name) || ''
    };
  },

  validationSchema: yupObject().shape({
    name: yupString()
      .max(50)
      .required()
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {


    console.log(values,"values");
    // const { router } = props;
    const token = localStorage.getItem('token');
    // console.log('state values', values);
    if (props.isAddForm) {
      props.typeAdd(
        {
          name: values.name
        },
        token
      );
    } else {
      props.typeUpdate(
        {
          name: values.name
        },
        props.questionId,
        token
      );
    }

    // resetForm();
  },

  displayName: 'QuestionForm' // helps with React DevTools
})(TypeForm);

const mapStateToProps = state => ({
  data: state.typeAdd.data,
  isRequesting: state.typeAdd.isRequesting,
  isUpdateRequesting: state.typeAdd.isRequesting,
  isSuccess: state.typeAdd.isSuccess,
  isUpdateSuccess: state.typeUpdate.isSuccess,
  isError: state.typeAdd.isError,
  singleQuestionData: state.type.data
});

export default connect(mapStateToProps, {
  typeAdd,
  typeUpdate,
  singleType,
  resetAddType,
  resetUpdateType,
  types
})(TypeFormFormik);
