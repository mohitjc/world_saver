import React from 'react';

const ProjectsProfile = ({ data }) => {
  return (
    <div className="section-body">
      <div className="row mt-sm-4">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card profile-widget">
            <div className="profile-widget-description">
              <div className="profile-widget-name">{data && data.question}</div>
              {data && data.question}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsProfile;
