'use strict';

import React from 'react';
import get from 'lodash/object/get';
import map from 'lodash/collection/map';
import take from 'lodash/array/take';
import classnames from 'classnames';
import isEqual from 'lodash/lang/isEqual';
import Flux from 'app/flux';
import Hero from 'app/components/hero';
import Video from 'app/components/video';
import SVG from 'app/components/svg';
import EventsControls from 'app/components/events-controls';
import EventsListItem from 'app/components/events-list-item';
import ArchivedEventsListItem from 'app/components/events-archived-list-item';
import LoadMoreButton from 'app/components/load-more-button';
import LoadingIcon from 'app/components/loading-icon';
import getFeaturedImage from 'app/lib/get-featured-image';

const PageEvents = React.createClass({
  getInitialState() {
    return {
      isFilteredByStudio: this.props.eventsStudio !== 'all',
      isLoadingInitialEvents: true,
      isLoadingMoreEvents: false,
      isLoadingStudioEvents: false
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
    const { events: currentEvents, eventsStudio: currentEventsStudio } = this.props;
    const { events: nextEvents, eventsStudio: nextEventsStudios } = nextProps;
    const { isLoadingInitialEvents } = this.state;

    if (isLoadingInitialEvents && nextEvents) {
      this.setState({
        isLoadingInitialEvents: false
      });
    }

    // applies when studio is changed
    if (currentEventsStudio !== nextEventsStudios) {
      this.setState({
        isLoadingStudioEvents: true
      });
    }

    const currentEventsSample = take(currentEvents, 6).map(event => event.id);
    const nextEventsSample = take(nextEvents, 6).map(event => event.id);
    if (!isEqual(currentEventsSample, nextEventsSample)) {
      this.setState({
        isLoadingStudioEvents: false,
        isFilteredByStudio: currentEventsStudio !== 'all'
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
    const { eventsPagination, eventsPaginationTotal } = this.props;
    let { events } = this.props;
    if (eventsPagination > 1 && eventsPagination < eventsPaginationTotal) {
      events = take(events, (eventsPagination * 12) + 1);
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
          <p>We don't have any events on the horizon right now. If you're interested in hosting an event, 
          <br />or giving a talk - <a href="mailto:events@ustwo.com">let us know! </a></p>
          <SVG
            className="flying-cow"
            spritemapID="flyingCow"
          />
        </div>;
      }
    }
    return output;
  },
  renderArchivedEvents() {
    const archivedEvents = this.getArchivedEvents();
    let output, events;
    if (archivedEvents) {
      if (archivedEvents.length) {
        events = archivedEvents.map((archivedEventData, index) => {
          return <ArchivedEventsListItem
            className='archived-events-list'
            data={archivedEventData}
          />;
        });
        output = <div className='archived-events'>
          <h2 className='sub-title'>Previous Talkies</h2>
          <hr className='rule' />
          <section className='card-list'>
            {events}
          </section>
        </div>;
      }
    }
    return output;
  },
  render() {
    const {
      isFilteredByStudio,
      isLoadingInitialEvents,
      isLoadingMoreEvents,
      isLoadingStudioEvents
    } = this.state;
		const { page, currentParams, events, archivedEvents, studios, eventsPagination, eventsPaginationTotal } = this.props;
    const classes = classnames('page-events', this.props.className, {
      loading: isLoadingInitialEvents || isLoadingStudioEvents
    });
    const image = getFeaturedImage(page);

    return <article className={classes}>
    	<Hero
	      title={get(page, 'display_title')}
        transitionImage={true}
        eventLabel="events"
        subheading={get(page, 'hero.attr.subheading.value')}
        showDownChevron={true} 
      >
        <Video
          src={get(page, 'featured_video')}
          sizes={get(image, 'media_details.sizes')}
          isVideoBackground={true}
        />
    	</Hero>
      <EventsControls
        studios={studios}
        currentParams={currentParams}
      /> 
      <section className="events-list">
			  {this.renderEvents()}
        <LoadMoreButton
          loading={isLoadingMoreEvents}
          onClick={this.onClickLoadMore}
          disabled={eventsPagination >= eventsPaginationTotal}
        />
		  </section>  
      {this.renderArchivedEvents()}
    </article>;
	}
});

export default PageEvents;
