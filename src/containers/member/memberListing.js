import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import RightWidgets from '../../components/global/Rightwidges';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";

const memberListing = (props) => {
  let list = [1, 2, 3, 4, 5, 6];
  // console.log(props, 'props.projects');
  return (
    <>
      <div
        className="page--header pt--60 pb--60 text-center"
        data-bg-img="img/page-header-img/bg.jpg"
        data-overlay="0.85"
      >
        <div className="container">
          <div className="title">
            <h2 className="h1 text-white">World Savers</h2>
          </div>

          {/* <ul className="breadcrumb text-gray ff--primary">
                    <li><a href="home-1.html" className="btn-link">Home</a></li>
                    <li className="active"><span className="text-primary">Members</span></li>
                </ul> */}
        </div>
      </div>

      <section className="page--wrapper pt--80 pb--20">
        <div className="container">
          <div className="row">
            <div className="main--content col-md-8 pb--60">
              <div className="">
                <div className="filter--nav pb--30 clearfix">
                  <div className="filter--link float--left">
                    <h2 className="h4">All Members : 30,000</h2>
                  </div>

                  <div className="filter--options float--right">
                    <label className="d-flex">
                      <span
                        className="fs--14 ff--primary fw--500 text-darker"
                        style={{ minWidth: '65px' }}
                      >
                        Show By :
                      </span>

                      <select
                        name="membersfilter"
                        className="form-control form-sm"
                        data-trigger="selectmenu"
                      >
                        <option value="last-active" selected>
                          Last Active
                        </option>
                        <option value="new-registered">Newly  Registered</option>
                        <option value="alphabetical">Alphabetical</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="member--items">
                  <div className="row gutter--15 AdjustRow">
                    {list &&
                      list.map((item) => {
                        return (
                          <div className="col-md-3 col-xs-6">
                            <div className="member--item online">
                              <div className="img img-circle">
                                <Link to="/memberdetail" className="btn-link">
                                  <img src="/assets/img/banner.jpg" alt="" />
                                </Link>
                              </div>

                              <div className="name">
                                <h3 className="h6 fs--12">
                                  <Link to="/memberdetail" className="btn-link">
                                    Rosa R. Secor
                                  </Link>
                                </h3>
                              </div>

                              <div className="activity">
                                <p>
                                  <i className="fa mr--8 fa-clock-o"></i>Active
                                  5 monts ago
                                </p>
                              </div>

                              <div className="actions">
                                <ul className="nav">
                                  <li>
                                    <Link
                                      href="#"
                                      title="Send Message"
                                      className="btn-link"
                                      data-toggle="tooltip"
                                      data-placement="bottom"
                                    >
                                      <i className="fa fa-comment"></i>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 main--sidebar">
              <StickyBox offsetTop={83} offsetBottom={15}>
                <RightWidgets projects={props.projects} />
              </StickyBox>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(mapStateToProps)(memberListing);
