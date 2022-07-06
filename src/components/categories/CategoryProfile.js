import React from 'react';

import { API_SLUG } from '../../store/constants';

const CategoryProfile = ({ data }) => {

  const getImg=(img)=>{
    let value='/assets/img/example-image.jpg'
    if(img) value=`${API_SLUG}${img}`
    return value
  }

  return (
    <div className="section-body">
      {/* <h2 className="section-title">Hi, {data && data.firstName}!</h2> */}
      <div className="row mt-sm-4">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card profile-widget">
            <div className="profile-widget-description">
              {/* <div className="profile-widget-name">{data && data.name}</div> */}
              {data && data.description}
            </div>
            <div className="profile-widget-description">
              {data && data.address}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-6 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4>Project Image</h4>
            </div>
            <div className="card-body">
              <div className="chocolat-parent">
                <a
                  href="../assets/img/example-image.jpg"
                  className="chocolat-image"
                  title="Just an example"
                >
                  <div data-crop-image="285">
                    <img
                      alt="image"
                      src={getImg(data && data.image)}
                      className="img-fluid"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4>Cover Image</h4>
            </div>
            <div className="card-body">
              <div className="chocolat-parent">
                <a
                  href={
                    `${API_SLUG}/images/projects/${data &&
                      data.banner_image}` || '../assets/img/example-image.jpg'
                  }
                  className="chocolat-image"
                  title="Just an example"
                >
                  <div data-crop-image="285">
                    <img
                      alt="image"
                      src={getImg(data && data.banner_image)}
                     
                      className="img-fluid"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProfile;
