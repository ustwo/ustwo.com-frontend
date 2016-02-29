'use strict';

import React from 'react';
import get from 'lodash/object/get';
import he from 'he';
import classnames from 'classnames';
import moment from 'moment';
import getFeaturedImage from 'app/lib/get-featured-image';

import Flux from 'app/flux';
import SVG from 'app/components/svg';
import Rimage from 'app/components/rimage';

const EventListItem = React.createClass({

  render() {
    const {data: event, featured} = this.props;
    const start_time = get(event, 'start_time');
    const end_time = get(event, 'end_time');
    const uri = `/events/${get(event, 'slug')}`;
    const image = getFeaturedImage(event);
    const excerpt = get(event, 'excerpt');
    const classes = classnames(
      'events-list-item',
      { featured: featured }
    );    

    return <div className={classes}>
      <h3 className="date">
        <span className="day">{moment.unix(start_time).format('DD')}</span>
        <span className="month">{moment.unix(start_time).format('MMMM')}</span>
      </h3>
      <div className="details">
        <h2 className="title">
          <a href={uri} onClick={Flux.override(uri)}>{he.decode(get(event, 'name'))}</a>
        </h2>
        <p className="meta">
          <SVG
            className="location-icon"
            spritemapID="locationpin"
          />
          <span className="location">
            <a href={uri} onClick={Flux.override(uri)}>{get(event, 'studio.name')}</a>
          </span>
          <span className="time">{moment.unix(start_time).format('h:mma')}-{moment.unix(end_time).format('h:mma')}</span>
        </p>
        <div className="excerpt" dangerouslySetInnerHTML={{__html: excerpt}} />
        <div className="tail"><a className="read-more" href={uri} onClick={Flux.override(uri)}>Read more & RSVP</a></div>
      </div>
      <div className="event-image">
        <a href={uri} onClick={Flux.override(uri)}>
          <Rimage
            wrap="div"
            sizes={get(image, 'media_details.sizes')}
            altText={get(image, 'alt_text')}
          />
        </a>
      </div>
    </div>
  }
});

export default EventListItem;
