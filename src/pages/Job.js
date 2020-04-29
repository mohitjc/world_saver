import React from 'react';

import Layout from '../components/global/Layout';
import ProposalForm from '../components/jobs/ProposalForm';

// import LoginForm from '../components/login/LoginForm';
// import LoginBanner from '../components/login/LoginBanner';

export default () => (
  <Layout title="Job">
    <section id="project-bid-page">
      <div className="container">
        <div className="bid-project-page">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="bidding-title">
                <h4>Build an eCommerce Website</h4>
              </div>
            </div>
          </div>
          <div className="bidding-header">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="bidding-info">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-7">
                    <div className="bid-info">
                      <div className="freelancer-bidding">
                        <h5>Freelancer Bidding(44)</h5>
                        <ul>
                          <li>
                            <a href="#">
                              <img
                                src="/img/freelancer/freelancer-4.jpg"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img
                                src="/img/freelancer/freelancer-5.jpg"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img
                                src="/img/freelancer/freelancer-6.jpg"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#">+ 4 others</a>
                          </li>
                        </ul>
                      </div>
                      <div className="avg-bidding">
                        <h5>Avg Bid (USD)</h5>
                        <h4 className="project-amount">$ 1350</h4>
                      </div>
                      <div className="project-budget">
                        <h5>Project Budget(USD)</h5>
                        <h4 className="project-amount">$500 - $1500</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-2" />
                  <div className="col-sm-12 col-md-12 col-lg-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-8 col-lg-8">
              <div className="project-description">
                <h4 className="title">Project Description</h4>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classNameical Latin
                  literature from 45 BC, making it over 2000 years old. Richard
                  McClintock, a Latin professor at Hampden-Sydney College in
                  Virginia, looked up one of the more obscure Latin words.Lorem
                  Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                  Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                  written in 45 BC. This book is a treatise on the theory of
                  ethics, very popular during the Renaissance.
                </p>
                <br />
                <p>
                  The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                  comes from a line in section 1.10.32. The standard chunk of
                  Lorem Ipsum used since the 1500s is reproduced below for those
                  interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                  Bonorum et Malorum" by Cicero are also reproduced in their
                  exact original form.
                </p>
                <br />
                <p>
                  Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
                  Malorum" by Cicero are also reproduced in their exact original
                  form, accompanied by English versions from the 1914
                  translation by H. Rackham.
                </p>
                <br />
              </div>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
              <div className="employee-info">
                <h4 className="title">About the employer</h4>
                <div className="feature-image">
                  <img src="/img/employer/employer1.jpg" alt="" />
                  <div className="name-designation">
                    <h5 className="name">Rafsan Prodhan</h5>
                    <h5 className="designation">Software House </h5>
                  </div>
                  <span className="online" />
                </div>
                <div className="review-details">
                  <ul className="review">
                    <li className="point">5.0</li>
                    <li>
                      <span className="star">
                        <i className="fas fa-star" />
                      </span>
                    </li>
                    <li>
                      <span className="star">
                        <i className="fas fa-star" />
                      </span>
                    </li>
                    <li>
                      <span className="star">
                        <i className="fas fa-star" />
                      </span>
                    </li>
                    <li>
                      <span className="star">
                        <i className="fas fa-star" />
                      </span>
                    </li>
                    <li>
                      <span className="star">
                        <i className="fas fa-star" />
                      </span>
                    </li>
                    <li>
                      (<span className="amount">105</span> Reviews)
                    </li>
                  </ul>
                </div>
                <div className="contact-details">
                  <ul>
                    <li>
                      <span className="verified">Verified</span>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-dollar-sign" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-envelope" />
                      </a>
                    </li>
                    <li className="address-book">
                      <a href="#">
                        <i className="fas fa-address-book" />
                      </a>
                    </li>
                    <li className="phone">
                      <a href="#">
                        <i className="fas fa-phone" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="project-id">
                  <h6 className="title">Project ID: 15535012</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="skill-requirement">
                <h4 className="title">Skill Required</h4>
                <ul>
                  <li>
                    <a href="#">Graphic Design,</a>
                  </li>
                  <li>
                    <a href="#">HTML,</a>
                  </li>
                  <li>
                    <a href="#">Website Design,</a>
                  </li>
                  <li>
                    <a href="#">WordPress,</a>
                  </li>
                  <li>
                    <a href="#">My SQL,</a>
                  </li>
                  <li>
                    <a href="#">JAVA,</a>
                  </li>
                  <li>
                    <a href="#">CSS 3,</a>
                  </li>
                  <li>
                    <a href="#">Adobe Photoshop</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ProposalForm />
      </div>
    </section>
  </Layout>
);
