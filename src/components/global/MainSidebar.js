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
            World Safer
            {/* <img
              src="../assets/img/vertical-logo4.png"
              alt="logo"
              width="50"
              className=""
            /> */}
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
            <NavLink className="nav-link" to="/blogs" activeStyle={styles}>
              <i className="far fa-newspaper" /> <span>Manage Blogs</span>
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <NavLink className="nav-link" to="/skills" activeStyle={styles}>
              <i className="fas fa-walking" /> <span>Manage Skills</span>
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <NavLink
              className="nav-link"
              to="/roles-and-permissions"
              activeStyle={styles}
            >
              <i className="fas fa-user-lock" />
              <span>Roles And Permissions</span>
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <NavLink className="nav-link" to="/credits" activeStyle={styles}>
              <i className="fas fa-coins" />
              <span>Manage credits</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default withRouter(MainSidebar);
