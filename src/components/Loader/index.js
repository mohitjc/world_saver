import React, { useState, useEffect, useRef } from 'react';

const Loader = () => {
  return (
    <div className="col-md-12 text-center">
      <div id="ctn" className="lodding w-100">
        <div id="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
