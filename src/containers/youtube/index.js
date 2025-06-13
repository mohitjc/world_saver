import React, { useState, useEffect, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { getyoutubeList } from '../../actions/youtube';
import WordLimit from 'react-word-limit';
import './style.scss';
import Rightwidges from '../../components/global/Rightwidges';
import methodModel from '../../models/method.model';
import { startVideoPlayer } from '../../actions/YoutubePlayer';
import { apiUrl } from '../../environment';

const Youtube = (props) => {
  const videoPlayer = useSelector((state) => state.YoutubePlayer.videoPlayer);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoader(true);
    props.getyoutubeList('', props.user.access_token, (res) => {
      if (res.success) {
        setYoutube(res.data);
      }
      setTimeout(() => {
        setLoader(false);
      }, 100);
    });
  }, []);
  const [youtube, setYoutube] = useState([]);
  const [readmore, setReadMore] = useState('');
  const [loader, setLoader] = useState(true);
  const [activeVideoId, setActiveVideoId]= useState(false);

  const Loading = () => {
    return (
      <div className="d-flex align-items-center flex-column justify-content-center text-center py-3">
        <div className="d-flex align-items-center flex-column px-4">
          <BeatLoader color={'#5383ff'} loading={true} />
        </div>
      </div>
    );
  };

  const youtubeClick = (id) => {
    let element = document.getElementById('youtubeDiv_' + id);
    var rect = element.getBoundingClientRect();
    //console.log(rect.top, rect.right, rect.bottom, rect.left);
    dispatch(startVideoPlayer(id));

    setTimeout(() => {
      let custom_youtube = document.getElementById('custom-youtube-player');
      custom_youtube.classList.add('react-draggable-dragged');
      custom_youtube.style.left = `${rect.left}px`;
      custom_youtube.style.top = `${rect.top}px`;
      custom_youtube.style.width = `${element.offsetWidth}px`;
      custom_youtube.style.height = `${element.offsetHeight}px`;

      var reactResize = document.getElementsByClassName('react-resizable');
      for (var i = 0; i < reactResize.length; i++) {
        reactResize[i].style.width = `${element.offsetWidth}px`;
        reactResize[i].style.height = `${element.offsetHeight}px`;
      }
    }, 100);
  };

  return (
    <>
      <div className="wrapper">
        <div
          className="page--header pt--60 pb--60 text-center"
          style={{ backgroundImage: 'url(/assets/img/banner.jpg)' }}
        >
          <div className="container">
            <h3 className="text-light mb-0">Show Archives</h3>
          </div>
        </div>

        <div className="container youtubeContainer py-4">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                {loader ? (
                  <div className="col-md-12">
                    <Loading />
                  </div>
                ) : (
                  youtube &&
                  youtube.map((item,index) => {
                    console.log(youtube[index], index)
                    return (
                      <div className="col-sm-6 col-xl-4 mb-3" key={item.id}>
                        <div className='youtubecard'>
                        <div
                          className="layout_card"
                          id={`youtubeDiv_${methodModel.getYoutubeId1(
                            item.url
                          )}`}
                          // onClick={() =>
                          //   youtubeClick(methodModel.getYoutubeId1(item.url))
                          // }
                        >
                          {/* <img
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
                          methodModel.getYoutubeId1(item.video) ? (
                            <img
                              src="/assets/img/youtubeIcon.png"
                              className="youtubeIcon"
                            />
                          ) : (
                            <></>
                          )}
 */}


                          {activeVideoId !== item.id ? (
                              <img
                                src={`${apiUrl}/images/youtube/${item.image}`}
                                className="card-img-top w-full h-full"
                                alt="Play Video"
                                onClick={() => setActiveVideoId(activeVideoId === item.id ? null : item.id)}
                                style={{ cursor: 'pointer', height:'100%', objectFit: 'contain' }}
                              />
                            ) : (
                              <video
                                // width="90%"
                                // height="100%"
                                controls
                                autoPlay
                                muted
                                className="card-img-top w-full h-full"
                                preload="auto"
                                // onLoadedData={() => console.log('Video Loaded')}
                              >
                                <source src={`${apiUrl}/videos/${youtube[index].video}`} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            )}
                        </div>





                        <a href={item.url} target="_blank">
                          <h4 className="youtube_title mt-2">{item.title}</h4>
                        </a>
                        <div className="tags mb-1">
                          {item &&
                            item?.tags.map((itm) => {
                              return (
                                <span
                                  key={itm.toString()}
                                  className="badge badge-primary mr-1"
                                >
                                  {itm}
                                </span>
                              );
                            })}
                        </div>
                        <div className="youtube_desc">
                          {readmore == item.title ? (
                            <>
                              {item.description}
                              <a
                                className="youtube_read ml-2"
                                onClick={() => setReadMore('')}
                              >
                                Read Less
                              </a>
                            </>
                          ) : (
                            <>
                              <WordLimit limit={50}>
                                {item.description}
                              </WordLimit>
                              <a
                                className="youtube_read"
                                onClick={() => setReadMore(item.title)}
                              >
                                Read More
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="col-lg-4 main--sidebar">
              <Rightwidges />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// export default ProjectModal;

const mapStateToProps = (state) => ({
  data: state.category,
  user: state.user,
});

export default connect(mapStateToProps, { getyoutubeList })(Youtube);
