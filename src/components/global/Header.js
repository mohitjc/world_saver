import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import './Header.scss';
// import { history } from '../../main/history';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import fontawesome from '@fortawesome/fontawesome';
import ProjectModal from '../../components/ProjectModal';
import { getUserProjects, getprojectList } from '../../actions/project';
import { getUserNotifications, login_success } from '../../actions/user';
import 'react-dropdown/style.css';
import Profile from './profile';
import { apiUrl } from '../../environment';
import Search from './../Search';
import RightSidebar from './rightsidebar';
import person from '../../assets/img/person.png';
import { Dropdown as Dropdow } from 'react-bootstrap';
import LoginModal from '../../components/authComponents/LoginModal';
import SignUpModal from '../../components/authComponents/SignUpModal';
import ForgotModal from '../../components/authComponents/ForgotModal';
import ResetPassModal from '../../components/authComponents/ResetPassModal';
import { acceptOrRejectInvitations } from '../../actions/notifications';
import { useNavigate } from 'react-router-dom';

//SOCKET
import { socketConnection } from '../../utilities/socket';
import ApiClient from '../../api-client';
import Axios from 'axios';
import methodModel from '../../models/method.model';

fontawesome.library.add();

const Header = (props) => {
  let headertoken = props.user.access_token;
  const notificationResult =
    props.user.notifications && props.user.notifications.data;
  const [notitotal, setnotitotal] = useState(0);
  const [chatcount, setchatcount] = useState(0);
  const [rightclose, setRightClose] = useState(false);
  const [modal, setModal] = useState(false);
  const [journey, setJourney] = useState([]);
  const [journeyloader, setJourneyLoader] = useState(false);
  const [navToggle, setNavToggle] = useState(false);
  const dispatch = useDispatch();
  const close = (val) => setModal(val);
  const history = useNavigate();

  useEffect(() => {
    socketConnection.emit('new-user', {
      email: props.user.email,
      user_type: 1,
    });
    //console.log("commection hit")
  }, []);

  const [counter, setCounter] = useState(false);
  useEffect(() => {
    if (props.user.id == null) {
    } else {
      setTimeout(() => {
        getNotification();
        ChatNotification();
      }, 500);
    }
    if (props.user.id) {
      getUser();
    }

    getJourney();
  }, []);

  const toggle = () => {
    setNavToggle(!navToggle);
  };

  const [forgotModal, toggleForgotModal] = useState(false);
  const [isSuccesSignup, setIsSuccesSignup] = useState(false);

  const onSuccessSignup = () => {
    setIsSuccesSignup(true);
  };

  const getJourney = () => {
    let userID = localStorage.getItem('userID');
    if (userID) {
      setJourneyLoader(true);
      ApiClient.get(`${apiUrl}/getUserProjects`, {
        id: userID,
        isDeleted: false,
      }).then((res) => {
        if (res && res.result) {
          setJourney(res.result.data);
        }
        setJourneyLoader(false);
      });
    }
  };

  const UpdateNotifications = (state) => {
    const token101 = localStorage.getItem('headertoken');
    const id = props.user.id;
    const params = {
      id,
    };

    if (state == 'true') {
      const getUrl = `${apiUrl}/updateNotificationsReadStatus`;
      Axios.put(getUrl, params, `Bearer ${token101}`).then((result) => {
        getNotification();
      });
    }
  };

  const getNotification = () => {
    let token101 = localStorage.getItem('headertoken');
    props.getUserNotifications({ id: props.user.id }, token101, (res) => {
      if (res) {
        // console.log("noti res", res)
        setnotitotal(res.unread_count);
      }
    });
  };

  const _onSelect = (id) => {
    history(`/journey/${id}`);
    setTimeout(() => {
      let el = document.getElementById('getProject');
      if (el) el.click();
    }, 800);
  };

  const acceptInvitation = (invitation, event, params) => {
    event.preventDefault();

    let postObj = {
      notification_id: invitation.id,
      status: 'accepted',
      friendStatus: true,
    };

    if (!invitation.project_id) {
      postObj['friend_id'] = invitation.sendBy.id;
      postObj['user_id'] = props.user.id;
    } else {
      postObj['userId'] = props.user.id;
      postObj['projectId'] = invitation.id;
    }

    props.acceptOrRejectInvitations(postObj, headertoken, (success) => {
      const token12 = localStorage.getItem('headertoken');
      if (success) {
        document.getElementById('dropdown-basic').click();
        getNotification();
      }
    });
  };

  const rejecttInvitation = (invitation) => {
    const postObj = {
      notification_id: invitation.id,
      status: 'rejected',
    };
    if (!invitation.project_id) {
      postObj['friend_id'] = invitation.sendBy.id;
      postObj['user_id'] = props.user.id;
    } else {
      postObj['userId'] = props.user.id;
      postObj['projectId'] = invitation.id;
    }

    props.acceptOrRejectInvitations(postObj, headertoken, (success) => {
      if (success) {
        console.log('reject request', success);
        document.getElementById('dropdown-basic').click();
        getNotification();
      }
    });
  };

  const showModal = () => {
    document.getElementById('donate-button').click();
  };

  const ChatNotification = () => {
    const token = localStorage.getItem('headertoken');
    const EmailID = localStorage.getItem('EmailID');
    const getUrl = `https://chat.crowdsavetheworld.com/admin/chatCount?email=${EmailID}`;
    ///console.log(getUrl, "Chat url");
    if (EmailID)
      ApiClient.get(getUrl, `Bearer ${token}`).then((result) => {
        if (result) {
          setchatcount(result.chatCount);
        }
      });
  };

  const login = () => {
    document.getElementById('loginBtndas').click();
  };

  const signup = () => {
    document.getElementById('signupBtndsa').click();
  };

  const notiClick = () => {
    document.getElementById('dropdown-basic').click();
    UpdateNotifications('true');
    setCounter(true);
    ApiClient.put(`https://endpoint.crowdsavetheworld.com/notificatons`).then(
      (res) => {
        if (res.success) {
          getNotification();
        }
      }
    );
  };

  const journeyImg = (img) => {
    let value = '/assets/img/banner.jpg';
    if (img) value = apiUrl + img;
    return value;
  };

  const linkClick = () => {
    document.getElementById('dropdown-basic').click();

    setTimeout(() => {
      let el = document.getElementById('getProject');
      if (el) el.click();
      let el2 = document.getElementById('getMemberDetail');
      if (el2) el2.click();
    }, 100);
  };

  const getUser = () => {
    if (localStorage.getItem('userpatched')) return;
    ApiClient.get(`${apiUrl}/slug/user/${props.user.username}`).then((res) => {
      if (res?.success) {
        let user = { ...props.user, ...res.data };
        ///console.log('getUser', user);
        dispatch(login_success(user));
        localStorage.setItem('userpatched', 'true');
      }
    });
  };

  return (
    <>
      <a id="ChatNotification" onClick={() => ChatNotification()}></a>
      <header className="header--section style--1 mianheader">
        <div
          style={{ backgroundColor: 'rgb(196 196 196)' }}
          className="header--navbar navbar  p-0"
          data-trigger="sticky"
        >
          <div
            className="container d-flex justify-content-between"
            style={{ flexWrap: 'nowrap' }}
          >
            <div className="navbar-header mk-navbar-header d-flex align-items-center">
              <div
                className="header--navbar-logo navbar-brand"
                onClick={(e) => setNavToggle(false)}
              >
                <Link to="/dashboard">
                  <img src={logo} className="normal" alt="" />
                  <img src={logo} className="sticky" alt="" />
                </Link>
              </div>

              <div className="search_width px-2 w-100">
                <Search />
              </div>
              {props.user.id ? (
                <>
                  <div className="">
                    <div className="list_flex">
                      <Dropdow className="notification_dropdown">
                        <Dropdow.Toggle
                          variant="success"
                          className="d-none"
                          id="dropdown-basic"
                        ></Dropdow.Toggle>
                        <a
                          className="bgnotification2 list_row22"
                          // onClick={toggle}
                          onMouseEnter={() => {
                            methodModel.rebuildTooltip();
                          }}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Notifications"
                          onClick={() => {
                            notiClick();
                            // toggle();
                          }}
                        >
                          {notitotal > 0 ? (
                            <span className="notify">{notitotal}</span>
                          ) : (
                            <></>
                          )}
                          <span className="comments">
                            <i className="fa fa-bell menuh-size" />
                          </span>
                        </a>
                        <Dropdow.Menu className="py-0">
                          <div className="noti_drop_menu">
                            <div className="noti_wrapper">
                              {notificationResult &&
                              notificationResult.length > 0 ? (
                                notificationResult.map((invitation, key) => {
                                  return (
                                    <a className="noti_item" key={key}>
                                      <div className="noti_desc">
                                        <Link
                                          to={`/${invitation?.sendBy?.username}`}
                                        >
                                          {' '}
                                          <img
                                            src={
                                              invitation?.sendBy?.image
                                                ? apiUrl +
                                                  invitation.sendBy.image
                                                : person
                                            }
                                            className="profile-img mb-3"
                                          />
                                        </Link>

                                        <div className="noti_content">
                                          {invitation.showButtons ? (
                                            <>
                                              <Link
                                                className="text-dark"
                                                onClick={() => linkClick()}
                                                to={`/${
                                                  invitation.sendBy &&
                                                  invitation.sendBy.username
                                                }`}
                                              >
                                                <p>
                                                  You've received a friend
                                                  request from
                                                  <b>
                                                    {' '}
                                                    {invitation.sendBy &&
                                                      invitation.sendBy
                                                        .fullName}{' '}
                                                  </b>
                                                  <label>Notification:</label>
                                                </p>
                                              </Link>
                                            </>
                                          ) : (
                                            ''
                                          )}

                                          <div className="noti_action">
                                            <p className="mb-2">
                                              <p>
                                                {invitation.journey_id ? (
                                                  <Link
                                                    className="text-dark"
                                                    to={`/journey/${invitation.journey_slug}?postId=${invitation.post_id}`}
                                                    onClick={() => linkClick()}
                                                  >
                                                    {invitation.notification}
                                                  </Link>
                                                ) : (
                                                  <>
                                                    <Link
                                                      className="text-dark"
                                                      to={`/${invitation?.sendBy?.username}`}
                                                    >
                                                      {invitation.notification}
                                                    </Link>
                                                  </>
                                                )}
                                              </p>
                                            </p>
                                          </div>

                                          {invitation.showButtons ? (
                                            <div className="noti_action">
                                              <button
                                                className="btn btn-primary"
                                                onClick={(e) => {
                                                  acceptInvitation(
                                                    invitation,
                                                    e
                                                  );
                                                }}
                                              >
                                                Accept
                                              </button>
                                              <button
                                                className="btn btn-primary"
                                                onClick={() => {
                                                  rejecttInvitation(invitation);
                                                }}
                                              >
                                                Reject
                                              </button>
                                            </div>
                                          ) : (
                                            ''
                                          )}
                                        </div>
                                      </div>
                                    </a>
                                  );
                                })
                              ) : (
                                <div className="notificationcenter py-2 px-3 text-center">
                                  No Notifications
                                </div>
                              )}
                            </div>
                          </div>
                        </Dropdow.Menu>
                      </Dropdow>

                      <a
                        className="list_row22 commentss2 w-0"
                        onMouseEnter={() => {
                          methodModel.rebuildTooltip();
                        }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Messages"
                        onClick={() => {
                          // toggle();
                          setRightClose(!rightclose);
                        }}
                      >
                        <span className="comments">
                          <i className="fa fa-comments menuh-size pt-0"></i>
                        </span>

                        {chatcount > 0 ? (
                          <span className="notify">{chatcount}</span>
                        ) : (
                          <></>
                        )}
                      </a>
                    </div>
                  </div>
                  <a
                    className={`nav_toggle navbar-toggler ${
                      !navToggle ? 'collapsed' : ''
                    }`}
                    id="toogleHederMenu"
                    aria-label="Toggle navigation"
                    onClick={(e) => setNavToggle(!navToggle)}
                  >
                    {notitotal > 0 || chatcount > 0 ? (
                      <span className="notify reddot_class">
                        {chatcount + notitotal}
                      </span>
                    ) : (
                      <></>
                    )}
                    <i className="fa fa-bars"></i>
                  </a>
                </>
              ) : (
                ''
              )}

              <a onClick={(e) => setNavToggle(false)} id="closeNavBar"></a>
            </div>

            {props.user.id ? (
              <div
                className={`navbar-collapse ${navToggle ? 'show' : ''}`}
                id="navbarSupportedContent"
              >
                <ul
                  className="header--nav-links header--nav-links1 style--1 nav  headerNavMenues"
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Profile />

                  <Dropdow className="notification_dropdown">
                    <Dropdow.Toggle
                      variant="success"
                      className="d-none"
                      id="dropdown-basic"
                    ></Dropdow.Toggle>

                    <a
                      className="bgnotification"
                      onMouseEnter={() => {
                        methodModel.rebuildTooltip();
                      }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Notifications"
                      onClick={() => {
                        notiClick();
                      }}
                    >
                      {notitotal > 0 ? (
                        <span className="notify">{notitotal}</span>
                      ) : (
                        <></>
                      )}
                      <span className="comments">
                        <i className="fa fa-bell menuh-size" />
                      </span>
                    </a>
                    <Dropdow.Menu className="py-0">
                      <div className="noti_drop_menu">
                        <div className="noti_wrapper">
                          {notificationResult &&
                          notificationResult.length > 0 ? (
                            notificationResult.map((invitation, key) => {
                              return (
                                <a className="noti_item" key={key}>
                                  <div className="noti_desc">
                                    <Link
                                      to={`/${invitation?.sendBy?.username}`}
                                    >
                                      {' '}
                                      <img
                                        src={
                                          invitation?.sendBy?.image
                                            ? apiUrl + invitation.sendBy.image
                                            : person
                                        }
                                        className="profile-img mb-3"
                                      />
                                    </Link>

                                    <div className="noti_content">
                                      {invitation.showButtons ? (
                                        <>
                                          <Link
                                            className="text-dark"
                                            onClick={() => linkClick()}
                                            to={`/${
                                              invitation.sendBy &&
                                              invitation.sendBy.username
                                            }`}
                                          >
                                            <p>
                                              You've received a friend request
                                              from
                                              <b>
                                                {' '}
                                                {invitation.sendBy &&
                                                  invitation.sendBy
                                                    .fullName}{' '}
                                              </b>
                                              <label>Notification:</label>
                                            </p>
                                          </Link>
                                        </>
                                      ) : (
                                        ''
                                      )}

                                      <div className="noti_action">
                                        <p className="mb-2">
                                          <p>
                                            {invitation.journey_id ? (
                                              <Link
                                                className="text-dark"
                                                to={`/journey/${invitation.journey_slug}?postId=${invitation.post_id}`}
                                                onClick={() => linkClick()}
                                              >
                                                {invitation.notification}
                                              </Link>
                                            ) : (
                                              <>
                                                <Link
                                                  className="text-dark"
                                                  to={`/${invitation?.sendBy?.username}`}
                                                >
                                                  {invitation.notification}
                                                </Link>
                                              </>
                                            )}
                                          </p>
                                        </p>
                                      </div>

                                      {invitation.showButtons ? (
                                        <div className="noti_action">
                                          <button
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                              acceptInvitation(invitation, e);
                                            }}
                                          >
                                            Accept
                                          </button>
                                          <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                              rejecttInvitation(invitation);
                                            }}
                                          >
                                            Reject
                                          </button>
                                        </div>
                                      ) : (
                                        ''
                                      )}
                                    </div>
                                  </div>
                                </a>
                              );
                            })
                          ) : (
                            <div className="notificationcenter py-2 px-3 text-center">
                              No Notifications
                            </div>
                          )}
                        </div>
                      </div>
                    </Dropdow.Menu>
                  </Dropdow>

                  <li className="dropdown">
                    <a
                      className="commentss"
                      onMouseEnter={() => {
                        methodModel.rebuildTooltip();
                      }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Messages"
                      onClick={() => {
                        toggle();
                        setRightClose(!rightclose);
                      }}
                    >
                      <span className="comments">
                        <i className="fa fa-comments menuh-size"></i>
                      </span>

                      {chatcount > 0 ? (
                        <span className="notify">{chatcount}</span>
                      ) : (
                        <></>
                      )}
                    </a>
                  </li>

                  <li className="dropdown">
                    <a
                      className="commentss"
                      onMouseEnter={() => {
                        methodModel.rebuildTooltip();
                      }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Events"
                      onClick={() => {
                        history('/events');
                      }}
                    >
                      <span className="events">
                        <i class="fa fa-calendar-check-o menuh-size padding_icon"></i>
                      </span>
                    </a>
                  </li>

                  <li className="responhide">
                    <a className="bgnotification " href="#">
                      <span className="commentscard">
                        <img
                          src="/assets/img/donation.png"
                          class="donatecls"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Donate"
                          onClick={() => {
                            showModal();
                            toggle();
                          }}
                          onMouseEnter={() => {
                            methodModel.rebuildTooltip();
                          }}
                        />
                      </span>
                    </a>
                  </li>

                  <li class="shopcls responhide">
                    <a
                      href="https://shop.crowdsavetheworld.com/"
                      target="_new"
                      className="bgnotification"
                      onClick={toggle}
                      onMouseEnter={() => {
                        methodModel.rebuildTooltip();
                      }}
                      title="Shop"
                      data-toggle="tooltip"
                    >
                      <img src="/assets/img/Marketplace.png" class="homecls" />
                    </a>
                  </li>

                  <li className="responshow">
                    <a className="bgnotification " href="#">
                      <span className="commentscard">
                        <img
                          src="/assets/img/donation.png"
                          class="donatecls"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Donate"
                          onClick={() => {
                            showModal();
                            toggle();
                          }}
                          onMouseEnter={() => {
                            methodModel.rebuildTooltip();
                          }}
                        />
                      </span>
                    </a>
                  </li>

                  <li class="shopcls responshow">
                    <a
                      href="https://shop.crowdsavetheworld.com/"
                      target="_new"
                      className="bgnotification"
                      onClick={toggle}
                      onMouseEnter={() => {
                        methodModel.rebuildTooltip();
                      }}
                      title="Shop"
                      data-toggle="tooltip"
                    >
                      <img src="/assets/img/Marketplace.png" class="homecls" />
                    </a>
                  </li>

                  {/* <li className="Worldcl">
                    <Link
                      className="d-md-none"
                      className="bgnotification"
                      to={'/showarchives'}
                      onClick={toggle}
                      onMouseEnter={() => {
                        methodModel.rebuildTooltip();
                      }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="World Saver TV"
                    >
                      <span className="commentscard">
                        <i className="fab fa-youtube"></i>
                      </span>
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link
                      className="d-md-none"
                      to="/journeyList"
                      onClick={toggle}
                      onMouseEnter={() => {
                        methodModel.rebuildTooltip();
                      }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Journeys"
                    >
                      <a className="bgnotification" href="#">
                        <i className="fa fa-file" aria-hidden="true"></i>
                      </a>
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link
                      className="d-md-none"
                      to="/bloglisting"
                      onClick={toggle}
                      onMouseEnter={() => {
                        methodModel.rebuildTooltip();
                      }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="News and Articles"
                    >
                      <a className="bgnotification" href="#">
                        <i className="fa fa-newspaper" aria-hidden="true"></i>
                      </a>
                    </Link>
                  </li> */}
                  <li className="serchresp">
                    <Link
                      className="d-md-none serchresp text-truncate"
                      to="/worldsavers"
                      onClick={toggle}
                      onMouseEnter={() => {
                        methodModel.rebuildTooltip();
                      }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="World Savers"
                    >
                      <i className="fa fa-search"></i>
                    </Link>
                  </li>

                  <li>
                    <div className="headerline"></div>
                  </li>
                  <li className="dropdown megamenu">
                    <a
                      className="create mx-4"
                      href="#"
                      onClick={() => {
                        toggle();
                        setModal(true);
                      }}
                    >
                      <span className="text-black">+ Create a new Journey</span>
                    </a>
                  </li>

                  <li className="dropdown header-dropdown">
                    <div className="dropdown journeyDropdown">
                      <button
                        style={{ fontWeight: 'bolder' }}
                        className="btn btn-outline-black dropdown-toggle "
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-expanded="false"
                        onClick={() => getJourney()}
                      >
                        My Journeys
                      </button>
                      <div
                        id="getJourney"
                        className="d-none"
                        onClick={() => getJourney()}
                      ></div>
                      <div
                        className="dropdown-menu dropdownrepns"
                        aria-labelledby="dropdownMenuButton"
                        onClick={toggle}
                      >
                        {journeyloader ? (
                          <div className="p-2 text-center small">
                            Loading... <i className="fa fa-spinner fa-spin"></i>
                          </div>
                        ) : (
                          <></>
                        )}

                        {journey &&
                          journey.map((item) => {
                            return (
                              <>
                                <a
                                  onClick={() => _onSelect(item.slug)}
                                  key={item.id}
                                  className="dropdown-item"
                                >
                                  <img src={journeyImg(item.image)} />{' '}
                                  <span className="myjourney">{item.name}</span>
                                </a>
                              </>
                            );
                          })}

                        {/* {journey && !journey.length ? (
                        <div className="text-center">No Journeys</div>
                      ) : (
                        <></>
                      )} */}

                        <Link to="/journeyList" className="dropdown-item">
                          {/* <img src={journeyImg(item.image)} />{' '} */}
                          <span className="myjourney">View All</span>
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="btnmaindv">
                <span>
                  <a
                    data-toggle="modal"
                    id="signupBtndsa"
                    data-target="#signupModal"
                  ></a>
                  <a
                    data-toggle="modal"
                    id="loginBtndas"
                    data-target="#loginModal"
                  ></a>
                  <a
                    className="btn btn-primary signupbtn"
                    onClick={() => signup()}
                  >
                    Sign Up
                  </a>

                  <a
                    className="btn btn-primary signupbtn"
                    style={{ backgroundColor: 'gray' }}
                    onClick={() => login()}
                  >
                    Log In
                  </a>
                  {/* <Link to="/signup">
                    <span className="btn btn-primary commonbutn">Sign UP </span>
                  </Link>

                  <Link to="/signin">
                    <span className="btn btn-primary commonbutn">Log In </span>
                  </Link> */}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <ProjectModal modal={modal} close={close} />
      <LoginModal toggleForgotModal={toggleForgotModal} />
      <SignUpModal onSuccessSignup={onSuccessSignup} />
      <ForgotModal modal={forgotModal} toggleForgotModal={toggleForgotModal} />
      <ResetPassModal onSuccessSignup={onSuccessSignup} />

      {rightclose ? (
        <RightSidebar setClose={setRightClose} setchatcount={setchatcount} />
      ) : (
        <></>
      )}
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
  acceptOrRejectInvitations,
})(Header);
