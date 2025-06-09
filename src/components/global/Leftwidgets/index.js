import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import empty from '../../../assets/img/empty.jpg';
import { apiUrl } from '../../../environment';
// import { history } from '../../../main/history';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { connect } from 'react-redux';
import { getUserById } from '../../../actions/user';
import ApiClient from '../../../api-client';
import { toast } from 'react-toastify';
import load from '../../loaderMethod';

const Leftwidgets = ({
  user,
  projects,
  friends,
  userImages,
  userVideos,
  setModalType,
  setImageUrl,
  isLoginUser,
  setEditMember,
  memberDetails,
  getData,
  togglePrviewImage,
}) => {
  //console.log(userImages, 'Images of my media');
  let media = [];
  const [close, setClose] = useState();
  const history = useNavigate();
  const edit = () => {
    setEditMember(true);
    history(`/${user.username}/edit`);
  };

  const muteUnmute = (itm) => {
    let param = {
      reportedBy: user?.id,
      reportedTo: itm?.id,
    };

    if (itm.isHide) {
      load(true);
      ApiClient.put(`${apiUrl}/change/block`, param).then((res) => {
        cards();
        toast.success('Unmute successfully');
        load(false);
      });
    } else {
      load(true);
      ApiClient.post(`${apiUrl}/block`, param).then((res) => {
        toast.success('Mute successfully');
        cards();
        load(false);
      });
    }
  };

  const viewFriend = (id) => {
    history(`/${id}`);
    getData(id);
  };
  // Guide
  const [card, setcard] = useState();
  const userId = localStorage.getItem('userID');
  const cards = () => {
    ApiClient.get(`${apiUrl}/user`, {
      isGuide: true,
      page: 1,
      count: 1000,
      userId,
    }).then((res) => {
      setcard(res?.data?.users);
      //console.log('Hello', res.data.users);
    });
  };

  const userid = localStorage.getItem('userID');
  //console.log(userid, 'userid');
  useEffect(() => {
    cards();
  }, []);

  return (
    <>
      <div className="widget bg-white">
        <h5 className="d-flex justify-content-between mt-0">
          About Me
          {isLoginUser && (
            <a onClick={() => edit()} className="text-primary editIcon">
              <i className="fa fa-edit"></i> Edit
            </a>
          )}
        </h5>

        <div className="aboutinfo">
          {memberDetails && memberDetails.aboutme}
        </div>
      </div>

      <div className="widget bg-white">
        <h5 className="d-flex justify-content-between mt-0">My Media</h5>

        <ul
          className="nav nav-pills mb-2 media-nav"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active guidname"
              id="pills-photos-tab"
              data-toggle="pill"
              href="#pills-photos"
              role="tab"
              aria-controls="pills-photos"
              aria-selected="true"
            >
              Photos
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link guidname"
              id="pills-videos-tab"
              data-toggle="pill"
              href="#pills-videos"
              role="tab"
              aria-controls="pills-videos"
              aria-selected="false"
            >
              Videos
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link guidname"
              id="pills-other-tab"
              data-toggle="pill"
              href="#pills-other"
              role="tab"
              aria-controls="pills-other"
              aria-selected="false"
            >
              All
            </a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade active show"
            id="pills-photos"
            role="tabpanel"
            aria-labelledby="pills-photos-tab"
          >
            <div className="photos-row">
              {userImages &&
                userImages.map((image, i) => {
                  if (i >= 9) {
                    return;
                  } else {
                    return (
                      <a
                        key={`cct-img-${i}`}
                        onClick={() => {
                          togglePrviewImage(apiUrl + image.imagePath);
                          setClose(true);
                        }}
                      >
                        <img
                          src={
                            image.imagePath === '' ||
                            image.imagePath === undefined
                              ? empty
                              : apiUrl + image.imagePath
                          }
                          style={{ width: '100%' }}
                          className="guidesimg"
                        />
                      </a>
                    );
                  }
                })}
            </div>
            {userImages.length > 9 && (
              <div className="d-flex justify-content-between mt-1">
                <Link
                  to={`/membermedia/${
                    memberDetails && memberDetails.username
                  }/photo`}
                  className="text-primary"
                >
                  View More
                </Link>
              </div>
            )}
          </div>

          <div
            className="tab-pane fade"
            id="pills-videos"
            role="tabpanel"
            aria-labelledby="pills-videos-tab"
          >
            <div className="photos-row">
              {userVideos &&
                userVideos.map((video, i) => {
                  if (i >= 9) {
                    return;
                  } else {
                    return (
                      <a
                        key={`kst-img-${i}`}
                        onClick={() => {
                          setClose(true);
                          setImageUrl(`${apiUrl}${video.videoPath}`);
                          setModalType('video');
                        }}
                      >
                        <video
                          controls
                          // autoPlay
                          playsInline
                          muted
                          src={`${apiUrl}${video.videoPath}`}
                          style={{ width: '100%' }}
                        />
                      </a>
                    );
                  }
                })}
            </div>

            {userVideos.length > 9 && (
              <div className="d-flex justify-content-between mt-1">
                <Link
                  to={`/membermedia/${user.id}/video`}
                  className="text-primary"
                >
                  View More
                </Link>
              </div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="pills-other"
            role="tabpanel"
            aria-labelledby="pills-other-tab"
          >
            <div className="photos-row">
              {media &&
                media.map((item, i) => {
                  if (i >= 3) {
                    return;
                  } else {
                    return (
                      <a href="" key={`kst-img-${i}`} className="type_audio">
                        <img src="/assets/img/banner.jpg" />
                      </a>
                    );
                  }
                })}
              {userImages &&
                userImages.map((image, i) => {
                  if (i >= 9) {
                    return;
                  } else {
                    return (
                      <a
                        key={`cct-img-${i}`}
                        data-toggle="modal"
                        data-overlay="0.1"
                        onClick={() => {
                          setClose(true);
                          setImageUrl(apiUrl + image.imagePath);
                          setModalType('image');
                        }}
                      >
                        <img
                          className="img-contain"
                          src={
                            image.imagePath === '' ||
                            image.imagePath === undefined
                              ? '/assets/img/people22.png'
                              : apiUrl + image.imagePath
                          }
                          style={{ width: '100%' }}
                        />
                      </a>
                    );
                  }
                })}
              {userVideos &&
                userVideos.map((video, i) => {
                  if (i >= 9) {
                    return;
                  } else {
                    return (
                      <a
                        key={`kst-img-${i}`}
                        onClick={() => {
                          setClose(true);
                          setImageUrl(`${apiUrl}${video.videoPath}`);
                          setModalType('video');
                        }}
                      >
                        <video
                          controls
                          // autoPlay
                          playsInline
                          muted
                          src={`${apiUrl}${video.videoPath}`}
                          style={{ width: '100%' }}
                        />
                      </a>
                    );
                  }
                })}
            </div>

            {userVideos.length > 9 && (
              <div className="d-flex justify-content-between mt-1">
                <Link
                  to={`/membermedia/${user.id}/all`}
                  className="text-primary"
                >
                  View More
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="widget bg-white">
        <h5 className="d-flex mt-0">My Journeys</h5>
        <div className="photos-row">
          {projects &&
            projects.map((project, i) => {
              if (i >= 9) {
                return;
              } else {
                return (
                  <a
                    href="#"
                    key={`bnr-img-${i}`}
                    title={project.name}
                    onClick={() => history(`/journey/${project.slug}`)}
                  >
                    <img
                      className="img-contain"
                      src={
                        project.image === '' || project.image === undefined
                          ? '/assets/img/people22.png'
                          : apiUrl + project.image
                      }
                      alt={project.name}
                      style={{ width: '100%' }}
                    />
                  </a>
                );
              }
            })}
        </div>

        {projects.length > 9 && (
          <div className="d-flex justify-content-between mt-1">
            <Link to="/journeyList?type=myJourney" className="text-primary">
              View More.
            </Link>
          </div>
        )}
      </div>
      {/* My Guide Cards */}
      <div className="widget bg-white">
        <h5>My Guides</h5>
        <div className="photos-row">
          {card &&
            card.map((friend, i) => {
              //console.log(friend.id, 'card');
              if (i >= 9) {
                return;
              } else {
                return (
                  <div className="mb-2">
                    {friend?.id === userid ? (
                      <> </>
                    ) : (
                      <a
                        className="font-weight-bold text-primary"
                        onClick={(e) => muteUnmute(friend)}
                      >
                        {friend.isHide && friend.id !== user.id
                          ? 'unmute'
                          : 'mute'}
                      </a>
                    )}

                    {friend?.id === userid ? (
                      <> </>
                    ) : (
                      <a
                        onClick={() => viewFriend(friend.username)}
                        title={friends.fullName}
                      >
                        {/* <i className='fa fa-eye'></i> */}
                        <img
                          className="img-contain"
                          src={
                            friend.image === '' || friend.image === undefined
                              ? '/assets/img/people22.png'
                              : apiUrl + friend.image
                          }
                          alt={friend.fullName}
                          title={friends.fullName}
                          style={{ width: '100%' }}
                        />

                        <p className="guidname">{friend.fullName}</p>
                      </a>
                    )}
                  </div>
                );
              }
            })}
        </div>
        {/* <div className="row">
            {card && card.map(item => {
              return <div className='col-md-6 mb-3'>
                <div className="card h-100">
                  <div className="card-body">
                    <Link to={`/memberdetail/${item.username}`}>
                      <img src={item.coverImage ? `${apiUrl}/images/user_cover/${item.coverImage}` : '/assets/img/default.jpg' + item.coverImage} className="card-img-top" alt="Guide img" />
                      <h5 className="card-title">{item.username}</h5></Link>
                    <p className="card-text">{item.country + ", " + item.city}</p>
                  </div>
                </div>
              </div>
            })}
          </div> */}
      </div>

      <div className="widget bg-white">
        <h5 className="d-flex mt-0">My World Savers</h5>
        <div className="photos-row">
          {friends &&
            friends.map((friend, i) => {
              if (i >= 9) {
                return;
              } else {
                return (
                  <a
                    onClick={() => viewFriend(friend.username)}
                    title={friends.fullName}
                  >
                    <img
                      className="img-contain"
                      src={
                        friend.image === '' || friend.image === undefined
                          ? '/assets/img/people22.png'
                          : apiUrl + friend.image
                      }
                      alt={friend.fullName}
                      title={friends.fullName}
                      style={{ width: '100%' }}
                    />
                    <p className="guidname">{friend.fullName}</p>
                  </a>
                );
              }
            })}
        </div>

        {friends.length > 9 && (
          <div className="d-flex justify-content-between mt-1">
            <Link to="/worldsavers" className="text-primary">
              View More.
            </Link>
          </div>
        )}
      </div>

      {/* 
        {close ? <ImageModal type={modalType} setClose={setClose} url={modalUrl} /> : <></>} */}
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.category,
  user: state.user,
});

// export default Leftwidgets;

export default connect(mapStateToProps, {
  getUserById,
})(Leftwidgets);
