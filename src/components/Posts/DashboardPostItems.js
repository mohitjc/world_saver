import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
// import 'antd/dist/antd.css';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import { Button } from 'antd';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { apiUrl } from '../../environment';
import person from '../../assets/img/person.png';
import { getUserById } from '../../actions/user';
import Moment from 'react-moment';
import { Anchorme } from 'react-anchorme';
import UploadImageOnComment from '../global/UploadImageOnComment';
import WhatsappIcon from './whatsapp.png';
import InstaIcon from './instagram.png';
import TwitterIcon from './twitter.png';
import FBIcon from './facebook.png';
import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
} from 'react-share';
import {
  deleteCommentAction,
  saveCommentAction,
  getPostCommentsAction,
  updateCommentAction,
  sharePost,
  getUserPosts,
  updatePostAction,
} from '../../actions/posts/PostsActions';

import ApiClient from '../../api-client';
import './PostItemShare.css';
import DashboardComments from '../comments/DashboardComments';
import load from '../loaderMethod';
import { toastAction } from '../../actions/toast-actions';
import LinkPreview from '../LinkPreview';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DashboardPostItems = ({
  Addfriend,
  allData,
  index,
  memberDetails,
  setPostData,
  setPostData1,
  togglePrviewImage,
  post,
  user,
  deletePost,
  geUserPosts,
  updatePost,
  updateThread,
  updateReply,
  BlokedUser,
  token,
}) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [reportForm, setreportform] = useState({});

  const history = useNavigate();
  const [viewComments, setViewComments] = useState(false);
  const [array, setArray] = useState([]);
  const [isOpen, setOpenModal] = useState(false);
  const [imageUploading, setUploadImageStatus] = useState(false);
  const [activePostId, setActivePostId] = useState('');
  const [commentImage, setCommentImage] = useState([]);
  const [commentVideo, setCommentVideo] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [editCommentId, setEditCommentId] = useState(-1);
  const [editPostId, setEditPostId] = useState(0);
  const [showCommentReplyId, setShowCommentReplyId] = useState();
  const images = post.images && post.images.length > 0 ? post.images : [];
  const videos = post.videos && post.videos.length > 0 ? post.videos : [];
  const [friendsList, setFriendsList] = useState();
  const [isOpenFrirnds, setOpenModalFriends] = useState(false);
  const [value, setvalue] = useState([]);
  const [loader, setPLoader] = useState(false);
  const { isLoading } = useSelector((state) => state.loader);
  const [emps, setEmps] = useState();
  const [loading, setLoader] = useState(false);
  const [PostID, setPostID] = useState('');
  // const [BlokedUser, setBlokedUser] = useState([]);
  const onSubmitComment = () => {
    const tokenSubmit = localStorage.getItem('headertoken');

    // event.preventDefault();
    const payload = {
      post_id: post.id,
      post_comment: comment,
      image: commentImage,
      video: commentVideo,
    };

    setOpenModalFriends(true);
    dispatch(
      saveCommentAction(payload, tokenSubmit, (res) => {
        if (res.success) {
          setOpenModalFriends(false);
          setComment('');
          updatePost({ comment: res.data.comment, type: 'reply', index });
          setViewComments(isOpen);
          setCommentImage([]);
          setCommentVideo();
        }
      })
    );
    setOpenModalFriends(false);
  };

  const onSubmitPosted = (event) => {
    const tokenSubmitPost = localStorage.getItem('headertoken');

    event.preventDefault();

    const payload = {
      id: post.id,
      user_post: mycomment,
    };

    // return;
    dispatch(
      updatePostAction(payload, tokenSubmitPost, (res) => {
        if (res.success) {
          setComment('');
          setmyComment(res.comment);
          setArray(res.data);
          updateThread({ data: res.data[0], type: 'update', index: index });
          setEditPostId();
          setmyComment('');
          seteditpostitems(isOpen);
        }
      })
    );
  };
  const userID = localStorage.getItem('userID');
  const handleViewComments = (e, isOpen, post_id) => {
    e.preventDefault();
    if (!userID) {
      toast.success('Please login first');
      return;
    } else {
      setViewComments(!isOpen);
    }
  };

  const getPostComments = (post_id) => {
    const payload = { post_id: post.id };
    dispatch(
      getPostCommentsAction(payload, userReducer.access_token, (res) => {
        if (res.success) {
          setComment('');
        }
      })
    );
  };

  const handleSharePost = (e, postId) => {
    e.preventDefault();
    if (!userID) {
      toast.success('Please login first');
      return;
    } else {
      setOpenModal(true);
      setActivePostId(postId);
    }
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
          // setshareme(res.share_with)
          geUserPosts();
          setOpenModal(false);
        }
      })
    );
  };

  const onSharePost = () => {
    setOpenModalFriends(true);
    const userID = localStorage.getItem('userID');
    const getUrl = `${apiUrl}/friends?id=${userID}`;
    ApiClient.get(getUrl, `Bearer ${token}`)
      .then((result) => {
        if (result.success) {
          let arr = result.friends;

          arr.map((item) => {
            return { label: item.fullName, value: item.id };
          });

          setFriendsList(
            arr.map((item) => {
              return { label: item?.fullName, value: item?.id };
            })
          );
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
      });
  };

  const onSharePostFriendss = (share_with) => {
    const payload = {
      sharedBy: userReducer.id,
      post_id: activePostId,
      share_withId: value,
      share_with: 'friends',
    };

    dispatch(
      sharePost(payload, userReducer.access_token, (res) => {
        if (res.success) {
          geUserPosts();
          setOpenModalFriends(false);
        }
      })
    );
  };

  const handleDeleteComment = (id, i, type, ci) => {
    const tokenDelete = localStorage.getItem('headertoken');
    const payload = { id };
    // setLoader(true);
    load(true);
    dispatch(
      deleteCommentAction(payload, tokenDelete, (res) => {
        load(false);
        if (res.success) {
          // setLoader(false);
          if (type == 'reply2') {
            updateReply({ index, type: 'delete2', rIndex: i, cIndex: ci });
          } else {
            updatePost({ index, type: 'delete', rIndex: i });
          }
        }
      })
    );
  };

  const handleEditComment = (id) => {
    editCommentId != id ? setEditCommentId(id) : setEditCommentId(-1);
  };

  const onChildComment = (payload, i) => {
    const tokenThreads = localStorage.getItem('headertoken');
    const getUrl = `${apiUrl}/commentOnThread`;

    setPLoader(true);
    ApiClient.post(getUrl, payload, `Bearer ${tokenThreads}`).then(
      (result) => {
        if (result.success) {
          toastAction(true, 'Comment saved successfully');
          setCommentImage();
          setCommentVideo();
          setComment('');
          setShowCommentBox(!showCommentBox);
          updateReply({
            type: 'reply2',
            rIndex: i,
            index: index,
            comment: result.data.comment,
          });
        } else {
          const errMsg =
            result.error && result.error.message
              ? result.error.message
              : 'Something went wrong. Kindly try again later !!!';
          toastAction(false, errMsg);
        }
        setPLoader(false);
      },
      (err) => {
        setPLoader(false);
      }
    );
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
          updatePost({
            index,
            type: 'update',
            comment: res.comment[0],
            rIndex: i,
          });
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
          updateReply({
            index,
            type: 'update2',
            comment: res.comment[0],
            rIndex,
            cIndex: i,
          });
          // setLoader(false);
          setEditCommentId(-1);
        }
      })
    );
  };

  const onImageUploadSuccess = (isProcessing, image) => {
    setUploadImageStatus(isProcessing);
    setCommentImage(image);
  };

  const onVideoUploadSuccess = (isProcessing, image) => {
    setUploadImageStatus(isProcessing);
    setCommentVideo(image);
  };

  const idData = post.id;

  const deletePostIn = () => {
    const payload = { id: idData, model: 'createpost', index: index };
    deletePost(payload);
  };

  const [mycomment, setmyComment] = useState('');
  const [editpostitems, seteditpostitems] = useState(false);

  const edittoggle = (e, isOpen) => {
    setmyComment(e.user_post);
    seteditpostitems(!isOpen);
  };

  const CloseShare = () => {
    setOpenModal(false);
  };

  const closeFriendlist = () => {
    setOpenModalFriends(false);
  };

  const reshareData = () => {
    let value = post?.sharedBy;
    if (post?.shareWith == 'onlyMe') value = post.sharedBy;
    return value;
  };

  const handleOnchange = (val) => {
    let arr = [];
    arr.push(val);

    setvalue(arr);
  };

  // Hide icon function
  const hidepost = (post) => {
    const getUrl = `${apiUrl}/block`;
    const data = {
      reportedBy: userReducer.id,
      reportedTo: post.createdBy.id,
    };

    ApiClient.post(getUrl, data).then((res) => {
      geUserPosts();
    });
  };

  const HandleReport = (e) => {
    e.preventDefault();
    let id = localStorage.getItem('ReportPostID');

    let value = {
      reason: reportForm?.reason,
      reportType: reportForm?.reportType,
      eventId: id,
      type: 'post',
    };

    ApiClient.post('https://endpoint.crowdsavetheworld.com/report', value).then(
      (res) => {
        if (res.success) {
          toast.success(res?.message);
          // geUserPosts();
        }
      }
    );
    document.getElementById('CloseReportModal').click();
  };

  const ReportPostModel = (id) => {
    document.getElementById('ReportModalOpen').click();
  };

  const GetBlockedUsers = () => {
    let blockedArray = [];
    ApiClient.get('https://endpoint.crowdsavetheworld.com/blocklist').then(
      (res) => {
        if (res?.success) {
          res.data.map((itm) => {
            blockedArray.push(`${itm?.id}`);
          });
          // setBlokedUser(blockedArray);
        }
      }
    );
  };

  const BlockUser = (id) => {
    BlokedUser.push(`${id}`);

    ApiClient.put('https://endpoint.crowdsavetheworld.com/block', {
      id: user?.id,
      blocked_users: BlokedUser,
    }).then((res) => {
      if (res.success) {
        toast.success(res?.message);
        geUserPosts();
      }
    });
  };

  const HidePostForMe = (id) => {
    ApiClient.put('https://endpoint.crowdsavetheworld.com/delete/post', {
      deleted_post: [`${id}`],
    }).then((res) => {
      geUserPosts();
      if (res?.success) {
        toast.success(res?.data?.message);
      }
    });
  };

  useEffect(() => {
    // GetBlockedUsers();
  }, []);
  return (
    <>
      <a
        id="setShowCommentReplyId"
        onClick={() => setShowCommentReplyId(-1)}
      ></a>
      <div className="activityItem shadow" id={`post_${post.id}`}>
        {post?.sharedBy?.fullName ? (
          <>
            <small className="w-100 shareBytxt">Reshared by</small>
            <Link to={`/${reshareData(post)?.username}`}>
              <div className="user_profile ff">
                <div>
                  <img
                    src={
                      reshareData(post).image
                        ? reshareData(post) && apiUrl + reshareData(post)?.image
                        : person
                    }
                    className="avtar-md"
                    alt={`${reshareData(post)?.fullName}`}
                  />
                </div>
                <div>
                  <p className="profilename">{reshareData(post)?.fullName}</p>
                </div>

                <span className="dattime">
                  <Moment format="MM/DD/YYYY">
                    {post?.sharedBy?.updatedAt}
                  </Moment>
                </span>
              </div>
            </Link>
          </>
        ) : (
          ''
        )}
        <div
          className={`activity--item clearfix ${
            post?.sharedBy?.fullName ? 'childshadow mt-2' : ''
          }`}
        >
          <div className="activity--avatar">
            <Link to={`/${post.createdBy && post.createdBy.username}`}>
              <img
                src={
                  post.createdBy && post.createdBy.image
                    ? post.createdBy && apiUrl + post.createdBy.image
                    : person
                }
                className="avtar-md"
                alt={`${post.createdBy && post.createdBy.fullName}`}
              />
              {post.createdBy && post.createdBy.isGuide ? (
                <img
                  src="./assets/img/guide.jpeg"
                  title="Guide"
                  className="guide_icon"
                />
              ) : (
                // <span className="badge badge-prime text-light guide-badge mt-2">
                //   {/* Guide */}
                // </span>
                ''
              )}
            </Link>
          </div>

          <div className="activity--info">
            <div>
              <div className="activity--header commentHeader">
                <p className="mb-0">
                  {post.sharedBy == true ? (
                    <Link to={`/${post.sharedBy && post.sharedBy.username}`}>
                      {post.sharedBy.fullName}
                    </Link>
                  ) : (
                    <Link to={`/${post.createdBy && post.createdBy.username}`}>
                      {post.createdBy && post.createdBy.fullName}
                    </Link>
                  )}

                  {post.project_id && (
                    <>
                      <> posted an update in </>
                      <Link to={`/journey/${post.project_id.slug}`}>
                        {post.createdBy && post.project_id.name}
                      </Link>
                    </>
                  )}

                  {post.sharedBy == true ? (
                    <>
                      <> shared post </>
                      <Link
                        to={`/${post.createdBy && post.createdBy.username}`}
                      >
                        {post.createdBy && post.createdBy.fullName}
                      </Link>
                    </>
                  ) : (
                    ''
                  )}

                  <span className="dattime">
                    <Moment format="MM/DD/YYYY">{post?.createdAt}</Moment>
                  </span>
                </p>

                {/* Hide icon */}
                {post?.createdBy?.id == userReducer.id ? (
                  <></>
                ) : post.isSitewhitePost && userReducer.id ? (
                  <span
                    className="cursor-pointer"
                    onClick={(e) => hidepost(post)}
                  >
                    <i class="fa fa-eye-slash" aria-hidden="true"></i>
                  </span>
                ) : (
                  <></>
                )}
                {post.createdBy && post.createdBy.id == user.id ? (
                  <div>
                    {post.isSitewhitePost ? (
                      <span className="badge badge-success mr-2">SiteWide</span>
                    ) : (
                      <></>
                    )}
                    <i
                      className="edit-comment fa fa-pen"
                      onClick={() => edittoggle(post, editpostitems)}
                    ></i>
                    <i
                      className="delete-comment fa fa-trash"
                      onClick={() => {
                        deletePostIn();
                      }}
                    ></i>
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
                {post?.user_post}
              </Anchorme>

              <LinkPreview url={post.user_post} />
              {/* <pre>{JSON.stringify(post)} </pre> */}
            </div>

            {editPostId === post.id
              ? ''
              : editpostitems && (
                  <div className="commentWrapper mt-2">
                    <form onSubmit={onSubmitPosted} className="commentForm">
                      <input
                        type="text"
                        placeholder="Your comments please..."
                        className="form-control mr-2"
                        value={mycomment}
                        onChange={(e) => setmyComment(e.target.value)}
                      />

                      <button
                        type="submit"
                        disabled={imageUploading || isLoading}
                        className="btn btn-sm btn-primary"
                      >
                        {isLoading ? 'Updating...' : 'Update'}
                        {/* {imageUploading ? 'uploading ...' : 'Update'} */}
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
                    togglePrviewImage(
                      `${apiUrl}${item.imagePath}`,
                      post.createdBy && post.createdBy.username
                    );
                  }}
                />
              );
            })}
            {videos.map((item, i) => {
              return (
                <video
                  key={`video-${i}`}
                  controls
                  oncanplay="muted=true"
                  playsInline
                  className="w-100 mb-3 mt-2"
                  post
                  muted="true"
                  src={`${apiUrl}${item.videoPath}`}
                />
              );
            })}
          </div>
        </div>

        <div className="commentsList mt-2">
          {post?.isfriend == 'true' ||
          Addfriend == true ||
          post?.isShared ||
          post?.createdBy?.id == localStorage?.getItem('userID') ? (
            <div className="activity--comments fs--12 nav--widget">
              <a
                href=""
                className="text-primary reply1"
                onClick={(e) => handleViewComments(e, viewComments, post.id)}
                title="Click to view/post comments"
              >
                <i className="fa fa-share ml-1 mr-1"></i>
                Reply
              </a>
              <a
                href=""
                onClick={(e) => handleSharePost(e, post.id)}
                className="text-primary ml-4 dasds"
                title="Click to share this post"
              >
                <i className="fa fa-share mr-1 iconclo"></i>Reshare
                <i className="fa fa-share ml-1 iconclo rotate180"></i>
              </a>
              <a
                onClick={() => {
                  history('/post/' + post?.id);
                }}
                className="text-primary ml-4 dasds"
                title="Click to share this post"
              >
                View Post
              </a>
              {!post?.is_reported && (
                <a
                  onClick={() => {
                    setPostID(post?.id);
                    localStorage.setItem('ReportPostID', post?.id);
                    ReportPostModel(post?.id);
                  }}
                  className="text-primary ml-4 dasds"
                  title="Click to report this post"
                >
                  Report
                </a>
              )}
              {post?.createdBy?.id != localStorage.getItem('userID') && (
                <a
                  onClick={() => {
                    HidePostForMe(post?.id);
                  }}
                  className="text-primary ml-4 dasds"
                  title="Click to hide this post"
                >
                  Hide
                </a>
              )}
              {post?.createdBy?.id != localStorage.getItem('userID') && (
                <a
                  onClick={() => {
                    BlockUser(post?.createdBy?.id);
                  }}
                  className="text-primary ml-4 dasds"
                  title="Click to 
                  block this user"
                >
                  Block
                </a>
              )}
            </div>
          ) : (
            <></>
          )}

          {viewComments && (
            <div className="commentWrapper reply1 mt-2">
              <div className="commentForm">
                <input
                  type="text"
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <UploadImageOnComment
                  onImageUploadSuccess={onImageUploadSuccess}
                  onVideoUploadSuccess={onVideoUploadSuccess}
                  multiple={false}
                />

                <button
                  type="submit"
                  disabled={isLoading || !comment}
                  className="btn btn-sm btn-primary"
                  onClick={() => onSubmitComment()}
                >
                  {isLoading ? 'Uploading...' : 'Send'}
                </button>
              </div>
            </div>
          )}
          {post.comment &&
            post.comment.map((c, i) => {
              const postComment =
                c.post_id === post.id ? (
                  <DashboardComments
                    setPostData1={setPostData1}
                    setPostData={setPostData}
                    index={i}
                    setLoader={setPLoader}
                    togglePrviewImage={togglePrviewImage}
                    loader={loader}
                    commentText={comment}
                    setComment={setComment}
                    setCommentImage={setCommentImage}
                    commentImage={commentImage}
                    commentVideo={commentVideo}
                    setCommentVideo={setCommentVideo}
                    setShowCommentBox={setShowCommentBox}
                    showCommentBox={showCommentBox}
                    onChildComment={onChildComment}
                    updatePost={updatePost}
                    updateReply={updateReply}
                    allData={allData}
                    Addfriend={Addfriend}
                    memberDetails={memberDetails}
                    comment={c}
                    post={post}
                    user={user}
                    key={`post-comment-${c.id}`}
                    geUserPosts={geUserPosts}
                    getPostComments={getPostComments}
                    deleteComment={handleDeleteComment}
                    edit={handleEditComment}
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
        onAfterOpen={() => {}}
        onRequestClose={() => {
          setOpenModal(false);
        }}
        // style={customStyles}
        contentLabel="Create Post"
      >
        <div>
          {/* <h3 className="email-tital mb-0">Share post</h3> */}

          <div className="modal-body box">
            <p
              onClick={CloseShare}
              type="button"
              className="dashbord_close_model"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </p>
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
              <div
                className="share-with-modal-option"
                onClick={() => onSharePost('friends')}
              >
                <i className="fa fa-users" aria-hidden="true" /> Share With
                Friends
              </div>
              <div className="share-with-modal-option">
                <a
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${`https://beta.crowdsavetheworld.com/post/${post?.id}`}`}
                >
                  <img
                    style={{
                      marginLeft: '5px',
                      width: '20px',
                      marginRight: '5px',
                    }}
                    src={FBIcon}
                    alt=""
                  />{' '}
                  Share on Facebook
                </a>
              </div>
              <div className="share-with-modal-option">
                <a
                  target="_blank"
                  href={`https://twitter.com/intent/tweet?url=https://beta.crowdsavetheworld.com/post/${post?.id}`}
                >
                  <img
                    style={{
                      marginLeft: '5px',
                      width: '20px',
                      marginRight: '5px',
                    }}
                    src={TwitterIcon}
                    alt=""
                  />{' '}
                  Share on Twitter
                </a>
              </div>
              <div className="share-with-modal-option">
                <a
                  target="_blank"
                  href={`https://www.instagram.com/?url=https://beta.crowdsavetheworld.com/post/${post?.id}`}
                >
                  <img
                    style={{
                      marginLeft: '5px',
                      width: '20px',
                      marginRight: '5px',
                    }}
                    src={InstaIcon}
                    alt=""
                  />{' '}
                  Share on Instagram
                </a>
              </div>
              <div className="share-with-modal-option">
                <a
                  target="_blank"
                  href={`whatsapp://send?text=https://beta.crowdsavetheworld.com/post/${post?.id}`}
                >
                  {/* <i class="fa fa-instagram" aria-hidden="true"></i> */}
                  <img
                    style={{
                      marginLeft: '5px',
                      width: '20px',
                      marginRight: '5px',
                    }}
                    src={WhatsappIcon}
                    alt=""
                  />
                  Share on Whatsapp
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isOpenFrirnds}
        onAfterOpen={() => {}}
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
            <button
              onClick={closeFriendlist}
              type="button"
              className="close mt-2 mr-4"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h3 className="email-tital mb-0">Friend List</h3>
            <div className="modal-body box">
              <div class="form-row">
                <div className="form-group col-md-12">
                  <div className="Friendlist"></div>

                  <MultiSelect
                    onChange={handleOnchange}
                    options={friendsList}
                  />
                </div>
                <div className="col-md-12 text-right">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Modal>

      <button
        type="button"
        id="ReportModalOpen"
        class="btn btn-primary"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#ReportModal"
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="ReportModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Report Post
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={HandleReport}>
                <label for="formGroupExampleInput" class="form-label">
                  Do you want to report this ?
                </label>
                <div class="mb-3">
                  <label for="formGroupExampleInput" class="form-label">
                    Type
                  </label>
                  <select
                    value={reportForm?.reportType}
                    onChange={(e) => {
                      setreportform({
                        ...reportForm,
                        reportType: e.target.value,
                      });
                    }}
                    className="form-control"
                  >
                    <option value="">Select</option>
                    <option value="spam">Spam</option>
                    <option value="">Select</option>
                    <option value="solicitation">Solicitation</option>
                    <option value="Adult Content">Adult Content</option>
                    <option value="Displaced Political Content">
                      Displaced Political Content
                    </option>
                    <option value="Displaced Religious Content">
                      Displaced Religious Content
                    </option>
                    <option value="Licensed Material">Licensed Material</option>
                    <option value="Guerilla Marketing">
                      Guerilla Marketing
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="formGroupExampleInput2" class="form-label">
                    Description
                  </label>
                  <textarea
                    value={reportForm?.reason}
                    onChange={(e) => {
                      setreportform({
                        ...reportForm,
                        reason: e.target.value,
                      });
                    }}
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2"
                    placeholder=""
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="CloseReportModal"
                  >
                    Close
                  </button>
                  <button class="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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
})(DashboardPostItems);
