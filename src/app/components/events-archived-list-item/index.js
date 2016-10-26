'use strict';

import React from 'react';
import { get } from 'lodash';
import getFeaturedImage from 'app/lib/get-featured-image';
import moment from 'moment';
import classnames from 'classnames';

import Flux from 'app/flux';
import Rimage from 'app/components/rimage';

const ArchivedEventListItem = React.createClass({

  render() {  
    const {data: event} = this.props;
    const uri = `/events/${get(event, 'slug')}`;
    const image = getFeaturedImage(event);
    const excerpt = get(event, 'excerpt');
    const start_time = get(event, 'start_time');
    const formattedDate = moment.unix(start_time).utc().format('D MMMM YYYY');
    const classes = classnames(
      'card-item',
      'archived-events-list-item'
    );

    return <div className={classes}>
      <a href={uri} onClick={Flux.override(uri)} className="card-image">
        <Rimage
          wrap="div"
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
      </a>
      <div className="card-details">
        <h2 className="title">
          <a href={uri} onClick={Flux.override(uri)}>
            {get(event, 'name')}
          </a>
        </h2>
        <span className="date">{formattedDate}</span>
        <div className="excerpt" dangerouslySetInnerHTML={{__html: excerpt}} />
        <div className="tail">
          <a
            href={uri}
            onClick={Flux.override(uri)}
          >Read more</a>
        </div>
      </div>
    </div>;

  }
});

export default ArchivedEventListItem;
