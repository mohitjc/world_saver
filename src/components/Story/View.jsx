import React, { useState } from 'react';

const Thumbnail = ({ isOpen, closeModal ,videoUrl}) => {
  const[indx,setIndex] = useState(0);
  if (!isOpen) return null; // If modal is not open, don't render anything

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  };

  const modalContainerStyle = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px', // Adjust the size as needed
  };

  const modalTitleStyle = {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '1rem',
  };

  const modalDescriptionStyle = {
    marginBottom: '1.5rem',
  };

  const modalFooterStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
  };

  const closeButtonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const closeButtonHoverStyle = {
    backgroundColor: '#2980b9',
  };

  const getYouTubeVideoId = (url) => {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };
  
    const videoId = getYouTubeVideoId(videoUrl);
  
    if (!videoId) {
      return <p>Invalid YouTube URL</p>; // Show a message if the URL is invalid
    }
  
    // Construct the thumbnail URL
    const thumbnails = [
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      
    ];

    

  return (
    <div style={overlayStyle}>
      <div style={modalContainerStyle}>
      <iframe
        title='Youtube player'
        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
        src={`https://youtube.com/embed/${videoId}?autoplay=1&mute=1`}
         style={{
          width: '100%',
          maxWidth: '500px',
          minHeight : "400px",
          height: 'auto',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }} 
      ></iframe>
      {/* <div>
        <button onClick={()=>{setIndex((prev)=> (prev +1)%4)
          console.log(thumbnails[indx])
        }}>+</button>
        <button onClick={()=>setIndex((prev)=> (prev - 1 + thumbnails.length)%4)}>-</button>
      </div> */}
        <div style={modalFooterStyle}>
          <button
            onClick={closeModal}
            style={closeButtonStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = closeButtonHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#3498db')}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
