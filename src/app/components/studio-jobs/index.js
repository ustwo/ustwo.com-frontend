'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';
import kebabCase from 'lodash/string/kebabCase';
import getFeaturedImage from '../../lib/get-featured-image';

import Flux from '../../flux';
import JobItem from '../job-item';
import Rimage from '../rimage';

export default class StudioJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedJob: null
    }
  }
  render() {
    const { studio, selected } = this.props;
    const id = kebabCase(studio.name);
    const classes = classnames('studio-jobs', `${id}-jobs`, {
      selected: selected
    });
    const image = getFeaturedImage(studio);
    return (
      <div className={classes}>
        <h3>{studio.name}</h3>
        <div className="tab-content" id={`tab-content-${id}`}>
          <div className="studio-info">
            <div className="info" style={{ backgroundColor: studio.color }}>
              <p className="excerpt">{get(studio, 'recruitment-title')}</p>
              <p className="content">{get(studio, 'recruitment-desc')}</p>
            </div>
            <Rimage className="photo" wrap="div" sizes={get(image, 'media_details.sizes')} />
          </div>
          {this.renderJobsList()}
        </div>
      </div>
    );
  }
  renderJobsList = () => {
    const { jobs, studio, contactEmail } = this.props;
    let list;
    if(jobs.length) {
      list = <ul className="jobs-list">
        {jobs.map(this.renderJobItem)}
      </ul>;
    } else {
      list = <div className="jobs-none">
        <p>We don't have any openings currently. However we're always looking for talented individuals to join the ustwo family.</p>
        <a href={contactEmail.length ? `${contactEmail}?subject=${studio.name} Jobs` : ''}>Get in touch</a>
      </div>;
    }
    return list;
  }
  renderJobItem = (job) => {
    return <JobItem
      key={`job-${job.shortcode}`}
      job={job}
      colour={this.getStudioColour(job)}
      open={this.state.selectedJob === job.shortcode}
      onClick={this.generateOnClickJobItemHandler(job)}
    />;
  }
  generateOnClickJobItemHandler = (job) => {
    return () => {
      const jid = job.shortcode;
      if (this.state.selectedJob === jid) {
        this.setState({ selectedJob: null });
      } else {
        this.setState({ selectedJob: jid });
        Flux.getJobDetails(jid);
      }
    }
  }
  getStudioColour = (job) => {
    const { studios } = this.props;
    let studio = find(studios, 'name', job.location.city);
    if(!studio) {
      studio = find(studios, 'name', 'London');
    }
    return studio.color;
  }
}
