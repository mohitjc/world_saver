import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import RightWidgets from '../../components/global/Rightwidges';
import './style.scss';
import { getUserById, getUserMedia } from '../../actions/user';
import person from '../../assets/img/person.png';
import { apiUrl } from '../../environment';
import ApiClient from '../../api-client';

function MemberMedia(props) {
  const { type, userId } = useParams();
  const [tab, setTab] = useState(type);
  const [memberDetails, setMemberDetails] = useState([]);
  const [userImages, setUserImages] = useState([]);
  const [userVideos, setUserVideos] = useState([]);
  const [rightclose, setRightClose] = useState(false);

  useEffect(() => {
    getData()
  }, []);

  const getAllData = (id) => {
    props.getUserById({ id: id }, props.user.access_token, (res) => {
      if (res.success) {
        setMemberDetails(res.data);
      }
    });

    props.getUserMedia(
      { id: id, type: 'images' },
      props.user.access_token,
      (res) => {
        if (res.success) {
          setUserImages(res.data);
        }
      }
    );
    props.getUserMedia(
      { id: id, type: 'videos' },
      props.user.access_token,
      (res) => {
        if (res.success) {
          setUserVideos(res.data);
        }
      }
    );
  }


  const getData = (id) => {
    console.log("userId", userId)
    let url = `${apiUrl}/slug/user/${id ? id : userId}`;
    ApiClient.get(url, {}).then(res => {
      if (res.success) {
        setMemberDetails(res.data);
        getAllData(res.data.id)
      }
    })
  };

  return (
    <>
      <div className="banner--section bg--img">
        <div>
          <label
            for="bannerImage"
            className="profile-banner"
            style={{
              backgroundImage: `url(${memberDetails.coverImage
                ? apiUrl +
                '/images/user_cover/thumbnail/500/' +
                memberDetails.coverImage
                : '/assets/img/banner.jpg)'
                }`,
            }}
          ></label>
        </div>
        <div className="text-center profile-user mb-0">
          <img
            src={memberDetails.image ? apiUrl + memberDetails.image : person}
            className="profile-avtar"
          />


          <h4>{memberDetails.fullName}</h4>
        </div>
      </div>

      <div className="page--wrapper pt--20">
        <div className="container">
          <div className="row">
            <div
              className="main--content col-md-8 pb--20"
              data-trigger="stickyScroll"
            >
              <div className="main--content-inner drop--shadow bg-white">
                {/* <!-- Gallery Header Start --> */}
                <div className="gallery--header pb--15 clearfix">
                  <div className="gallery--title float--left">
                    <h3 className="h3 fw--500 text-default">Media Gallery</h3>
                  </div>
                </div>

                <ul
                  className="nav nav-pills mb-2 media-nav"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      className={tab == 'all' ? 'nav-link active' : 'nav-link'}
                      onClick={() => setTab('all')}
                    >
                      All
                    </a>
                  </li>

                  <li className="nav-item" role="presentation">
                    <a
                      className={
                        tab == 'photo' ? 'nav-link active' : 'nav-link'
                      }
                      onClick={() => setTab('photo')}
                    >
                      Photos
                    </a>
                  </li>

                  <li className="nav-item" role="presentation">
                    <a
                      className={
                        tab == 'video' ? 'nav-link active' : 'nav-link'
                      }
                      onClick={() => setTab('video')}
                    >
                      Videos
                    </a>
                  </li>
                </ul>

                <div className="tab-content" id="pills-tabContent">
                  <div
                    className={
                      tab == 'all'
                        ? 'tab-pane fade active show'
                        : 'tab-pane fade'
                    }
                  >
                    <div className="gallery--items">
                      <div className="row gutter--15 AdjustRow">
                        {userImages &&
                          userImages.map((image, i) => {
                            // console.log
                            return (
                              <div className="col-sm-3 col-xs-4 col-xxs-6 pt--15">
                                <div className="gallery--item type--photo">
                                  <a
                                    href="#mediaImgModal"
                                    data-toggle="modal"
                                    data-overlay="0.1"
                                  >
                                    <img
                                      key={`cct-img-${i}`}
                                      src={apiUrl + image.imagePath}
                                      style={{ width: '100%' }}
                                    />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        {userVideos &&
                          userVideos.map((video, i) => {
                            // console.log

                            return (
                              <div className="col-sm-3 col-xs-4 col-xxs-6 pt--15">
                                <div className="gallery--item type--photo">
                                  <a
                                    href="#mediaImgModal"
                                    data-toggle="modal"
                                    data-overlay="0.1"
                                  >
                                    <video
                                      key={`cct-img-${i}`}
                                      controls
                                      // autoPlay
                                      playsInline
                                      muted
                                      src={`${apiUrl}${video.videoPath}`}
                                      style={{ width: '100%' }}
                                    />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      tab == 'photo'
                        ? 'tab-pane fade active show'
                        : 'tab-pane fade'
                    }
                  >
                    <div className="gallery--items">
                      <div className="row gutter--15 AdjustRow">
                        {userImages &&
                          userImages.map((image, i) => {
                            // console.log
                            return (
                              <div className="col-sm-3 col-xs-4 col-xxs-6 pt--15">
                                <div className="gallery--item type--photo">
                                  <a
                                    href="#mediaImgModal"
                                    data-toggle="modal"
                                    data-overlay="0.1"
                                  >
                                    <img
                                      key={`cct-img-${i}`}
                                      src={apiUrl + image.imagePath}
                                      style={{ width: '100%' }}
                                    />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      tab == 'video'
                        ? 'tab-pane fade active show'
                        : 'tab-pane fade'
                    }
                  >
                    <div className="gallery--items">
                      <div className="row gutter--15 AdjustRow">
                        {userVideos &&
                          userVideos.map((video, i) => {
                            // console.log

                            return (
                              <div className="col-sm-3 col-xs-4 col-xxs-6 pt--15">
                                <div className="gallery--item type--photo">
                                  <a
                                    href="#mediaImgModal"
                                    data-toggle="modal"
                                    data-overlay="0.1"
                                  >
                                    <video
                                      key={`cct-img-${i}`}
                                      controls
                                      // autoPlay
                                      playsInline
                                      muted
                                      src={`${apiUrl}${video.videoPath}`}
                                      style={{ width: '100%' }}
                                    />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="main--sidebar col-md-4 pb--20 world_saver">
              <RightWidgets />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.category,
  user: state.user,
});

// export default MemberMedia;

export default connect(mapStateToProps, {
  getUserById,
  getUserMedia,
})(MemberMedia);
