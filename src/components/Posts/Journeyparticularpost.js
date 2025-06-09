import React, { useState, useEffect } from 'react';
import { message, Button } from 'antd';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import moment from 'moment';
import { apiUrl } from '../../environment';
import person from '../../assets/img/person.png';
import Comments from './../comments';
import { getUserById } from '../../actions/user';
import Moment from 'react-moment';
import { projects_success } from '../../actions/project';
// import { getprojectPosts } from '../../actions/project';
//
import UploadImageOnComment from '../global/UploadImageOnComment';
import Loader from '../Loader';
import {
    deleteCommentAction,
    saveCommentAction,
    getPostCommentsAction,
    updateCommentAction,
    sharePost,
    getUserPosts,
    saveCommentOnThreadAction,
    deletePostAction,
    updatePostAction,
    savePostAction,
} from '../../actions/posts/PostsActions';

import Preview from './Preview';
import { orderBy } from 'lodash';
import Posts from '../post';
import ApiClient from '../../api-client';
import JorneyComments from '../comments/JorneyComments';

const Journeyparticularpost = ({
    memberDetails,
    projectData,

    // getUserById,
    getprojectPosts,
    post,
    user,
    geUserPosts,
    deleteonepost,
    CommentOnThread,
    firstReply,
    DeleteoneComment,
    commentHandler,
    showJurneyPost = false,
    token,
    update = () => { },
}) => {
    // console.log(getprojectPosts, "JornvsdvsdeyPost")
    // console.log(post.project_id, "posjsassat")

    // const postSId = post.id;
    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state.user);

    const [showCommentBox, setShowCommentBox] = useState(false);
    const [postItem, setEditPostItem] = useState(false);
    const [postData, setPostData] = useState();


    const [isloader, setLoader] = useState(false);
    const [Newcomments, setNewComments] = useState([]);
    const [comment, setComment] = useState('');
    const [postItemData, setPostItemData] = useState();

    // console.log(comment, "allcomments jorneypage");
    const [posts, setPosts] = useState('');
    const [viewComments, setViewComments] = useState(false);
    const [viewPosts, setViewPosts] = useState(false);

    const [array, setArray] = useState([]);
    // console.log(Newcomments && Newcomments[0] && Newcomments[0].post_comment, "Newcomments")

    const [isOpen, setOpenModal] = useState(false);
    const [isPreviewImage, setPreviewImage] = useState(false);

    const [previewImageUrl, setPreviewImageUrl] = useState(false);
    const [imageUploading, setUploadImageStatus] = useState(false);
    const [activePostId, setActivePostId] = useState('');
    const [commentImage, setCommentImage] = useState('');
    const [activeUserId, setActiveUserId] = useState();
    const [shareme, setshareme] = useState();

    const [editCommentId, setEditCommentId] = useState(-1);
    const [editPostId, setEditPostId] = useState(0);


    const [showCommentReplyId, setShowCommentReplyId] = useState(-1);

    const images = post.images && post.images.length > 0 ? post.images : [];
    const videos = post.videos && post.videos.length > 0 ? post.videos : [];
    const userid = localStorage.getItem('userID');
    // console.log(userid, 'iddd');

    // const comments = post.comment && post.comment.length > 0 ? post.comment : [];

    useEffect(() => {
        setShowCommentBox(false);


        // seteditpostdata(response);
    }, []);

    useEffect(() => {

        dispatch(
            getUserPosts({ createdBy: userid }, userReducer.access_token, (res) => {

                const response = res.data;

                if (res.success) {
                    // getUserWallPosts();
                    setArray(response);
                    const resData = res.data;

                    const resDataSorted = orderBy(resData, 'updatedAt', 'desc');


                    setPostData(resDataSorted);
                    setPostData('');


                }
            })
        );


    }, []);
    // const getApi = () => {
    //     dispatch(
    //         getUserPosts({ createdBy: userid }, userReducer.access_token, (res) => {

    //             const response = res.data;
    //             console.log(response, "respoiuy");

    //             if (res.success) {
    //                 // getUserWallPosts();
    //                 setArray(response);
    //                 const resData = res.data;

    //                 const resDataSorted = orderBy(resData, 'updatedAt', 'desc');


    //                 setPostData(resDataSorted);
    //                 setPostData('');


    //             }
    //         })
    //     );
    // }

    const onSubmitComment = (event) => {
        event.preventDefault();
        const payload = {
            post_id: post.id,
            post_comment: comment,
            image: commentImage,
        };
        // console.log(payload, "adassd");
        setLoader(true)
        dispatch(

            saveCommentAction(payload, userReducer.access_token, (res) => {
                // console.log(res, "saveCommentAc tion");

                if (res.success) {
                    // getApi();
                    getprojectPosts();

                    setLoader(false)
                    setViewComments(!isOpen);
                    // getprojectPosts();


                    // setComment(res.posts);


                    // setPosts(res.post);
                    // getPostComments(post.id);



                }
            })
        );
        // setLoader(false)
    };

    const onSubmitPosted = (event) => {
        event.preventDefault();
        const payload = {
            id: post.id,
            user_post: mycomment,

            // user_post: posts,
            // image: commentImage,
        };

        // return;
        setLoader(true)
        dispatch(
            updatePostAction(payload, userReducer.access_token, (res) => {
                // console.log(res, "updatepostAction")
                if (res.success) {

                    setLoader(false)
                    setComment(res && res.comment)
                    setComment('');

                    setmyComment(res.comment);
                    setArray(res.data)


                    getprojectPosts();
                    // setEditCommentId(-1);
                    setEditPostId();
                    // setmyComment('');
                    // seteditpostitems(isOpen);
                    // getPostComments(post.id);
                    // seteditpostitems(isOpen);
                    setmyComment('')
                    seteditpostitems(isOpen);
                }
            })
        );
    };

    const onSubmitPost = (event) => {
        event.preventDefault();
        const payload = {
            post_id: post.id,
            user_post: posts,
            // post_comment: comment,
            // image: commentImage,
        };

        dispatch(
            (payload,
                userReducer.access_token,
                (res) => {

                    if (res.success) {

                    }
                })
        );
    };

    const handleViewComments = (e, isOpen, post_id) => {
        e.preventDefault();
        setViewComments(!isOpen);
        getPostComments(post_id);
    };
    const handleViewPosts = (e, isOpen, post_id) => {
        // e.preventDefault();
        setViewPosts(!isOpen);

        // getPostComments(post_id);
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

        dispatch(
            sharePost(payload, userReducer.access_token, (res) => {

                if (res.success) {

                    // setshareme(res.share_with)
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
        setLoader(true);

        dispatch(
            deleteCommentAction(payload, userReducer.access_token, (res) => {
                // console.log(res, 'respons124211');
                if (res.success) {
                    setLoader(false);
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
        setLoader(true);
        dispatch(
            updateCommentAction(payload, token, (res) => {

                if (res.success) {
                    // console.log(res, "asdasda");
                    setComment(res && res.comment);
                    setComment('');

                    setLoader(false);
                    // setPostItemData(res.comment[0].post_comment)
                    setNewComments(res.comment);

                    getprojectPosts();
                    setEditCommentId(-1);
                    setComment('');

                    // setEditPostId(-1);
                    // getPostComments(post.id);
                }
            })
        );
    };

    const childUpdateComments = (e, comment) => {
        e.preventDefault();
        const payload = { id: editCommentId, comment };
        setLoader(true);
        dispatch(
            updateCommentAction(payload, token, (res) => {

                if (res.success) {
                    // console.log(res, "childcommentsupdate");
                    setComment(res && res.comment);
                    setComment('');

                    setLoader(false);
                    // setPostItemData(res.comment[0].post_comment)
                    setNewComments(res.comment);

                    getprojectPosts();
                    setEditCommentId(-1);
                    // setEditPostId(-1);
                    // getPostComments(post.id);
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
                    // getUserWallPosts();
                    setArray(response);
                    const resData = res.data;

                    const resDataSorted = orderBy(resData, 'updatedAt', 'desc');


                    setPostData(resDataSorted);
                    setPostData('');


                }
            })
        );
    };

    const idData = post.id;
    // console.log(idData, "id>>>>>>>>>");
    // console.log(post.project_id, "postid");



    const deletePost = (userId, value, params) => {
        const payload = { id: idData, model: 'createpost' };
        // delete payload.

        setLoader(true);
        dispatch(
            deletePostAction(payload, userReducer.access_token, (res) => {
                // console.log(res, "delejourney");


                if (res.success) {



                    setLoader(false);
                    getprojectPosts();

                }
            })
        );
    };

    // const editPost = (id) => {
    //   editPostId != id ? setEditPostId(id) : setEditPostId(-1);
    // };
    const updatePost = (userid, value) => {
        const payload = { id: idData, user_post: 'This is user post by me.' };


    };

    const [mycomment, setmyComment] = useState('');
    const [mycomment1, setmyComment1] = useState('');

    // console.log(mycomment, "edit my comment");
    const [editpostitems, seteditpostitems] = useState(false);

    const edittoggle = (e, isOpen, postid) => {

        const filter = array.filter((item, index) => item.id === e);
        // console.log(filter, 'filter>>>>>>>>>>');
        setmyComment(filter && filter[0].user_post);
        // console.log('my comment', mycomment);
        seteditpostitems(!isOpen);
    };


    // const getprojectPosts = () => {
    //   getprojectPosts(
    //     { project_id: post.project_id },
    //     userReducer.access_token,
    //     (res) => {
    //       console.log(res, "getProjectPostdatstsg");
    //       if (res.success) {

    //         const resData = res.posts;
    //         const resDataSorted = orderBy(resData, 'updatedAt', 'desc');
    //         // console.log('totla', res.total);
    //         // settotal(res.total);
    //         // setPostData(resDataSorted);
    //       }
    //     }
    //   );
    // };

    const CloseShare = () => {
        setOpenModal(false);

    }



    return (
        <>
            <div className="activityItem shadow">
                <div className="activity--item clearfix">
                    <div className="activity--avatar">
                        <Link to={`/${post.createdBy.username}`}>
                            <img
                                src={
                                    post.createdBy.image ? apiUrl + memberDetails.image : person

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

                                            <Link to={`/journey/${post.createdBy.slug}`}>
                                                {post.project_id.name}
                                            </Link>
                                        </>
                                    )}

                                    <span className="dattime">
                                        <Moment format="MM/DD/YYYY">
                                            {/* {/ {/ 1976-04-19T12:59-0500 /} /} */}
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

                        <a
                            href=""
                            className="text-primary"
                            onClick={(e) => handleViewComments(e, viewComments, post.id)}
                            title="Click to view/post comments"
                        >
                            Reply
                            <i className="fa fa-share ml-1"></i>
                        </a>
                        <a
                            href=""
                            onClick={(e) => handleSharePost(e, post.id)}
                            className="text-primary ml-2"
                            title="Click to share this post"
                        >

                            <i className="fa fa-share mr-1"></i>Reshare<i className="fa fa-share ml-1 rotate180"></i>
                        </a>
                    </div>
                    {viewComments && (
                        <div className="commentWrapper mt-2">
                            <form className="commentForm">
                                <input
                                    type="text"
                                    placeholder="Share a comment with this journey..."
                                    className="form-control"
                                    value={comment && comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <UploadImageOnComment
                                    onImageUploadSuccess={onImageUploadSuccess}
                                />

                                <button
                                    type="submit"
                                    disabled={imageUploading}
                                    className="btn btn-sm btn-primary"
                                    onClick={onSubmitComment}
                                >
                                    {imageUploading ? 'uploading...' : 'Send'}
                                    {/* {text} */}
                                </button>
                            </form>
                        </div>

                    )}
                    {post.comment &&
                        post.comment.map((comment) => {
                            // console.log(comment, 'klkasasas');
                            const postComment =
                                comment.post_id === post.id ? (
                                    <JorneyComments
                                        memberDetails={memberDetails}
                                        comment={comment}
                                        // updatecomment={updatecomment}
                                        user={user}
                                        // post={post}
                                        getprojectPosts={getprojectPosts}
                                        key={`post-comment-${comment.id}`}
                                        // getPost={getPost}
                                        // CommentOnThread={onSubmitComment}
                                        // CommentOnThread={CommentOnThread}
                                        getPost={getPost}
                                        geUserPosts={geUserPosts}
                                        getPostComments={getPostComments}
                                        setNewComments={setNewComments}
                                        // DeleteoneComment={DeleteoneComment}
                                        deleteComment={handleDeleteComment}
                                        edit={handleEditComment}
                                        Newcomments={Newcomments}
                                        token={token}
                                        post={post}
                                        postItemData={postItemData}
                                        // editPost={editPost}
                                        editCommentId={editCommentId}
                                        update={handleUpdateComment}
                                        childUpdate={childUpdateComments}
                                        showCommentReplyId={showCommentReplyId}
                                        setShowCommentReplyId={setShowCommentReplyId}
                                    />
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
                // style={customStyles}
                contentLabel="Create Post"
            >
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
                        {/* <div className='share-with-modal-option' onClick={() => onSharePost('journeys')}><i className="fa fa-home" aria-hidden="true" /> Share With Journeys</div>
                            <div className='share-with-modal-option' onClick={() => onSharePost('everyone')}><i className="fa fa-users" aria-hidden="true" /> Share With Everyone</div> */}
                    </div>
                </div>
            </Modal>
            <Preview
                isOpen={isPreviewImage}
                handleModal={togglePrviewImage}
                img={previewImageUrl}
                userId={activeUserId}
            />
            {isloader ? <Loader /> : <></>}
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
})(Journeyparticularpost);
