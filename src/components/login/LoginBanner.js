import React from 'react';

const LoginBanner = () => (
  <div
    className="col-lg-8 col-12 order-lg-2 order-1 min-vh-100 background-walk-y position-relative overlay-gradient-bottom"
    data-background="https://cdn.pixabay.com/photo/2015/07/30/17/24/audience-868074_960_720.jpg"
  >
    <div className="absolute-bottom-left index-2">
      <div className="text-light p-5 pb-2">
        <div className="mb-5 pb-3">
          <h1 className="mb-2 display-4 font-weight-bold">Give Capes</h1>
          <h5 className="font-weight-normal text-muted-transparent">
            An online community where heroes come together to grow their
            potential, give back to their community,
          </h5>
        </div>
        Photo by
        <a
          className="text-light bb"
          target="_blank"
          href="https://unsplash.com/photos/a8lTjWJJgLA"
        >
          Justin Kauffman
        </a>{' '}
        on{' '}
        <a
          className="text-light bb"
          target="_blank"
          href="https://unsplash.com"
        >
          Unsplash
        </a>
      </div>
    </div>
  </div>
);

export default LoginBanner;
