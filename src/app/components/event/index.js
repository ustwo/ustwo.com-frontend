'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import getFeaturedImage from 'app/lib/get-featured-image';
import renderModules from 'app/lib/module-renderer';
import moment from 'moment';

import Rimage from 'app/components/rimage';
import SocialMediaSharing from 'app/components/social-media-sharing';
import SVG from 'app/components/svg';

const PageEvent = React.createClass({
  renderSocialMediaSharing(position) {
    const { event } = this.props;
    return (
      <SocialMediaSharing
        className={position}
        title={get(event, 'name')}
        uri={`http://ustwo.com/event/${get(event, 'slug')}`}
      />
    );
  },
  render() {
    const {event} = this.props;
    const image = getFeaturedImage(event);
    const classes = classnames('page-event', this.props.className);
    const start_time = get(event, 'start_time');
    const end_time = get(event, 'end_time');

    return <article className={classes}>
      <Rimage
        wrap='div'
        className='hero-image'
        sizes={get(image, 'media_details.sizes')}
        altText={get(image, 'alt_text')}
      />
      <div className='content-container'>
        <p className="date-time">
          <span className="date">{moment.unix(start_time).format('D MMMM')}</span> <span className="time">{moment.unix(start_time).format('h:mma')}–{moment.unix(end_time).format('h:mma')}</span>
        </p>
        {this.renderSocialMediaSharing('side')}
        <h3 className='title'>{get(event, 'name')}</h3>
        <p className="location">
          <SVG
            className="location-icon"
            spritemapID="locationpin"
          />
          <span><a href="#">{get(event, 'studio.name')}</a></span>
        </p>
        <a href="mailto:events@ustwo.com" className="im-in">I'm in</a>
        {renderModules({
          modules: get(event, 'page_builder', [])
        })}
        <a href="mailto:events@ustwo.com" className="im-in">I'm in</a>
        <Rimage
          className='footer-image'
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
      </div>
    </article>
  }
});

export default PageEvent;