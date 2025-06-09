import React from 'react';

const FeaturedVideo = () => {
  return (
    <div className="widget bg-white">
      <h2 className="h4 fw--700 widget--title">World Saver TV</h2>
      <iframe
        width="100%"
        height="200"
        src="https://www.youtube.com/embed/YE7VzlLtp-4"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default FeaturedVideo;
