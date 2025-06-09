import React from 'react';
import Filter from './Filter';
import PostItem from './PostItem';

const TimeLine = ({ data }) => {
  return (
    <div className="main--content-inner drop--shadow bg-white">
      <Filter />
      <div className="activity--list">
        <ul className="activity--items nav">
          {data &&
            data.result &&
            data.result.map((item) => <PostItem item={item} key={item.id} />)}
        </ul>
      </div>
    </div>
  );
};

export default TimeLine;
