'use strict';

import React from 'react';
import get from 'lodash/object/get';
import map from 'lodash/collection/map';
import take from 'lodash/array/take';

import Hero from 'app/components/hero';
import SVG from 'app/components/svg';
import EventsControls from 'app/components/events-controls';
import EventsListItem from 'app/components/events-list-item';
import LoadMoreButton from 'app/components/load-more-button';

const PageEvents = React.createClass({
  getInitialState() {
    return {
      isLoadingInitialEvents: true,
      isLoadingMoreEvents: false
    };
  },
  componentWillMount() {
    if (this.props.events) {
      this.setState({
        isLoadingInitialEvents: false
      });
    }
  },
  componentWillReceiveProps(nextProps) {
    const { events: currentEvents } = this.props;
    const { events: nextEvents } = nextProps;
    const { isLoadingInitialEvents } = this.state;

    if (isLoadingInitialEvents && nextEvents) {
      this.setState({
        isLoadingInitialEvents: false
      });
    }

    const newEventsAdded = (currentEvents && nextEvents) && (currentEvents.length < nextEvents.length);
    if (newEventsAdded) {
      this.setState({
        isLoadingMoreEvents: false
      });
    }
  },
  onClickLoadMore() {
    Flux.loadMoreEvents();
    this.setState({
      isLoadingMoreEvents: true
    });
  },
  getEvents() {
    const { postsPagination, postsPaginationTotal } = this.props;
    let { events } = this.props;
    if (postsPagination > 1 && postsPagination < postsPaginationTotal) {
      events = take(events, (postsPagination * 12) + 1);
    }
    return events;
  },
  getArchivedEvents() {
    const { archivedEvents } = this.props;
    return archivedEvents;
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
        output = <div className="no-events-found">
          <h2>Soz, No Talky</h2>
          <p>We currently have no events coming up. Interested in hosting an event, 
          <br />inviting us to one or giving a talky? <a href="mailto:events@ustwo.com">Let us know! </a></p>
          <SVG
            className="flying-cow"
            spritemapID="flyingCow"
          />
        </div>;
      }
    }
    return output;
  },
  render() {
    const {
      isLoadingInitialEvents,
      isLoadingMoreEvents
    } = this.state;
    const { postsPagination, postsPaginationTotal } = this.props;
    const {page, currentParams, events, archivedEvents, studios} = this.props;
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
        <LoadMoreButton
          loading={isLoadingMoreEvents}
          onClick={this.onClickLoadMore}
          disabled={postsPagination >= postsPaginationTotal}
        />
      </section>
      
    </article>;
  }
});

export default PageEvents;