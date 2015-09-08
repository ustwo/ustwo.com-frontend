'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';
import get from 'lodash/object/get';
import kebabCase from 'lodash/string/kebabCase';

import spannify from '../_lib/spannify';
import ModuleRenderer from '../_lib/module-renderer';
import DownChevron from '../elements/down-chevron';
import SVG from '../elements/svg';
import Hero from '../components/hero';
import Slide from '../components/slide';
import StudioJobs from '../components/studio-jobs';

export default class PageJoinUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studio: 'all-studios'
    }
  }
  render() {
    const pageData = this.props.page;
    const attachments = get(pageData, '_embedded.wp:attachment.0', []);
    const image = find(attachments, item => item.id === get(pageData, 'featured_image'));

    return (
      <article className="page-join-us">

        <Hero title={get(pageData, 'display_title')} imageURL={get(image, 'source_url', '')} backgroundTint={true} eventLabel='join-us' showDownChevron={true} />

        {get(pageData, 'page_builder', []).map(this.getModuleRenderer())}

        <div className="hero-image" style={{backgroundImage: "url(/images/joinus/current_openings.jpg)"}}>
          <SVG className="ustwo-logo" title="ustwo logo" spritemapID='ustwologo' />
          <h2>Current Openings</h2>
        </div>

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
  }
  getModuleRenderer = (colours) => {
    return (moduleData) => {
      return ModuleRenderer(moduleData, colours, () => true);
    };
  }
  getStudios = () => {
    return [{
      name: "All studios"
    }].concat(this.props.studios);
  }
  renderStudioTabs = () => {
    return map(this.getStudios(), studio => {
      const id = kebabCase(studio.name);
      const name = spannify(studio.name);
      return <li key={`tab-${id}`} className={id} ref={`tab-${id}`} onClick={this.generateOnClickStudioHandler(id)} aria-selected={this.state.studio === id}>{name}</li>;
    });
  }
  generateOnClickStudioHandler = (studio) => {
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
  }
  renderStudioJobs = () => {
    const jobs = this.props.jobs || [];
    return map(this.getStudios(), studio => {
      const id = kebabCase(studio.name);
      const name = studio.name;
      const studioJobs = filter(jobs, job => get(job, 'location.city', '') === name || (get(job, 'location.region') || '').includes(name));
      return <StudioJobs studio={studio} studios={this.props.studios} jobs={id === 'all-studios' ? jobs : studioJobs} selected={this.state.studio === id} colour={studio.color} contactEmail={get(find(get(find(get(this.props, 'footer.contacts', []), 'type', 'general'), 'methods', []), 'type', 'email'), 'uri', '')} />;
    });
  }
}
