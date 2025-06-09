import React from 'react';

const Filter = () => {
  return (
    <div className="filter--nav pb--60 clearfix">
      <div className="filter--link float--left">
        <h2 className="h4">
          <a href="/" className="btn-link">
            World Savers: 30,000
          </a>
        </h2>
      </div>

      <div className="filter--options float--right">
        <label style={{ display: 'flex' }}>
          <span className="fs--14 ff--primary fw--500 text-darker">
            Show By :
          </span>

          <select
            name="activityfilter"
            className="form-control form-sm"
            data-trigger="selectmenu"
          >
            <option value="everything" selected>
              — Everything —
            </option>
            <option value="new-members">New World Savers</option>
            <option value="profile-updates">Profile Updates</option>
            <option value="updates">Updates</option>
            <option value="friendships">Friendships</option>
            <option value="new-groups">New Groups</option>
            <option value="group-memberships">Group Memberships</option>
            <option value="group-updates">Group Updates</option>
            <option value="topics">Topics</option>
            <option value="replies">Replies</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Filter;
