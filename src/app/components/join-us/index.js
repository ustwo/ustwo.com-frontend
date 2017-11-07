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

import SVG from 'app/components/svg';
import StudioJobs from 'app/components/studio-jobs';
import Rimage from 'app/components/rimage';
import Flux from 'app/flux';
import Footer from 'app/components/footer';
import HeroNoVideo from 'app/components/hero-no-video';
import ScrollWrapper from 'app/components/scroll-wrapper';
import ContactBlock from 'app/components/contact-block';

function getSelectedStudio(studioSlugFromUrl, studioSlugs) {
  let selected = 'london';
  if(includes(studioSlugs, studioSlugFromUrl)) {
    selected = studioSlugFromUrl;
  }
  return selected;
}

const PageJoinUs = React.createClass({
  mixins: [getScrollTrackerMixin('join-us')],

  getInitialState() {
    return {
      selectedStudioSlug: 'london',
      underlineWidth: 0,
      underlineLeft: 0
    }
  },

  render() {
    const { page, currentParams, studios, currentPage, footer, modal, isMobile, fixedHeight, documentScrollPosition, viewportDimensions } = this.props;
    const classes = classnames('page-join-us', this.props.className);
    const image = getFeaturedImage(page);

    return (
      <article className={classes}>
        <div className="home-pinned-header-wrapper">
          <div className="home-pinned-header-inner">
            <ScrollWrapper
              component={<HeroNoVideo pageName="join-us" modal={modal} isMobile={isMobile} fixedHeight={fixedHeight} title="Do the best work of your life" />}
              documentScrollPosition={documentScrollPosition}
              viewportDimensions={viewportDimensions}
              requireScreenPosition={true}
              className="scroll-wrapper-join-us-hero"
            />
          </div>
        </div>

        <div className="home-main-content-wrapper">
          {renderModules({
            modules: get(page, 'page_builder', []),
            colours: get(page, 'colors'),
            zebra: false,
            placeholderContents: {
              WORKABLE_LIST: this.getJobSectionRenderer(this.state.selectedStudioSlug)
            }
          })}

          <ScrollWrapper
            component={<ContactBlock />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            requireScreenPosition={true}
            className="scroll-wrapper-contact-block"
          />
          <Footer data={footer} studios={studios} currentPage={currentPage}/>

        </div>
      </article>
    );
  },
  componentDidMount() {
    const { currentParams, studios } = this.props;
    const studioSlugFromUrl = get(currentParams, 'lid');
    const studioSlugs = map(pluck(studios, 'name'), kebabCase);
    this.setState({ selectedStudioSlug: getSelectedStudio(studioSlugFromUrl, studioSlugs) });
  },
  componentWillReceiveProps(nextProps) {
    const { currentParams, studios } = nextProps;
    const studioSlugFromUrl = get(currentParams, 'lid');
    const studioSlugs = map(pluck(studios, 'name'), kebabCase);
    this.setState({ selectedStudioSlug: getSelectedStudio(studioSlugFromUrl, studioSlugs) });
    if (this.activeTab) {
      this.setState({
        underlineWidth: `${this.activeTab.offsetWidth}px`,
        underlineLeft: `${this.activeTab.offsetLeft}px`
      });
    }
  },
  handleClick() {
    if (this.activeTab) {
      this.setState({
        underlineWidth: `${this.activeTab.offsetWidth}px`,
        underlineLeft: `${this.activeTab.offsetLeft}px`
      });
    }
    this.studioTabs.classList.remove('animate');
    setTimeout(() => {
      this.studioTabs.classList.add('animate')
    }, 0);
  },
  renderStudioTabs(selectedStudioSlug) {
    let studioSelectedBackgroundColor;
    const tabs = map(this.props.studios, studio => {
      let studioSelectedColor;
      const studioSlug = kebabCase(studio.name);
      const studioName = spannify(studio.name);
      const uri = `/join-us/${studioSlug}`;
      if (studioSlug === selectedStudioSlug) {
        studioSelectedColor = { color: studio.color }
        studioSelectedBackgroundColor = {
          backgroundColor: studio.color,
          width: this.state.underlineWidth,
          left: this.state.underlineLeft
        }
      }

      return (
        <div
          key={`tab-${studioSlug}`}
          aria-selected={studioSlug === selectedStudioSlug}
          className={`tab ${studioSlug} ${studioSlug === selectedStudioSlug ? 'active' : ''}`}
          ref={(ref) => studioSlug === selectedStudioSlug ? this.activeTab = ref : ''}
          onClick={this.handleClick}
          style={studioSelectedColor}>
          <a
            href={uri}
            onClick={Flux.overrideNoScroll(uri)}>{studioName}</a>
        </div>
      );
    });

    return (
      <nav className="jobs-studio-tabs" ref={(ref) => this.studioTabs = ref}>
        {tabs}
        <div className="underline" style={studioSelectedBackgroundColor} ref={(ref) => this.underline = ref}></div>
      </nav>
    );
  },
  getJobSectionRenderer(selectedStudioSlug) {

    return () => {
      const sizes = { hardcoded: { url: '/images/joinus/current_openings.jpg' }};

      return (
        <div key="job-section">
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
        </div>
      );
    };
  },
  renderStudioJobs(selectedStudioSlug) {
    return map(this.props.studios, studio => {
      const studioSlug = kebabCase(studio.name);
      return (
        <StudioJobs
          key={`jobs-${studioSlug}`}
          studio={studio}
          studios={this.props.studios}
          jobs={this.getJobsForStudio(studio)}
          selected={studioSlug === selectedStudioSlug}
          contactEmail={get(find(get(find(get(this.props, 'footer.contacts', []), 'type', 'general'), 'methods', []), 'type', 'email'), 'uri', '')}
        />
      );
    });
  },
  getJobsForStudio(studio) {
    const { jobs } = this.props;
    const allJobs = jobs.filter(job => !job.code) || [];
    const { name } = studio;
    return filter(allJobs, job => {
      const studioMatchesCity = get(job, 'location.city', '') === name;
      const studioMatchesRegion = (get(job, 'location.region') || '').includes(name);
      return studioMatchesCity || studioMatchesRegion;
    });
  }
});

export default PageJoinUs;
