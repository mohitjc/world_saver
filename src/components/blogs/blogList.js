import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiUrl } from '../../environment';
import WordLimit from 'react-word-limit';
import { BeatLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import BlogCategory from './BlogCategory';
import RightWidgets from '../../components/global/Rightwidges';
import { Anchorme } from 'react-anchorme';

const BlogList = ({ getblogList, user, getblogListByCat, getblogSearch }) => {
  const { cat_id } = useParams();

  useEffect(() => {
    if (cat_id) {
      getblogListByCat(cat_id, user.access_token, (res) => {
        if (res.success) {
          setBlogs(res.data);
        }
      });
    } else {
      getblogList('', user.access_token, (res) => {
        if (res.success) {
          setBlogs(res.data);
        }
      });
    }
  }, []);

  const getAllBlogs = (p) => {
    if (p) {
      getblogList('', user.access_token, (res) => {
        if (res.success) {
          setBlogs(res.data);
        }
      });
    }
  };

  const { isLoading } = useSelector((state) => state.loader);
  const [blogs, setBlogs] = useState([]);

  // console.log(blogs, "blogs");
  const [cat, setCat] = useState(cat_id || '');

  const setCatFilter = (id) => {
    setCat(id);
    getblogListByCat(id, user.access_token, (res) => {
      if (res.success) {
        setBlogs(res.data);
      }
    });
  };

  const search = (tag) => {
    getblogSearch(tag, user.access_token, (res) => {
      if (res.success) {
        setBlogs(res.data);
      }
    });
  };

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
    'December',
  ];

  const ListItemLink = ({ item, ...rest }) => {
    return (
      <>
        {item?.isCustom ? (
          <>
            <a
              href={`${item?.blogUrl}`}
              target="_new"
              {...rest}
              className="continue"
            ></a>
          </>
        ) : (
          <>
            <Link to={`/blogdetail/${item.id}`} {...rest}></Link>
          </>
        )}
      </>
    );
  };

  const Loading = () => {
    return (
      <div className="d-flex align-items-center flex-column justify-content-center text-center py-3">
        <div className="d-flex align-items-center flex-column px-4">
          <BeatLoader color={'#5383ff'} loading={true} />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="py-4">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-2"></div>
            <div className="col-md-7">
              <div className="search-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search a subject or article"
                  onChange={(e) => search(e.target.value)}
                />
                {/* <button className="btn btn-primary"><i className="fa fa-search"></i></button> */}
              </div>
            </div>

            <div className="col-md-3">
              <label>
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={(e) => getAllBlogs(e.target.value)}
                />
                <span className="checkbox-label1">All News and Articles</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <section className="page--wrapper py-4">
        <div className="container-fluid blogs-container">
          <div className="row">
            <div className="col-md-2">
              <BlogCategory user={user} setCatFilter={setCatFilter} cat={cat} />
            </div>
            <div className="col-md-7">
              {isLoading ? (
                <Loading />
              ) : (
                <div className="row">
                  {blogs &&
                    blogs.map((item) => {
                      return (
                        <div className="col-sm-4 col-xs-12 pb--30">
                          {/* <!-- Post Item Start --> */}
                          <div
                            className="post--item border"
                            data-scroll-reveal="bottom"
                          >
                            {/* <!-- Post Image Start --> */}
                            <div className="post--img">
                              <ListItemLink item={item}>
                                <img
                                  src={
                                    item.image
                                      ? `${apiUrl}${item.image}`
                                      : '/assets/img/banner.jpg'
                                  }
                                  alt=""
                                />
                              </ListItemLink>
                            </div>
                            {/* <!-- Post Image End --> */}

                            {/* <!-- Post Info Start --> */}
                            <div className="post--info">
                              {/* <!-- Post Meta Start --> */}
                              <div className="post--meta">
                                <ul className="nav">
                                  {/* <li>
                                <ListItemLink item={item}>
                                  <img src={item?.createdBy.image ? `${apiUrl + item?.createdBy.image}` : "/assets/img/banner.jpg"} alt="" />
                                  <span>{item?.createdBy.fullName}</span>
                                </ListItemLink>
                              </li> */}
                                  <li>
                                    <ListItemLink item={item}>
                                      <i className="mr--8 fa fa-calendar"></i>
                                      <span>
                                        {months[
                                          new Date(item.createdAt).getMonth()
                                        ] +
                                          ' ' +
                                          new Date(item.createdAt).getDate() +
                                          ', ' +
                                          new Date(
                                            item.createdAt
                                          ).getFullYear() +
                                          ', ' +
                                          new Date(
                                            item.createdAt
                                          ).toLocaleTimeString()}
                                      </span>
                                    </ListItemLink>
                                  </li>
                                </ul>
                              </div>
                              {/* <!-- Post Meta End --> */}

                              {/* <!-- Post Title Start --> */}
                              <div className="post--title mt--10">
                                <h3 className="h6">
                                  <ListItemLink item={item}>
                                    {item.title}
                                  </ListItemLink>
                                </h3>
                              </div>
                              {/* <!-- Post Title End --> */}

                              {/* <!-- Post Meta Start --> */}
                              <div className="post--meta">
                                <ul className="nav">
                                  <li>
                                    <i className="mr--8 fa fa-folder"></i>

                                    <a href="#">
                                      <span>
                                        {item.category && item.category.name}
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <i className="mr--8 fa fa-tags"></i>
                                    {item.tags &&
                                      item.tags.map((itm) => {
                                        return (
                                          <a href="#">
                                            <span>{itm}</span>
                                          </a>
                                        );
                                      })}
                                  </li>
                                </ul>
                              </div>
                              {/* <!-- Post Meta End --> */}

                              {/* <!-- Post Content Start --> */}
                              <div className="post--content text-darker mt--10">
                                <p>
                                  <WordLimit limit={100}>
                                    <Anchorme
                                      style={{
                                        color: 'blue',
                                      }}
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      {item.description}
                                    </Anchorme>
                                  </WordLimit>
                                </p>
                              </div>
                              {/* <!-- Post Content End --> */}

                              {/* <!-- Post Action Start --> */}
                              <div className="post--action text-darkest mt--8">
                                <ListItemLink item={item}>
                                  Continue Reading
                                  <i className="ml--10 text-primary fa fa-caret-right"></i>
                                </ListItemLink>
                              </div>
                              {/* <!-- Post Action End --> */}
                            </div>
                            {/* <!-- Post Info End --> */}
                          </div>
                          {/* <!-- Post Item End --> */}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            <div className="col-md-3 main--sidebar">
              <RightWidgets setCatFilter={setCatFilter} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogList;
