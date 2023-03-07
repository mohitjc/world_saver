import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import {
  object as yupObject,
  string as yupString,
} from 'yup';
import swal from 'sweetalert';
import {
  Add,
  Update,
  single,
  resetAdd,
  resetUpdate,
} from '../../store/actions/advertiseActions';
import ApiClient from '../apiClient'
import { API_SLUG } from '../../store/constants';

const Form = ({
  handleFormVisibilty,
  isRequesting,
  isUpdateRequesting,
  isSuccess,
  isUpdateSuccess,
  isError,
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  Id,
  resetAdd,
  resetUpdate,
}) => {
  const token = localStorage.getItem('token');

  const [form, setform] = useState({ title: '', image: '', description: '', url: '' })
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState('')

  useEffect(() => {
    if (isError) {
      swal(data && data.data && data.data.message, '', 'warning');
      // handleFormVisibilty();
      resetAdd();
      // setReloadToggle(!reloadToggle);
    }
  }, [
    isSuccess,
    isError,
    isUpdateSuccess,
    handleFormVisibilty,
    resetAdd,
    setReloadToggle,
    reloadToggle,
    data,
    resetUpdate
  ]);

  useEffect(() => {
    if (!isAddForm) {
      ApiClient.get('/advertisement/'+Id).then(res => {
        if (res.data.success) {
          setform(res.data?.data)
          setImage(res?.data?.data?.image)
        }
      })
    }
  }, [Id, isAddForm, token]);


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("form", form);
    let method = 'post'
    let url='/advertisement'
    let payload = { title: form.title, image: image, description: form.description, url: form.url }
    if (!isAddForm) {
      method = 'put'
      payload.id = Id
      url='/advertisement'
    }
    ApiClient.allApi(url, payload, method).then(res => {
      if (res.data.success) {
        let message='Adertise added!'
        if(!isAddForm) message='Adertise updated!'
        swal(message, '', 'success');
        handleFormVisibilty();
        resetUpdate();
        setReloadToggle(!reloadToggle);
      }else{
        swal(res.data.message, '', 'Warning');
      }
    })
  }

  const uploadImage = (e) => {
    setform({ ...form, baseImg: e.target.value })
    let files = e.target.files
    let file = files.item(0)
    setUploading(true)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      ApiClient.postFormData('/upload', reader.result, 'blogs').then(res => {
        console.log("uploadImage", res)
        if (res.success) {
          let image = res.data.fullPath
          setImage(image)
        }
        setUploading(false)
      })
    };


  }

  return (
    <div className="">
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          handleFormVisibilty();
        }}
      >
        View Advertise
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? 'Add' : 'Edit'} Advertise</h4>
          </div>
          <div className="card-body">

            <div className="row">
              <div className="form-group col-md-12 mb-3">
                <label>Image</label>
                <div>
                  <label className='btn btn-primary'>
                    <input type="file" className='d-none' onChange={uploadImage} />
                    Upload Image
                  </label>
                </div>

                {image ? <img src={`${API_SLUG} + "/images/category/"${image}`} width="100" /> : <></>}

              </div>

              <div className="form-group col-md-12 mb-3">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={form?.title}
                  onChange={e => setform({ ...form, title: e.target.value })}
                />
              </div>

              <div className="form-group col-md-12 mb-3">
                <label>Description</label>
                <textarea
                  type="text"
                  name="description"
                  className="form-control"
                  value={form?.description}
                  onChange={e => setform({ ...form, description: e.target.value })}
                  required
                />

              </div>

              <div className="form-group col-md-12 mb-3">
                <label>URL</label>
                <input
                  type="text"
                  name="url"
                  className="form-control"
                  value={form?.url}
                  onChange={e => setform({ ...form, url: e.target.value })}
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
              className={`btn btn-primary   ${isRequesting || isUpdateRequesting
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

const CatgeoryFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singleData }) => {
    // console.log('singleCategoryData', singleCategoryData);
    return {
      title: (singleData && singleData.title) || '',
      image: (singleData && singleData.image) || '',
      description: (singleData && singleData.description) || '',
      url: (singleData && singleData.url) || ''
    };
  },

  validationSchema: yupObject().shape({
    title: yupString().required(),
    image: yupString().required(),
    description: yupString().required(),
    url: yupString().required()
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // const { router } = props;
    const token = localStorage.getItem('token');
    // console.log('state values', values);
    if (props.isAddForm) {
      props.Add(
        {
          title: values.title,
          image: values.image,
          description: values.description,
          url: values.url
        },
        token
      );
    } else {
      props.Update(
        {
          title: values.title,
          image: values.image,
          description: values.description,
          url: values.url
        },
        props.Id,
        token
      );
    }

    // resetForm();
  },

  displayName: 'Form' // helps with React DevTools
})(Form);

const mapStateToProps = state => ({
  data: state.advertiseAdd.data,
  isRequesting: state.advertiseAdd.isRequesting,
  isUpdateRequesting: state.advertiseUpdate.isRequesting,
  isSuccess: state.advertiseAdd.isSuccess,
  isUpdateSuccess: state.advertiseUpdate.isSuccess,
  isError: state.advertiseAdd.isError,
  singleData: state.advertise.data
});

export default connect(mapStateToProps, {
  Add,
  Update,
  single,
  resetAdd,
  resetUpdate
})(CatgeoryFormFormik);
