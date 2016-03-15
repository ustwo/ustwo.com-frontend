'use strict';

import React from 'react';
import classnames from 'classnames';
import he from 'he';
import get from 'lodash/object/get';
import getFeaturedImage from 'app/lib/get-featured-image';
import renderModules from 'app/lib/module-renderer';
import moment from 'moment';
import Meta from "react-helmet";

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
      <Meta
        title={get(event, 'seo.title') || ''}
        meta={[{
          name: "description",
          content: get(event, 'seo.desc') || ''
        }, {
          name: "keywords",
          content: get(event, 'seo.keywords') || ''
        }, {
          name: "og:type",
          content: 'website'
        }, {
          name: "og:title",
          content: get(event, 'seo.title') || ''
        }, {
          name: "og:description",
          content: get(event, 'seo.desc') || ''
        }, {
          name: "og:image",
          content: get(event, 'seo.image') || ''
        }]}
      />
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
          <h1 className='title'>{get(event, 'name')}</h1>
          <p className="location">
            <SVG
              className="location-icon"
              spritemapID="locationpin"
            />
            <span><a href="#">{get(event, 'studio.name')}</a></span>
          </p>
        <section className="single-column">
          <a href="mailto:events@ustwo.com" className="im-in">I'm in</a>
        </section>
        {renderModules({
          modules: get(event, 'page_builder', [])
        })}
        <a href="mailto:events@ustwo.com" className="im-in">I'm in</a>
        <Rimage
          className='footer-image'
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
        <hr className='social rule' />
        {this.renderSocialMediaSharing('bottom')}
      </div>
    </article>
	}
});

export default PageEvent;