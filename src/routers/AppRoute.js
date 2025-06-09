import React from 'react';
import { Navigate } from 'react-router-dom';

const AppRoute = ({
  Component,
  layout: Layout,
  requireAuth,
  to = '/',
  store,
  type = 'private',
}) => {
  const isLogin = requireAuth(store);

  if (isLogin && window.location.pathname === '/') {
    return <Navigate to="/dashboard" replace />;
  }

  if (type === 'public') {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  }

  return isLogin || window.location.pathname === '/' ? (
    <Layout>
      <Component />
    </Layout>
  ) : (
    <Navigate to={to} replace />
  );
};

export default AppRoute;
