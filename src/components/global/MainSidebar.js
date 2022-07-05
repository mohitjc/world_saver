import React from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';

const styles = {
  fontWeight: 'bold',
  color: '#394eea'
};

const MainSidebar = ({ history }) => {
  return (
    <div className="main-sidebar" style={{ overflow: 'scroll' }}>
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <NavLink to="/dashboard">
            <img
              src="../assets/img/world-saver-logo.png"
              className="logo"
              width="100px"
            />
          </NavLink>
        </div>

        <ul className="sidebar-menu">
          <li className="nav-item dropdown">
            <NavLink to="/dashboard" className="nav-link" activeStyle={styles}>
              <i className="fas fa-fire" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <NavLink className="nav-link" to="/users" activeStyle={styles}>
              <i className="far fa-user" />
              <span>Manage Users</span>
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <NavLink className="nav-link" to="/categories" activeStyle={styles}>
              <i className="far fa-folder" /> <span>Manage Categories</span>
            </NavLink>

          </li>
          <li className="nav-item dropdown">
            <NavLink className="nav-link" to="/posts" activeStyle={styles}>
              <i className="far fa-folder" /> <span>Manage Posts</span>
            </NavLink>
            
          </li>
          {/* <li className="nav-item dropdown">
            <NavLink className="nav-link" to="/types" activeStyle={styles}>
              <i className="far fa-folder" /> <span>Manage Types</span>
            </NavLink>
          </li> */}
          <li className="nav-item dropdown">
            <NavLink className="nav-link" to="/articles" activeStyle={styles}>
              <i className="far fa-newspaper" /> <span>Manage Articles</span>
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <NavLink className="nav-link" to="/contents" activeStyle={styles}>
              <i className="far fa-newspaper" /><span>Manage Contents</span>
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <NavLink className="nav-link" to="/projects" activeStyle={styles}>
              <i className="far fa-folder-open" /> <span>Manage Projects</span>
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <NavLink className="nav-link" to="/youtube-management" activeStyle={styles}>
              <i className="far fa-folder-open" /> <span>YouTube Management</span>
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <NavLink className="nav-link" to="/advertise" activeStyle={styles}>
              <i className="far fa-folder-open" /> <span>Advertisement Management</span>
            </NavLink>
          </li>
          {/* <li className="nav-item dropdown">
            <NavLink
              className="nav-link"
              to="/roles-and-permissions"
              activeStyle={styles}
            >
              <i className="fas fa-user-lock" />
              <span>Roles And Permissions</span>
            </NavLink>
          </li> */}
        </ul>
      </aside>
    </div>
  );
};

export default withRouter(MainSidebar);
