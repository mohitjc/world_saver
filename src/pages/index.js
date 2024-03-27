import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./Home";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
// import PortFolio from './PortFolio';
import PrivateRoute from "./PrivateRoute";
import Users from "./Users";
import User from "./User";
import Category from "./Category";

import Project from "./Project";
import RolesAndPermissions from "./RolesAndPermissions";
import PublicRoute from "./PublicRoute";
import Articles from "./Articles";
import Contents from "./Contents";
import Types from "./Types";
import ProjectView from "./ProjectView";
import Advertise from "./Advertise";
import youtube from "./youtube";
import PostData from "../components/Posts/PostData";
import ReplyPost from "../components/Posts/ReplyPost";
import Event from "../components/MyEventCurd/Event";
import EvenForm from "../components/MyEventCurd/EvenForm";
import EventNew from "../components/MyEventCurd/MyNewPart/EventNew";
import EventList from "../components/MyEventCurd/MyNewPart/EventList";
import ReportsList from "../components/Reports/ReportsList";
import ViewReport from "../components/Reports/ViewReport";

const App = ({ authenticated }) => {
  // console.log('base', authenticated);
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={true} component={Login} path="/" exact />

        <PrivateRoute component={Home} path="/dashboard" exact />

        <PrivateRoute component={Users} path="/users" exact />
        <PrivateRoute component={youtube} path="/youtube-management" exact />
        <PrivateRoute component={Advertise} path="/advertise" exact />
        <PrivateRoute component={PostData} path="/posts" exact />
        <PrivateRoute component={ReportsList} path="/reports" exact />
        <PrivateRoute component={ViewReport} path="/report/:id" exact />

        <PrivateRoute component={Category} path="/categories" exact />
        <PrivateRoute component={Articles} path="/articles" exact />
        <PrivateRoute component={Event} path="/event" exact />
        <PrivateRoute component={Contents} path="/contents" exact />
        <PrivateRoute component={EventNew} path="/events/:id?" exact />
        <PrivateRoute component={EventList} path="/list/event" exact />
        <PrivateRoute component={Project} path="/projects" exact />
        <PrivateRoute
          component={ProjectView}
          path="/project/:projectId"
          exact
        />
        <PrivateRoute component={User} path="/user/:id" exact />
        <PrivateRoute component={Types} path="/types" exact />
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

        <Route path="/change-password" component={ForgotPassword} />
        <Route path="/change-password" component={ChangePassword} />
        <Route path="/replypost" component={ReplyPost} />
        <Route path="/change-password" component={ChangePassword} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, null)(App);
