import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import './Header.scss';
// import { history } from '../../main/history';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import UserAvtar from '../../assets/img/icon/user-avtar.png';
import fontawesome from '@fortawesome/fontawesome';
import Project from '../../components/ProjectModal';
import { getUserProjects, getprojectList } from '../../actions/project';
import { getUserNotifications } from '../../actions/user';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Profile from './profile';
import { orderBy } from 'lodash';
import { apiUrl } from '../../environment';
import Search from './../Search';
import RightSidebar from './rightsidebar';
import { Alert } from 'reactstrap';
import person from '../../assets/img/person.png';
import { Card, CardText, CardBody } from 'reactstrap';
import {
  acceptOrRejectInvitations,
  getInvitations,
} from '../../actions/notifications';
import { useNavigate } from 'react-router-dom';

//SOCKET
import { socketConnection } from '../../utilities/socket';

fontawesome.library.add();
const Header = (props, { invitation, userId, accessToken, params }) => {
  const invitations = props.user.notifications && props.user.notifications.data;
  const [image, setImage] = useState(invitation);
  const [friendid, setfriendid] = useState({});
  const [projectData, setProjectData] = useState([]);
  const [defaultOption, setDefaultOption] = useState();
  const [rightclose, setRightClose] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [userNotifications, setUserNotifications] = useState([]);
  const options = [{ value: 'null', label: 'My Journeys' }];
  const dispatch = useDispatch();
  const history = useNavigate();
  const acceptInvitation = (invitation) => {
    let postObj = {
      notification_id: invitation.id,
      status: 'accepted',
      friendStatus: true,
    };

    const helper = (obj) => {
      const values = Object.values(obj);

      postObj.forEach((val) =>
        val && typeof val === 'object' ? helper(val) : addtoConsole(val)
      );
    };

    const addtoConsole = (val) => {};

    setfriendid(postObj);

    if (!invitation.project_id) {
      postObj['friend_id'] = invitation.sendBy.id;
      postObj['user_id'] = userId;
    } else {
      postObj['userId'] = userId;
      postObj['projectId'] = invitation.id;
    }
    dispatch(
      acceptOrRejectInvitations(postObj, accessToken, (success) => {
        if (success) {
          dispatch(getInvitations({ id: userId }));

          setImage(success.sendBy.image);
        }
      })
    );
  };

  const rejecttInvitation = (invitation) => {
    const postObj = {
      notification_id: invitation.id,
      status: 'rejected',
    };
    if (!invitation.project_id) {
      postObj['friend_id'] = invitation.sendBy.id;
      postObj['user_id'] = userId;
    } else {
      postObj['userId'] = userId;
      postObj['projectId'] = invitation.id;
    }
    dispatch(
      acceptOrRejectInvitations(postObj, accessToken, (success) => {
        if (success) {
          dispatch(getInvitations({ id: userId }));
        }
      })
    );
  };

  projectData.map((obj) => {
    const imgSrcValue = obj.image && `${apiUrl}${obj.image}`;

    if (obj?.isMember) {
      const labelValue = (
        <div className="header-dropdown-options">
          <img
            src={imgSrcValue ? imgSrcValue : UserAvtar}
            width="20"
            className="avatar"
          />{' '}
          {obj.name}
        </div>
      );
      options.push({ value: obj.id, label: labelValue });
    }
  });
  // options.push({ value: 'all', label: 'View All' });
  // options.push({ value: 'null', label: 'View All' });

  useEffect(() => {
    // socketConnection
    socketConnection.emit('new-user', { email: props.user.email });

    // Prev code

    // props.getUserProjects({ id: props.user.id }, (res) => {
    //   if (res.success) {
    //     const projectData = res.result.data;

    //     const projectDataSorted = orderBy(projectData, 'updatedAt', 'desc');
    //     setProjectData(projectDataSorted);
    //   }
    // });

    // Prev Code End

    // latest code start
    const token = props.user.access_token;
    const params = {
      user_id: props.user.id,
    };
    props.getprojectList(params, token, (res) => {
      setProjectData(res.result);
      // let ss = options.push({ user_id: props.user.id });
    });

    // latest code end

    props.getUserNotifications(
      { id: props.user.id },
      props.user.access_token,
      (res) => {
        if (res.success) {
          const userNotifications = res.data;
          setTotalNotifications(res.data.length);
          const userNotificationsSorted = orderBy(
            userNotifications,
            'updatedAt',
            'desc'
          );
          setUserNotifications(userNotificationsSorted);
        }
      }
    );
    setDefaultOption(options[0]);
  }, []);

  const _onSelect = (val) => {
    setDefaultOption(val.value);
    if (val.value !== 'null' && val.value !== 'all') {
      history(`/journey/${val.value}`);
    } else if (val.value === 'all') {
      history('/journeyList');
    }
  };

  // const { invitations } = useSelector((state) => state);
  const [modal, setModal] = useState(false);
  const close = (val) => setModal(val);

  return (
    <>
      <div>
        <header className="header--section style--1 mianheader">
          <div className="header--navbar navbar bg-blue" data-trigger="sticky">
            <div
              className="container d-flex justify-content-between"
              style={{ flexWrap: 'nowrap' }}
            >
              <div className="navbar-header mk-navbar-header d-flex align-items-center">
                <div className="header--navbar-logo navbar-brand">
                  <Link to="/">
                    <img src={logo} className="normal" alt="" />
                    <img src={logo} className="sticky" alt="" />
                  </Link>
                </div>

                {/* <form className="searchform w-100">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </form> */}
                <Search />
                <a href="" className="btn btn-light">
                  Shop
                </a>
              </div>

              <div id="headerNav" className="navbar-collapse float--right">
                <ul
                  className="header--nav-links header--nav-links1 style--1 nav ff--primary"
                  style={{ justifyContent: 'flex-end', alignItems: 'center' }}
                >
                  <Profile />

                  <li class="nav-item dropdown notification_dropdown">
                    <a>
                      {props.user &&
                      props.user.notifications &&
                      props.user.notifications.data &&
                      props.user.notifications.data.length > 0 ? (
                        <span className="notify">
                          {props.user &&
                            props.user.notifications &&
                            props.user.notifications.data &&
                            props.user.notifications.data.length}
                        </span>
                      ) : (
                        <></>
                      )}

                      <i className="fa fa-bell menuh-size" />
                    </a>
                    <div class="noti_drop_menu dropdown-menu">
                      {invitations &&
                        invitations.length > 0 &&
                        invitations.map((invitation, key) => {
                          return (
                            // <ListNotifications
                            //   key={'project' + key}
                            //   invitation={invitation}

                            //   userId={props.user.id}
                            //   accessToken={props.user.access_token}
                            // />

                            <a class="noti_item dropdown-item">
                              <div class="noti_time">
                                <h5 class="noti_title text-primary mr-2">
                                  Friend Request
                                </h5>
                                {/* 20/12/2026 */}
                              </div>

                              <div class="noti_desc">
                                <div className="mb-3">
                                  <div className="position-relative postinput p-3 bg-white">
                                    <div className="d-flex">
                                      {/* {invitation.sendBy.image} */}
                                      <img
                                        src={
                                          invitation.sendBy.image
                                            ? apiUrl + image
                                            : person
                                        }
                                        className="profile-img mb-3"
                                      />
                                      {/* <img src={NotificationImg} className="profile-img mb-3" /> */}
                                      <Card className="border-0 ">
                                        <CardBody>
                                          <CardText>
                                            Would you like to accept invite for{' '}
                                            <b>
                                              {' '}
                                              {invitation.sendBy.fullName}{' '}
                                            </b>
                                            ?
                                            {/* <label>Notification:</label> */}
                                            <p>{invitation.notification}</p>
                                          </CardText>
                                        </CardBody>
                                      </Card>
                                    </div>
                                    <div className="text-right">
                                      {/* <Link to={`/notifications/${id}`} className="text-primary"> */}

                                      <button
                                        className="btn btn-primary mr-2"
                                        onClick={() => {
                                          acceptInvitation(invitation);
                                        }}
                                      >
                                        Accept
                                      </button>

                                      {/* </Link> */}
                                      <button
                                        className="btn btn-primary mr-2"
                                        onClick={() =>
                                          rejecttInvitation(invitation)
                                        }
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </a>
                          );
                        })}

                      {invitations && invitations.length <= 0 && (
                        <Alert color="dark">
                          No new invites. Kindly check again later !!!
                        </Alert>
                      )}

                      <Link
                        className="read_more dropdown-item"
                        to="/notifications"
                      >
                        Read More
                      </Link>
                    </div>
                  </li>
                  <li
                    className="dropdown"
                    onClick={() => setRightClose(!rightclose)}
                  >
                    <a href="#" className="">
                      <i className="fa fa-comments menuh-size"></i>
                    </a>
                  </li>

                  <li className="dropdown megamenu">
                    <a
                      href="#"
                      onClick={() => setModal(true)}
                      className="create"
                    >
                      <span>+ Create a new Journey</span>
                    </a>
                  </li>

                  <li className="dropdown header-dropdown">
                    <Dropdown
                      options={options}
                      onChange={_onSelect}
                      value={defaultOption}
                      placeholder="Select an option"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <div>
          <Project modal={modal} close={() => close()} />
        </div>
      </div>
      {rightclose ? <RightSidebar setClose={setRightClose} /> : <></>}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getUserProjects,
  getprojectList,
  getUserNotifications,
})(Header);
