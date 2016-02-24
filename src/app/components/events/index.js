'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';
import pluck from 'lodash/collection/pluck';
import includes from 'lodash/collection/includes';
import kebabCase from 'lodash/string/kebabCase';
import spannify from 'app/lib/spannify';

import Navigation from 'app/components/navigation';
import Hero from 'app/components/hero';
import EventsListItem from 'app/components/events-list-item';
import Flux from 'app/flux';

const PageEventHub = React.createClass({
  getSelectedStudio(studioSlugFromUrl, studioSlugs) {
    let selected = 'all-studios';
    if(includes(studioSlugs, studioSlugFromUrl)) {
      selected = studioSlugFromUrl;
    }
    return selected;
  },
  getStudios() {
    return [{
      name: 'All studios'
    }].concat(this.props.studios);
  },
  renderStudioTabs(selectedStudioSlug) {
    return map(this.getStudios(), studio => {
      const studioSlug = kebabCase(studio.name);
      const studioName = spannify(studio.name);
      const uri = this.generateStudioUri(studioSlug);
      return <li
        key={`tab-${studioSlug}`}
        className={studioSlug}
        aria-selected={studioSlug === selectedStudioSlug}
      ><a href={uri} onClick={Flux.overrideNoScroll(uri)}>{studioName}</a></li>;
    });
  },
  generateStudioUri(studio) {
    const uri = studio !== 'all-studios' ? '?studio='+studio : '';
    return `/events${uri}`;
  },
  getEvents() {
    const { events } = this.props;
    return events;
  },
  renderEvents(selectedStudioSlug) {
    const events = this.getEvents();
    let output;
    if (events) {
      if (events.length) {
        output = events.map((eventData, index) => {
          return <EventsListItem
            className="events-list"
            featured={index === 0}
            data={eventData}
          />;
        });
      } else {
        output = <h3 className="message">No Events found</h3>;
      }
    }
    return output;
  },
  render() {
    const { page, currentParams, studios } = this.props;
    const studioSlugFromUrl = get(currentParams, 'lid');
    const studioSlugs = map(pluck(studios, 'name'), kebabCase);
    const selectedStudioSlug = this.getSelectedStudio(studioSlugFromUrl, studioSlugs);

    return <article className="page-events-hub">
      <Hero
        title={get(page, 'display_title')}
        transitionImage={true}
        eventLabel="events"
        showDownChevron={false} >
      </Hero>
      <section className="event-hub-event-list">
        <nav className="event-hub-studio-tabs">
          {this.renderStudioTabs(selectedStudioSlug)}
        </nav>
        {this.renderEvents(selectedStudioSlug)}
      </section>
    </article>;
  }
});

export default PageEventHub;
