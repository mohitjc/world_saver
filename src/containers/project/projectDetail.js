import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import empty from '../../assets/img/empty.jpg';
import {
  getprojectDetail,
  getProjectMembers,
  addFriendAction,
  getJourneyMedia,
  getprojectPosts,
  updateProject,
  getprojectList,
} from '../../actions/project/index.js';
import './style.scss';
import { joinProject } from '../../actions/project/index.js';
import { getUserById, uploadCoverImage } from '../../actions/user/index.js';
import { addFriend } from '../../actions/project/index.js';
import Map from '../../components/common/Map.js';
import { ICON_LIST } from '../../components/common/constants.js';
import { apiUrl } from '../../environment/index.js';
import CreatePost from '../../components/Posts/CreatePost.js';
import {
  CreatePostAction,
  deletePostAction,
  saveCommentAction,
  sharePost,
} from '../../actions/posts/PostsActions.js';
import RightSidebar from '../../components/global/rightsidebar/index.js';
import { unFriend } from '../../actions/project/index.js';
import { orderBy } from 'lodash';
import Rightwidges from '../../components/global/Rightwidges/index.js';
import StickyBox from 'react-sticky-box';
import { is_loading } from '../../actions/category/index.js';
import { imageUpload, videoUpload } from '../../actions/common/index.js';
import ApiClient from '../../api-client/index.js';
import NewJAdminModal from './NewJourneyAdminModal.jsx';
import moment from 'moment';
import crendentialModel from '../../components/credentialsModel.js';
import load from '../../components/loaderMethod/index.js';
import DashboardPost from '../../components/Posts/DashboardPost.js';
import methodModel from '../../models/method.model.js';
import { useParams } from 'react-router-dom';

