import React from 'react';
import { Link } from 'react-router-dom';

const JobItem = () => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <article className="feature-full__job-posts grid-view-items">
        <div className="company-logo">
          <a href="#">
            <img src="/img/company-logo/company-logo1.png" alt="" />
          </a>
        </div>
        <div className="job-description">
          <h5 className="job-title">
            <Link to="job/xyz">
              Travel Agency Responsive Minimal Website Design with Mobile App
            </Link>
          </h5>
          <span className="location">
            <a href="#">
              <i className="fas fa-map-marker-alt"></i> New York
            </a>
          </span>
          <span className="job-category cat-color-one">
            <a href="#">Web Design</a>
          </span>
          <span className="job-duration">
            <i className="fas fa-briefcase"></i> Full Time
          </span>
        </div>
        <div className="budget">
          <ul>
            <li className="duration">
              <p>Yearly</p>
            </li>
            <li className="amount">
              <p>$3500</p>
            </li>
          </ul>
        </div>
        <div className="apply">
          <a href="#" className="apply-btn">
            Apply
          </a>
        </div>
      </article>
    </div>
  );
};

export default JobItem;
