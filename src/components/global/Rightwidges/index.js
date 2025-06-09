import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../../../main/history';
import FindAWorldSaver from '../../worldsaver/FindAWorldSaver';
import { getadvertiseDetail } from '../../../actions/advertise';
import { getyoutubeDetail } from '../../../actions/youtube';
import { apiUrl } from '../../../environment';
import ApiClient from '../../../api-client';
import { getJournyList } from '../../../actions/notifications';
import { toast } from 'react-toastify';
import methodModel from '../../../models/method.model';
import { startVideoPlayer } from '../../../actions/YoutubePlayer';
import Img from '../../../assets/imgpsh_fullsize_anim (1).png';
const RightWidgets = (props) => {
  const category = useSelector((state) => state.category);
  const videoPlayer = useSelector((state) => state.YoutubePlayer.videoPlayer);
  const searchInput = useRef(null);
  const [advertise, setAdvertise] = useState([]);
  const [arr, setArr] = useState([]);
  const userID = localStorage.getItem('userID');
  const [youtube, setYoutube] = useState([]);
  const [youtubeLoader, setYoutubeLoader] = useState(true);
  const dispatch = useDispatch();
  const [account, setaccount] = useState([]);
  const [post, setpost] = useState([]);

  useEffect(() => {
    console.log('videoPlayer', videoPlayer);
  }, [videoPlayer]);

  useEffect(() => {
    props.getadvertiseDetail('', props.user.access_token, (res) => {
      if (res.success) {
        setAdvertise(res.data);
      }
    });

    getFeturedYoutube();
  }, []);

  const getFeturedYoutube = () => {
    let getUrl = `${apiUrl}/allyouTubeLink`;
    setYoutubeLoader(true);
    ApiClient.get(getUrl, { isFeatured: true, count: 1 }).then((res) => {
      if (res.success) {
        setYoutube(res.data);
      }
      setTimeout(() => {
        setYoutubeLoader(false);
      }, 100);
    });
  };
  useEffect(() => {
    ApiClient.get(
      'https://endpoint.crowdsavetheworld.com/worldsaver/list?count=1000&page=1&search=&categoryID=&city=&country=&gender='
    ).then((res) => {
      const randomitem = [...res?.data].sort(() => 0.5 - Math.random());
      const result = randomitem.slice(0, 5);

      setaccount(result);
    });
  }, []);

  const journeySearchHandler = (event) => {
    event.preventDefault();
    const searchInputValue = searchInput.current.value;

    if (props.searchJourney) props.searchJourney(searchInputValue);
    history.push({
      pathname: `/journeyList`,
      search: `?query=${searchInputValue}`,
      state: { query: searchInputValue },
    });
  };

  useEffect(() => {
    if (localStorage.getItem('userID') == null) {
      toast.warning({
        autoClose: 2000,
      });
    } else {
      const token = props.user.access_token;
      const params = {
        user_id: props.user.id,
      };
      const getUrl = `${apiUrl}/project`;
      ApiClient.get(getUrl, params, `Bearer ${token}`).then((result) => {
        if (result) {
          //console.log('rtes', result);
          setArr(result);
        }
      });

      getCountry();
    }
  }, []);

  const get_categories = (data) => ({
    type: 'GET_CATEGORY_LIST',
    data,
  });

  const getCountry = () => {
    const getUrl = `${apiUrl}/countries`;
    let token = localStorage.getItem('headertoken');
    let params = {};
    ApiClient.get(getUrl, params, `Bearer ${token}`).then((result) => {
      if (result && result.success) {
        dispatch(get_categories(result.data));
      }
    });
  };

  const youtubeClick = (id) => {
    let element = document.getElementById('youtubeDiv');
    var rect = element.getBoundingClientRect();
    //console.log(rect.top, rect.right, rect.bottom, rect.left);
    dispatch(startVideoPlayer(id));

    setTimeout(() => {
      let custom_youtube = document.getElementById('custom-youtube-player');
      if (custom_youtube) {
        custom_youtube.classList.add('react-draggable-dragged');
        custom_youtube.style.left = `${rect?.left}px`;
        custom_youtube.style.top = `${rect?.top}px`;
        custom_youtube.style.width = `${element?.offsetWidth}px`;
        custom_youtube.style.minWidth = `${element?.offsetWidth}px`;
        custom_youtube.style.height = `${element?.offsetHeight}px`;
        custom_youtube.style.minHeight = `${element?.offsetHeight}px`;

        var reactResize = document.getElementsByClassName('react-resizable');
        for (var i = 0; i < reactResize.length; i++) {
          reactResize[i].style.width = `${element.offsetWidth}px`;
          reactResize[i].style.minWidth = `${element.offsetWidth}px`;
          reactResize[i].style.height = `${element.offsetHeight}px`;
          reactResize[i].style.minHeight = `${element.offsetHeight}px`;
        }
      }
    }, 100);
  };

  useEffect(() => {
    ApiClient.get(
      'https://endpoint.crowdsavetheworld.com/WallPosts?createdBy=6528d15062182e2dbc8d89f0',
      userID
    ).then((res) => {
      const randomitem = [...res?.data].sort(() => 0.5 - Math.random());
      const result = randomitem.slice(0, 5);

      setpost(result);
    });
  }, []);
  return (
    <>
      <div className="right-sponsors">
        <div className="youTubeWidget youtubfixcls" id="youTubeWidget1">
          <div className="widget bg-white">
            {youtubeLoader ? (
              <div className="shine youtubeCard"></div>
            ) : (
              <>
                {youtube &&
                  youtube.map((item, i) => {
                    return (
                      <div className="" key={i}>
                        <span className="d-flex justify-content-between align-items-center">
                          <img
                            style={{ width: '30%' }}
                            className="ml-2 mb-3"
                            src={Img}
                            alt=""
                          />
                          <span
                            className="youTitle  float-right "
                            style={{ fontSize: '16px' }}
                          >
                            {item.title}
                          </span>
                        </span>
                        <div
                          className={`youtubeDiv ${
                            videoPlayer.video ==
                              methodModel.getYoutubeId1(item.url) && 'active'
                          }`}
                          id="youtubeDiv"
                          onClick={() =>
                            youtubeClick(methodModel.getYoutubeId1(item.url))
                          }
                        >
                          <img
                            className="card-img-top"
                            src={
                              item.image
                                ? `${apiUrl}/images/youtube/${item.image}`
                                : `https://img.youtube.com/vi/${methodModel.getYoutubeId1(
                                    item.url
                                  )}/sddefault.jpg`
                            }
                            alt="Card cap"
                          />

                          {videoPlayer.video !=
                          methodModel.getYoutubeId1(item.url) ? (
                            <img
                              src="/assets/img/youtubeIcon.png"
                              className="youtubeIcon"
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
            <div className="archieve text-center mt-3">
              <Link to="/showarchives" className="achieve_files">
                All Shows
              </Link>
            </div>
          </div>
        </div>

        <div className="filter-btn text-right mb-2 mt-2 mr-2">
          <button
            className="btn btn-primary btn-sm"
            data-toggle="collapse"
            data-target="#right-sponsored"
            aria-expanded="false"
            aria-controls="right-sponsored"
          >
            <i className="fa fa-bars"></i>
          </button>
        </div>

        <div className="sponsored" id="right-sponsored">
          <div className="widget bg-white">
            {/* <h5 className="widget--title mb-2">Find A Journey</h5> */}
            <h5 className="widget--title mb-2">Trending Journeys</h5>
            <div className="searchbar">
              <input
                ref={searchInput}
                type="text"
                placeholder="Search"
                className="form-control"
              />
              <span className="searchicon" onClick={journeySearchHandler}>
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
            {/* <!-- Links Widget Start --> */}
            <div className="nav--widget mt-3">
              <ul className="nav">
                {category &&
                  category.map((item, i) => {
                    const van = item.totalJournies;
                    if (item.category == 'project') {
                      return (
                        // <li key={`journey-item-${i}`}>
                        //   <Link
                        //     to={{
                        //       pathname: '/journeyList',
                        //       state: { id: item.id },
                        //     }}
                        //     onClick={() => {
                        //       if (props.catChange) props.catChange(item.id);
                        //     }}
                        //   >
                        //     {item.name} ({van})
                        //     {/* <span>{van}</span> */}
                        //   </Link>
                        // </li>
                        <li key={i}>
                          <Link
                            to={{
                              pathname: '/journeyList',
                              state: { id: item.id },
                            }}
                            onClick={() => {
                              if (props.catChange) props.catChange(item.id);
                            }}
                          >
                            {item.image ? (
                              <img
                                src={`${apiUrl}/images/category/${item.image}`}
                                width="20"
                                className="Articlesimg"
                              />
                            ) : (
                              <i class="fa fa-file-text" aria-hidden="true"></i>
                            )}

                            <span className="text">{item.name}</span>
                            <span className=""> ({item.totalJournies})</span>
                          </Link>
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
            {/* <!-- Links Widget End --> */}
            <div className="text-center mt-2 text-primary">
              <Link to="/journeyList" className="text-primary">
                (See all Journeys)
              </Link>
            </div>
          </div>

          <div className="widget bg-white" style={{ width: '100%' }}>
            <h5 className="widget--title mb-2"></h5>
            <h5 className="widget--title mb-2">Who To Follow</h5>
            {/* <input type="text" placeholder="Search" className="form-control mb-3" /> */}
            {/* <div className="searchbar">
              <input
                ref={searchInputtwo}
                type="text"
                placeholder="Search"
                className="form-control mb-3"
              />
              <span
                className="searchicon"
                onClick={newsAndArticlesSearchHandler}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
            </div> */}
            {/* <button
              onClick={newsAndArticlesSearchHandler}
              type="submit"
              className="btn btn-primary"
            >
              Search
            </button> */}
            <div className="nav--widget mt-3">
              {props.setCatFilter ? (
                <ul className="nav">
                  {category &&
                    account.map((item, i) => {
                      return (
                        <li key={i}>
                          <div
                            style={{ width: '100% ' }}
                            className="d-flex mt-2"
                          >
                            {item.image ? (
                              <img
                                style={{ borderRadius: '50%' }}
                                src={`${apiUrl}${item.image}`}
                                width="20"
                                className="Articlesimg"
                                onClick={() => {
                                  history.push(`/${item.username}`);
                                }}
                              />
                            ) : (
                              <img
                                style={{ borderRadius: '50%' }}
                                width="20"
                                className="Articlesimg"
                                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                alt=""
                              />
                            )}
                            {/* <i className="fa fa-calendar"></i> */}
                            <span
                              className="text ml-2 "
                              style={{ width: '200px' }}
                              onClick={() => {
                                history.push(`/${item.username}`);
                              }}
                            >
                              {item.fullName}
                            </span>
                            <span className=""> </span>
                            <div
                              className="d-flex justify-content-end"
                              style={{ width: '100%' }}
                            >
                              <button
                                onClick={() => {
                                  ApiClient.post(
                                    'https://endpoint.crowdsavetheworld.com/addFriend',
                                    { friend_id: item.id, user_id: userID }
                                  );
                                }}
                                className="btn bg-primary primary py-1"
                              >
                                Follow
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <ul className="nav">
                  {category &&
                    account.map((item, i) => {
                      return (
                        <li key={i}>
                          <div
                            style={{ width: '100% ' }}
                            className="d-flex mt-2"
                            onClick={() => {
                              history.push(`/${item.username}`);
                            }}
                          >
                            {item.image ? (
                              <img
                                style={{ borderRadius: '50%' }}
                                src={`${apiUrl}${item.image}`}
                                width="20"
                                className="Articlesimg"
                              />
                            ) : (
                              <img
                                style={{ borderRadius: '50%' }}
                                width="20"
                                className="Articlesimg"
                                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                alt=""
                              />
                            )}
                            {/* <i className="fa fa-calendar"></i> */}

                            <div
                              className="d-flex flex-column "
                              style={{ width: '50%' }}
                            >
                              <span
                                className="text ml-2"
                                style={{ width: '200px' }}
                              >
                                {item.fullName}
                              </span>
                              <span
                                className="text ml-2"
                                style={{ fontSize: '12px' }}
                              >
                                @{item.username.substr(0, 10) + '...'}
                              </span>
                            </div>

                            <span className=""> </span>
                            <div
                              className="d-flex justify-content-end"
                              style={{ width: '100%' }}
                            >
                              <button
                                onClick={() => {
                                  ApiClient.post(
                                    'https://endpoint.crowdsavetheworld.com/addFriend',
                                    { friend_id: item.id, user_id: userID }
                                  );
                                }}
                                className="btn bg-primary primary py-1"
                              >
                                Follow
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>

            <div className="text-center mt-2">
              <Link to="/worldsavers" className="text-primary">
                (See all Suggestions)
              </Link>
              <Link to="/blockeduser" className="text-primary">
                Block List
              </Link>
            </div>
          </div>

          <div className="widget bg-white">
            <h5 className="widget--title mb-2"></h5>
            <h5 className="widget--title mb-2">What's Happening</h5>
            {/* <input type="text" placeholder="Search" className="form-control mb-3" /> */}
            {/* <div className="searchbar">
              <input
                ref={searchInputtwo}
                type="text"
                placeholder="Search"
                className="form-control mb-3"
              />
              <span
                className="searchicon"
                onClick={newsAndArticlesSearchHandler}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
            </div> */}
            {/* <button
              onClick={newsAndArticlesSearchHandler}
              type="submit"
              className="btn btn-primary"
            >
              Search
            </button> */}
            <div className="nav--widget mt-3">
              {props.setCatFilter ? (
                <ul className="nav">
                  {category &&
                    post.map((item, i) => {
                      return (
                        <li key={i}>
                          <div
                            style={{ width: '100% ' }}
                            className="d-flex mt-2"
                            onClick={() => {
                              history.push(`/${item?.createdBy?.username}`);
                            }}
                          >
                            {item?.createdBy?.image ? (
                              <img
                                style={{ borderRadius: '50%' }}
                                src={`${apiUrl}${item?.createdBy?.image}`}
                                width="20"
                                className="Articlesimg"
                              />
                            ) : (
                              <img
                                style={{ borderRadius: '50%' }}
                                width="20"
                                className="Articlesimg"
                                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                alt=""
                              />
                            )}
                            {/* <i className="fa fa-calendar"></i> */}
                            <div className="d-flex flex-column">
                              <span
                                className="text ml-2"
                                style={{ width: '200px' }}
                              >
                                {item?.createdBy?.fullName}
                              </span>
                              {item?.post != undefined ? (
                                <span className="ml-2">
                                  {' '}
                                  {item?.post?.substr(0, 40) + '....'}{' '}
                                </span>
                              ) : (
                                <span className="ml-2">....</span>
                              )}
                            </div>
                            {/* <div className='d-flex ml-5 justify-content-end align-items-end'>

                              {
                                item?.images != null ?
                                  <img src={apiUrl + item?.images[0]?.imagePath} alt="" style={{ borderRadius: '10px', height: '66px' }} width="70" /> : null
                              }
                            </div> */}
                          </div>
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <ul className="nav">
                  {category &&
                    post.map((item, i) => {
                      return (
                        <li key={i}>
                          <div
                            style={{ width: '100% ' }}
                            className="d-flex mt-2"
                            onClick={() => {
                              history.push(`/${item?.createdBy?.username}`);
                            }}
                          >
                            {item?.createdBy?.image ? (
                              <img
                                style={{ borderRadius: '50%' }}
                                src={`${apiUrl}${item?.createdBy?.image}`}
                                width="20"
                                className="Articlesimg"
                              />
                            ) : (
                              <img
                                style={{ borderRadius: '50%' }}
                                width="20"
                                className="Articlesimg"
                                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                alt=""
                              />
                            )}
                            {/* <i className="fa fa-calendar"></i> */}
                            <div className="d-flex flex-column">
                              <span
                                className="text ml-2"
                                style={{ width: '200px' }}
                              >
                                {item?.createdBy?.fullName}
                              </span>
                              {item?.post != undefined ? (
                                <span className="ml-2">
                                  {' '}
                                  {item?.post?.substr(0, 40) + '....'}{' '}
                                </span>
                              ) : (
                                <span className="ml-2">....</span>
                              )}
                            </div>
                            {/* <div className='d-flex ml-5 justify-content-end align-items-end'>

                              {
                                item?.images != null ?
                                  <img src={apiUrl + item?.images[0]?.imagePath} alt="" style={{ borderRadius: '10px', height: '66px' }} width="70" /> : null
                              }
                            </div>, */}
                          </div>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          </div>

          <div className="widget bg-white">
            <h5 className="widget--title">Top Sellers</h5>

            <div className="ad--widget position-relative">
              <a href="#">
                <img
                  src="/assets/img/banner.jpg"
                  alt=""
                  className="center-block adImage"
                />
              </a>
              <h4 className="position-absolute">Variety Seed Pack $14.00</h4>
            </div>

            <div className="text-center mt-2">
              <a className="text-primary">
                <a href="https://shop.crowdsavetheworld.com/" target="_blank">
                  Visit Store
                </a>
              </a>
            </div>
          </div>
          <div className="widget bg-white">
            <h5 className="widget--title">Sponsors</h5>
            {advertise &&
              advertise.map((item, i) => {
                return (
                  <div className="ad--widget position-relative" key={i}>
                    <a
                      target="_new"
                      href={
                        item?.url
                          ? item.url?.slice(0, 5) !== 'https'
                            ? 'https://' + item.url
                            : item.url
                          : null
                      }
                      className="position-relative"
                    >
                      {item.image ? (
                        <img
                          src={apiUrl + '/images/blogs/' + item.image}
                          alt=""
                          className="center-block adImage"
                        />
                      ) : (
                        <img
                          src="/assets/img/banner.jpg"
                          alt=""
                          className="center-block adImage"
                        />
                      )}
                      <h2 className="position-absolute m-0">{item.title}</h2>
                    </a>
                  </div>
                );
              })}
          </div>

          {/* <div className="widget bg-white world-saver">
            <h5 className="widget--title">Find A World Saver</h5>
            <FindAWorldSaver countries={countryList} categories={category} />
          </div> */}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state?.category,
  user: state?.user,
});

export default connect(mapStateToProps, {
  getadvertiseDetail,
  getJournyList,
  getyoutubeDetail,
})(RightWidgets);
