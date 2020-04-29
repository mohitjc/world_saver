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

const App = ({ authenticated }) => {
  // console.log('base', authenticated);
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          exact
          path="/"
          component={Login}
          authenticated={authenticated}
        />
        <Route
          exact
          path="/dashboard"
          component={Home}
          // authenticated={authenticated}
        />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/cars" component={Cars} />
        <Route path="/users" component={Users} />
        <Route path="/user/:id" component={User} />
        <Route path="/categories" component={Category} />
        <Route path="/category/:categoryId" component={CategoryView} />
        <Route path="/questions" component={Questions} />
        <Route path="/question/:questionId" component={QuestionView} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/blog/:blogId" component={BlogView} />
        <Route path="/skills" component={Skills} />
        <Route path="/skill/:skillId" component={SkillView} />
        <Route path="/counter" component={Counter} />
        <Route
          path="/forgot-password"
          component={ForgotPassword}
          // authenticated={authenticated}
        />
        <Route
          path="/roles-and-permissions"
          component={RolesAndPermissions}
          // authenticated={authenticated}
        />
        <Route
          path="/credits"
          component={Credits}
          // authenticated={authenticated}
        />
        <Route path="/change-password" component={ChangePassword} />
        <Route path="/subscription-names" component={SubscriptionNames} />
        <Route path="/subscription-packages" component={SubscriptionPackages} />
        <Route path="/subscription-types" component={SubscriptionTypes} />
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

export default connect(
  mapStateToProps,
  null
)(App);
