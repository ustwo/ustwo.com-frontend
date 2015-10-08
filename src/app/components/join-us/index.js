'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';
import get from 'lodash/object/get';
import kebabCase from 'lodash/string/kebabCase';
import spannify from '../../lib/spannify';
import getFeaturedImage from '../../lib/get-featured-image';
import ModuleRenderer from '../../lib/module-renderer';
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
    const { page: pageData } = this.props;
    const image = getFeaturedImage(pageData);

    return (
      <article className="page-join-us">

        <Hero title={get(pageData, 'display_title')} imageOnly={true} sizes={get(image, 'media_details.sizes')} eventLabel='join-us' showDownChevron={true} />

        {get(pageData, 'page_builder', []).map(this.getModuleRenderer())}

        <Rimage className="hero-image" wrap="div" backgroundOnly={true} sizes={{ hardcoded: {
            url: "/images/joinus/current_openings.jpg"
          } }}>
          <SVG className="ustwo-logo" title="ustwo logo" spritemapID='ustwologo' />
          <h2>Current Openings</h2>
        </Rimage>

        <section className="jobs">
          <nav className="jobs-studio-tabs">
            {this.renderStudioTabs()}
          </nav>
          <div className="jobs-container">
            {this.renderStudioJobs()}
          </div>
        </section>

      </article>
    );
  },
  getModuleRenderer(colours) {
    return (moduleData, index) => {
      return ModuleRenderer(moduleData, index, colours, () => true);
    };
  },
  getStudios() {
    return [{
      name: "All studios"
    }].concat(this.props.studios);
  },
  renderStudioTabs() {
    return map(this.getStudios(), studio => {
      const id = kebabCase(studio.name);
      const name = spannify(studio.name);
      return <li key={`tab-${id}`} className={id} ref={`tab-${id}`} onClick={this.generateOnClickStudioHandler(id)} aria-selected={this.state.studio === id}>{name}</li>;
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
    const jobs = this.props.jobs || [];
    return map(this.getStudios(), studio => {
      const id = kebabCase(studio.name);
      const name = studio.name;
      const studioJobs = filter(jobs, job => get(job, 'location.city', '') === name || (get(job, 'location.region') || '').includes(name));
      return <StudioJobs key={`jobs-${id}`} studio={studio} studios={this.props.studios} jobs={id === 'all-studios' ? jobs : studioJobs} selected={this.state.studio === id} colour={studio.color} contactEmail={get(find(get(find(get(this.props, 'footer.contacts', []), 'type', 'general'), 'methods', []), 'type', 'email'), 'uri', '')} />;
    });
  }
});

export default PageJoinUs;
