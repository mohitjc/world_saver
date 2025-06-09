import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { imageUpload, videoUpload } from './../../actions/common';

const JourneyImageUpload = ({ onImageUploadSuccess = () => { }, onVideoUploadSuccess = () => { } }) => {
    // console.log(onImageUploadSuccess, "onImageUploadSuccess");
    // console.log(onVideoUploadSuccess, "onVideoUploadSuccess");
    const dispatch = useDispatch();
    const [images, setImages] = useState('');

    // console.log(images, "allnewuploadimages");
    const [isUploading, setIsUploading] = useState(false);
    var previewImagesRef = useRef(null);

    const [imagesArr, setImagesArr] = useState([]);
    const [videosArr, setVideosArr] = useState([]);
    // console.log(videosArr, "videosArr");
    const [img11, setImg] = useState();

    const saveImages = (files) => {

        const token = localStorage.getItem("headertoken")
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
                    dispatch(videoUpload(
                        { data: reader.result },
                        token,
                        (res) => {
                            if (res.success) {
                                ++uploadVideoCount;
                                videosArr.push(res.data);
                                if (videoCount === uploadVideoCount) {
                                    setVideosArr(videosArr[0].videoPath);
                                    onVideoUploadSuccess(false, videosArr[0].videoPath);
                                    allFilesUploadedFlag = true;
                                    // setIsUploading(false);
                                }
                            }
                        }
                    ));
                };
                videoCount++;
            } else if (file.type.match('image')) {
                reader.onload = function () {
                    allFilesUploadedFlag = false;
                    dispatch(imageUpload({ type: 'posts', data: reader.result }, res => {
                        if (res.success) {
                            setImages(res.data.imagePath);
                            onImageUploadSuccess(false, res.data.imagePath);
                        }
                    }));
                };
                imageCount++;
            } else {
                setIsUploading(false);
            }
        });

        return new Promise((resolve) => {
            // allFilesUploadedFlag && setIsUploading(false);
            // setVideosArr(videosArr);
            // setImagesArr(imagesArr);
            resolve(videosArr);
            resolve(images);
        });
    };


    const previewImages = (files) => {
        [...files].forEach((file) => {
            let fileReader = new FileReader();
            if (file.type.match('image')) {
                fileReader.onload = function () {
                    let img = document.createElement('img');
                    // console.log(img, 'aasdad');
                    setImg(img)
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

    const uploadPhotoVideo = file => {
        setIsUploading(true);
        // Preview images before saving.
        previewImages(file);
        // Call API to save POST
        saveImages(file);
    };

    return (
        <label className="post_wrapper_btn">
            <input
                name="Select File"
                type="file"
                // accept="image/png, image/gif, image/jpeg"
                accept=".jpg,.jpeg.,.gif,.png,.mov,.mp4"
                multiple
                className="d-none"
                onChange={e => uploadPhotoVideo(e.target.files)}
            />
            {!images ? <i className="fas fa-photo-video" /> : <></>}
            <div className='comment-image' ref={previewImagesRef}></div>

        </label>
    );
};

export default JourneyImageUpload;
