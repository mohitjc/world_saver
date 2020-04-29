import React from 'react';
// import ReactMinimalPieChart from 'react-minimal-pie-chart';

const StatsGarph = () => {
  return (
    <div className="col-lg-8 col-md-12 col-12 col-sm-12">
      <div className="card">
        <div className="card-header">
          <h4>Statistics</h4>
          <div className="card-header-action" />
        </div>
        <div className="card-bodys">
          {/* <canvas id="myChart" height="182" /> */}
          <div className="statistic-details mt-sm-1">
            <div className="statistic-details-item">
              <img src="./assets/img/raph_full-new.jpg" />
              {/* <span className="text-muted">
                <span className="text-primary">
                  <i className="fas fa-caret-up" />
                </span>{' '}
                19%
              </span> */}

              {/* <div className="detail-value">Under construction!</div> */}
              {/* <div className="detail-name">This Year's Sales</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsGarph;
