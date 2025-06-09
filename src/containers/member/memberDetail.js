import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ApiClient from '../../api-client';
import { notification } from 'antd';
import ChatWrapper from '../../components/global/chatwraper';

// import img1 from '../../assets/img/banner.jpg';
import person from '../../assets/img/person.png';
import Leftwidgets from '../../components/global/Leftwidgets';
import RightWidgets from '../../components/global/Rightwidges';
import { toast } from 'react-toastify';
import { apiUrl } from '../../environment';
import './style.scss';
import {
  getUserById,
  getFriends,
  getUserMedia,
  updateprofile,
  uploadCoverImage,
  updateProject,
} from '../../actions/user';
import { getUserProjects } from '../../actions/project';
import EditMember from './memberEdit';

import CreatePost from './../../components/Posts/CreatePost';
import { orderBy } from 'lodash';
import {
  CreatePostAction,
  deletePostAction,
  getUserPosts,
  saveCommentAction,
} from './../../actions/posts/PostsActions';
import { imageUpload, videoUpload } from './../../actions/common';
import StickyBox from 'react-sticky-box';
import { Button } from 'react-bootstrap';
// import RightSidebar from './rightsidebar';
import RightSidebar from '../../components/global/rightsidebar/index.js';
import 'react-toastify/dist/ReactToastify.css';
import UserAvtar from '../../assets/img/icon/user-avtar.png';
import { is_loading } from '../../actions/category';
import load from '../../components/loaderMethod';
import crendentialModel from '../../components/credentialsModel';
import DashboardPost from '../../components/Posts/DashboardPost';
import methodModel from '../../models/method.model';