const ProjectView = () => {
  const [projectData, setProjectData] = useState();
  const Slug = useParams();
  const user = useSelector((state) => state.user);
  console.log(projectData, '===projectData');
  const [projectDataImg, setProjectDataImg] = useState();
  const [journeybanner, setjourneybanner] = useState();
  const [memberDetails, setMemberDetails] = useState([]);
  const [rightclose, setRightClose] = useState(false);
  const [projectMembers, setProjectMembers] = useState([]);
  const [jouernyImages, setJouernyImages] = useState([]);
  const history = useNavigate();
  const [jouernyVideos, setJouernyVideos] = useState([]);
  const [isImgUploading, setImgUploading] = useState(false);
  const [openModal, toggleModal] = useState(false);
  const [postData, setPostData] = useState([]);
  const coverImageInput = useRef(null);
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [activeUserId, setActiveUserId] = useState();
  const [event, showevent] = useState(false);
  const [data, setdata] = useState([]);
  const [eventlist, setEventlist] = useState([]);
  const [readMore, setreadMore] = useState(false);
  const array = [
    {
      label: 'Last Active',
      value: 'Last Active',
    },
    {
      label: 'Newly Registered',
      value: 'Newly Registered',
    },
    {
      label: 'Alphabetical',
      value: 'Alphabetical',
    },
  ];

  useEffect(() => {
    const arr = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
          geo: {
            lat: '-43.9509',
            lng: '-34.4618',
          },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
          name: 'Deckow-Crist',
          catchPhrase: 'Proactive didactic contingency',
          bs: 'synergize scalable supply-chains',
        },
      },
      {
        id: 3,
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        address: {
          street: 'Douglas Extension',
          suite: 'Suite 847',
          city: 'McKenziehaven',
          zipcode: '59590-4157',
          geo: {
            lat: '-68.6102',
            lng: '-47.0653',
          },
        },
        phone: '1-463-123-4447',
        website: 'ramiro.info',
        company: {
          name: 'Romaguera-Jacobson',
          catchPhrase: 'Face to face bifurcated interface',
          bs: 'e-enable strategic applications',
        },
      },
      {
        id: 4,
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        address: {
          street: 'Hoeger Mall',
          suite: 'Apt. 692',
          city: 'South Elvis',
          zipcode: '53919-4257',
          geo: {
            lat: '29.4572',
            lng: '-164.2990',
          },
        },
        phone: '493-170-9623 x156',
        website: 'kale.biz',
        company: {
          name: 'Robel-Corkery',
          catchPhrase: 'Multi-tiered zero tolerance productivity',
          bs: 'transition cutting-edge web services',
        },
      },
      {
        id: 5,
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        address: {
          street: 'Skiles Walks',
          suite: 'Suite 351',
          city: 'Roscoeview',
          zipcode: '33263',
          geo: {
            lat: '-31.8129',
            lng: '62.5342',
          },
        },
        phone: '(254)954-1289',
        website: 'demarco.info',
        company: {
          name: 'Keebler LLC',
          catchPhrase: 'User-centric fault-tolerant solution',
          bs: 'revolutionize end-to-end systems',
        },
      },
      {
        id: 6,
        name: 'Mrs. Dennis Schulist',
        username: 'Leopoldo_Corkery',
        email: 'Karley_Dach@jasper.info',
        address: {
          street: 'Norberto Crossing',
          suite: 'Apt. 950',
          city: 'South Christy',
          zipcode: '23505-1337',
          geo: {
            lat: '-71.4197',
            lng: '71.7478',
          },
        },
        phone: '1-477-935-8478 x6430',
        website: 'ola.org',
        company: {
          name: 'Considine-Lockman',
          catchPhrase: 'Synchronised bottom-line interface',
          bs: 'e-enable innovative applications',
        },
      },
      {
        id: 7,
        name: 'Kurtis Weissnat',
        username: 'Elwyn.Skiles',
        email: 'Telly.Hoeger@billy.biz',
        address: {
          street: 'Rex Trail',
          suite: 'Suite 280',
          city: 'Howemouth',
          zipcode: '58804-1099',
          geo: {
            lat: '24.8918',
            lng: '21.8984',
          },
        },
        phone: '210.067.6132',
        website: 'elvis.io',
        company: {
          name: 'Johns Group',
          catchPhrase: 'Configurable multimedia task-force',
          bs: 'generate enterprise e-tailers',
        },
      },
      {
        id: 8,
        name: 'Nicholas Runolfsdottir V',
        username: 'Maxime_Nienow',
        email: 'Sherwood@rosamond.me',
        address: {
          street: 'Ellsworth Summit',
          suite: 'Suite 729',
          city: 'Aliyaview',
          zipcode: '45169',
          geo: {
            lat: '-14.3990',
            lng: '-120.7677',
          },
        },
        phone: '586.493.6943 x140',
        website: 'jacynthe.com',
        company: {
          name: 'Abernathy Group',
          catchPhrase: 'Implemented secondary concept',
          bs: 'e-enable extensible e-tailers',
        },
      },
      {
        id: 9,
        name: 'Glenna Reichert',
        username: 'Delphine',
        email: 'Chaim_McDermott@dana.io',
        address: {
          street: 'Dayna Park',
          suite: 'Suite 449',
          city: 'Bartholomebury',
          zipcode: '76495-3109',
          geo: {
            lat: '24.6463',
            lng: '-168.8889',
          },
        },
        phone: '(775)976-6794 x41206',
        website: 'conrad.com',
        company: {
          name: 'Yost and Sons',
          catchPhrase: 'Switchable contextually-based project',
          bs: 'aggregate real-time technologies',
        },
      },
      {
        id: 10,
        name: 'Clementina DuBuque',
        username: 'Moriah.Stanton',
        email: 'Rey.Padberg@karina.biz',
        address: {
          street: 'Kattie Turnpike',
          suite: 'Suite 198',
          city: 'Lebsackbury',
          zipcode: '31428-2261',
          geo: {
            lat: '-38.2386',
            lng: '57.2232',
          },
        },
        phone: '024-648-3804',
        website: 'ambrose.net',
        company: {
          name: 'Hoeger LLC',
          catchPhrase: 'Centralized empowering task-force',
          bs: 'target end-to-end models',
        },
      },
    ];

    let sorting = [...arr].sort(() => 0.5 - Math.random());
    let res = sorting.slice(0, 3);
    res.filter((itm) => console.log(itm.name));
    res.map((itm) => console.log(itm.name));
    // Notification.requestPermission()
    // let show = document.visibilityState == 'visible'
    // let notify = new Notification('title', { body: "Hello World" })
    // notify.onclick = () => {
    //   alert('Poped-Up')
    // }
  }, [event]);

  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [value, setvalue] = useState([]);
  const [friendsList, setFriendsList] = useState();

  const [activePostId, setActivePostId] = useState('');

  const token100 = localStorage.getItem('headertoken');
  const getProjectMembersAll = (id) => {
    ApiClient.get(
      `${apiUrl}/getProjectMembers`,
      { project_id: id ? id : projectData.id, page: 1, count: 1000 },
      `Bearer ${token100}`
    ).then((result) => {
      if (result && result.success) {
      }
      dispatch(is_loading(false));
    });
  };

  const getprojectPosts = (id) => {
    let url = `${apiUrl}/projectPosts`;
    let parms = { project_id: id ? id : projectData.id, userId: user.id };

    setLoader(true);
    ApiClient.get(url, parms).then((res) => {
      if (res.success) {
        setLoader(false);
        const resData = res.posts;
        const resDataSorted = orderBy(resData, 'updatedAt', 'desc');
        setPostData(resDataSorted);

        let params = new URLSearchParams(window.location.search);
        let postId = params.get('postId');
        setTimeout(() => {
          if (postId) methodModel.scrollById(`post_${postId}`);
        }, 200);
      }
    });
  };

  const deletePost = (e) => {
    console.log('e', e);
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
  const GetJourney = () => {
    ApiClient.get(
      `${apiUrl}/slug/projectData?user_id=${user?.id}&slug=${Slug?.id}`
    ).then((res) => {
      if (res.success) {
        ApiClient.get(`${apiUrl}/events?journey=${res?.data?.id}`).then(
          (res2) => {
            if (res2?.success) {
              setEventlist(res2?.data);
            }
          }
        );
      }
    });
  };

  useEffect(() => {
    GetJourney();
  }, []);

  const togglePrviewImage = (url = '', userId) => {
    setActiveUserId(userId);
    setPreviewImageUrl(url);
    document.getElementById('imageModalBtn').click();
  };

  const updatePost = (p) => {
    // console.log("updatePost", p)
    let comment;
    let comments = [];

    if (postData[p.index].comment && postData[p.index].comment.length)
      comments = postData[p.index].comment;

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

    postData[p.index].comment = comments;
  };

  const updateReply = (p) => {
    // console.log("updateReply", p)
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

    childComment.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    postData[p.index].comment[p.rIndex].childComment = childComment;

    setTimeout(() => {
      document.getElementById('setShowCommentReplyId').click();
    }, 300);
  };

  const getLastActiveMember = (e) => {
    let payload = 'createdAt asc';
    if (e.target.value == 'Last Active') {
      payload = 'createdAt asc';
    } else if (e.target.value == 'Newly Registered') {
      payload = 'createdAt desc';
    } else if (e.target.value == 'Alphabetical') {
      // setPayloadData("memberName asc")
      payload = 'memberName asc';
    }

    ApiClient.get(
      `${apiUrl}/getProjectMembers`,
      {
        project_id: projectData.id,
        sortBy: payload,
        page: 1,
        count: 1000,
      },
      `Bearer ${token100}`
    )

      .then((result) => {
        setProjectMembers(result.members);
        if (result.success) {
        }
        dispatch(is_loading(false));
      });
  };

  useEffect((params) => {
    getProject();
    friendList();
  }, []);

  const headerJourneyList = () => {
    setTimeout(() => {
      document.getElementById('getJourney').click();
    }, 500);
  };

  const getData = (id) => {
    getprojectPosts(id);
    getProjectMembersAll(id);
    getUserById({ id: id }, user.access_token, (res) => {
      if (res.success) {
        setMemberDetails(res.data);
      }
    });

    getProjectMembers(
      { project_id: id, page: 1, count: 1000 },
      user.access_token,
      (res) => {
        if (res.success) {
          setProjectMembers(res.members);
        }
      }
    );

    getJourneyMedia(
      { project_id: id, type: 'images' },
      user.access_token,
      (res) => {
        if (res.success) {
          setJouernyImages(res.data);
        }
      }
    );

    getJourneyMedia(
      { project_id: id, type: 'videos' },
      user.access_token,
      (res) => {
        if (res.success) {
          setJouernyVideos(res.data);
        }
      }
    );
  };

  const getProject = () => {
    let token = localStorage.getItem('headertoken');
    ApiClient.get(
      `${apiUrl}/slug/projectData`,
      { user_id: user.id, slug: id },
      `Bearer ${token}`
    ).then((res) => {
      if (res && res?.success) {
        setProjectData(res?.data);
        getData(res?.data?.id);
      }
    });
  };

  const handleModal = (status) => {
    toggleModal(false);
  };

  const savePostHandler = (postData, onSuccess) => {
    let params = {
      ...postData,
      user_post: postData.post,
      images: postData.images,
      videos: postData.videos,
      project_id: projectData.id,
    };

    CreatePostAction(params, user.access_token, (res) => {
      if (res.success) {
        toggleModal(false);
        getprojectPosts();
        // let value = methodModel.addThread({ type: 'add', list: postData, data: res.data.post })
        // console.log("value", value)
        onSuccess && onSuccess();
      }
    });
  };

  const saveComment = (params) => {
    saveCommentAction(params, user.access_token, (res) => {
      if (res.success) {
        toggleModal(false);
        getprojectPosts();
      }
    });
  };

  const friendList = () => {
    const userID = localStorage.getItem('userID');
    let token = localStorage.getItem('headertoken');
    const getUrl = `${apiUrl}/friends`;
    ApiClient.get(getUrl, userID, `Bearer ${token}`).then((result) => {
      if (result && result.success) {
        //console.log(result.friends, 'resultnew');
        let arr = result.friends;
        arr.map((item) => {
          return { label: item.fullName, value: item.id };
        });

        setFriendsList(
          arr.map((item) => {
            return { label: item.fullName, value: item.id };
          })
        );
      }
    });
  };

  const handleInvite = (projectId) => {
    setLoader(true);
    const params = { project_id: projectId, user_id: user.id };
    joinProject(params, user.access_token, (res) => {
      if (res.success) {
        setLoader(false);
        getProject();
        headerJourneyList();
        toggleModal(false);
      }
    });
  };

  const handleUninvite = (projectId) => {
    const inviteToken1 = localStorage.getItem('headertoken');
    setLoader(true);

    const params = { project_id: projectId, user_id: user.id };

    unFriend(params, inviteToken1, (res) => {
      if (res.success) {
        setLoader(false);
        getProject();
        headerJourneyList();
        toggleModal(false);
      }
    });
  };

  const journeyOwner = (projectId) => {
    const inviteToken1 = localStorage.getItem('headertoken');
    // setLoader(true);
    toggleModal(true);
    const params = { project_id: projectId, user_id: user.id };
  };

  if (!projectData) return false;

  const uploadCoverImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      // setImgUploading(true);
      // setLoader(true);
      imageUpload({ type: 'project', data: reader.result }, (res) => {
        if (res.success) {
          // setLoader(false);
          setjourneybanner(res.data);
          updateProject(
            { banner_image: res.data.imagePath, id: projectData.id },
            user.access_token
          );

          getProject();
        } else {
        }
      });
    };
  };

  const upload = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImgUploading(true);
      // setLoader(true);
      imageUpload({ type: 'project', data: reader.result }, (res) => {
        if (res.success) {
          setImgUploading(false);
          setProjectDataImg(res.data);
          updateProject(
            { image: res.data.imagePath, id: projectData.id },
            user.access_token
          );

          getProject();
        }
      });
    };
  };

  const handleOnchange = (val) => {
    let arr = [];
    arr.push(val);
    setvalue(arr);
  };

  const onSharePostFriendss = () => {
    let user = crendentialModel.getUser();
    const payload = {
      sharedBy: user.id,
      post_id: activePostId,
      share_withId: value,
      share_with: 'friends',
    };
    let token = localStorage.getItem('headertoken');

    load(true);
    dispatch(
      sharePost(payload, token, (res) => {
        if (res.success) {
          document.getElementById('closeFriendModal').click();
        }
        load(false);
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


  return  <>
  <div className="banner--section bg--img">
    <div id="getProject" onClick={() => getProject()}></div>

    <label
      className="profile-banner"
      style={{
        backgroundImage: `url('${
          (journeybanner && journeybanner.imagePath) ||
          projectData.banner_image
            ? `${apiUrl}${
                (journeybanner && journeybanner.imagePath) ||
                projectData.banner_image
              }`
            : 'https://mayvinci.com/wp-content/uploads/2014/06/placehold.it-1280x850.gif'
        }')`,
      }}
    >
      {projectData.users[0] == localStorage.getItem('userID') ? (
        <>
          <input
            ref={coverImageInput}
            type="file"
            className="d-none"
            accept="image/*"
            onChange={(e) => uploadCoverImage(e.target.files[0])}
          />
          <i className="fas fa-pen editIcon"></i>
        </>
      ) : (
        <> </>
      )}
    </label>

    <article className="container">
      {/* <div className="form-row"> */}

      {/* <div className="col-lg-2"> */}
      <div className="text-center profile-user mb-0 journey-user position-relative">
        <div className="profile_imgWraper">
          <label className="m-0">
            <img
              src={
                (projectDataImg && projectDataImg.imagePath) ||
                projectData.image
                  ? `${apiUrl}${
                      (projectDataImg && projectDataImg.imagePath) ||
                      projectData.image
                    }`
                  : 'https://as2.ftcdn.net/jpg/00/65/77/27/500_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'
              }
              className="profile-img"
            />

            {/* <div className="profileActins"> */}
            {projectData?.users[0] == localStorage?.getItem('userID') ? (
              <>
                {isImgUploading ? (
                  <span className="font-weight-bold">uploading...</span>
                ) : (
                  <div className="profileEdit">
                    <input
                      ref={inputFile}
                      type="file"
                      // value={image}
                      id="profileImage"
                      className="d-none"
                      accept="image/*"
                      onChange={(e) => upload(e?.target?.files[0], 'img')}
                    />

                    <i className="fas fa-edit"></i>
                  </div>
                )}
              </>
            ) : (
              <> </>
            )}
          </label>
          {projectData.createdBy?.id == localStorage.getItem('userID') ? (
            <a
              className="journer-name-block"
              onClick={() => {
                journeyOwner(projectData.id);
              }}
            >
              journey owner
            </a>
          ) : projectData && projectData ? (
            projectData.isMember && projectData?.creeatedBy !== user?.id ? (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  handleUninvite(projectData.id);
                }}
              >
                Leave journey
              </button>
            ) : localStorage.getItem('userID') ? (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  handleInvite(projectData.id);
                }}
                title="Click to join journey"
              >
                <i className="fa fa-user mr-2"></i>
                Join Journey
              </button>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>

        <div className="journery_name pt-3">
          <h4>{projectData.name}</h4>
          <p className={`${!readMore ? 'journyDes2' : 'journyDes'} mb-1`}>
            {projectData.description}
          </p>
          {projectData.description?.length > 53 ? (
            <div className=" a_class text-center">
              <a onClick={(e) => setreadMore(!readMore)}>
                {!readMore ? 'Read More' : 'Read Less'}
              </a>
            </div>
          ) : null}
        </div>
      </div>

      {/* </div> */}
      {/* </div> */}
    </article>
  </div>

  {/* <!-- Page Wrapper Start --> */}
  <section className="page--wrapper main_wrapper main_wrapper_inside">
    <div className="container profile-container">
      <div className="row">
        {/* <!-- Main Content Start --> */}
        <div className="main--content col-md-8">
          <ul className="nav nav-pills bg" id="pills-tab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="pills-home-tab"
                data-toggle="pill"
                href="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
                onClick={() => {
                  showevent(false);
                }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                onClick={() => {
                  showevent(false);
                }}
              >
                World Savers
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-contact-tab"
                data-toggle="pill"
                href="#pills-contact"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
                onClick={() => {
                  showevent(false);
                }}
              >
                Media
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-map-tab"
                data-toggle="pill"
                href="#pills-map"
                role="tab"
                aria-controls="pills-map"
                aria-selected="false"
                onClick={() => {
                  showevent(false);
                }}
              >
                Map
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-event-tab"
                data-toggle="pill"
                onClick={() => {
                  showevent(true);
                }}
                aria-selected="false"
              >
                Events
              </a>
            </li>
          </ul>
          {!event ? (
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="mb-3 mt-3">
                  <div className="position-relative postinput bg-white shadow roundedCard">
                    {projectData.isMember == true ? (
                      <CreatePost
                        isOpen={openModal}
                        handleModal={handleModal}
                        placehoder="Share a comment with this journey..."
                        savePostHandler={savePostHandler}
                      />
                    ) : (
                      <></>
                    )}
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
                  setPostData1={setPostData}
                  posts={postData}
                  updatePost={updatePost}
                  updateReply={updateReply}
                  setLoader={setLoader}
                  geUserPosts={getprojectPosts}
                  user={user}
                  memberDetails={memberDetails}
                  commentHandler={saveComment}
                />
              </div>

              {/* <!-- Load More Button End --> */}
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div className="filter--nav pb--50 clearfix mt-2">
                  <div className="filter--options float--right">
                    <label>
                      <span className="fs--14 ff--primary fw--500 text-darker">
                        Show By :
                      </span>
                      <select
                        name="membersfilter"
                        className="form-control form-sm"
                        data-trigger="selectmenu"
                        onChange={(e) => getLastActiveMember(e)}
                      >
                        {array &&
                          array.map((item, i) => (
                            <option key={i}>{item.value}</option>
                          ))}
                      </select>
                    </label>
                  </div>
                </div>

                {/* <!-- Member Items Start --> */}
                <div className="member--items">
                  <div className="row gutter--15 AdjustRow">
                    {/* <!-- Member Item Start --> */}
                    {projectMembers &&
                      projectMembers.map((member, i) => {
                        const Activedays = moment(
                          member?.member_id?.lastLogin
                        )
                          .utc()
                          .format('YYYY-MM-DD');
                        return member.member_id ? (
                          <div
                            className="col-lg-3 col-md-4 col-xs-6 col-xxs-12"
                            key={i}
                          >
                            <div
                              className="member--item online"
                              key={`mi-${i}`}
                            >
                              {member.member_id ? (
                                <div className="img img-circle">
                                  <Link
                                    to={`/${
                                      member.member_id
                                        ? member.member_id.username
                                        : member.username
                                    }`}
                                    className="btn-link"
                                  >
                                    <img
                                      src={
                                        member?.member_id?.image
                                          ? apiUrl +
                                            member?.member_id?.image
                                          : 'https://as2.ftcdn.net/jpg/00/65/77/27/500_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'
                                      }
                                    />
                                  </Link>
                                </div>
                              ) : (
                                ''
                              )}

                              {member.member_id ? (
                                <div className="name">
                                  {member.member_id ? (
                                    <h3 className="h6 fs--12">
                                      <Link
                                        to={`/${member.member_id.username}`}
                                        className="btn-link"
                                      >
                                        {member.member_id.fullName}
                                      </Link>
                                    </h3>
                                  ) : (
                                    'No World Saver'
                                  )}
                                </div>
                              ) : (
                                ''
                              )}

                              {member.member_id ? (
                                <div className="activity">
                                  <p>
                                    <i className="fa mr--8 fa-clock-o"></i>
                                    {/* Active 5 monts ago */}
                                    Active {Activedays}
                                  </p>
                                </div>
                              ) : (
                                ''
                              )}

                              <div className="actions">
                                <ul className="nav">
                                  {/* <li>
                                  <a
                                    href="#"
                                    title="Send Message"
                                    className="btn-link"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                  >
                                    <i className="fa fa-comments"></i>
                                  </a>
                                </li> */}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        );
                      })}
                  </div>
                </div>
                {/* <!-- Member Items End --> */}
              </div>

              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <div className="main--content-inner drop--shadow bg-white">
                  {/* <!-- Gallery Header Start --> */}
                  <div className="gallery--header pb--15 clearfix">
                    <div className="gallery--title float--left">
                      <h3 className="h3 fw--500 text-default">
                        Media Gallery
                      </h3>
                    </div>
                  </div>
                  {/* <!-- Gallery Header End --> */}

                  <ul
                    className="nav nav-pills mb-2 media-nav"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link active"
                        id="pills-photos-tab"
                        data-toggle="pill"
                        href="#pills-photos"
                        role="tab"
                        aria-controls="pills-photos"
                        aria-selected="true"
                      >
                        Photos
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="pills-videos-tab"
                        data-toggle="pill"
                        href="#pills-videos"
                        role="tab"
                        aria-controls="pills-videos"
                        aria-selected="false"
                      >
                        Videos
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="pills-other-tab"
                        data-toggle="pill"
                        href="#pills-other"
                        role="tab"
                        aria-controls="pills-other"
                        aria-selected="false"
                      >
                        All
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade active show"
                      id="pills-photos"
                      role="tabpanel"
                      aria-labelledby="pills-photos-tab"
                    >
                      <div className="photos-row">
                        {jouernyImages &&
                          jouernyImages.map((image, i) => {
                            if (i >= 9) {
                              return;
                            } else {
                              return (
                                <a
                                  key={`cct-img-${i}`}
                                  data-toggle="modal"
                                  data-overlay="0.1"
                                >
                                  <img
                                    src={
                                      image.imagePath === '' ||
                                      image.imagePath === undefined
                                        ? empty
                                        : apiUrl + image.imagePath
                                    }
                                    style={{ width: '100%' }}
                                  />
                                </a>
                              );
                            }
                          })}
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-videos"
                      role="tabpanel"
                      aria-labelledby="pills-videos-tab"
                    >
                      <div className="photos-row">
                        {jouernyVideos &&
                          jouernyVideos.map((video, i) => {
                            if (i >= 9) {
                              return;
                            } else {
                              return (
                                <a key={`kst-img-${i}`}>
                                  <video
                                    controls
                                    // autoPlay
                                    playsInline
                                    muted
                                    src={`${apiUrl}${video.videoPath}`}
                                    style={{ width: '100%' }}
                                  />
                                </a>
                              );
                            }
                          })}
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-other"
                      role="tabpanel"
                      aria-labelledby="pills-other-tab"
                    >
                      <div className="photos-row">
                        {jouernyImages &&
                          jouernyImages.map((image, i) => {
                            if (i >= 9) {
                              return;
                            } else {
                              return (
                                <a
                                  key={`cct-img-${i}`}
                                  data-toggle="modal"
                                  data-overlay="0.1"
                                >
                                  <img
                                    src={
                                      image.imagePath === '' ||
                                      image.imagePath === undefined
                                        ? empty
                                        : apiUrl + image.imagePath
                                    }
                                    style={{ width: '100%' }}
                                  />
                                </a>
                              );
                            }
                          })}
                        {jouernyVideos &&
                          jouernyVideos.map((video, i) => {
                            if (i >= 9) {
                              return;
                            } else {
                              return (
                                <a key={`kst-img-${i}`}>
                                  <video
                                    controls
                                    // autoPlay
                                    playsInline
                                    muted
                                    src={`${apiUrl}${video.videoPath}`}
                                    style={{ width: '100%' }}
                                  />
                                </a>
                              );
                            }
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-map"
                role="tabpanel"
                aria-labelledby="pills-map-tab"
              >
                <div className="main--content-inner drop--shadow bg-white">
                  <div className="gallery--header pb--15 clearfix">
                    <div className="gallery--title float--left">
                      {!event ? (
                        <h3 className="h3 fw--500 text-default">
                          Journey on map
                        </h3>
                      ) : null}
                    </div>
                  </div>
                  {!event ? (
                    <div className="gallery--items">
                      {projectData && (
                        <Map
                          markerList={[
                            {
                              name: projectData.name,
                              address: projectData.address,
                              lat: projectData.lng,
                              lng: projectData.lat,
                              icon: ICON_LIST.icon4,
                            },
                          ]}
                        />
                      )}
                    </div>
                  ) : null}

                  {/* <!-- Gallery Items End --> */}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="event--items row mb-5"
              id="pills-event"
              role="tabpanel"
              aria-labelledby="pills-event-tab"
              style={{ display: `${event ? 'flex' : 'none'}` }}
            >
              {eventlist.length == 0 ? (
                <>
                  <h4 className="mt-2">No Events To Show Here.</h4>
                  <div className="text-center">
                    {projectData?.createdBy?.id == user?.id ? (
                      <button
                        onClick={() => {
                          history('/addevent');
                        }}
                        className="btn btn-primary btm-sm w-25 mt-3"
                      >
                        Add Events +
                      </button>
                    ) : null}
                  </div>
                </>
              ) : null}
              {eventlist.map((itm) => {
                return (
                  <div class="card ml-3 mt-3" style={{ width: '45%' }}>
                    <img
                      class="card-img-top "
                      style={{ width: '100%', height: '35vh  ' }}
                      src={`https://endpoint.crowdsavetheworld.com/${itm?.images[0]}`}
                    />
                    <div class="card-body">
                      <h5 class="card-title">{itm?.title}</h5>
                      <p>
                        {' '}
                        {months[new Date(itm && itm.startDate).getMonth()] +
                          ' ' +
                          new Date(itm && itm.startDate).getDate() +
                          ', ' +
                          new Date(itm && itm.startDate).getFullYear()}{' '}
                        {''} {itm.time} {''} {itm.timetype}
                      </p>{' '}
                      <p class="card-text">{itm?.address}</p>
                      {itm?.cost == '' ? (
                        <p
                          className="bg-success"
                          style={{
                            width: '70px',
                            textAlign: 'center',
                            borderRadius: '5px',
                          }}
                        >
                          Free
                        </p>
                      ) : (
                        <p
                          className="btn-danger"
                          style={{
                            width: '120px',
                            textAlign: 'center',
                            borderRadius: '5px',
                          }}
                        >
                          {' '}
                          Paid: {''}
                          {itm?.cost}
                        </p>
                      )}
                      <a
                        onClick={() => {
                          history(`/event/${itm?.title}`);
                        }}
                        class="btn btn-primary"
                      >
                        View Event
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* <!-- Main Content End --> */}

        {/* <!-- Main Sidebar Start --> */}
        <div className="main--sidebar col-md-4">
          <StickyBox offsetTop={83} offsetBottom={15}>
            <Rightwidges />
          </StickyBox>
        </div>
      </div>
    </div>
    {openModal && (
      <NewJAdminModal
        isOpen={openModal}
        handleModal={handleModal}
        projectMembers={projectMembers}
        projectData={projectData}
        getProject={getProject}
        toggleModal={toggleModal}
      />
    )}
  </section>

  {rightclose ? <RightSidebar setClose={setRightClose} /> : <></>}

  <button
    type="button"
    className="d-none"
    id="friendModalBtn"
    data-toggle="modal"
    data-target="#friendModal"
  >
    friend Modal
  </button>

  <div className="modal fade" id="friendModal" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Friend List
          </h5>
          <button
            type="button"
            className="close"
            id="closeFriendModal"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <div className="form-group col-md-12">
              <div className="Friendlist"></div>

              <MultiSelect
                onChange={handleOnchange}
                options={friendsList}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSharePostFriendss}
          >
            Share
          </button>
        </div>
      </div>
    </div>
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
};


export default ProjectView
