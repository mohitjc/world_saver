import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logOut } from '../../store/actions/loginActions';
import getProfile from '../../store/actions/profileActions';

const Header = ({ isHome, logOut, getProfile, history, data }) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      getProfile(token);
    }
  }, [getProfile]);

  const handleLogOut = () => {
    logOut();
    history.push('/');
  };

  // console.log('getProfile', data);
  return (
    <nav
      className="navbar navbar-expand-lg main-navbar d-flex"
      style={{ justifyContent: 'flex-end' }}
    >
      <ul className="navbar-nav navbar-right">
        <li className="dropdown">
          <a
            href="#"
            data-toggle="dropdown"
            className="nav-link dropdown-toggle nav-link-lg nav-link-user"
          >
            <img
              alt="image"
              src="../assets/img/avatar/avatar-1.png"
              className="rounded-circle mr-1"
            />
            <div className="d-sm-none d-lg-inline-block">
              {data && data.firstName}
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            {/* <div className="dropdown-title">Logged in 5 min ago</div> */}
            {/* <a href="features-profile.html" className="dropdown-item has-icon">
              <i className="far fa-user" /> Profile
            </a> */}
            {/* <a
              href="features-activities.html"
              className="dropdown-item has-icon"
            >
              <i className="fas fa-bolt" /> Activities
            </a>
            <a href="features-settings.html" className="dropdown-item has-icon">
              <i className="fas fa-cog" /> Settings
            </a> */}
            {/* <div className="dropdown-divider" /> */}
            <a
              className="dropdown-item has-icon text-danger"
              onClick={handleLogOut}
              style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-sign-out-alt" /> Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({
  data: state.profile.data,
  isRequesting: state.profile.isRequesting,
  isSuccess: state.profile.isSuccess,
  isError: state.profile.isError
});

export default connect(
  mapStateToProps,
  { logOut, getProfile }
)(withRouter(Header));
