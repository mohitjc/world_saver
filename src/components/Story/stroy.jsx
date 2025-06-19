import React, { useEffect, useState, useRef } from 'react';
import local from '../../environment';
import Popup from 'reactjs-popup';

const Story = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // Track selected video
  const [currentIndex, setCurrentIndex] = useState(null); // Track index of the currently playing video
  const playerRef = useRef(null);
  const iframeContainerRef = useRef(null);

  const API_SLUG = local.apiUrl;
  const ALL_YOUTUBE_API = `${API_SLUG}/allyouTubeLink`;
  const token = localStorage.getItem('token');

  // Get YouTube items from API
  async function getYoutubeItems(token, type, page, count, sortType, sort, search) {
    const url = `${ALL_YOUTUBE_API}?type=${type}&search=${encodeURIComponent(search)}&page=${page}&count=${count}&sortBy=${sortType} ${sort}`;

    const config = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error_description || 'Something went wrong!';
        throw new Error(errorMessage);
      }
      const data = await response.json();
      if (data.success) {
        console.log(Object.values(data.data));
        setData(data.data);
      } else {
        throw new Error('API did not return success');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getYoutubeItems(token, 'I', 1, 100, 'date', 'asc', '')
      .then(data => {
        setData(data.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [token]);

  // Handle video click play
  const handleVideoClick = (item, index) => {
    setSelectedVideo(item); 
    setCurrentIndex(index);  
    setIsModalOpen(true);
    if (playerRef.current) {
      const duration = playerRef.current.duration;  // Get video duration (in seconds)
      // Update state with duration
      console.log('Video Duration: ', duration);  // Log the duration (in seconds)
    }
  };

  // Play the next video when the current one ends
  const handleVideoEnd = () => {
    if (currentIndex < data.length - 1) {

      // Move  next video
      const nextIndex = currentIndex + 1;
      setSelectedVideo(data[nextIndex]);
      setCurrentIndex(((prev)=>prev+1));
      console.log(currentIndex)
    } else {
      // Close the modal when all videos have been played
      setIsModalOpen(false);
    }
  };
  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      setSelectedVideo(data[nextIndex]);
      setCurrentIndex(nextIndex);
    } else {
      setIsModalOpen(false); // Close modal if no next video
    }
  };

  // Move to the previous video manually via Prev button
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setSelectedVideo(data[prevIndex]);
      setCurrentIndex(prevIndex);
    }else{
      setIsModalOpen(false);
    }
  };

  const handleLoadedMetadata = () => {
    if (playerRef.current) {
      const duration = playerRef.current.duration;  // Get video duration (in seconds)
      // Update state with duration
      console.log('Video Duration: ', duration);  // Log the duration (in seconds)
    }
  };


  return (
    <div className="main_videosdiv">
      <div className='row_videos'>
      {data.length > 0 &&
        Object.values(data).filter((item)=> item.isArchive == false).map((item, index) => { 
          
          return (
              <div className='listgrid_video' key={index}>
                  
              <div className='img_video' onClick={() => handleVideoClick(item, index)}>
                <img
                  src={`${API_SLUG}/images/youtube/${item.image}`}
                  alt={item.title}
                />
                <h4 className="text-align-center mt-2">{item.title}</h4>
              </div>


              {/* Modal  display video */}
              {isModalOpen && selectedVideo && selectedVideo === item && (
                <Popup
                  modal
                  open={isModalOpen}
                  className='modal_design'
                  onClose={() => {
                    setIsModalOpen(false);
                    setSelectedVideo(null); 
                    setCurrentIndex(null); 
                  }}
                  contentStyle={{
                    padding: '0',
                  }}
                  overlayStyle={{
                    background: 'rgba(0, 0, 0, .8)', 
                  }}
                >
                  <div className='modal_layout'>
                    <div>
                      
                      <div className='video-heading'>{selectedVideo.title}</div>
                      <div className='modal_data'>
                      <i onClick={handlePrev} class="fa fa-chevron-circle-left" aria-hidden="true"></i>
                      <div className='video_div'>
                        <video
                        ref={playerRef}
                        controls
                        autoPlay
                        muted
                        onEnded={handleVideoEnd}  // automaticlly play next Video
                        onLoadedData={() => console.log('Video Loaded')}
                        onLoadedMetadata={handleLoadedMetadata}
                        preload="auto" 
                      >
                        <source src={`${API_SLUG}/videos/${selectedVideo.video}`} />
                      </video>
                      </div>
                      <i onClick={handleNext} class="fa fa-chevron-circle-right" aria-hidden="true"></i>
                      
                      </div>
                      
                      
                      
                    </div>
                  </div>
                </Popup>
              )}
            </div>
          );
        })}
    </div>
    </div>
  );
};

export default Story;
