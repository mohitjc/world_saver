/* eslint-disable */

import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { uploadImage, uploadVideo } from '../../store/actions/blogsActions'; // Replace with `uploadVideo` if separate
import { API_SLUG } from '../../store/constants';
import { isEmpty } from 'lodash';

const VideoUpload = ({
  getVideo,
  type,
  value,
  placeholder,
  setVideoType,
  videoType
}) => {
  const [videos, setVideos] = useState([]);
  
  const { data, isRequesting, isSuccess } = useSelector(
    state => state.videoUpload // Replace with state.videoUpload if separate
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      getVideo(data && data.data.fullPath);
      console.log(   data.data.fullPath)
    }
  }, [data, videos, isSuccess]);

  const onDrop = useCallback((acceptedFiles) => {
    if (setVideoType) {
      setVideoType(placeholder);
    }
    getBase64(acceptedFiles[0]);
    setVideos(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
  }, []);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles
  } = useDropzone({
    onDrop,
    accept: 'video/mp4, video/webm, video/ogg',
    minSize: 0,
    multiple: true
  });
  // {
  //   const videoPreview = videos.map(file => (
  //     <div key={file.name} style={{ marginTop: 10 }}>
  //       <video width="200" height="120" controls>
  //         <source src={file.preview} />
  //         Your browser does not support the video tag.
  //       </video>
  //     </div>
  //   ));

  // }
  

  function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const token = localStorage.getItem('token');
      
      dispatch(uploadVideo({ type: type, data: reader.result }, token)); // Replace with uploadVideo if needed
    };
    reader.onerror = function (error) {
      console.error('Video file reading error:', error);
    };
  }

  return (
    <>
      <div className="form-group video-upload">
        <div id="demo-upload" className="dropzone " >
          <div className="dz-message text-muted !mx-0 ">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive && (
                <div className="drag-active ">
                  {isRequesting && videoType === placeholder ? (
                    <SyncLoader color={'#5383ff'} />
                  ) : !isEmpty(value) ? (
                    <video    width="250" height="220" controls autoPlay>
                      <source src={`${API_SLUG}/videos//${value}`} />
                      Your browser does not support the video tag.
                    </video>
                    
                  ) : (
                    placeholder || 'Upload video'
                  )}
                  
                </div>
              )}
              {isDragActive && !isDragReject && "Drop the video here!"}
              {isDragReject && 'Unsupported file type. Please upload a valid video.'}
            </div>
          </div>
        </div>
        {/* <div>{videoPreview}</div> */}
      </div>
    </>
  );
};

export default VideoUpload;
