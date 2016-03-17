'use strict';

import React from 'react';

import SVG from 'app/components/svg';

const EventsSubscription = React.createClass({
  render() {
    return <div className="events-subscription">
      <SVG className="icon" spritemapID="ticket" />
      <h2>ustwo Events</h2>
      <p>Give us your email and we'll keep you in the loop with our latest talkies and events</p>
      <a href="http://eepurl.com/brTeM1" className="submit">
        <span className="submit-text">Subscribe</span>
      </a>
    </div>;
  }
});

export default EventsSubscription;
