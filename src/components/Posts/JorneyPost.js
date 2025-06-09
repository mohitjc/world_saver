import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { apiUrl } from '../../environment';
import person from '../../assets/img/person.png';
import { getUserById } from '../../actions/user';
import Moment from 'react-moment';
//
import UploadImageOnComment from '../global/UploadImageOnComment';
import {
    deleteCommentAction,
    saveCommentAction,
    getPostCommentsAction,
    updateCommentAction,
    sharePost,
    getUserPosts,
    deletePostAction,
    updatePostAction,
} from '../../actions/posts/PostsActions';

import Preview from './Preview';
import JorneyComments from '../comments/JorneyComments';


const JorneyPost = ({
    memberDetails,
    projectData,
    key,
    openFriendModal,
    getprojectPosts,
    post,
    user,
    geUserPosts,
    token,
}) => {
    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state.user);
    const [commentVideo, setCommentVideo] = useState('');
    const [Newcomments, setNewComments] = useState([]);
    const [comment, setComment] = useState('');
    const [viewComments, setViewComments] = useState(false);
    const [array, setArray] = useState([]);
    const [isOpen, setOpenModal] = useState(false);
    const [isPreviewImage, setPreviewImage] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState(false);
    const [imageUploading, setUploadImageStatus] = useState(false);
    const [activePostId, setActivePostId] = useState('');
    const [commentImage, setCommentImage] = useState('');
    const [activeUserId, setActiveUserId] = useState();
    const [editCommentId, setEditCommentId] = useState(-1);
    const [editPostId, setEditPostId] = useState(0);
    const [showCommentReplyId, setShowCommentReplyId] = useState(-1);
    const images = post.images && post.images.length > 0 ? post.images : [];
    const videos = post.videos && post.videos.length > 0 ? post.videos : [];
    const userid = localStorage.getItem('userID');
    const { isLoading } = useSelector((state) => state.loader);

    useEffect(() => {
        const token90 = localStorage.getItem('headertoken');
        dispatch(
            getUserPosts({ createdBy: userid }, token90, (res) => {

                const response = res.data;
                if (res.success) {
                    setArray(response);
                }
            })
        );


    }, []);


    const onSubmitComment = (event) => {
        const tokenSubmit = localStorage.getItem('headertoken')
        event.preventDefault();
        const payload = {
            post_id: post.id,
            post_comment: comment,
            image: commentImage,
            video: commentVideo,
        };

        dispatch(
            saveCommentAction(payload, tokenSubmit, (res) => {
                if (res.success) {
                    getprojectPosts();
                    setViewComments(isOpen);
                    setComment(res.posts);
                    setComment('');
                    setCommentImage()
                    setCommentVideo()
                }
            })
        );
    };

    const onSubmitPosted = (event) => {
        const updateToken = localStorage.getItem('headertoken')
        event.preventDefault();
        const payload = {
            id: post.id,
            user_post: mycomment,
        };


        dispatch(
            updatePostAction(payload, updateToken, (res) => {
                if (res.success) {
                    setComment(res && res.comment)
                    setComment('');
                    setmyComment(res.comment);
                    setArray(res.data)
                    getprojectPosts();
                    setEditPostId();
                    setmyComment('')
                    seteditpostitems(isOpen);
                }
            })
        );
    };

    const handleViewComments = (e, isOpen, post_id) => {
        e.preventDefault();
        setViewComments(!isOpen);
        getPostComments(post_id);
    };


    const getPostComments = (post_id) => {
        const payload = { post_id: post.id };
        dispatch(
            getPostCommentsAction(payload, userReducer.access_token, (res) => {

                if (res.success) {
                    setComment(res && res.comment);
                    setComment('');

                }
            })
        );
    };

    const handleSharePost = (e, postId) => {
        e.preventDefault();
        setOpenModal(true);
        setActivePostId(postId);
    };

    const onSharePost = (share_with) => {
        const payload = {
            sharedBy: userReducer.id,
            post_id: activePostId,
            share_with,
        };

        if (share_with == 'friends') {
            openFriendModal(activePostId)
            return
        }

        dispatch(
            sharePost(payload, userReducer.access_token, (res) => {

                if (res.success) {
                    setOpenModal(false);
                }
            })
        );
    };

    const togglePrviewImage = (url = '', userId) => {
        setActiveUserId(userId);
        setPreviewImage(!isPreviewImage);
        setPreviewImageUrl(url);
    };


    const handleDeleteComment = (id) => {
        const payload = { id };

        dispatch(
            deleteCommentAction(payload, userReducer.access_token, (res) => {
                if (res.success) {
                    getprojectPosts();
                }
            })
        );
    };

    const handleEditComment = (id) => {
        editCommentId != id ? setEditCommentId(id) : setEditCommentId(-1);
    };

    const handleUpdateComment = (e, post_comment) => {
        e.preventDefault();
        const payload = { id: editCommentId, post_comment };
        dispatch(
            updateCommentAction(payload, token, (res) => {

                if (res.success) {
                    setComment(res && res.comment);
                    setComment('');
                    setNewComments(res.comment);
                    getprojectPosts();
                    setEditCommentId(-1);
                    setComment('');
                }
            })
        );
    };

    const childUpdateComments = (e, comment) => {
        e.preventDefault();
        const payload = { id: editCommentId, comment };
        dispatch(
            updateCommentAction(payload, token, (res) => {
                if (res.success) {
                    setComment(res && res.comment);
                    setComment('');
                    setNewComments(res.comment);
                    getprojectPosts();
                    setEditCommentId(-1);
                }
            })
        );
    };



    const onImageUploadSuccess = (isProcessing, image) => {
        setUploadImageStatus(isProcessing);
        setCommentImage(image);
    };

    const getPost = (post_id) => {

        dispatch(
            getUserPosts({ createdBy: userid }, userReducer.access_token, (res) => {
                const response = res.data;
                if (res.success) {
                    setArray(response);
                }
            })
        );
    };

    const idData = post.id;
    const deletePost = (userId, value, params) => {
        const deleteToken = localStorage.getItem('headertoken')
        const payload = { id: idData, model: 'createpost' };

        dispatch(
            deletePostAction(payload, deleteToken, (res) => {
                if (res.success) {
                    getprojectPosts();
                }
            })
        );
    };


    const [mycomment, setmyComment] = useState('');


    // console.log(mycomment, "edit my comment");
    const [editpostitems, seteditpostitems] = useState(false);

    const edittoggle = (e, isOpen, postid) => {

        const filter = array.filter((item, index) => item.id === e);
        // console.log(filter, 'filter>>>>>>>>>>');
        setmyComment(filter && filter[0] && filter[0].user_post);
        // console.log('my comment', mycomment);
        seteditpostitems(!isOpen);
    };


    const onVideoUploadSuccess = (isProcessing, image) => {
        setUploadImageStatus(isProcessing)
        setCommentVideo(image)
    }


    const CloseShare = () => {
        setOpenModal(false);
    }




    return (
        <>
            <div className="activityItem shadow" key={key}>
                <div className="activity--item clearfix">
                    <div className="activity--avatar">
                        <Link to={`/${post.createdBy.username}`}>
                            <img
                                src={
                                    post.createdBy.image ? apiUrl + post.createdBy.image : person
                                }
                                className="avtar-md"
                                alt={`${user.fullName}`}
                                onClick={() => {
                                    togglePrviewImage(
                                        user.image ? `${apiUrl}${user.image}` : person,
                                        post.createdBy.id
                                    );
                                }}
                            />

                        </Link>
                    </div>
                    <div className="activity--info">
                        <div>
                            <div className="activity--header commentHeader">
                                <p className="mb-0">
                                    <Link to={`/${post.createdBy.username}`}>
                                        {post.createdBy.fullName}
                                    </Link>

                                    {post.project_id && (
                                        <>
                                            <> posted an update in the </>
                                            <Link to={`/journey/${post.project_id.slug}`}>
                                                {post.project_id.name}
                                            </Link>
                                        </>
                                    )}

                                    <span className="dattime">
                                        <Moment format="MM/DD/YYYY">

                                            {post.createdAt}
                                        </Moment>
                                    </span>
                                </p>

                                {post.createdBy.id == localStorage.getItem('userID') ? (
                                    <div>
                                        <span
                                            className="edit-comment"
                                            onClick={() => edittoggle(post.id, editpostitems)}
                                        >
                                            Edit
                                        </span>
                                        <span
                                            className="delete-comment"
                                            onClick={() => deletePost(post.id)}
                                        >
                                            Delete
                                        </span>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>

                            <p className="m-0 postdc">{post.user_post}</p>


                        </div>

                        {editPostId === post.id
                            ? ''
                            : editpostitems && (
                                <div className="commentWrapper mt-2">
                                    <form onSubmit={onSubmitPosted} className="commentForm">
                                        <input
                                            type="text"
                                            placeholder="Your comments please..."
                                            className="form-control"
                                            value={mycomment && mycomment}
                                            onChange={(e) => setmyComment(e.target.value)}
                                        />


                                        <button
                                            type="submit"
                                            disabled={imageUploading}
                                            className="btn btn-sm btn-primary"
                                        >
                                            {imageUploading ? 'uploading ...' : 'Update'}
                                        </button>
                                    </form>
                                </div>
                            )}
                        {images.map((item, i) => {
                            return (
                                <img
                                    key={`img-${i}`}
                                    src={`${apiUrl}${item.imagePath}`}
                                    className="w-100 mb-3 mt-2"
                                    alt=""
                                    onClick={() => {
                                        togglePrviewImage(`${apiUrl}${item.imagePath}`);
                                    }}
                                />
                            );
                        })}
                        {videos.map((item, i) => {
                            return (
                                <video
                                    key={`video-${i}`}
                                    controls
                                    autoPlay
                                    playsInline
                                    className="w-100 mb-3 mt-2"
                                    post
                                    muted
                                    src={`${apiUrl}${item.videoPath}`}
                                />
                            );
                        })}


                    </div>
                </div>

                <div className="commentsList">
                    <div className="activity--comments fs--12 nav--widget">
                        {projectData.isMember ?
                            <a
                                href=""
                                className="text-primary"
                                onClick={(e) => handleViewComments(e, viewComments, post.id)}
                                title="Click to view/post comments"
                            >
                                Reply
                                <i className="fa fa-share"></i>
                            </a> : <></>
                        }
                        {projectData.isMember ?
                            <a
                                href=""
                                onClick={(e) => handleSharePost(e, post.id)}
                                className="text-primary ml-2"
                                title="Click to share this post"
                            >
                                <i className="fa fa-share mr-1"></i>Reshare<i className="fa fa-share ml-1 rotate180"></i>


                            </a> : <></>
                        }
                    </div>
                    {viewComments && (
                        <div className="commentWrapper mt-2">
                            <form className="commentForm">
                                <input
                                    type="text"
                                    // placeholder="Share a comment with this journey..."
                                    className="form-control"
                                    value={comment && comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />

                                <UploadImageOnComment
                                    onImageUploadSuccess={onImageUploadSuccess}
                                    onVideoUploadSuccess={onVideoUploadSuccess}
                                    multiple={false}
                                />

                                {
                                    comment !== ''

                                        ?
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="btn btn-sm btn-primary"
                                            onClick={onSubmitComment}
                                        >
                                            {isLoading ? 'uploading...' : 'Send'}

                                        </button>
                                        :
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="btn btn-sm btn-primary"
                                        // disabled
                                        >
                                            {isLoading ? 'uploading...' : 'Send'}
                                            {/* {text} */}
                                        </button>
                                }
                            </form>
                        </div>

                    )}
                    {post.comment &&
                        post.comment.map((comment, i) => {
                            const postComment =
                                comment.post_id === post.id ? (<div key={i}>
                                    <JorneyComments
                                        projectData={projectData}
                                        memberDetails={memberDetails}
                                        comment={comment}
                                        user={user}
                                        post={post}
                                        getprojectPosts={getprojectPosts}
                                        key={`post-comment-${comment.id}`}
                                        getPost={getPost}
                                        geUserPosts={geUserPosts}
                                        getPostComments={getPostComments}
                                        setNewComments={setNewComments}
                                        deleteComment={handleDeleteComment}
                                        edit={handleEditComment}
                                        Newcomments={Newcomments}
                                        token={token}
                                        // post={post}
                                        editCommentId={editCommentId}
                                        update={handleUpdateComment}
                                        childUpdate={childUpdateComments}
                                        showCommentReplyId={showCommentReplyId}
                                        setShowCommentReplyId={setShowCommentReplyId}
                                    />
                                </div>
                                ) : (
                                    ''
                                );
                            return postComment;
                        })}
                </div>






            </div>
            <Modal
                isOpen={isOpen}
                onAfterOpen={() => { }}
                onRequestClose={() => {
                    setOpenModal(false);
                }}
                contentLabel="Create Post"
            >
                <div>
                    <h3 className="email-tital mb-0">Share post</h3>
                    <button onClick={CloseShare} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="modal-body">
                        <div onClick={() => setOpenModal(false)}>
                            <div
                                className="share-with-modal-option"
                                onClick={() => onSharePost('onlyMe')}
                            >
                                <i className="fa fa-lock" /> Share Only With Me
                            </div>

                            <div
                                className="share-with-modal-option"
                                onClick={() => onSharePost('friends')}
                            >
                                <i className="fa fa-users" aria-hidden="true" /> Share With
                                Friends
                            </div>

                        </div>
                    </div>
                </div>

            </Modal>
            <Preview
                isOpen={isPreviewImage}
                handleModal={togglePrviewImage}
                img={previewImageUrl}
                userId={activeUserId}
            />

        </>
    );
};
const mapStateToProps = (state) => ({
    data: state.category,
    user: state.user,
});

// export default PostItem;
export default connect(mapStateToProps, {
    getUserById,

    getUserPosts,
    saveCommentAction,
})(JorneyPost);
