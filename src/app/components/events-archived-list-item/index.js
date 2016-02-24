'use strict';

import React from 'react';
import get from 'lodash/object/get';
import getFeaturedImage from 'app/lib/get-featured-image';
import moment from 'moment';

import Flux from 'app/flux';
import Rimage from 'app/components/rimage';

const ArchivedEventListItem = React.createClass({

  truncateExcerpt(excerpt) {
    var limit = 90;
    if(excerpt.length > limit) {
      excerpt = excerpt.substring(0,limit) + '...';
    }

    return excerpt;
  },
  render() {  
    const {data: event} = this.props;
    const uri = `/events/${get(event, 'slug')}`;
    const image = getFeaturedImage(event);
    const excerpt = this.truncateExcerpt(get(event, 'excerpt'));
    const start_time = get(event, 'start_time');
    const formattedDate = moment.unix(start_time).format('D MMMM YYYY');

    return <div className='archived-events-list-item'>
      <a href={uri} onClick={Flux.override(uri)} className="post-image">
        <Rimage
          wrap="div"
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
      </a>
      <div className="details">
        <h2 className="title">
          <a href={uri} onClick={Flux.override(uri)}>
            {get(event, 'name')}
          </a>
        </h2>
        <span className="date">{formattedDate}</span>
        <div className="excerpt" dangerouslySetInnerHTML={{__html: excerpt}} />
        <div className="tail">
          <a href={uri} onClick={Flux.override(uri)}>Read more</a>
        </div>
      </div>
    </div>;
  }
});

export default ArchivedEventListItem;
