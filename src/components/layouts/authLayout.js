/*
 * @file: login.js
 * @description: Admin Login website
 * @date: 10 June 2020
 * @author: Poonam
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../actions/user';

const LoginLayout = ({ props }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  return <>
  <div id="logoutBtn" onClick={()=>{dispatch(logout(history));}}></div>
  {props.children}</>;
};

export default LoginLayout;
