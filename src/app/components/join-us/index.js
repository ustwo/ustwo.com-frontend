'use strict';

import React from 'react';
import classnames from 'classnames';
import find from 'lodash/collection/find';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';
import pluck from 'lodash/collection/pluck';
import every from 'lodash/collection/every';
import get from 'lodash/object/get';
import kebabCase from 'lodash/string/kebabCase';
import spannify from 'app/lib/spannify';
import getFeaturedImage from 'app/lib/get-featured-image';
import renderModules from 'app/lib/module-renderer';
import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';

import DownChevron from 'app/components/down-chevron';
import SVG from 'app/components/svg';
import Hero from 'app/components/hero';
import StudioJobs from 'app/components/studio-jobs';
import Rimage from 'app/components/rimage';
import Video from 'app/components/video';
import Flux from 'app/flux';

function isSelected(currentHash, id, studios) {
  const studioNames = pluck(studios, 'name');
  let selected = false;
  if(
    (!currentHash && id === 'all-studios')
    || currentHash && id === 'all-studios' && every(studioNames, name => currentHash !== kebabCase(name))
    || currentHash && currentHash === id
  ) {
    selected = true;
  }
  return selected;
}

const PageJoinUs = React.createClass({
  mixins: [getScrollTrackerMixin('join-us')],
  render() {
    const { page } = this.props;
    const classes = classnames('page-join-us', this.props.className);
    const image = getFeaturedImage(page);

    return <article className={classes}>
      <Hero
        title={get(page, 'display_title')}
        transitionImage={true}
        eventLabel='join-us'
        showDownChevron={true}
      >
        <Video
          src={get(page, 'featured_video')}
          sizes={get(image, 'media_details.sizes')}
        />
      </Hero>
      {renderModules({
        modules: get(page, 'page_builder', []),
        colours: get(page, 'colors'),
        zebra: false,
        placeholderContents: {
          WORKABLE_LIST: this.renderJobSection
        }
      })}
    </article>;
  },
  getStudios() {
    return [{
      name: 'All studios'
    }].concat(this.props.studios);
  },
  renderStudioTabs() {
    const { currentParams } = this.props;
    return map(this.getStudios(), studio => {
      const studioId = kebabCase(studio.name);
      const studioName = spannify(studio.name);
      const uri = this.generateStudioUri(studioId);
      return <li
        key={`tab-${studioId}`}
        className={studioId}
        aria-selected={isSelected(get(currentParams, 'lid'), studioId, this.props.studios)}
      ><a href={uri} onClick={Flux.overrideNoScroll(uri)}>{studioName}</a></li>;
    });
  },
  generateStudioUri(studio) {
    const uri = studio !== 'all-studios' ? '/'+studio : '';
    return `/join-us${uri}`;
  },
  renderJobSection() {
    const sizes = { hardcoded: { url: '/images/joinus/current_openings.jpg' }};

    return <div>
      <div className="current-openings">
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
      <div className="benefits">
        <h2>Some of the benefits...</h2>
      </div>
    </div>;
  },
  renderStudioJobs() {
    const { currentParams } = this.props;
    return map(this.getStudios(), studio => {
      const studioId = kebabCase(studio.name);
      return <StudioJobs
        key={`jobs-${studioId}`}
        studio={studio}
        studios={this.props.studios}
        jobs={this.getJobsForStudio(studio)}
        selected={isSelected(get(currentParams, 'lid'), studioId, this.props.studios)}
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
