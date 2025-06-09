import React, { Component, Fragment } from 'react';
import Notifications from '../components/project/Notifications';

export default class ProjectNotifications extends Component {
  render() {
    return (
      <Fragment>
        <section
          className="page--wrapper pt--20 pb--20"
          style={{ backgroundColor: '#eee' }}
        >
          <div className="container">
            <div className="row">
              <Notifications />
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
