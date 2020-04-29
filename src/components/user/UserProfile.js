import React from 'react';

const UserProfile = ({ data }) => {
  return (
    <div className="section-body">
      <div className="row mt-sm-4">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card profile-widget">
            <div className="profile-widget-header">
              <img
                alt="image"
                src="../assets/img/avatar/avatar-1.png"
                className="rounded-circle profile-widget-picture"
              />
              <div className="profile-widget-items">
                <div className="profile-widget-item">
                  <div className="profile-widget-item-label">Posts</div>
                  <div className="profile-widget-item-value">-</div>
                </div>
                <div className="profile-widget-item">
                  <div className="profile-widget-item-label">Followers</div>
                  <div className="profile-widget-item-value">-</div>
                </div>
                <div className="profile-widget-item">
                  <div className="profile-widget-item-label">Following</div>
                  <div className="profile-widget-item-value">-</div>
                </div>
              </div>
            </div>
            <div className="profile-widget-description">
              <div className="profile-widget-name">{data && data.fullName}</div>
              Ujang maman is a superhero name in <b>Indonesia</b>, especially in
              my family. He is not a fictional character but an original hero in
              my family, a hero for his children and for his wife. So, I use the
              name as a user in this template. Not a tribute, I'm just bored
              with <b>'John Doe'</b>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
