import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../environment';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import RightWidgets from "../../components/global/Rightwidges";
import { Anchorme } from 'react-anchorme';

const BlogDetailCompoment = ({ getblogDetail, user }) => {

  const { id } = useParams();

  useEffect(() => {

    const token = user.access_token;
  }, []);

  useEffect(() => {
    getblogDetail(id, user.access_token, (res) => {
      if (res.success) {
        setData(res.data.blog);
      }
    })

  }, []);

  const { isLoading } = useSelector((state) => state.loader);
  const [data, setData] = useState('');


  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];


  const Loading = () => {
    return (
      <div className="d-flex align-items-center flex-column justify-content-center text-center py-3">
        <div className="d-flex align-items-center flex-column px-4">
          <BeatLoader color={'#5383ff'} loading={true} />
        </div>
      </div>
    );
  };

  return <>
    <div
      className="page--header pt--60 pb--60 text-center blog-details"
      data-bg-img="img/page-header-img/bg.jpg"
      data-overlay="0.85"
    >
      <div className="container">
        <div className="title">
          <h2 className="h1 text-white">
            {data && data.title}
          </h2>
        </div>

        {/* <ul className="breadcrumb text-gray ff--primary">
                    <li><a href="home-1.html" className="btn-link">Home</a></li>
                    <li className="active"><span className="text-primary">Members</span></li>
                </ul> */}
      </div>
    </div>

    <section className="page--wrapper py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {/* <!-- Post Item Start --> */}
            <div className="post--item post--single pb--30">
              {/* <!-- Post Image Start --> */}
              <div className="post--img">
                <a>
                  <img className='h-auto' src={data && data.image ? `${apiUrl}${data.image}` : "/assets/img/banner.jpg"} />
                </a>
              </div>
              {/* <!-- Post Image End --> */}

              {/* <!-- Post Info Start --> */}
              <div className="post--info">
                {/* <!-- Post Meta Start --> */}
                <div className="post--meta">
                  <ul className="nav">
                    <li>
                      <a href="#">
                        <i className="mr--8 fa fa-calendar"></i>
                        <span>
                          {months[new Date(data && data.createdAt).getMonth()] + ' ' + new Date(data && data.createdAt).getDate() + ', ' + new Date(data && data.createdAt).getFullYear() + ', ' + new Date(data && data.createdAt).toLocaleTimeString()}
                        </span>
                      </a>
                    </li>
                    {/* <li>
                        <a href="#">
                          <i className="mr--8 fa fa-comments"></i>
                          <span>3 Comments</span>
                        </a>
                      </li> */}
                  </ul>
                </div>
                {/* <!-- Post Meta End --> */}

                {/* <!-- Post Title Start --> */}
                <div className="post--title mt--10">
                  <h3 className="h4">
                    {data && data.title}
                  </h3>
                </div>
                {/* <!-- Post Title End --> */}

                {/* <!-- Post Content Start --> */}
                <div className="post--content text-darker mt--10">
                  <p>
                    <Anchorme
                      style={{
                        color: 'blue',
                      }}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {data && data.description}
                    </Anchorme>

                  </p>

                </div>
                {/* <!-- Post Content End --> */}

                {/* <!-- Post Footer Start --> */}
                <div className="post--footer">
                  <div className="row">
                    <div className="col-sm-6">
                      {/* <!-- Post Meta Start --> */}
                      <div className="post--meta">
                        <ul className="nav">
                          {data && data.category && data.category.name ? <li>
                            <i className="mr--8 fa fa-folder"></i>
                            <a href="#">
                              <span>{data && data.category.name}</span>
                            </a>
                            {/* <a href="#">
                                <span>Category 2</span>
                              </a>
                              <a href="#">
                                <span>Category 3</span>
                              </a> */}
                          </li> : <></>}

                          {data && data.tags.length ? <li>
                            <i className="mr--8 fa fa-tags"></i>

                            {data && data.tags.map(itm => {
                              return <a href="#">
                                <span>{itm}</span>
                              </a>
                            })
                            }
                          </li> : <></>}

                        </ul>
                      </div>
                      {/* <!-- Post Meta End --> */}
                    </div>

                    <div className="col-sm-6">
                      {/* <!-- Post Social Start --> */}
                      <div className="post--social-share clearfix">
                        <ul className="nav">
                          <li>
                            <a href="#">
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-google-plus"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-pinterest-p"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Post Social End --> */}
                    </div>
                  </div>
                </div>
                {/* <!-- Post Footer End --> */}
              </div>
              {/* <!-- Post Info End --> */}
            </div>


          </div>

          <div className="col-md-4 main--sidebar">
            <RightWidgets />
          </div>
        </div>
      </div>
    </section>


  </>
}

export default BlogDetailCompoment;