import React from 'react';

const StatsItem = () => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-12">
      <div className="card card-statistic-1">
        <div className="card-icon bg-danger">
          <i className="far fa-newspaper" />
        </div>
        <div className="card-wrap">
          <div className="card-header">
            <h4>News</h4>
          </div>
          <div className="card-body">42</div>
        </div>
      </div>
    </div>
  );
};

export default StatsItem;
