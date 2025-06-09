import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../actions/user';
import { Menu } from 'uiw';
import { connect } from 'react-redux';
import person from '../../assets/img/person.png';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../environment';
const Profile = (props) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const menu = (
    <Menu bordered style={{ minWidth: 120 }}>
      <Menu.Item
        onClick={() => {
          history(`/${props.user.username}`);
          props.setToggleBtn(false);
        }}
        text="My Profile"
      />

      <Menu.Item
        onClick={() => {
          dispatch(logout(history));
          props.setToggleBtn(false);
        }}
        text="Logout"
      />
    </Menu>
  );

  const profilePage = () => {
    history(`/${props.user.username}`);
    setTimeout(() => {
      document.getElementById('getMemberDetail').click();
    }, 300);
  };

  const linkClick = () => {
    document.getElementById('closeNavBar').click();
  };

  return (
    <div className="dropdown profileDropdown">
      <button
        className="btn text-white p-0 shadow-none"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img
          src={props.user.image ? apiUrl + props.user.image : person}
          className="header_avtar"
          alt="Profile Image"
        />
      </button>
      <div
        className="dropdown-menu profile-dropdown"
        aria-labelledby="dropdownMenuButton"
      >
        {/* <a className="dropdown-item">Welcome, {props.user.fullName}</a> */}
        <a
          className="dropdown-item"
          onClick={() => {
            profilePage();
            linkClick();
          }}
        >
          Profile
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(logout(history));
            linkClick();
          }}
        >
          Logout
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Profile);
