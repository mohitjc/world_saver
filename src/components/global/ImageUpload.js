/* eslint-disable */

import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import swal from 'sweetalert';

import { SyncLoader } from 'react-spinners';

import { uploadImage } from '../../store/actions/blogsActions';
import { API_SLUG } from '../../store/constants';

const ImageUpload = ({ getImage, type, value }) => {
  const [images, setImages] = useState([]);
  const { data, isRequesting, isSuccess } = useSelector(
    state => state.imageUpload
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      getImage(data && data.data.fullPath);
    }
    // setImages(values.images);
  }, [data, images, isSuccess]);
  const maxSize = 1048576;

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    getBase64(acceptedFiles[0]);
    // console.log('acceptedFiles', acceptedFiles);
    setImages(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
  });
  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    rejectedFiles
  } = useDropzone({
    onDrop,
    accept: 'image/png, image/jpg, image/jpeg, image/svg',
    minSize: 0,
    // maxSize,
    multiple: true
  });

  // const isFileTooLarge =
  //   rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };

  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  const thumbs = images.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      const token = localStorage.getItem('token');

      dispatch(uploadImage({ type: type, data: reader.result }, token));
    };
    reader.onerror = function(error) {
      // console.log('Error: ', error);
    };
    // fetch()
  }
  return (
    <>
      <div className="form-group image-upload">
        <form id="demo-upload" className="dropzone">
          <div className="dz-message text-muted">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive && (
                <div className="drag-active">
                  {isRequesting ? (
                    <SyncLoader color={'#5383ff'} />
                  ) : !isEmpty(value) ? (
                    <div style={thumb}>
                      <div style={thumbInner}>
                        <img
                          src={`${API_SLUG}/images/${type}/${value}`}
                          style={img}
                        />
                      </div>
                    </div>
                  ) : (
                    'upload image'
                  )}
                </div>
              )}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && 'File type not accepted, sorry!'}
              {/* {isFileTooLarge && (
              <div className="text-danger mt-2">File is too large.</div>
            )} */}
            </div>
          </div>
        </form>
      </div>
      {/* <aside style={thumbsContainer}>
        {!isEmpty(value) ? (
          <div style={thumb}>
            <div style={thumbInner}>
              <img src={`${API_SLUG}/images/${type}/${value}`} style={img} />
            </div>
          </div>
        ) : (
          thumbs
        )}
      </aside> */}
    </>
  );
};

export default ImageUpload;
