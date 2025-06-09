import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import local from '../../environment';

import Popup from 'reactjs-popup';
import { useRef } from 'react';

const Story = () => {

    const [data,setData] = useState([''])
    // Pop for video play
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);




    // to play next video auotmatically
    const [currentIndex, setCurrentIndex] = useState(0);
    const playerRef = useRef(null);
    const iframeContainerRef = useRef(null);

    const playVideo = (index) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
    };
    const getYoutubeId = (url) => {
        const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
      };






    const API_SLUG = local.apiUrl;
    const ALL_YOUTUBE_API = `${API_SLUG}/allyouTubeLink`
    const token = localStorage.getItem('token')
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
            // Extract error message if present
            const errorData = await response.json();
            const errorMessage = errorData.error_description || 'Something went wrong!';
            throw new Error(errorMessage);
          }
      
          const data = await response.json();
          if (data.success) {
            return data;  // Return the successful data
          } else {
            throw new Error('API did not return success');
          }
        } catch (error) {
          // Handle or propagate error
          throw error;
        }
      }
      useEffect(() => {
        getYoutubeItems(token, 'I', 1, 10, 'date', 'asc', '')
          .then(data => {
            setData(data.data);
            console.log(data.data)
          })
          .catch(err => {
            console.log(err.message);
          });
      }, [token]);      

      const getYoutubeThumbnail = (url) => {
        try {
          const urlObj = new URL(url);
          const videoId = urlObj.searchParams.get('v');
          return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        } catch (e) {
          return 'https://via.placeholder.com/150'; // fallback
        }
      };



    //   useEffect to handle next Video Play
    useEffect(() => {
        if (!isModalOpen || !iframeContainerRef.current) return;
    
        const loadYouTubePlayer = () => {
          if (playerRef.current) {
            playerRef.current.loadVideoById(getYoutubeId(data[currentIndex].url));
            return;
          }
    
          playerRef.current = new window.YT.Player(iframeContainerRef.current, {
            videoId: getYoutubeId(data[currentIndex].url),
            events: {
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  const nextIndex = (currentIndex + 1) % data.length;
                  setCurrentIndex(nextIndex);
                }
              }
            },
            playerVars: {
              autoplay: 1,
              mute: 1,
              rel: 0,
              modestbranding: 1,
            },
          });
        };
    
        if (window.YT && window.YT.Player) {
          loadYouTubePlayer();
        } else {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          window.onYouTubeIframeAPIReady = loadYouTubePlayer;
          document.body.appendChild(tag);
        }
      }, [isModalOpen, currentIndex]);
    



  return (
    <div className='flex flex-row gap-4 bg-white px-4 py-2 overflow-x-auto'>
        {/* <div className='bg-white h-[100px] w-[100px] border-2 border-[#ABABAB] rounded p-2'>
            conatiner -1
        </div> */}
       
        {/* {data.length >0 &&       data.map((video, index) => (
        <div key={index}    style={{ width: '200px' }}>
            
          <img
            src={getYoutubeThumbnail(video.url)}
            alt={video.title}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <h4>{video.title}</h4>
        </div>
      ))} */}
      {/* {data.length >0 &&       data.map((video, index) => (
        <div key={index} style={{ width: '200px' }}>
          <img
            src={getYoutubeThumbnail(video.url)}
            alt={video.title}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <h4>{video.title}</h4>
        </div>
      ))} */}
      {data.length >0 &&       data.map((video, index) => (
        <div key={index} style={{ width: '200px' }} onClick={() => playVideo(index)
          }>
          <img
            src={getYoutubeThumbnail(video.url)}
            alt={video.title}
            style={{ width: '100%', height: 'auto%', borderRadius: '8px' }}
          />
          <h4 className='text-[12px]'>{video.title}</h4>
          {isModalOpen && (
  <Popup
    modal
    open={isModalOpen}
    onClose={() => {
        setIsModalOpen(false);
        if (playerRef.current) {
          playerRef.current.destroy(); // 💥 destroy player
          playerRef.current = null;    // ✅ reset ref
        }
      }}
    contentStyle={{
      padding: '0', // Remove default padding
    }}
    overlayStyle={{
      background: 'rgba(0, 0, 0, 0.5)', // Optional: dim background
    }}
  >
    <div
      // style={{
      //   minWidth: '700px',
      //   minHeight : "400px",
      //   backgroundColor: '#fff',
      //   padding: '1.25rem', // 
      //   borderRadius: '1rem', // Equivalent to rounded-2xl
      //   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Equivalent to shadow-lg
      // }}
    >
      
      <div style={{ width: '700px', height: '400px' }}>
            <div
              ref={iframeContainerRef}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
    </div>
  </Popup>
)}
        </div>
        
      ))}
    
   


    </div>
  )
}

export default Story