import React from 'react';

const ContentProfile = ({ data }) => {
  return (
    <div className="section-body">
      <div className="row mt-sm-4">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card profile-widget">
            <div className="profile-widget-description">
              <div className="profile-widget-name">{data && data.title}</div>
              {data && data.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentProfile;
