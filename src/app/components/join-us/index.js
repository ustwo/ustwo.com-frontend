'use strict';

import React from 'react';
import classnames from 'classnames';
import find from 'lodash/collection/find';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';
import pluck from 'lodash/collection/pluck';
import includes from 'lodash/collection/includes';
import { get } from 'lodash';
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

function getSelectedStudio(studioSlugFromUrl, studioSlugs) {
  let selected = 'london';
  if(includes(studioSlugs, studioSlugFromUrl)) {
    selected = studioSlugFromUrl;
  }
  return selected;
}

const PageJoinUs = React.createClass({
  mixins: [getScrollTrackerMixin('join-us')],
  render() {
    const { page, currentParams, studios } = this.props;
    const classes = classnames('page-join-us', this.props.className);
    const image = getFeaturedImage(page);
    const studioSlugFromUrl = get(currentParams, 'lid');
    const studioSlugs = map(pluck(studios, 'name'), kebabCase);
    const selectedStudioSlug = getSelectedStudio(studioSlugFromUrl, studioSlugs);

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
          isVideoBackground={true}
        />
      </Hero>
      {renderModules({
        modules: get(page, 'page_builder', []),
        colours: get(page, 'colors'),
        zebra: false,
        placeholderContents: {
          WORKABLE_LIST: this.getJobSectionRenderer(selectedStudioSlug)
        }
      })}
    </article>;
  },
  renderStudioTabs(selectedStudioSlug) {
    return map(this.props.studios, studio => {
      const studioSlug = kebabCase(studio.name);
      const studioName = spannify(studio.name);
      const uri = `/join-us/${studioSlug}`;
      let studioSelected;
      if (studioSlug === selectedStudioSlug) {
        studioSelected = {color: studio.color}
      }
      return <div
        key={`tab-${studioSlug}`}
        className={studioSlug}
        aria-selected={studioSlug === selectedStudioSlug}
        style={studioSelected}
      ><a href={uri} onClick={Flux.overrideNoScroll(uri)}>{studioName}</a></div>;
    });
  },
  getJobSectionRenderer(selectedStudioSlug) {
    return () => {
      const sizes = { hardcoded: { url: '/images/joinus/current_openings.jpg' }};

      return <div key="job-section">
        <div className="current-openings">
          <h2>We're Hiring</h2>
        </div>
        <section className="jobs">
          <nav className="jobs-studio-tabs">
            {this.renderStudioTabs(selectedStudioSlug)}
          </nav>
          <div className="jobs-container">
            {this.renderStudioJobs(selectedStudioSlug)}
          </div>
        </section>
      </div>;
    };
  },
  renderStudioJobs(selectedStudioSlug) {
    return map(this.props.studios, studio => {
      const studioSlug = kebabCase(studio.name);
      return <StudioJobs
        key={`jobs-${studioSlug}`}
        studio={studio}
        studios={this.props.studios}
        jobs={this.getJobsForStudio(studio)}
        selected={studioSlug === selectedStudioSlug}
        contactEmail={get(find(get(find(get(this.props, 'footer.contacts', []), 'type', 'general'), 'methods', []), 'type', 'email'), 'uri', '')}
      />;
    });
  },
  getJobsForStudio(studio) {
    const allJobs = this.props.jobs || [];
    const { name } = studio;
    return filter(allJobs, job => {
      const studioMatchesCity = get(job, 'location.city', '') === name;
      const studioMatchesRegion = (get(job, 'location.region') || '').includes(name);
      return studioMatchesCity || studioMatchesRegion;
    });
  }
});

export default PageJoinUs;
