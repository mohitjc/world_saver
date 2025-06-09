import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { imageUpload, videoUpload } from './../../actions/common';
import { apiUrl } from '../../environment';
export const is_loading = (status) => ({ type: 'IS_LOADING', status });


const UploadImageOnComment = ({ onImageUploadSuccess = () => { }, onVideoUploadSuccess = () => { }, multiple = true }) => {

    const dispatch = useDispatch();
    const [images, setImages] = useState('');

    const saveImages = (files) => {
        const token = localStorage.getItem("headertoken")
        let videosArr = [];
        let imagesArr = [];
        let videoCount = 0;
        let uploadVideoCount = 0;
        let imageCount = 0;
        let uploadImageCount = 0;
        let allFilesUploadedFlag = false;
        [...files].forEach((file, i) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);

            dispatch(is_loading(true));
            if (file.type.match('video')) {
                reader.onload = function () {
                    allFilesUploadedFlag = false;
                    dispatch(videoUpload(
                        { data: reader.result },
                        token,
                        (res) => {
                            if (res.success) {
                                let videoUrl = res.data.videoPath
                                if (multiple) {
                                    ++uploadVideoCount;
                                    videosArr.push(videoUrl);
                                    if (videoCount === uploadVideoCount) {
                                        onVideoUploadSuccess(false, videosArr);
                                        allFilesUploadedFlag = true;
                                    }
                                } else {
                                    onVideoUploadSuccess(false, videoUrl);
                                }
                            }
                            dispatch(is_loading(false));
                        }
                    ));
                };
                videoCount++;
            } else if (file.type.match('image')) {
                reader.onload = function () {
                    allFilesUploadedFlag = false;
                    dispatch(imageUpload({ type: 'posts', data: reader.result }, res => {
                        if (res.success) {
                            let imgUrl = res.data.imagePath

                            if (multiple) {
                                ++uploadImageCount;
                                imagesArr.push(imgUrl);
                                if (imageCount === uploadImageCount) {
                                    onImageUploadSuccess(false, imagesArr);
                                    setImages(imagesArr)
                                    allFilesUploadedFlag = true;
                                }
                            } else {
                                onImageUploadSuccess(false, imgUrl);
                                setImages([imgUrl])
                            }
                        }
                        dispatch(is_loading(false));
                    }));
                };
                imageCount++;
            } else {
                dispatch(is_loading(false));
            }
        });

        return new Promise((resolve) => {
            resolve(videosArr);
            resolve(imagesArr);
        });
    };

    const uploadPhotoVideo = file => {
        saveImages(file);
    };

    return (
        <label className="post_wrapper_btn">
            <input
                name="Select File"
                type="file"
                accept=".jpg,.jpeg.,.gif,.png,.mov,.mp4"
                className="d-none"
                multiple={multiple}
                onChange={e => uploadPhotoVideo(e.target.files)}
            />
            {!images ? <i className="fas fa-photo-video" /> : <></>}
            <div className='prevImg'>
                {images && images.map((item, i) => {
                    return <img src={apiUrl + item} key={i} />
                })}
            </div>
        </label>
    );
};

export default UploadImageOnComment;
