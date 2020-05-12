import React from 'react';
import { withRouter } from 'react-router-dom';

const Stats = ({ history, blogCount, userCount, totalCount }) => {
  const handleRedirect = (path, role) => {
    history.push({
      pathname: path,
      state: {
        role
      }
    });
  };
  return (
    <div className="row">
      <div className="col-lg-4 col-md-6 col-sm-6 col-12">
        <div
          className="card card-statistic-1"
          style={{ cursor: 'pointer' }}
          onClick={() => handleRedirect('/users', 'A')}
          role=""
        >
          <div className="card-icon bg-primary">
            <i className="far fa-user" />
          </div>
          <div className="card-wrap">
            <div className="card-header">
              <h4>Users</h4>
            </div>
            <div className="card-body">{userCount}</div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-6 col-12">
        <div
          className="card card-statistic-1"
          style={{ cursor: 'pointer' }}
          onClick={() => handleRedirect('/articles')}
        >
          <div className="card-icon bg-danger">
            <i className="far fa-newspaper" />
          </div>
          <div className="card-wrap">
            <div className="card-header">
              <h4>Blogs</h4>
            </div>
            <div className="card-body">{blogCount}</div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-sm-6 col-12">
        <div
          className="card card-statistic-1"
          style={{ cursor: 'pointer' }}
          onClick={() => handleRedirect('/projects')}
        >
          <div className="card-icon bg-success">
            <i className="fas fa-circle" />
          </div>
          <div className="card-wrap">
            <div className="card-header">
              <h4>Total Projects</h4>
            </div>
            <div className="card-body">{totalCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Stats);
