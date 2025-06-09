/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @date: 10 June 2020
 * @author: Poonam
 */

import React from 'react';
// import Sidebar from './Sidebar';

// Login Page Layout
import LoginLayout from './layouts/authLayout';
// Internal Pages Layout
// web/src/DemoPages/Dashboards/index.js
import DashboardLayout from './layouts/dashboardLayout';

/*************** Public Layout ***************/
export const publicLayout = (props) => {
  window.scrollTo(0, 0);

  return <LoginLayout props={props} />;
};

/*************** private Layout ***************/
export const privateLayout = (props) => {
  window.scrollTo(0, 0);
  return (
    <React.Fragment>
      <DashboardLayout props={props} />
    </React.Fragment>
  );
};
