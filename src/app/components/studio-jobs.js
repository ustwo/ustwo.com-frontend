'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import times from 'lodash/utility/times';
import Flux from '../flux';
import JobItem from '../components/job-item';

export default class StudioJobs extends React.Component {
  render() {
    const studio = this.props.studio;
    const classes = classnames('studio-jobs', `${studio}-jobs`, {
      selected: this.props.selected
    });
    const jobCount = {
      all: 12,
      london: 4,
      malmo: 3,
      newyork: 2,
      sydney: 3
    }
    return (
      <div className={classes}>
        <h3>{studio}</h3>
        <div className="tab-content" id={`tab-content-${studio}`}>
          <div className="studio-info">
            <div className="info" style={{ backgroundColor: this.props.colour }}>
              <p className="excerpt">Join our flagship studio in Shoreditch</p>
              <p className="content">Occuping three floors of The Tea Building in Shoreditch, our UK studio has over 100 talented and driven people. We're dedicatoed to delivering pixel perfect work for clients including Barclays and Cahnnel4, as well as our own products including Whale Trail and Monument Valley.</p>
            </div>
            <div className="photo" style={{backgroundImage: "url(/images/photo.jpg)"}}>
              <img src="/images/photo.jpg" alt="Tea Building" />
            </div>
          </div>
          {this.renderJobsList()}
        </div>
      </div>
    );
  }
  renderJobsList = () => {
    const jobs = this.props.jobs;
    let list;
    if(jobs.length) {
      list = (
        <ul className="jobs-list">
          {jobs.map(this.renderJobItem)}
        </ul>
      );
    } else {
      list = (
        <div className="jobs-none">
          <p>We don't have any openings currently. However we're always looking for talented individuals to join the ustwo family.</p>
          <a href="#">Get in touch</a>
        </div>
      );
    }
    return list;
  }
  renderJobItem = (job) => {
    return <JobItem job={job} colour={this.props.colour} />;
  }
}
