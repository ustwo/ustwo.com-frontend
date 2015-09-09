'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';
import kebabCase from 'lodash/string/kebabCase';

import Flux from '../flux';
import JobItem from '../components/job-item';
import Rimage from '../elements/rimage';

export default class StudioJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedJob: null
    }
  }
  render() {
    const studio = this.props.studio;
    const id = kebabCase(studio.name);
    const classes = classnames('studio-jobs', `${id}-jobs`, {
      selected: this.props.selected
    });
    const attachments = get(studio, '_embedded.wp:attachment');
    const image = find(attachments, 'id', get(studio, 'featured_image'));
    return (
      <div className={classes}>
        <h3>{studio.name}</h3>
        <div className="tab-content" id={`tab-content-${id}`}>
          <div className="studio-info">
            <div className="info" style={{ backgroundColor: this.props.colour }}>
              <p className="excerpt">{get(studio, 'recruitment-title')}</p>
              <p className="content">{get(studio, 'recruitment-desc')}</p>
            </div>
            <Rimage className="photo" wrap="div" sizes={{ hardcoded: {
              url: "/images/photo.jpg"
            } }} />
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
          <a href={this.props.contactEmail.length ? `${this.props.contactEmail}?subject=${this.props.studio.name} Jobs` : ''}>Get in touch</a>
        </div>
      );
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
    let studio = find(this.props.studios, 'name', job.location.city);
    if(!studio) {
      studio = find(this.props.studios, 'name', 'London');
    }
    return studio.color;
  }
}
