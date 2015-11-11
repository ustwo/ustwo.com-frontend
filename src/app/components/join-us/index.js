'use strict';

import React from 'react';
import classnames from 'classnames';
import find from 'lodash/collection/find';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';
import get from 'lodash/object/get';
import kebabCase from 'lodash/string/kebabCase';
import spannify from '../../lib/spannify';
import getFeaturedImage from '../../lib/get-featured-image';
import renderModules from '../../lib/module-renderer';
import getScrollTrackerMixin from '../../lib/get-scroll-tracker-mixin';

import DownChevron from '../down-chevron';
import SVG from '../svg';
import Hero from '../hero';
import StudioJobs from '../studio-jobs';
import Rimage from '../rimage';

const PageJoinUs = React.createClass({
  mixins: [getScrollTrackerMixin('join-us')],
  getInitialState() {
    return {
      studio: 'all-studios'
    };
  },
  render() {
    const { page } = this.props;
    const classes = classnames('page-join-us', this.props.className);
    const image = getFeaturedImage(page);
    const sizes = { hardcoded: { url: '/images/joinus/current_openings.jpg' }};

    return <article className={classes}>
      <Hero
        title={get(page, 'display_title')}
        transitionImage={true}
        sizes={get(image, 'media_details.sizes')}
        altText={get(image, 'alt_text')}
        eventLabel='join-us'
        showDownChevron={true}
      />
      <div className="current-openings">
        <h2>Current Openings</h2>
      </div>
      <section className="jobs">
        <nav className="jobs-studio-tabs">
          {this.renderStudioTabs()}
        </nav>
        <div className='jobs-container'>
          {this.renderStudioJobs()}
        </div>
      </section>
      <div className="benefits">
        <h2>Some of the benefits...</h2>
      </div>
      {get(pageData, 'page_builder', []).map(this.getModuleRenderer())}
    </article>;
  },
  getStudios() {
    return [{
      name: 'All studios'
    }].concat(this.props.studios);
  },
  renderStudioTabs() {
    return map(this.getStudios(), studio => {
      const id = kebabCase(studio.name);
      const name = spannify(studio.name);
      return <li
        key={`tab-${id}`}
        className={id}
        ref={`tab-${id}`}
        onClick={this.generateOnClickStudioHandler(id)}
        aria-selected={this.state.studio === id}
      >{name}</li>;
    });
  },
  generateOnClickStudioHandler(studio) {
    return () => {
      const el = React.findDOMNode(this.refs[`tab-${studio}`]);
      const tabs = this.getStudios().map(studio => {
        const id = kebabCase(studio.name);
        return React.findDOMNode(this.refs[`tab-${id}`]);
      });
      tabs.forEach(tab => tab.setAttribute('aria-selected', false));
      el.setAttribute('aria-selected', true);
      this.setState({
        studio: studio
      });
    }
  },
  renderStudioJobs() {
    return map(this.getStudios(), studio => {
      const id = kebabCase(studio.name);
      return <StudioJobs
        key={`jobs-${id}`}
        studio={studio}
        studios={this.props.studios}
        jobs={this.getJobsForStudio(studio)}
        selected={this.state.studio === id}
        contactEmail={get(find(get(find(get(this.props, 'footer.contacts', []), 'type', 'general'), 'methods', []), 'type', 'email'), 'uri', '')}
      />;
    });
  },
  getJobsForStudio(studio) {
    const allJobs = this.props.jobs || [];
    const { name } = studio;
    let jobs;
    if (name === 'All studios') {
      jobs = allJobs;
    } else {
      jobs = filter(allJobs, job => {
        const studioMatchesCity = get(job, 'location.city', '') === name;
        const studioMatchesRegion = (get(job, 'location.region') || '').includes(name);
        return studioMatchesCity || studioMatchesRegion;
      });
    }
    return jobs;
  }
});

export default PageJoinUs;
