import React from 'react';

import Layout from '../components/global/Layout';
import FeaturedJobItem from '../components/jobs/FeaturedJobItem';
import Followers from '../components/home/Followers';
import JobItem from '../components/jobs/JobItem';
import Pagination from '../components/global/Pagination';

// import LoginForm from '../components/login/LoginForm';
// import LoginBanner from '../components/login/LoginBanner';

export default () => (
  <Layout title="Jobs">
    <section id="feature-job-online-list">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="buttons-container">
              <ul className="list-grid-btn">
                <li>View : </li>
              </ul>
              <ul className="sort-options">
                <li>Sort By :</li>
                <li>
                  <select name="sort-job" id="sort-lists">
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <JobItem />
          <JobItem />
          <JobItem />
          <JobItem />
        </div>
      </div>
      <Pagination />
    </section>
  </Layout>
);
