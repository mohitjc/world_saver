import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedJobItem = () => {
  return (
    <article className="feature-full__job-posts">
      <div className="company-logo">
        <a href="#">
          <img src="img/company-logo/company-logo1.png" alt="" />
        </a>
      </div>
      <div className="job-description">
        <h5 className="job-title">
          <Link to="job/xyz">Travel Agency Responsive Minimal Website Design with Mobile App </Link>
        </h5>
        <span className="location">
          <a href="#">
            <i className="fas fa-map-marker-alt"></i> New York
          </a>
        </span>
        <span className="job-category cat-color-one">
          <a href="#">Web Design</a>
        </span>
      </div>
      <div className="budget">
        <ul>
          <li className="duration">
            <p>21 Days</p>
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
  );
};

export default FeaturedJobItem;
