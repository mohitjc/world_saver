import React from 'react';

import FeaturedVideo from './FeaturedVideo';

const SideBar = () => {
  return (
    <div className="main--sidebar col-md-4 pb--60" data-trigger="stickyScroll">
      <FeaturedVideo />
    </div>
  );
};

export default SideBar;
