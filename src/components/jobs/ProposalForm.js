import React from 'react';

const ProposalForm = () => {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="proposal">
          <h4 className="title">New Proposal</h4>
          <p>Enter Your Proposal Details</p>
          <textarea
            name="name"
            className="form-control"
            cols="30"
            rows="10"
            placeholder="Provide general info about yourself e.g. what you can deliver and when, why you think you can do the job etc."
          ></textarea>
        </div>
        <div className="proposal-breakdown">
          <h4 className="title">Proposal Breakdown</h4>

          <div className="replicate">
            <div className="replicate-inner clearfix">
              <div className="proposal-left">
                <p>Item</p>
                <input
                  type="text"
                  className="form-control description"
                  placeholder="Enter your description"
                />
              </div>
              <div className="proposal-right">
                <p>
                  Amount{' '}
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="right"
                    data-type="primary"
                    title="Amount for this milestone"
                  >
                    <i className="icofont icofont-question-circle"></i>
                  </a>
                </p>
                <input type="number" className="form-control amount" value="" placeholder="$ 100" />
              </div>
            </div>
          </div>

          <div className="proposal-left">
            <p>
              <a className="add-item" href="#">
                + Add new item
              </a>
            </p>
            <div className="items">
              <ul>
                <li>Total</li>
                <li>You’ll earn</li>
                <li>Deposit</li>
              </ul>
            </div>
            <div className="info">
              <p>
                Please note that the minimum Service Fee per Invoice is $2.50 (excl.VAT). Read more
                on Fees Page
              </p>
            </div>
          </div>
          <div className="proposal-right">
            <input type="text" className="form-control total" placeholder="$ 300.00" />
            <input type="text" className="form-control earn" placeholder="$ 300.00" value="" />
            <input type="text" className="form-control" placeholder="$ 300.00" value="" />
            <input type="submit" className="form-control send" value="Send" />
          </div>
          <div className="notify-tm">
            <label className="checkbox-btn">
              Notify me if the job is awarded to someone else
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalForm;
