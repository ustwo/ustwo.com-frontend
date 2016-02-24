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
import EventsControls from 'app/components/events-controls';
import Flux from 'app/flux';

const PageEventHub = React.createClass({
  getEvents() {
    const { events } = this.props;
    return events;
  },
  renderEvents() {
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

    return <article className="page-events">
      <Hero
        title={get(page, 'display_title')}
        transitionImage={true}
        eventLabel="events"
        subheading={get(page, 'hero.attr.subheading.value')}
        showDownChevron={false} >
        <EventsControls
          studios={studios}
          currentParams={currentParams}
        /> 
      </Hero>
      <section className="events-list">
        {this.renderEvents()}
      </section>
    </article>;
  }
});

export default PageEventHub;
