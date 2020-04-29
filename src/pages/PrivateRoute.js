import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({
  component: Component,
  history,
  authenticated,
  ...rest
}) => {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={props => {
        if (authenticated) {
          return history.push('/dashboard');
        }
        return <Component {...props} />;
      }}
    />
  );
};

const { bool, string, func } = PropTypes;

PrivateRoute.propTypes = {
  component: func.isRequired,
  //   exact: bool,
  path: string.isRequired,
  authenticated: bool.isRequired
  //   location: object
};

export default withRouter(PrivateRoute);
