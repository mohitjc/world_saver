import React, { useState, useEffect } from 'react';

import {
  Form,
} from 'antd';
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { Button } from 'antd';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { apiUrl } from '../../environment';
import person from '../../assets/img/person.png';
import Comments from './../comments';
import { getUserById } from '../../actions/user';
import Moment from 'react-moment';
import { Anchorme } from 'react-anchorme';
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
  deletePostAction,
  updatePostAction,
} from '../../actions/posts/PostsActions';

import ApiClient from '../../api-client';
import './PostItemShare.css';
import load from '../loaderMethod';
import methodModel from '../../models/method.model';

const PostItem = ({
  userimages,
  UserVideos,
  UserDocx,
  Addfriend,
  allData,
  inddex,
  memberDetails,
  setPostData,
  post,
  user,
  geUserPosts,
  updatePost,
  updateReply,
  togglePrviewImage,
  token,
}) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.loader);
  const userReducer = useSelector((state) => state.user);
  const [isloader, setLoader] = useState(false);
  const [Newcomments, setNewComments] = useState([]);
  const [comment, setComment] = useState('');
  const [viewComments, setViewComments] = useState(false);
  const [array, setArray] = useState([]);
  const [isOpen, setOpenModal] = useState(false);
  const [imageUploading, setUploadImageStatus] = useState(false);
  const [activePostId, setActivePostId] = useState('');
  const [commentImage, setCommentImage] = useState('');
  const [commentVideo, setCommentVideo] = useState('');
  const [editCommentId, setEditCommentId] = useState(-1);
  const [editPostId, setEditPostId] = useState(0);
  const [showCommentReplyId, setShowCommentReplyId] = useState(-1);
  const images = post.images && post.images.length > 0 ? post.images : [];
  const videos = post.videos && post.videos.length > 0 ? post.videos : [];
  const [isOpenFrirnds, setOpenModalFriends] = useState(false);
  const [friendsList, setFriendsList] = useState();

  const [value, setvalue] = useState([]);
  const onSubmitComment = (event) => {
    const tokenSubmit = localStorage.getItem('headertoken');

    event.preventDefault();
    const payload = {
      post_id: post.id,
      post_comment: comment,
      image: commentImage,
      video: commentVideo,
    };


    // setLoader(true)
    dispatch(
      saveCommentAction(payload, tokenSubmit, (res) => {
        if (res.success) {
          // setLoader(false);
          updatePost({ comment: res.data.comment, type: 'reply', index: inddex })
          setViewComments(isOpen);
          setComment('');
          setCommentImage();
          setCommentVideo();
        }
      })
    );
  };

  const onSubmitPosted = (event) => {
    const tokenSubmitPost = localStorage.getItem('headertoken');

    event.preventDefault();

    const payload = {
      id: post.id,
      user_post: mycomment,
    };

    setLoader(true)
    dispatch(
      updatePostAction(payload, tokenSubmitPost, (res) => {
        if (res.success) {
          setLoader(false);
          setComment(res && res.comment);
          setComment('');

          setmyComment(res.comment);
          setArray(res.data);

          geUserPosts();
          setEditPostId();
          setmyComment('');
          seteditpostitems(isOpen);
        }
      })
    );
  };

  const handleViewComments = (e, isOpen, post_id) => {
    e.preventDefault();
    setViewComments(!isOpen);
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



  const SharPostOnlyme = (share_with) => {

    const payload = {
      sharedBy: userReducer.id,
      post_id: activePostId,
      share_with,
    };

    dispatch(
      sharePost(payload, userReducer.access_token, (res) => {
        if (res.success) {
          setOpenModal(false);
        }
      })
    );

  }


  const onSharePost = () => {
    setOpenModalFriends(true)
    const userID = localStorage.getItem('userID')
    const getUrl = `${apiUrl}/friends`;
    ApiClient.get(getUrl, userID, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          //console.log(result.friends, "resultnew");
          let arr = result.friends;
          arr.map(item => {
            return { label: item.fullName, value: item.id }
          })

          setFriendsList(arr.map(item => {
            return { label: item.fullName, value: item.id }
          }))

        } else {
          const errMsg =
            result.error && result.error.message
              ? result.error.message
              : 'Something went wrong. Kindly try again later !!!';

        }
      })
      .catch((error) => {
        const errorMessage =
          error.response &&
            error.response.data &&
            error.response.data.error_description
            ? error.response.data.error_description
            : 'Something went wrong!';
        // if (error) {
        //   toastAction(false, errorMessage);
        // }
      });
  }


  const handleOnchange = val => {

    //console.log(val, "val");

    let arr = [];
    arr.push(val)
    //console.log(arr, "arra");
    setvalue(arr)
  }

  const onSharePostFriendss = (share_with) => {
    const payload = {
      sharedBy: userReducer.id,
      post_id: activePostId,
      share_withId: value,
      share_with: "friends"
    };

    dispatch(
      sharePost(payload, userReducer.access_token, (res) => {
        if (res.success) {

          //console.log(res, "xcbnxvc");

          setOpenModalFriends(false)
        }
      })
    );
  };

  const handleDeleteComment = (id, i, type, ci) => {
    const tokenDelete = localStorage.getItem('headertoken');
    const payload = { id };
    // setLoader(true);
    load(true)
    dispatch(
      deleteCommentAction(payload, tokenDelete, (res) => {
        load(false)
        if (res.success) {
          // setLoader(false);
          if (type == 'reply2') {
            updateReply({ index: inddex, type: 'delete2', rIndex: i, cIndex: ci })
          } else {
            updatePost({ index: inddex, type: 'delete', rIndex: i })
          }

        }
      })
    );
  };

  const handleEditComment = (id) => {
    editCommentId != id ? setEditCommentId(id) : setEditCommentId(-1);
  };


  const handleUpdateComment = (e, post_comment, i) => {
    const tokenUpdated = localStorage.getItem('headertoken');

    e.preventDefault();
    const payload = { id: editCommentId, post_comment };
    // setLoader(true);
    dispatch(
      updateCommentAction(payload, tokenUpdated, (res) => {
        if (res.success) {
          setComment('');
          // setLoader(false);
          updatePost({ index: inddex, type: 'update', comment: res.comment[0], rIndex: i })
          setEditCommentId(-1);
        }
      })
    );
  };

  const childUpdateComments = (e, comment, rIndex, i) => {
    const tokenUpdatedComnt = localStorage.getItem('headertoken');

    e.preventDefault();
    const payload = { id: editCommentId, comment };
    // setLoader(true);
    dispatch(
      updateCommentAction(payload, tokenUpdatedComnt, (res) => {
        if (res.success) {
          setComment('');
          updateReply({ index: inddex, type: 'update2', comment: res.comment[0], rIndex, cIndex: i })
          // setLoader(false);
          setEditCommentId(-1);

        }
      })
    );
  };

  const onImageUploadSuccess = (isProcessing, image, video) => {
    setUploadImageStatus(isProcessing);
    setCommentImage(image);
  };

  const onVideoUploadSuccess = (isProcessing, image) => {
    setUploadImageStatus(isProcessing);
    setCommentVideo(image);
  };


  const idData = post.id;

  const deletePost = () => {
    const tokengDelete = localStorage.getItem('headertoken');
    const payload = { id: idData, model: 'createpost' };
    setLoader(true);
    dispatch(
      deletePostAction(payload, tokengDelete, (res) => {
        if (res.success) {
          setLoader(false);
          userimages();
          UserVideos();
          UserDocx();
          geUserPosts();
        }
      })
    );
  };


  const [mycomment, setmyComment] = useState('');
  const [editpostitems, seteditpostitems] = useState(false);

  const edittoggle = (e, isOpen, postid) => {
    const filter = array.filter((item, index) => item.id === e);

    setmyComment(filter && filter[0] && filter[0].user_post);

    seteditpostitems(!isOpen);
  };

  const CloseShare = () => {
    setOpenModal(false);

  }



  const closeFriendlist = () => {
    setOpenModalFriends(false)
  }

  return (
    <>
      <a id="setShowCommentReplyId" onClick={() => setShowCommentReplyId(-1)}></a>
      <div className="activityItem shadow">
        <div className="activity--item clearfix">
          <div className="activity--avatar">
            <Link onClick={() => methodModel.userClick()} to={`/memberDetail/${post.createdBy && post.createdBy.username}`}>
              <img
                src={
                  post.createdBy && post.createdBy.image
                    ? apiUrl + post.createdBy.image
                    : person
                }

                className="avtar-md"
                alt={`${user.fullName}`}

              />
            </Link>
          </div>
          <div className="activity--info">
            <div>
              <div className="activity--header commentHeader">
                <p className="mb-0">
                  <Link
                    to={`/${post.createdBy && post.createdBy.username}`}
                  >
                    {post.createdBy && post.createdBy.fullName}
                  </Link>

                  {post.project_id && (
                    <>
                      <> posted an update in </>
                      <Link to={`/journey/${post.project_id.slug}`}>
                        {post.createdBy && post.project_id.name}
                      </Link>
                    </>
                  )}

                  <span className="dattime">
                    <Moment format="MM/DD/YYYY">{post.createdAt}</Moment>
                  </span>
                </p>

                {post.createdBy &&
                  post.createdBy.id == localStorage.getItem('userID') ? (
                  <div>
                    <span
                      className="edit-comment"
                      onClick={() => edittoggle(post.id, editpostitems)}
                    >
                      Edit
                    </span>
                    <span
                      className="delete-comment"
                      onClick={(e) => {
                        return deletePost(post && post.id, inddex);
                      }}
                    >
                      Delete
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <Anchorme
                style={{
                  color: 'blue',
                }}
                target="_blank"
                rel="noreferrer noopener"
              >
                {post.user_post}
              </Anchorme>

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
                      value={mycomment || post.user_post}
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
                  className="w-100 mb-3 mt-2 d"
                  alt=""
                  onClick={() => {
                    togglePrviewImage(`${apiUrl}${item.imagePath}`, post.createdBy.username);
                  }}
                />
              );
            })}
            {videos.map((item, i) => {
              return (
                <video
                  post
                  playsInline
                  controls
                  key={`video-${i}`}
                  className="w-100 mb-3 mt-2"
                  autoPlay="true"
                  loop
                >
                  <source src={`${apiUrl}${item.videoPath}`} type="video/mp4" />
                </video>
              );
            })}
          </div>
        </div>

        <div className="commentsList">
          {post.isfriend == 'true' || Addfriend == true || post.createdBy.id == localStorage.getItem('userID') ? (
            <div className="activity--comments fs--12 nav--widget reply1">
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
          ) : <></>}

          {viewComments && (
            <div className="commentWrapper mt-2">
              <form className="commentForm reply1">
                <input
                  type="text"
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <UploadImageOnComment
                  onImageUploadSuccess={onImageUploadSuccess}
                  onVideoUploadSuccess={onVideoUploadSuccess}
                />

                <button
                  type="submit"
                  disabled={imageUploading || !comment || isLoading}
                  className="btn btn-sm btn-primary"
                  onClick={(event) => onSubmitComment(event)}
                >

                  {isLoading ? 'Send...' : 'Send'}
                </button>
              </form>
            </div>
          )}
          {post.comment &&
            post.comment.map((comment, index) => {
              const postComment =
                comment.post_id === post.id ? (
                  <Comments
                    // setPostData1={setPostData1}
                    userimages={userimages}
                    UserVideos={UserVideos}
                    UserDocx={UserDocx}
                    updatePost={updatePost}
                    updateReply={updateReply}
                    setPostData={setPostData}
                    index={index}
                    inddex={inddex}
                    post={post}
                    allData={allData}
                    Addfriend={Addfriend}
                    memberDetails={memberDetails}
                    comment={comment}
                    setEditPostId={setEditPostId}
                    user={user}
                    key={`post-comment-${comment.id}`}
                    geUserPosts={geUserPosts}
                    getPostComments={getPostComments}
                    setNewComments={setNewComments}
                    deleteComment={handleDeleteComment}
                    edit={handleEditComment}
                    Newcomments={Newcomments}
                    setEditCommentId={setEditCommentId}
                    token={token}
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
        <div>
          <h3 className="email-tital mb-0">Share post</h3>
          <button onClick={CloseShare} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="modal-body box">
            <div onClick={() => setOpenModal(false)}>
              <div
                className="share-with-modal-option"
                onClick={() => SharPostOnlyme('onlyMe')}
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
            {/* <div className='share-with-modal-option' onClick={() => onSharePost('journeys')}><i className="fa fa-home" aria-hidden="true" /> Share With Journeys</div>
            <div className='share-with-modal-option' onClick={() => onSharePost('everyone')}><i className="fa fa-users" aria-hidden="true" /> Share With Everyone</div> */}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isOpenFrirnds}
        onAfterOpen={() => { }}
        onRequestClose={() => {
          setOpenModalFriends(false);
        }}

        contentLabel="Friends List"
      >



        <Form

          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSharePostFriendss}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <div>
            <button onClick={closeFriendlist} type="button" className="close mt-2 mr-4" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h3 className="email-tital mb-0">Friend List</h3>
            <div className="modal-body box">
              <div class="form-row">
                <div class="form-group col-md-12">
                  <div className="Friendlist">

                  </div>

                  <MultiSelect
                    onChange={handleOnchange}
                    options={friendsList}
                  />

                </div>

                <div className="col-md-12 text-right">
                  <Button type="primary" htmlType="submit"
                    className="login-form-button"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </Form>


      </Modal >


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
})(PostItem);
