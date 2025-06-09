import React from 'react';

const PostItem = ({ item }) => {
  return (
    <li>
      <div className="activity--item">
        <div className="activity--avatar">
          <a href="member-activity-personal.html">
            <img src="../assets/img/person.png" alt='' />
          </a>
        </div>

        <div className="activity--info fs--14">
          <div className="activity--header">
            <p>
              <a href="member-activity-personal.html">Samuel C. Azevedo</a>{' '}
              posted an update in the{' '}
              <a href="group-home.html">Travel Guides</a>
            </p>
          </div>

          <div className="activity--meta fs--12">
            <p>
              <i className="fa mr--8 fa-clock-o"></i>Yeasterday at 08:20 am
            </p>
          </div>

          <div className="activity--content">
            <p>{item.user_post}</p>
          </div>

          <div className="activity--action fw--700">
            <a href="#">See More...</a>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostItem;
