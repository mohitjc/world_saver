import React from 'react';

const LeftSideBar = () => {
  return (
    <div className="col-sm-12 col-md-5 col-lg-4">
      <div className="freelancer-profile-sidebar">
        <div className="profile-image">
          <img src="/img/freelancer/Profile-Image1.jpg" alt="" />
        </div>
        <div className="profile-info">
          <div className="hourly-rate">
            <h5>$ 20 USD/hr</h5>
            <a
              href="#"
              className="button-ymp form-control"
              data-toggle="modal"
              data-target="#hire-me"
            >
              Hire Me
            </a>
          </div>
          <div className="overviews">
            <ul>
              <li>
                <span className="icon color-1">
                  <i className="fas fa-star"></i>
                </span>
                25 Reviews<span className="yellow">5.0</span>
              </li>
              <li>
                <span className="icon color-2">
                  <i className="fas fa-check-circle"></i>
                </span>
                Jobs Completed<span className="blue">100%</span>
              </li>
              <li>
                <span className="icon color-3">
                  <i className="fas fa-dollar-sign"></i>
                </span>
                On Budget<span className="violet">95%</span>
              </li>
              <li>
                <span className="icon color-4">
                  <i className="fas fa-clock"></i>
                </span>
                On Time<span className="red">67%</span>
              </li>
            </ul>
          </div>
          <div className="verification">
            <h4>Verifications</h4>
            <ul>
              <li>
                Facebook Verified
                <span>
                  <i className="fas fa-minus"></i>
                </span>
              </li>
              <li>
                Preffered Freelancer
                <span>
                  <i className="fas fa-minus"></i>
                </span>
              </li>
              <li className="active">
                Payment Verified
                <span>
                  <i className="fas fa-check"></i>
                </span>
              </li>
              <li className="active">
                Phone Verified
                <span>
                  <i className="fas fa-check"></i>
                </span>
              </li>
              <li className="active">
                Email Verified
                <span>
                  <i className="fas fa-check"></i>
                </span>
              </li>
            </ul>
          </div>
          <div className="top-skills">
            <h4>My Top Skills</h4>
            <ul>
              <li>
                WordPress<span>3092</span>
              </li>
              <li>
                JavaScript<span>2095</span>
              </li>
              <li>
                HTML5<span>1092</span>
              </li>
              <li>
                CSS3<span>4092</span>
              </li>
              <li>
                Website Design<span>2082</span>
              </li>
              <li>
                Graphic Design<span>3092</span>
              </li>
              <li>
                SEO<span>5092</span>
              </li>
            </ul>
          </div>
          <div className="experience">
            <h4>Experience</h4>
            <div className="type">
              <h5>Lead Developer</h5>
              <p>
                ThemeMom International<span>2 Years</span>
              </p>
            </div>
          </div>
          <div className="education">
            <h4>Education</h4>
            <div className="degrees">
              <div className="mba-degree">
                <h5>MBA</h5>
                <p>North South University</p>
                <span>(2015-17) 2 Years</span>
              </div>
              <div className="cse-degree">
                <h5>CSE</h5>
                <p>Bangladesh University of Engineering</p>
                <span>(2011-15) 4 Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
