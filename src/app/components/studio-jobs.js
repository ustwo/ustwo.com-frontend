'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';
import kebabCase from 'lodash/string/kebabCase';
import Flux from '../flux';
import JobItem from '../components/job-item';

const studioIntros = {
  'all-studios': {
    title: "",
    text: ""
  },
  london: {
    title: "Join our flagship studio in Shoreditch",
    text: "Occuping three floors of The Tea Building in Shoreditch, our UK studio has over 100 talented and driven people. We're dedicatoed to delivering pixel perfect work for clients including Barclays and Cahnnel4, as well as our own products including Whale Trail and Monument Valley."
  },
  malmo: {
    title: "Join our flagship Swedish studio in Malmö",
    text: "Swedish cheesy feet paneer who moved my cheese. Fromage frais halloumi queso cheese triangles feta boursin port-salut macaroni cheese. Mozzarella smelly cheese cheese triangles rubber cheese ricotta the big cheese ricotta melted cheese. Chalk and cheese stinking bishop."
  },
  'new-york': {
    title: "Join our flagship US studio in Noo Yoik",
    text: "American cheesy feet paneer who moved my cheese. Fromage frais halloumi queso cheese triangles feta boursin port-salut macaroni cheese. Mozzarella smelly cheese cheese triangles rubber cheese ricotta the big cheese ricotta melted cheese. Chalk and cheese stinking bishop."
  },
  sydney: {
    title: "Join our flagship Aussie studio in Sydo",
    text: "Australian cheesy feet paneer who moved my cheese. Fromage frais halloumi queso cheese triangles feta boursin port-salut macaroni cheese. Mozzarella smelly cheese cheese triangles rubber cheese ricotta the big cheese ricotta melted cheese. Chalk and cheese stinking bishop."
  }
};

export default class StudioJobs extends React.Component {
  render() {
    const studio = this.props.studio;
    const id = kebabCase(studio.name);
    const classes = classnames('studio-jobs', `${id}-jobs`, {
      selected: this.props.selected
    });
    return (
      <div className={classes}>
        <h3>{studio.name}</h3>
        <div className="tab-content" id={`tab-content-${id}`}>
          <div className="studio-info">
            <div className="info" style={{ backgroundColor: this.props.colour }}>
              <p className="excerpt">{get(studio, 'recruitment-title')}</p>
              <p className="content">{get(studio, 'recruitment-desc')}</p>
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
          <a href={this.props.contactEmail.length ? `${this.props.contactEmail}?subject=${this.props.studio.name} Jobs` : ''}>Get in touch</a>
        </div>
      );
    }
    return list;
  }
  renderJobItem = (job) => {
    return <JobItem key={`job-${job.shortcode}`} job={job} colour={this.getStudioColour(job)} />;
  }
  getStudioColour = (job) => {
    let studio = find(this.props.studios, 'name', job.location.city);
    if(!studio) {
      studio = find(this.props.studios, 'name', 'London');
    }
    return studio.color;
  }
}
