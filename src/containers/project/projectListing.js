import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import moment from 'moment';
import {
  getprojectList,
  getUserProjects,
  sendInvites,
  joinProject,
  addFriend,
} from '../../actions/project';
import { allNormalCategories } from '../../actions/category';
// import logo from '../../assets/img/logo.png';
// import { history } from '../../main/history';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../environment';
import InviteModal from './InviteModal';
import { getUserRoles } from '../../actions/user';
import empty from '../../assets/img/empty.jpg';
import Map from './../../components/common/Map';
import { ICON_LIST } from './../../components/common/constants';
import { getJournyList } from '../../actions/notifications';
import ApiClient from '../../api-client';
import load from '../../components/loaderMethod';
import RightWidgets from '../../components/global/Rightwidges';
import { toast } from 'react-toastify';

const ProjectList = (props) => {
  const [projectData, setProjectData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [markers, setMarkers] = useState();
  const [userRoles, setUserRoles] = useState();
  const category = useSelector((state) => state.category);
  const [openModal, toggleModal] = useState(false);
  const [openAddFriendModal, toggleAddFriendModal] = useState(false);
  const [selectedProject, setProject] = useState('');
  const [loading, setLoading] = useState(false);
  const [myJourney, setMyJourney] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('query')) {
      setKeyword(params.get('query'));
      search(params.get('query'));
    } else if (params.get('type') && params.get('type') == 'myJourney') {
      handleChange(true);
    } else {
      getProjectDetail();
    }
  }, []);

  const searchJourney = (e) => {
    setKeyword(e);
    search(e);
  };

  useEffect(() => {
    const tokenListing = localStorage.getItem('headertoken');

    // Get User Roles api call
    props.getUserRoles(tokenListing, (res) => {
      if (res.success) {
        // console.log("setUserRoles", res.data.roles)
        setUserRoles(res.data.roles);
      }
    });
  }, []);

  const search = (p) => {
    getProjectDetail({ search: p });
    setKeyword(p);
  };

  const getProjectDetail = (p = {}) => {
    var filter = {
      // user_id: props?.user?.id || userId,
      count: 1000,
      page: 1,
      search: keyword,
      categoryId: currentTag,
      ...p,
    };

    //console.log('p.mj', p.mj);
    let checked = p?.mj === undefined ? myJourney : p.mj;

    setLoading(true);
    var url = `${apiUrl}/project`;
    if (checked) {
      url = `${apiUrl}/getUserProjects`;
      filter = {
        id: props?.user?.id,
        count: 1000,
        page: 1,
        search: filter.search,
        categoryId: filter.categoryId,
      };
    }
    ApiClient.get(url, filter).then(
      (res) => {
        if (res?.success) {
          setLoading(false);

          var data = res.result;
          if (checked) data = res?.result?.data;
          setProjectData(data);
          getPlaces(data);
          setLoading(false);
        }
        setLoading(false);
      },
      (err) => {
        setLoading(false);
      }
    );
  };

  const handleChange = (event) => {
    setMyJourney(event);
    getProjectDetail({ mj: event });
  };

  const handleInvite = (project, sendInvite) => {
    setProject(project);
    toggleModal(true);
    document.getElementById('inviteBtn').click();
    !sendInvite && toggleAddFriendModal(true);
  };
  const handleModal = (status) => {
    toggleModal(false);
    toggleAddFriendModal(false);
  };
  const sendInvite1 = (project) => {
    if (!project.users.length) {
      toast.error('Please Select User');
      return;
    }

    // if (!project.isAddFriendModal) {
    //   if (!project.role) {
    //     toast.error("Please Select Role")
    //     return
    //   }
    // }

    load(true);
    props.sendInvites(project, props.user.access_token, (res) => {
      if (res) {
        handleModal();
        document.getElementById('inviteClose').click();
        toast.success('Invitation Sent Successfully');
      }

      load(false);
    });
  };

  const Loading = () => {
    return (
      <div className="d-flex align-items-center flex-column justify-content-center text-center py-3">
        <div className="d-flex align-items-center flex-column px-4">
          <BeatLoader color={'#5383ff'} loading={true} />
        </div>
      </div>
    );
  };

  const getDays = (date) => {
    var given = moment(date, 'YYYY-MM-DD');

    var current = moment().startOf('day');

    //Difference in number of days
    const days = moment.duration(given.diff(current)).asDays();

    return Math.abs(days);
  };

  const [currentTag, setCurrentTag] = useState(
    props?.location?.state ? props?.location?.state?.id : ''
  );

  const getPlaces = (projectData) => {
    let marker = [];
    const fltr = projectData.filter((itm) => itm.lat && itm.lng != 0);
    const sorting = fltr.slice(0, 7);
    sorting.map((itm) => {
      marker.push({
        id: itm.id,
        slug: itm.slug,
        name: itm.name,
        address: itm.address === undefined ? '-' : itm.address,
        lat: itm.lat,
        lng: itm.lng,
        icon: ICON_LIST.icon2,
      });
    });
    setMarkers(marker);
  };
  console.log(markers);
  const headerJourneyList = () => {
    document.getElementById('getJourney').click();
  };

  const catChange = (p) => {
    setCurrentTag(p);
    getProjectDetail({ categoryId: p });
  };

  const join = (projectId, e) => {
    e.preventDefault();
    const params = { project_id: projectId, user_id: props.user.id };
    // console.log(params, 'params5456465');
    props.joinProject(params, props.user.access_token, (res) => {
      if (res.success) {
        getProjectDetail();
        headerJourneyList();
        toggleModal(false);
      }
    });
  };

  return (
    <>
      <div className="wrapper">
        <div
          className="page--header pt--60 pb--60 text-center"
          data-bg-img="img/preview-img/banner-bg.jpg"
          data-overlay="0.85"
        >
          <div className="container">
            <div className="title">
              <h2 className="h1 text-white">Journey Listings </h2>
            </div>
          </div>
        </div>

        <section className="page--wrapper pt--8 pb--20">
          <div className="container-fluid">
            <div className="project-iframe">
              <Map markerList={markers} />
              {/* {markers && <Map markerList={markers} />} */}
            </div>
            <div className="row project-topbar">
              <div className="col-md-7">
                <input
                  type="text"
                  list="psychology_theories_list"
                  id="psychology_theories_search"
                  className="search-term mt-3 mb-3"
                  placeholder="Search on name, category, tags etc."
                  onChange={(e) => {
                    search(e.target.value);
                  }}
                  value={keyword}
                />
              </div>
              <div className="col-md-4" style={{ width: '10rem' }}>
                <input
                  type="checkbox"
                  id="myJourney"
                  checked={myJourney}
                  onChange={(e) => handleChange(e.target.checked)}
                />
                <span className="ml-2 lg-dt">All My Journeys</span>
              </div>
            </div>

            <section className="tag-list mt-5 mb-5 d-flex justify-content-center">
              <ul className="tags journey-tags">
                <li id="">
                  <a
                    className="tag"
                    onClick={() => {
                      catChange('');
                    }}
                    style={{
                      cursor: 'pointer',
                      color: currentTag === '' ? '#fff' : '#000',
                      backgroundColor: currentTag === '' ? '#000' : '#eee',
                    }}
                  >
                    All
                  </a>
                </li>
                {category &&
                  category.map((item, i) => {
                    if (item.category == 'project') {
                      return (
                        <CategoryItem
                          key={`category-key-${i}`}
                          item={item}
                          catChange={catChange}
                          currentTag={currentTag}
                        />
                      );
                    }
                  })}
              </ul>
            </section>
          </div>
          <div className="container-fluid">
            <div className="row">
              {/* <!-- Main Content Start --> */}
              <div className="main--content col-md-9 pb--30">
                <div className="main--content-inner">
                  <div className="row AdjustRow m-0">
                    <div className="shadow boxpadding p-3">
                      {loading ? (
                        <Loading />
                      ) : (
                        projectData.map((obj, i) => {
                          return (
                            <div
                              key={`clist-key-${i}`}
                              className="col-md-12 mb-2 p-0"
                            >
                              {/* <!-- Product Item Start --> */}
                              <div
                                className="product--item d-flex flex-wrap"
                                data-scroll-reveal="bottom"
                              >
                                {/* <!-- Product Image Start --> */}
                                <div className="product--img listing listing">
                                  {/* <img src={apiUrl + obj.image} alt="" /> */}

                                  {/* <div className="action"> */}
                                  <a
                                    href="#"
                                    onClick={() =>
                                      history(`/journey/${obj.slug}`)
                                    }
                                  >
                                    {/* <i className="fa fa-eye"></i>
                                                            <span>View Details</span> */}
                                    <img
                                      src={
                                        obj.image === '' ||
                                        obj.image === undefined
                                          ? empty
                                          : apiUrl + obj.image
                                      }
                                      alt=""
                                      // style={{ width: '100%' }}
                                      className="journyimg"
                                    />
                                  </a>
                                  {/* </div> */}
                                </div>
                                {/* <!-- Product Image End --> */}

                                {/* <!-- Product Info Start --> */}
                                <div className="product--info text-centers d-flex">
                                  <div className="box_listing text-left">
                                    <div className="cat">
                                      <p>
                                        <a
                                          href="#"
                                          onClick={() =>
                                            history(`/journey/${obj.slug}`)
                                          }
                                          className="btn-link"
                                        >
                                          {obj.name}
                                        </a>
                                      </p>
                                    </div>
                                    <p className="time-day">
                                      <i
                                        className="fa fa-clock mr-2"
                                        aria-hidden="true"
                                      ></i>
                                      Active {getDays(obj.updatedAt)} days ago
                                    </p>

                                    <p className="time-day">
                                      {obj.isMember ||
                                      obj.createdBy === props.user.id ? (
                                        'Joined journey / '
                                      ) : (
                                        <a
                                          onClick={(e) => {
                                            join(obj.id, e);
                                            history(`/journeyList/#`);
                                          }}
                                          className="text-primary"
                                          title="Click to join journey"
                                        >
                                          <i className="fa fa-user mr-2"></i>
                                          Join Journey /{' '}
                                        </a>
                                      )}
                                      {obj.users && obj.users.length} World
                                      Savers
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="actiona ">
                                      <p>
                                        <a
                                          onClick={() =>
                                            history(`/journey/${obj.slug}`)
                                          }
                                        >
                                          <span className="mt-2">
                                            View Journey
                                            <i
                                              className="fa fa-caret-right"
                                              aria-hidden="true"
                                            ></i>
                                          </span>
                                        </a>
                                      </p>
                                    </div>
                                    {/* COMMENT BY ME */}
                                    {/* {obj.createdBy === props.user.id ? ( */}

                                    {obj.isMember ||
                                    obj.createdBy === props.user.id ? (
                                      <div className="actiona ml-2 mt-2">
                                        <a
                                          title="Add Friend"
                                          onClick={() =>
                                            handleInvite(
                                              obj.id,
                                              obj.createdBy === props.user.id
                                            )
                                          }
                                        >
                                          <span>
                                            <i
                                              className="fa fa-user-plus"
                                              aria-hidden="true"
                                            ></i>
                                          </span>
                                        </a>
                                      </div>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                </div>
                                {/* <!-- Product Info End --> */}
                              </div>
                              {/* <!-- Product Item End --> */}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 main--sidebar">
                <RightWidgets
                  catChange={catChange}
                  searchJourney={searchJourney}
                />
              </div>
            </div>
          </div>
          <InviteModal
            isOpen={openModal}
            handleModal={handleModal}
            user={props.user}
            userRoles={userRoles}
            selectedProject={selectedProject}
            sendInvite1={sendInvite1}
            isAddFriendModal={openAddFriendModal}
          />
        </section>
      </div>
    </>
  );
};
// export default ProjectModal;

const mapStateToProps = (state) => ({
  data: state.category,
  user: state.user,
});

export default connect(mapStateToProps, {
  getprojectList,
  getUserProjects,
  sendInvites,
  addFriend,
  allNormalCategories,
  getUserRoles,
  getJournyList,
  joinProject,
})(ProjectList);

const CategoryItem = ({ item, catChange, currentTag, key }) => {
  // console.log(currentTag, "all items list")
  return (
    <li id={item.id}>
      <a
        className="tag"
        key={key}
        onClick={() => {
          catChange(item.id);
        }}
        style={{
          cursor: 'pointer',
          color: currentTag === item.id ? '#fff' : '#000',
          backgroundColor: currentTag === item.id ? '#000' : '#eee',
        }}
      >
        {item.name}
      </a>
    </li>
  );
};
