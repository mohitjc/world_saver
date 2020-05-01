import React from 'react';
// import Helmet from 'react-helmet';

import Header from './Header';
import config from '../../utils/config';
import Footer from './Footer';

export default ({ children, title, noHeader, isHome }) => (
  <div id="app">
    <div className="main-wrapper">
      <div className="navbar-bg" />
      <Header isHome={isHome} />
      {children}
    </div>
  </div>
);
