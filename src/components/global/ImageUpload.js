import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import swal from 'sweetalert';

const ImageUpload = ({ uploadImage }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    // setImages(values.images);
  }, [images]);
  const maxSize = 1048576;

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    getBase64(acceptedFiles[0]);
    // console.log('acceptedFiles', acceptedFiles);
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

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

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
      uploadImage({ type: 'blogs', data: reader.result }, token);
    };
    reader.onerror = function(error) {
      // console.log('Error: ', error);
    };
    // fetch()
  }
  //   console.log('imagepatheimagesimages', images);
  return (
    <div className="form-group">
      <form id="demo-upload" className="dropzone">
        <div className="dz-message text-muted">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {!isDragActive && <div>upload image</div>}
            {isDragActive && !isDragReject && "Drop it like it's hot!"}
            {isDragReject && 'File type not accepted, sorry!'}
            {isFileTooLarge && (
              <div className="text-danger mt-2">File is too large.</div>
            )}
          </div>
          <div style={{ marginTop: '2rem' }}>d</div>
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
