import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import './CreatePost.css';
import { imageUpload, videoUpload } from './../../actions/common';

const CreatePost = (props) => {
  const { savePostHandler } = props;

  const [value, setTextarea] = useState(null);
  const [shareWith, setShareWith] = useState('onlyMe');
  const [imagesArr, setImagesArr] = useState(null);
  const [videosArr, setVideosArr] = useState(null);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  var previewImagesRef = useRef(null);
  // console.log(videosArr, "videosArr");

  const { isLoading } = useSelector((state) => state.loader);

  // Working code without promise............................................................................
  const saveImages = (files) => {
    let imagesArr = [];
    let videosArr = [];
    let videoCount = 0;
    let uploadVideoCount = 0;
    let imageCount = 0;
    let uploadImageCount = 0;
    let allFilesUploadedFlag = false;
    [...files].forEach((file, i) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.match('video')) {
        reader.onload = function () {
          allFilesUploadedFlag = false;
          setLoading(true);
          props.videoUpload(
            { data: reader.result },
            props.user.access_token,
            (res) => {
              document.getElementById("videouplode").value = ''
              if (res.success) {
                ++uploadVideoCount;
                videosArr.push(res.data);
                setLoading(false);
                if (videoCount === uploadVideoCount) {
                  setVideosArr(videosArr);
                  allFilesUploadedFlag = true;
                }
              }
            }
          );
        };
        videoCount++;
      } else if (file.type.match('image')) {
        reader.onload = function () {
          allFilesUploadedFlag = false;
          props.imageUpload({ type: 'posts', data: reader.result }, (res) => {
            if (res.success) {
              ++uploadImageCount;
              imagesArr.push(res.data);
              if (imageCount === uploadImageCount) {
                setImagesArr(imagesArr);
                allFilesUploadedFlag = true;
              }
            }
          });
        };
        imageCount++;
      } else {
      }
    });

    return new Promise((resolve) => {
      resolve(videosArr);
      resolve(imagesArr);
    });
  };

  const formSubmitHandler = (e, sitewide = false) => {
    // e.target.reset();
    if (e) e.preventDefault();

    setLoader(true);
    const onSuccess = () => {
      setLoader(false);
      previewImagesRef.current.innerHTML = '';
      setImagesArr();
      setVideosArr();
      setTextarea();
    };

    savePostHandler(
      {
        isSitewhitePost: sitewide,
        post: value,
        shareWith,
        images: imagesArr,
        videos: videosArr,
      },
      onSuccess
    );
  };

  // Supported browsers (tested): Chrome, Firefox, Safari, Opera, IE10, IE11, Android (Chrome), iOS Safari (10+)
  const previewImages = (files) => {
    [...files].forEach((file) => {
      let fileReader = new FileReader();
      if (file.type.match('image')) {
        fileReader.onload = function () {
          let img = document.createElement('img');
          img.src = fileReader.result;
          previewImagesRef.current.appendChild(img);
        };
        fileReader.readAsDataURL(file);
      } else {
        fileReader.onload = function () {
          let blob = new Blob([fileReader.result], { type: file.type });
          let url = URL.createObjectURL(blob);
          let video = document.createElement('video');
          let timeupdate = function () {
            if (snapImage()) {
              video.removeEventListener('timeupdate', timeupdate);
              video.pause();
            }
          };
          video.addEventListener('loadeddata', function () {
            if (snapImage()) {
              video.removeEventListener('timeupdate', timeupdate);
            }
          });
          let snapImage = function () {
            let canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas
              .getContext('2d')
              .drawImage(video, 0, 0, canvas.width, canvas.height);
            let image = canvas.toDataURL();
            let success = image.length > 100000;
            if (success) {
              let img = document.createElement('img');
              img.src = image;
              previewImagesRef.current.appendChild(img);
              URL.revokeObjectURL(url);
            }
            return success;
          };
          video.addEventListener('timeupdate', timeupdate);
          video.preload = 'metadata';
          video.src = url;
          // Load video in Safari / IE11
          video.muted = true;
          video.playsInline = true;
          video.play();
        };
        fileReader.readAsArrayBuffer(file);
      }
    });
  };

  const uploadPhotoVideo = (file) => {
    // Preview images before saving.
    previewImages(file);
    saveImages(file);
  };
  const userID = localStorage.getItem('userID');


  return (
    <>
      {userID ? <form onSubmit={formSubmitHandler}>
        <div className="modal-body">
          <div className="postsection">
            <textarea
              className="form-control textareas"
              style={{ resize: 'none', minHeight: '5rem' }}
              rows="2"
              placeholder={
                props.placehoder
                  ? props.placehoder
                  : `What would you like to share?`
              }
              value={value ? value : ''}
              onChange={(e) => setTextarea(e.target.value)}
            ></textarea>

            <div className="text-right">
              <label className="post_wrapper_btn">
                <input
                  name="Select File"
                  type="file"
                  id="videouplode"
                  accept=".jpg,.jpeg.,.gif,.png,.mov,.mp4"
                  multiple
                  className="d-none"
                  onChange={(e) => uploadPhotoVideo(e.target.files)}
                />
                {videosArr?.length ? <></> :
                  <i className="fas fa-photo-video mr-2" aria-hidden="true" ></i>
                }


                <div className={`prevImg ${loading == true ? 'd-none' : ""}`} ref={previewImagesRef}></div>
                {loading ? 'Uploading...' : ""}
              </label>
              <br />
            </div>

            <div className="postbutn">
              {props.user.isGuide ? (
                <>
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      disabled={loader || !(value || imagesArr || videosArr)}
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {loader ? 'Loading...' : 'Post'}
                    </button>
                    <div class="dropdown-menu">
                      <button type="submit" class="dropdown-item">
                        Post
                      </button>
                      <a
                        class="dropdown-item"
                        onClick={(e) => formSubmitHandler('', true)}
                      >
                        Sitewide Post
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    letiant="primary"
                    className="invite primary-btn ml-3"
                    disabled={loader || !(value || imagesArr || videosArr)}
                  >
                    {loader ? 'Loading...' : 'Post'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </form> : ""}
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.category,
  user: state.user,
});

export default connect(mapStateToProps, {
  imageUpload,
  videoUpload,
})(CreatePost);
