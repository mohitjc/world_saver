import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import Yup, {
  object as yupObject,
  string as yupString,
  number as yupNumber
} from 'yup';
import swal from 'sweetalert';
import { isNull } from 'lodash';
import {
  packageAdd,
  packageUpdate,
  singlePackage,
  resetAddPackage,
  resetUpdatePackage,
  packages
} from '../../../store/actions/subscribePackageActions';
import { names } from '../../../store/actions/planNameActions';
import { types } from '../../../store/actions/planTypeActions';

const PackageForm = ({
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
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  packageId,
  singlePackage,
  singlePackageData,
  resetAddPackage,
  resetUpdatePackage,
  names,
  types,
  allNames,
  allTypes
}) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    names(token, '', '', '', '', '', '');
    types(token, '', '', '', '', '', '');
  }, [names, types]);

  useEffect(() => {
    if (isSuccess) {
      swal('Package added!', '', 'success');
      handleFormVisibilty();
      resetAddPackage();
      setReloadToggle(!reloadToggle);
    }
    if (isError) {
      swal(data && data.data && data.data.message, '', 'warning');
      // handleFormVisibilty();
      resetUpdatePackage();
      // setReloadToggle(!reloadToggle);
    }
    if (isUpdateSuccess) {
      swal('Package updated!', '', 'success');
      handleFormVisibilty();
      resetUpdatePackage();
      setReloadToggle(!reloadToggle);
    }
  }, [isSuccess, isError, isUpdateSuccess]);

  useEffect(() => {
    // names()
    if (!isAddForm) {
      singlePackage(packageId, token);
      // swal('New user added!', '', 'success');
    }
  }, [singlePackage]);

  // console.log('allTypes', allTypes && allTypes.data);

  return (
    <div className="">
      <button className="btn btn-primary mb-3" onClick={handleFormVisibilty}>
        View Package
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? 'Add' : 'Edit'} package</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="form-group col-md-4 col-12">
                <label>Name</label>
                <select
                  name="name"
                  className="form-control"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option>Select name</option>
                  {allNames &&
                    allNames.data &&
                    allNames.data.subscribenames &&
                    allNames.data.subscribenames.map(item => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
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
                <label>Type</label>
                <select
                  name="type"
                  className="form-control"
                  value={values.type}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option>Select type</option>
                  {allTypes &&
                    allTypes.data.category &&
                    allTypes.data.category.map(item => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
                {errors.type && touched.type && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.type}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4 col-12">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  // value="john"

                  value={values.price}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.price && touched.price && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.price}
                  </div>
                )}
              </div>
              <div className="form-group col-md-4 col-12">
                <label>Validate Day</label>
                <input
                  type="number"
                  name="validateDay"
                  className="form-control"
                  // value="john"

                  value={values.validateDay}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.validateDay && touched.validateDay && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.validateDay}
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-8 col-12">
                <label>Detail</label>
                <textarea
                  className="form-control summernote-simple"
                  name="detail"
                  value={values.detail}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
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

const PackageFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singlePackageData }) => {
    // console.log('singlePackageData', singlePackageData);
    return {
      name:
        (singlePackageData &&
          singlePackageData.name &&
          singlePackageData.name.id) ||
        '',
      type:
        (singlePackageData &&
          singlePackageData.type &&
          singlePackageData.type.id) ||
        '',
      detail: (singlePackageData && singlePackageData.detail) || '',
      price: (singlePackageData && singlePackageData.price) || '',
      validateDay: (singlePackageData && singlePackageData.validateDay) || '',
      services: ['mentor', 'mentee']
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
      props.packageAdd(
        {
          name: values.name,
          type: values.type,
          detail: values.detail,
          price: values.price,
          validateDay: values.validateDay,
          services: values.services
        },
        token
      );
    } else {
      props.packageUpdate(
        {
          id: props.packageId,
          name: values.name,
          type: values.type,
          detail: values.detail,
          price: values.price,
          validateDay: values.validateDay,
          services: values.services
          // type: values.type
        },
        token
      );
    }

    // resetForm();
  },

  displayName: 'PackageForm' // helps with React DevTools
})(PackageForm);

const mapStateToProps = state => ({
  allNames: state.names.data,
  allTypes: state.types.data,
  data: state.packageAdd.data,
  isRequesting: state.packageAdd.isRequesting,
  isUpdateRequesting: state.packageUpdate.isRequesting,
  isSuccess: state.packageAdd.isSuccess,
  isUpdateSuccess: state.packageUpdate.isSuccess,
  isError: state.packageAdd.isError,
  singlePackageData: state.singlePackage.data
});

export default connect(
  mapStateToProps,
  {
    packageAdd,
    packageUpdate,
    singlePackage,
    resetAddPackage,
    resetUpdatePackage,
    packages,
    names,
    types
  }
)(PackageFormFormik);
