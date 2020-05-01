import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = 'abx';
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props => (token ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;

// import React from 'react';
// import { Route, Redirect, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const PrivateRoute = ({
//   component: Component,
//   history,
//   authenticated,
//   ...rest
// }) => {
//   const token = localStorage.getItem('token');
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         if (authenticated) {
//           return history.push('/dashboard');
//         }
//         return <Component {...props} />;
//       }}
//     />
//   );
// };

// const { bool, string, func } = PropTypes;

// PrivateRoute.propTypes = {
//   component: func.isRequired,
//   //   exact: bool,
//   path: string.isRequired,
//   authenticated: bool.isRequired
//   //   location: object
// };

// export default withRouter(PrivateRoute);
