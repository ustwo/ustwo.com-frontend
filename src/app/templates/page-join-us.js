'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';
import get from 'lodash/object/get';

import Hero from '../components/hero';
import kebabCase from 'lodash/string/kebabCase';
import DownChevron from '../elements/down-chevron';
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
    const attachments = (pageData && pageData._embedded && pageData._embedded['http://v2.wp-api.org/attachment'][0]) || [];
    const image = find(attachments, item => item.id === get(pageData, 'featured_image'));
    const svgContent = '<use xlink:href="/images/spritemap.svg#ustwologo" />';

    return (
      <article className="page-join-us">

        <Hero title={get(pageData, 'page_builder.0.attr.heading.value')} imageURL={get(image, 'source_url')} backgroundTint={true} eventLabel='join-us' />

        <section className="intro">
          <h2 className="intro__title">{get(pageData, 'page_builder.1.attr.heading.value')}</h2>
          <hr className="intro__rule" />
          <div className="intro__para" dangerouslySetInnerHTML={{__html: get(pageData, 'page_builder.1.attr.body.value')}} />
        </section>

        <section className="why-ustwo">

          <div className="video"></div>

          <div className="slides">
            <Slide />
            <Slide />
            <Slide />
            <Slide />
            <Slide />
            <Slide />
          </div>

        </section>

        <div className="hero-image" style={{backgroundImage: "url(/images/joinus/current_openings.jpg)"}}>
          <svg className="ustwo-logo" title="ustwo logo" role="img" dangerouslySetInnerHTML={{__html: svgContent }} />
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
  getStudios = () => {
    return [{
      name: "All studios"
    }].concat(this.props.studios);
  }
  renderStudioTabs = () => {
    return map(this.getStudios(), studio => {
      const id = kebabCase(studio.name);
      const name = studio.name;
      return <li ref={`tab-${id}`} onClick={this.generateOnClickStudioHandler(id)} aria-selected={this.state.studio === id}>{name}</li>;
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
    const jobs = this.props.jobs;
    return map(this.getStudios(), studio => {
      const id = kebabCase(studio.name);
      const name = studio.name;
      const studioJobs = filter(jobs, job => get(job, 'location.city', '') === name || (get(job, 'location.region') || '').includes(name));
      return <StudioJobs studio={id} jobs={id === 'all-studios' ? jobs : studioJobs} selected={this.state.studio === id} colour={studio.color} />;
    });
  }
}
