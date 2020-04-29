import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import About from './About';
import Contact from './Contact';
import Cars from './Cars';
import Counter from './Counter';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
// import PortFolio from './PortFolio';
import PrivateRoute from './PrivateRoute';
import Users from './Users';
import User from './User';
import Category from './Category';
import Questions from './Questions';
import CategoryView from './CategoryView';
import QuestionView from './QuestionView';
import Blogs from './Blogs';
import BlogView from './BlogView';
import Skills from './Skills';
import SkillView from './SkillView';
import SubscriptionNames from './SubscriptionNames';
import SubscriptionPackages from './SubscriptionPackages';
import SubscriptionTypes from './SubscriptionTypes';
import RolesAndPermissions from './RolesAndPermissions';
import Credits from './Credits';
import PublicRoute from './PublicRoute';

const App = ({ authenticated }) => {
  // console.log('base', authenticated);
  return (
    <BrowserRouter>
      <Switch>
        {/* <PrivateRoute
          exact
          path="/"
          component={Login}
          authenticated={authenticated}
        /> */}
        <PublicRoute restricted={true} component={Login} path="/" exact />

        <PrivateRoute component={Home} path="/dashboard" exact />
        <PrivateRoute component={Users} path="/users" exact />
        <PrivateRoute component={Category} path="/categories" exact />
        <PrivateRoute component={Blogs} path="/blogs" exact />
        <PrivateRoute
          component={RolesAndPermissions}
          path="/roles-and-permissions"
          exact
        />
        <PrivateRoute
          path="/roles-and-permissions"
          component={RolesAndPermissions}
          exact
          // authenticated={authenticated}
        />

        <PublicRoute
          restricted={true}
          component={ForgotPassword}
          path="/forgot-password"
          exact
        />
        <PublicRoute
          restricted={true}
          component={ChangePassword}
          path="/forgot-password"
          exact
        />
        <Route
          path="/change-password"
          component={ForgotPassword}
          // authenticated={authenticated}
        />

        <Route path="/change-password" component={ChangePassword} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = state => ({
  // data: state.authentication.data,
  authenticated: state.auth.authenticated
  // isSuccess: state.authentication.isRegisterSuccess,
  // isReset: state.authentication.isRegisterReset,
  // isError: state.authentication.isRegisterError,
  // data: state.authentication.data
});

export default connect(mapStateToProps, null)(App);
