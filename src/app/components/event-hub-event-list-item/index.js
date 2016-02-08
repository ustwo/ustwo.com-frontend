'use strict';

import React from 'react';
import classnames from 'classnames';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import he from 'he';
import getFeaturedImage from 'app/lib/get-featured-image';
import moment from 'moment';

import Flux from 'app/flux';

import Rimage from 'app/components/rimage';

const EventHubEventListItem = React.createClass({
  render() {
    const { data: event, featured } = this.props;
    const classes = classnames(
      'event-hub-event-list-item',
      { featured: featured }
    );    
    const excerpt = get(event, 'excerpt');
    const image = getFeaturedImage(event);
    const date = get(event, 'date');
    const formattedDateDay = moment(date).format('DD');
    const formattedDateMonth = moment(date).format('MMMM');
    const uri = `/events/${get(event, 'slug')}`;

    return <div className={classes}>
      <h3 className="date">
        <span className="day">{{formattedDateDay}}</span><span className="month">{{formattedDateMonth}}</span>
      </h3>
      <div className="details">
        <h2 className="title">
          <a href={uri} onClick={Flux.override(uri)}>
            {he.decode(get(event, 'title'))}
          </a>
        </h2>
        <p className="meta">
          <span className="location"><a href="/events?studio=malmo">Malmo</a></span><span className="time">6:45pm–10pm</span>
        </p>
        <div className="excerpt" dangerouslySetInnerHTML={{__html: excerpt}} />
        <div className="tail"><a className="read-more" href={uri} onClick={Flux.override(uri)}>Read more & RSVP</a></div>

      </div>
      <a href={uri} onClick={Flux.override(uri)} className="event-image">
        <Rimage
          wrap="div"
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
      </a>
    </div>
    }
});

export default EventHubEventListItem;
