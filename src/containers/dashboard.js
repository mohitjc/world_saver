import React, { useState, useEffect, useRef, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';
import './dashboard.scss';
import CreatePost from './../components/Posts/CreatePost';
import {
  CreatePostAction,
  getUserPosts,
  saveCommentAction,
} from './../actions/posts/PostsActions';
import { getprojectList } from '../actions/project';
import { deletePostAction } from './../actions/posts/PostsActions';
import { getPostCommentsAction } from './../actions/posts/PostsActions';
import { saveCommentOnThreadAction } from './../actions/posts/PostsActions';
import { imageUpload, videoUpload } from './../actions/common';
import { getadvertiseDetail } from '../actions/advertise';
import { getyoutubeDetail } from '../actions/youtube';
import { getUserById } from '../actions/user';
import { apiUrl } from '../environment';
import Rightwidges from '../components/global/Rightwidges';
import DashboardPost from '../components/Posts/DashboardPost';
import { toast } from 'react-toastify';
import crendentialModel from '../components/credentialsModel';
import ApiClient from '../api-client';
import methodModel from '../models/method.model';
import { useNavigate } from 'react-router-dom';
import Story from '../components/Story/stroy';

const UserDashboard = (props) => {
  const [postData1, setPostData1] = useState([]);
  const [openModal, toggleModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [activeUserId, setActiveUserId] = useState();
  const [eventlist, setEventlist] = useState([]);
  const history = useNavigate();
  const [scroll, setscroll] = useState({ left: false, right: true });
  const scrollValue = useRef();

  const dispatch = useDispatch();
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    listevents();
  }, []);
  useEffect(() => {
    geUserPosts();
  }, [props.user]);

  const listevents = () => {
    let page = {
      count: 10,
      page: 1,
    };
    ApiClient.get(`${apiUrl}/events`, page).then(
      (res) => {
        setLoader(false);
        setEventlist(res.data);
      },
      (err) => {
        setLoader(false);
      }
    );
  };

  const geUserPosts = () => {
    let prm = {
      createdBy: props.user.id,
    };

    let url = 'landing/WallPosts';
    // let url = 'WallPosts'
    if (props.user.id) url = 'WallPosts';
    setLoader(true);
    ApiClient.get(`${apiUrl}/${url}`, prm).then(
      (res) => {
        setLoader(false);
        setPostData1(res.data);
      },
      (err) => {
        setLoader(false);
      }
    );
  };

  const handleModal = (status) => {
    toggleModal(false);
  };

  const savePostHandler = (postData, onSuccess) => {
    const token42 = localStorage.getItem('headertoken');

    let params = {
      ...postData,
      user_post: postData.post,
      images: postData.images,
      videos: postData.videos,
    };

    props.CreatePostAction(params, token42, (res) => {
      if (res.success) {
        geUserPosts();
        toggleModal(false);
        onSuccess && onSuccess();
      }
    });
  };

  const saveComment = (params) => {
    const token43 = localStorage.getItem('headertoken');

    props.saveCommentAction(params, token43, (res) => {
      if (res.success) {
        toggleModal(false);
        // props.close(false);
      }
    });
  };

  const deletePost = (e) => {
    //console.log('e', e);
    let index = e.index;
    let arr = postData1.filter((itm, i) => i != index);
    const token = localStorage.getItem('headertoken');

    setLoader(true);

    dispatch(
      deletePostAction(e, token, (res) => {
        if (res.success) {
          setLoader(false);
          setPostData1(arr);
        }
      })
    );
  };
  function formatDate(newDate) {
    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    };
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const d = new Date(newDate);
    const year = d.getFullYear();
    const date = d.getDate();
    const monthIndex = d.getMonth();
    const monthName = months[d.getMonth()];
    const dayName = days[d.getDay()]; // Thu
    const formatted = `${monthName} ${date},  ${year}`;
    return formatted.toString();
  }

  const loadCard = [1, 2, 3, 4, 5];

  const togglePrviewImage = (url = '', userId) => {
    setActiveUserId(userId);
    setPreviewImageUrl(url);
    document.getElementById('imageModalBtn').click();
  };

  // updatePost({ index, type: 'update', comment: res.comment[0], rIndex: i })
  const updatePost = (p) => {
    // console.log("updatePost", p)
    let comment;
    let comments = [];

    if (postData1[p.index].comment && postData1[p.index].comment.length)
      comments = postData1[p.index].comment;

    if (p.comment) {
      comment = p.comment;
      comment.createdBy = crendentialModel.getUser();
      if (p.type == 'reply') comments.push(comment);
      if (p.type == 'update')
        comments[p.rIndex] = { ...comments[p.rIndex], ...comment };
    }

    if (p.type == 'delete') {
      comments = comments.filter((itm, i) => i != p.rIndex);
    }

    comments.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    postData1[p.index].comment = comments;
    // setPostData1(postData1)
    // console.log("comments", comments)
  };

  const updateReply = (p) => {
    // console.log("updateReply", p)
    let comment;
    let childComment = [];

    if (p.comment) {
      comment = p.comment;
      comment.createdBy = crendentialModel.getUser();
    }

    if (postData1[p.index].comment[p.rIndex].childComment) {
      childComment = postData1[p.index].comment[p.rIndex].childComment;
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

    childComment.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    postData1[p.index].comment[p.rIndex].childComment = childComment;
    // setPostData1(postData1)

    setTimeout(() => {
      document.getElementById('setShowCommentReplyId').click();
    }, 300);
  };

  const updateThread = (p) => {
    let data = methodModel.updateThread({
      type: 'update',
      data: p.data,
      list: postData1,
      index: p.index,
    });
    setPostData1(data);
  };

  function sideScroll(element, direction, speed, distance, step) {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction == 'left') {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }

  const scrollLeft = () => {
    var container = document.getElementById('event_row');
    sideScroll(container, 'left', 25, 100, 10);
  };

  const scrollRight = () => {
    var container = document.getElementById('event_row');
    sideScroll(container, 'right', 25, 100, 10);
  };

  useEffect(() => {
    let divElement = document.getElementById('event_row');
    divElement.addEventListener('scroll', () => {
      const scrollPosition = divElement.scrollLeft;
      console.log(`Horizontal scroll position: ${scrollPosition}`);
      if (scrollPosition != '0') setscroll({ left: true, right: true });
      if (scrollPosition == '0') setscroll({ left: false, right: true });
      if (scrollPosition == '1062') setscroll({ left: true, right: false });
    });
  }, []);

  return (
    <>
      <a id="setPostData1" onClick={() => setPostData1(postData1)}></a>
      <section
        className="page--wrappers main_wrapper pt-3"
        style={{ backgroundColor: '#eee', height: 'auto' }}
      >
        <div className="container profile-container">
          <div className="row">
            {/* {/ <!-- Main Content Start --> /} */}

            <div className="col-md-2">
              <div
                style={{ marginLeft: '-50px' }}
                className="stickycls marginunset"
              >
                <span className="trendingevents">Trending Events</span>
                <div className="main_row">
                  <div className="list_row" id="event_row">
                    {eventlist &&
                      eventlist.map((item) => {
                        return (
                          <a
                            onClick={() => {
                              history(`/event/${item.title}`);
                            }}
                            target="_blank"
                          >
                            <div className=" d-flex bgmain">
                              <div
                                className="list_name text-truncate mt-2"
                                style={{
                                  border: '1px solid gray',
                                  color: '#fff',
                                  borderRadius: '5px',
                                  textAlign: 'center',
                                  padding: '2px',
                                  fontSize: '11px',
                                  backgroundColor: '#7676c9',
                                }}
                              >
                                {item.title}
                              </div>

                              <div
                                className="text-truncate ml-3 mt-2 "
                                style={{ fontSize: '12px' }}
                              >
                                {formatDate(item.startDate)}
                              </div>
                              {/* <div className="">{item.endDate}</div> */}
                            </div>
                          </a>
                        );
                      })}
                  </div>
                  {scroll?.left ? (
                    <span
                      class="material-icons icon_scroll"
                      onClick={(e) => scrollLeft()}
                    >
                      keyboard_double_arrow_left
                    </span>
                  ) : null}
                  {scroll?.right ? (
                    <span
                      class="material-icons icon_scroll2"
                      onClick={(e) => scrollRight()}
                    >
                      keyboard_double_arrow_right
                    </span>
                  ) : null}
                </div>
                <a
                  className="mt-2 show-more-btn"
                  onClick={() => {
                    history('/events');
                  }}
                >
                  Show More
                </a>
              </div>
            </div>

            <div className="main--content col-md-6 mb-3">
              <div className="main--content--inner">
                <div className="">
                  <Story/>
                  <div className="position-relative postinput bg-white roundedCard mt-2">
                    <CreatePost
                      isOpen={openModal}
                      handleModal={handleModal}
                      savePostHandler={savePostHandler}
                    />
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
                  togglePrviewImage={togglePrviewImage}
                  deletePost={deletePost}
                  updateThread={updateThread}
                  setPostData1={setPostData1}
                  posts={postData1}
                  updatePost={updatePost}
                  updateReply={updateReply}
                  setLoader={setLoader}
                  geUserPosts={geUserPosts}
                  user={props.user}
                  commentHandler={saveComment}
                />
              </div>
            </div>

            <div className="main--sidebar col-md-4">
              <Rightwidges />
            </div>
          </div>
        </div>
      </section>

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
            <div className="modal-body ml-5">
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
  CreatePostAction,
  // updateProjectAction,
  saveCommentOnThreadAction,
  getPostCommentsAction,
  getUserPosts,
  saveCommentAction,
  getprojectList,
  imageUpload,
  deletePostAction,
  videoUpload,
  getadvertiseDetail,
  getyoutubeDetail,
  getUserById,
})(UserDashboard);