const MemberDetailsPage = (props) => {
  const {id}=useParams()
  const [memberDetails, setMemberDetails] = useState();
  const [chatwraper, setChatWrapper] = useState([]);
  const [rightclose, setRightClose] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [friends, setFriends] = useState([]);
  const [userId1, setuserid1] = useState([]);
  const [userImages, setUserImages] = useState([]);
  const [userVideos, setUserVideos] = useState([]);
  const [userDocx, setUserDocx] = useState([]);
  const [editMember, setEditMember] = useState(false);
  const [postData, setPostData] = useState([]);
  const [openModal, toggleModal] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');

  // edit form
  const [isImgUploading, setImgUploading] = useState(false);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [date_of_birth, setDateOfBirth] = useState(props.user.date_of_birth);
  const [email, setEmail] = useState(props.user.email);
  const [country, selectCountry] = useState(props.user.country);
  const [city, setCity] = useState(props.user.city);
  const [region, selectRegion] = useState(props.user.state);
  const [gender, setGender] = useState(props.user.gender);
  const [aboutme, setAboutme] = useState(props.user.aboutme);
  const [isLoginUser, setIsLoginUser] = useState();

  const [isCoverImgUploading, setImgCoverUploading] = useState(false);
  const inputFile = useRef(null);
  const coverImageInput = useRef(null);

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [friendStatus, setFriendStatus] = useState();
  const [loader, setLoader] = useState(false);

  const headerJourneyList = (id) => {
    ApiClient.get(
      `${apiUrl}/journylist`,
      { user_id: id },
      `Bearer ${props.user.access_token}`
    ).then((result) => {
      let option = [];
      if (result && result.data && result.data.length > 0) {
        result.data.map((obj) => {
          const imgSrcValue = obj.image && `${apiUrl}${obj.image}`;
          const labelValue = (
            <div className="header-dropdown-options">
              <img
                src={imgSrcValue ? imgSrcValue : UserAvtar}
                width="20"
                className="avatar mr-2"
              />
              {obj.name}
            </div>
          );
          option.push({ value: obj.id, label: labelValue });
        });
      }
      dispatch(is_loading(false));
    });
  };

  const geUserPosts = (id = '') => {
    setLoader(true);
    props.getUserPosts(
      { createdBy: id ? id : memberDetails.id },
      props.user.access_token,
      (res) => {
        if (res.success) {
          const resData = res.data;
          const resDataSorted = orderBy(resData, 'updatedAt', 'desc');
          setPostData(resDataSorted);
          setLoader(false);
        }
      }
    );
  };

  const handleModal = (status) => {
    toggleModal(false);
  };

  const remove = (array, setArray, i) => {
    setArray(() => {
      const list = array.filter((item, j) => i !== j);

      return list;
    });
  };

  const close = (e) => {
    remove(chatwraper, setChatWrapper, e);
  };

  const savePostHandler = (postData, onSuccess) => {
    let params = {
      ...postData,
      user_post: postData.post,
      images: postData.images,
      videos: postData.videos,
    };

    props.CreatePostAction(params, props.user.access_token, (res) => {
      if (res.success) {
        geUserPosts();
        userimages();
        UserVideos();
        UserDocx();
        toggleModal(false);
        onSuccess && onSuccess();
      }
    });
  };

  const userimages = () => {
    props.getUserMedia(
      { id: memberDetails.id, type: 'images' },
      props.user.access_token,
      (res) => {
        if (res.success) {
          setUserImages(res.data);
        }
      }
    );
  };

  const UserVideos = () => {
    props.getUserMedia(
      { id: memberDetails.id, type: 'videos' },
      props.user.access_token,
      (res) => {
        // console.log('media---------', res);
        if (res.success) {
          setUserVideos(res.data);
        }
      }
    );
  };

  const UserDocx = () => {
    props.getUserMedia(
      { id: memberDetails.id, type: 'other' },
      props.user.access_token,
      (res) => {
        if (res.success) {
          setUserDocx(res.data);
        }
      }
    );
  };

  const saveComment = (params) => {
    props.saveCommentAction(params, props.user.access_token, (res) => {
      if (res.success) {
        toggleModal(false);
        // props.close(false);
      }
    });
  };

  //--------------------

  useEffect(() => {
    setIsLoginUser(props?.match?.params?.id == props?.user?.username);
    if (props?.match?.params?.mode == 'edit') {
      setEditMember(true);
    } else {
      setEditMember(false);
    }
    getData();
  }, [props?.match?.params?.id, props?.user]);

  const getAllMethod = (id) => {
    geUserPosts(id);
    userFrients(id);
    headerJourneyList(id);

    // props.updateProject({ id: id }, props.user.access_token, (res) => {
    //   if (res.success) {
    //     setProjectData(res.result.data);
    //   }
    // });

    props.getUserProjects({ id: id }, (res) => {
      if (res.success) {
        setProjectData(res.result.data);
      }
    });

    // Get Friends    /friends
    props.getFriends({ id: id }, props.user.access_token, (res) => {
      setuserid1(res.friends);
      if (res.success) {
        setFriends(res.friends);
      }
    });

    // Get User Media Images
    props.getUserMedia(
      { id: id, type: 'images' },
      props.user.access_token,
      (res) => {
        if (res.success) {
          setUserImages(res.data);
        }
      }
    );

    props.getUserMedia(
      { id: id, type: 'videos' },
      props.user.access_token,
      (res) => {
        // console.log('media---------', res);
        if (res.success) {
          setUserVideos(res.data);
        }
      }
    );

    props.getUserMedia(
      { id: id, type: 'other' },
      props.user.access_token,
      (res) => {
        // console.log('media---------', res);
        if (res.success) {
          setUserDocx(res.data);
        }
      }
    );
  };
  const token31 = localStorage.getItem('userID');
  const getData = (pid = '') => {
    if (localStorage.getItem('userID')) {
      let url = `${apiUrl}/slug/user/${
        props?.user?.username
        // props?.match?.params?.id
      }?userid=${localStorage.getItem('userID')}`;
      ApiClient.get(url).then((res) => {
        if (res?.success) {
          setMemberDetails(res.data);
          setAboutme(res.data.aboutme);
          setIsLoginUser(props.user.id === res.data.id);
          getAllMethod(res.data.id);
        }
      });
    } else {
      let url = `${apiUrl}/slug/user/${pid ? pid : id}`;
      ApiClient.get(url, {}).then((res) => {
        if (res?.success) {
          setMemberDetails(res.data);
          //console.log(res.data, 'To check the badge');
          setAboutme(res.data.aboutme);
          setIsLoginUser(props.user.id === res.data.id);
          getAllMethod(res.data.id);
        }
      });
    }
  };

  const togglePrviewImage = (url = '', userId) => {
    setPreviewImageUrl(url);
    //console.log('url', url);
    document.getElementById('imageModalBtn').click();
  };

  const upload = (file, name) => {
    // const token = props.user.access_token
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImgUploading(true);
      props.imageUpload({ type: 'project', data: reader.result }, (res) => {
        if (res.success) {
          // load(false)
          setImgUploading(false);
          setMemberDetails({ ...memberDetails, image: res.data.imagePath });
          //console.log(res.data.imagePath, 'imagepath');
          props.updateprofile(
            { image: res.data.imagePath },
            props.user.access_token
          );
        } else {
          //console.log('error');
        }
      });
    };
  };

  const uploadCoverImage = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      load(true);
      setImgCoverUploading(true);
      const onSuccess = (res) => {
        load(false);
        // console.log('Result: ', res);
        setImgCoverUploading(false);
        let cImage = res.data.updatedUser[0].coverImage;
        setMemberDetails({ ...memberDetails, coverImage: cImage });
      };
      const onError = (err) => {
        setImgCoverUploading(false);
      };
      // console.log('base 64:', reader.result);
      props.uploadCoverImage(
        { data: reader.result },
        props.user.access_token,
        onSuccess,
        onError
      );
    };
    reader.onerror = function (error) {
      // console.log('Error: ', error);
    };
  };

  const token = localStorage.getItem('headertoken');

  const userFrients = (id = '') => {
    const token7 = localStorage.getItem('headertoken');

    if (token31) {
      load(true);
      fetch(`${apiUrl}/check/friend?friend_id=${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token7}`,
        },
      })
        .then((res) => res.json())
        .then(
          (res) => {
            setFriendStatus(res);
            load(false);
          },
          (err) => {
            load(false);
          }
        );
    }
  };
  const Unfrienduser = () => {
    const payload = { friend_id: memberDetails.id };
    const getUrl = `${apiUrl}/unFriend`;
    ApiClient.delete(getUrl, `Bearer ${token}`, payload).then(() => {
      // console.log(result, 'ressusususu');
      getData();
    });
  };
  const userID = localStorage.getItem('userID');
  const handleInvite = () => {
    const payload = { user_id: props.user.id, friend_id: memberDetails.id };
    const getUrl = `${apiUrl}/addFriend`;
    if (!userID) {
      toast.success('Please login first', {});
      return;
    } else {
      ApiClient.post(getUrl, payload, `Bearer ${token}`).then((result) => {
        // console.log(result, 'ressusususu');
        if (result.success) {
          userFrients(memberDetails.id);
          setTimeout(() => {
            notification.open({
              message: 'Friend Request Sent',
            });
          }, 1000);
        }
      });
    }
  };

  const append = () => {
    if (chatwraper && chatwraper.length > 2) return false;
    let isError = false;
    chatwraper &&
      chatwraper.map((newdata) => {
        if (memberDetails.id == newdata.id) {
          isError = true;
          return false;
        }
      });

    if (!isError) {
      memberDetails['unreadMsg'] = false;
      setChatWrapper((preSate) => [...preSate, memberDetails]);
    }
  };

  const updatePost = (p) => {
    //console.log('updatePost', p);
    let comment;
    let comments = [];

    if (postData[p.index].comment && postData[p.index].comment.length)
      comments = postData[p.index].comment;

    if (p.comment) {
      comment = p.comment;
      comment.createdBy = crendentialModel.getUser();
      if (p.type == 'reply') comments.push(comment);
      if (p.type == 'update') comments[p.rIndex] = comment;
    }

    if (p.type == 'delete') {
      comments = comments.filter((itm, i) => i != p.rIndex);
    }

    comments.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    postData[p.index].comment = comments;
    // console.log('comments', comments);
  };

  const updateReply = (p) => {
    //console.log('updateReply', p);
    let comment;
    let childComment = [];

    if (p.comment) {
      comment = p.comment;
      comment.createdBy = crendentialModel.getUser();
    }

    if (postData[p.index].comment[p.rIndex].childComment) {
      childComment = postData[p.index].comment[p.rIndex].childComment;
    }

    if (p.type == 'reply2') {
      childComment.push(comment);
    }

    if (p.type == 'delete2') {
      childComment = childComment.filter((itm, i) => i != p.cIndex);
    }

    if (p.type == 'update2') {
      childComment[p.cIndex] = comment;
    }

    // childComment.sort(function (a, b) {
    //   // Turn your strings into dates, and then subtract them
    //   // to get a value that is either negative, positive, or zero.
    //   return new Date(b.createdAt) - new Date(a.createdAt);
    // });

    const resDataSorted = orderBy(childComment, 'createdAt', 'desc');

    postData[p.index].comment[p.rIndex].childComment = resDataSorted;

    setTimeout(() => {
      document.getElementById('setShowCommentReplyId').click();
    }, 300);
  };

  const deletePost = (e) => {
    //console.log('e', e);
    let index = e.index;
    let arr = postData.filter((itm, i) => i != index);
    const token = localStorage.getItem('headertoken');

    setLoader(true);
    dispatch(
      deletePostAction(e, token, (res) => {
        if (res.success) {
          setLoader(false);
          setPostData(arr);
        }
      })
    );
  };

  const updateThread = (p) => {
    let data = methodModel.updateThread({
      type: 'update',
      data: p.data,
      list: postData,
      index: p.index,
    });
    setPostData(data);
  };

  const loadCard = [1, 2, 3, 4, 5];

  const userBanner = (img) => {
    let value = '/assets/img/banner.jpg';
    if (img) value = apiUrl + '/images/user_cover/thumbnail/500/' + img;
    return value;
  };

  const acceptRequest = (status = '') => {
    let payload = '';
    if (status == 'accepted') {
      payload = {
        friend_id: memberDetails.id,
        friendStatus: true,
        notification_id: '',
        status: 'accepted',
        user_id: localStorage.getItem('userID'),
      };
    } else {
      payload = {
        friend_id: memberDetails.id,
        friendStatus: false,
        notification_id: '',
        status: 'rejected',
        user_id: localStorage.getItem('userID'),
      };
    }
    ApiClient.put(apiUrl + '/acceptRejectRequest', payload).then((res) => {
      if (res.success) {
        toast.success(res.message);
        getData();
      }
    });
  };

  return (
    <>
      <div id="getMemberDetail" onClick={() => getData()}></div>
      <div className="banner--section bg--img">
        <label
          className="profile-banner"
          style={{
            backgroundImage: `url(${userBanner(
              memberDetails && memberDetails.coverImage
            )}`,
          }}
        >
          {memberDetails &&
          memberDetails.id == localStorage.getItem('userID') ? (
            <>
              <input
                ref={coverImageInput}
                id="bannerImage"
                type="file"
                className="d-none"
                accept="image/*"
                onChange={(e) => uploadCoverImage(e.target.files[0])}
              />
              <i className="fas fa-pen editIcon"></i>
            </>
          ) : (
            <></>
          )}
        </label>

        <div className="text-center profile-user mb-0 profile-upper">
          <div className="profile_imgWraper">
            <label className="profileEdit">
              <img
                className="profile-img"
                src={
                  memberDetails && memberDetails.image
                    ? apiUrl + memberDetails.image
                    : person
                }
              />

              {memberDetails && memberDetails.id == props.user.id ? (
                <>
                  <input
                    ref={inputFile}
                    type="file"
                    className="d-none"
                    accept="image/*"
                    onChange={(e) => upload(e.target.files[0], 'img')}
                  />
                  <span className="editprofile_icon">
                    <i className="fas fa-edit"> </i>
                  </span>
                </>
              ) : (
                <></>
              )}
            </label>
            <div>
              {memberDetails && memberDetails.isGuide ? (
                <img
                  src="./assets/img/guide.jpeg"
                  title="Guide"
                  className="guide_profile"
                  width="30px"
                />
              ) : (
                // <span className="badge badge-prime px-3 py-1 text-light fs-6 ">
                //   Guide
                // </span>
                ''
              )}
            </div>

            {friendStatus &&
            friendStatus.friendStatus == true &&
            friendStatus.requestStatus == 'accepted' &&
            props.user.id != memberDetails.id ? (
              <div>
                <Button
                  variant="primary"
                  onClick={(e) => append()}
                  className="btn-sm"
                >
                  <a href="#">
                    <i className="fa fa-comments menuh-size"></i>
                  </a>
                  Message
                </Button>

                <button
                  variant="primary"
                  className="unfriend_btn"
                  onClick={() => Unfrienduser()}
                >
                  <a className="addfriend_btn add_frend">
                    <i className="fa fa-user-plus "></i>
                  </a>
                  Unfriend
                </button>
              </div>
            ) : memberDetails &&
              memberDetails.id == localStorage.getItem('userID') ? (
              <></>
            ) : (
              <>
                {friendStatus && friendStatus.requestStatus == 'pending' ? (
                  <>
                    {friendStatus.requester ==
                    localStorage.getItem('userID') ? (
                      <Button
                        variant="primary"
                        className="addfrend_class btn-sm"
                      >
                        <i className="fa fa-user-plus "></i>
                        Request Sent
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          className="addfrend_class btn-sm acceptBtn"
                          onClick={() => acceptRequest('accepted')}
                        >
                          <i className="fa fa-user-plus "></i>
                          Accept
                        </Button>
                        <Button
                          variant="primary"
                          className="addfrend_class btn-sm rejectBtn"
                          onClick={() => acceptRequest('rejected')}
                        >
                          <i className="fa fa-user-plus "></i>
                          Reject
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {userID ? (
                      <Button
                        variant="primary"
                        className="addfrend_class btn-sm"
                        onClick={() => handleInvite()}
                      >
                        <a href="#" className="addfriend_btn add_frend">
                          <i className="fa fa-user-plus "></i>
                        </a>
                        Add Friend
                      </Button>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            )}

            {memberDetails &&
            memberDetails.id == localStorage.getItem('userID') ? (
              <Link
                to="/profile"
                className="profile-settings"
                title="Profile Settings"
              >
                <i class="fa fa-sliders" aria-hidden="true"></i>
              </Link>
            ) : (
              <></>
            )}
          </div>

          {memberDetails &&
          memberDetails.id == localStorage.getItem('userID') ? (
            <div>
              {isImgUploading ? (
                <div className="font-weight-bold">uploading...</div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <> </>
          )}

          <h4>{memberDetails && memberDetails.fullName}</h4>
        </div>
      </div>

      <div className="page--wrapper main_wrapper main_wrapper_inside">
        <div className="container-fluid member-profile-container">
          <div className="row">
            <div className="col-md-3 main--sidebar">
              <StickyBox offsetTop={83} offsetBottom={15} className="highindex">
                <Leftwidgets
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  isLoginUser={isLoginUser}
                  getData={getData}
                  user={props.user}
                  memberDetails={memberDetails}
                  projects={projectData}
                  friends={friends}
                  aboutme={aboutme}
                  setEditMember={setEditMember}
                  setAboutme={setAboutme}
                  geUserPosts={geUserPosts}
                  userImages={userImages}
                  userVideos={userVideos}
                  userDocx={userDocx}
                  togglePrviewImage={togglePrviewImage}
                />
              </StickyBox>
            </div>
            {isLoginUser && editMember ? (
              <EditMember
                isLoginUser={isLoginUser}
                isModalVisible={isModalVisible}
                setEditMember={setEditMember}
                getData={getData}
                setIsModalVisible={setIsModalVisible}
                togglePrviewImage={togglePrviewImage}
                user={props.user}
                memberDetails={memberDetails}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                date_of_birth={date_of_birth}
                setDateOfBirth={setDateOfBirth}
                email={email}
                setEmail={setEmail}
                country={country}
                selectCountry={selectCountry}
                region={region}
                city={city}
                gender={gender}
                setGender={setGender}
                setCity={setCity}
                selectRegion={selectRegion}
                aboutme={aboutme}
                setAboutme={setAboutme}
                isImgUploading={isImgUploading}
                setImgUploading={setImgUploading}
                imageUpload={imageUpload}
                isCoverImgUploading={isCoverImgUploading}
                setImgCoverUploading={setImgCoverUploading}
                coverImageInput={coverImageInput}
                uploadCoverImage={props.uploadCoverImage}
              />
            ) : (
              <div className="col-md-6 main--content">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  {isLoginUser && (
                    <div className="mb-3">
                      <div className="position-relative postinput bg-white  newdata shadow roundedCard">
                        <CreatePost
                          isOpen={openModal}
                          handleModal={handleModal}
                          memberimage={props.memberimage}
                          savePostHandler={savePostHandler}
                        />
                      </div>
                    </div>
                  )}
                  <div className="main--content-inner p-0">
                    <div className="filter--nav clearfix new">
                      <div className="filter--link float--left ">
                        <h6 className="text-primarymy lignheight-normal">
                          My Activity
                        </h6>
                      </div>
                    </div>

                    {loader ? (
                      <div className="text-center py-2">
                        Loading...<i className="fa fa-spinner fa-spin ml-2"></i>
                      </div>
                    ) : (
                      <></>
                    )}

                    <DashboardPost
                      hideJurneyPost={true}
                      hasMoreItems={true}
                      updateThread={updateThread}
                      togglePrviewImage={togglePrviewImage}
                      deletePost={deletePost}
                      setPostData1={setPostData}
                      posts={postData}
                      updatePost={updatePost}
                      updateReply={updateReply}
                      setLoader={setLoader}
                      geUserPosts={geUserPosts}
                      user={props.user}
                      memberDetails={memberDetails}
                      commentHandler={saveComment}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="main--sidebar col-md-3 sidebar-right">
              <StickyBox offsetTop={83} offsetBottom={15}>
                <RightWidgets />
              </StickyBox>
            </div>
          </div>
        </div>
      </div>
      {rightclose ? <RightSidebar setClose={setRightClose} /> : <></>}
      <div className="chat-wrapper">
        {chatwraper &&
          chatwraper.map((item, i) => {
            return (
              <>
                <ChatWrapper
                  key={`chat-with-${i}`}
                  id={i}
                  user={item}
                  close={close}
                />
              </>
            );
          })}
      </div>

      <button
        type="button"
        className="btn btn-primary d-none"
        id="imageModalBtn"
        data-toggle="modal"
        data-target="#imageModal"
      >
        image modal
      </button>

      <div className="modal fade" id="imageModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Image
              </h5>
              <button
                type="button"
                className="close"
                id="imageModalClose"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img src={previewImageUrl} className="w-100" />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
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

export default connect(mapStateToProps, {
  getUserById,
  getFriends,
  updateProject,
  getUserMedia,
  getUserProjects,
  CreatePostAction,
  getUserPosts,
  saveCommentAction,
  imageUpload,
  videoUpload,
  updateprofile,
  uploadCoverImage,
})(MemberDetailsPage);
