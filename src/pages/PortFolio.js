import React from 'react';

import Layout from '../components/global/Layout';
import Seo from '../components/Seo';
import LeftSideBar from '../components/portfolio/LeftSideBar';
import Information from '../components/portfolio/Information';

export default () => (
  <Layout>
    <Seo title="Portfolio" description="Some description here." />
    <section
      id="freelancer-portfolio"
      style={{ background: 'url(/img/freelancer/freelancer-profile-bg.jpg)' }}
    >
      <div className="container">
        <div className="freelancer-portfolio">
          <div className="row">
            <LeftSideBar />
            <Information />
          </div>
        </div>
      </div>
    </section>
  </Layout>
);
