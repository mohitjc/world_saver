/*
 * @file: login.js
 * @description: Admin Login website
 * @date: 10 June 2020
 * @author: Poonam
 */

import React from 'react';
import Header from '../global/Header';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/user';

const DashboardLayout = ({ props }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  
  return (
    <>
    <div id="logoutBtn" onClick={()=>{dispatch(logout(history));}}></div>
      <Header {...props} />
      {props.children}
    </>
  );
};

export default DashboardLayout;
