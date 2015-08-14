'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import Flux from '../flux';
import JobItem from '../components/job-item';

export default class StudioJobs extends React.Component {
  render() {
    const classes = classnames('studio-jobs', `${this.props.studio}-jobs`);
    return (
      <div className={classes}>
        <input type="radio" checked name="tabs" id={`tab-${this.props.studio}`} />
        <h3>{this.props.studio}</h3>
        <div className="content" id={`tab-content-${this.props.studio}`}>
          <div className="studio-info">
            <p className="excerpt">Join our flagship studio in Shoreditch</p>
            <p className="content">Occuping three floors of The Tea Building in Shoreditch, our UK studio has over 100 talented and driven people. We're dedicatoed to delivering pixel perfect work for clients including Barclays and Cahnnel4, as well as our own products including Whale Trail and Monument Valley.</p>
            <div className="photo" style={{backgroundImage: "url(/images/photo.jpg)"}}>
              <img src="/images/photo.jpg" alt="Tea Building" />
            </div>
          </div>
          <ul className="jobs-list">
            <JobItem />
            <JobItem />
            <JobItem />
          </ul>
          <div className="jobs-none">
            <p>We don't have any openings currently. However we're always looking for talented individuals to join the ustwo family.</p>
            <a href="#">Get in touch</a>
          </div>
        </div>
      </div>
    );
  }
}
