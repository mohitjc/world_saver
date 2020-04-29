import React from 'react';

const EmptyState = () => {
  return (
    <div className="card-body">
      <div className="empty-state" data-height="400">
        <div className="empty-state-icon">
          <i className="fas fa-question" />
        </div>
        <h2>We couldn't find any data</h2>
        {/* <p className="lead">Sorry we can't find any data</p> */}
        {/* <a href="#" className="btn btn-primary mt-4">
          Create new One
        </a>
        <a href="#" className="mt-4 bb">
          Need Help?
        </a> */}
      </div>
    </div>
  );
};

export default EmptyState;
