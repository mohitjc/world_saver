import React from 'react';

const EmptyState = () => {
  return (
    <div className="card-body">
      <div className="empty-state" data-height="400">
        <div className="empty-state-icon">
          <i className="fas fa-question" />
        </div>
        <h2>We couldn't find any data</h2>
      </div>
    </div>
  );
};

export default EmptyState;
