'use strict';

import React from 'react';
import classnames from 'classnames';
import he from 'he';
import { get } from 'lodash';
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
  renderImInButton() {
    const { event } = this.props;
    const ticket_url = get(event, 'ticket_url');
    const ticket_sold_out = get(event, 'ticket_sold_out');

    if(ticket_url && !ticket_sold_out) {
      return <a href={ticket_url} className="im-in" target="_blank">Get tickets</a>;
    }
  },
	render() {
	const { event } = this.props;
    const image = getFeaturedImage(event);
    const classes = classnames('page-event', this.props.className);
    const start_time = get(event, 'start_time');
    const end_time = get(event, 'end_time');
    const studio = get(event, 'studio');
	const mapurl = `https://maps.google.com/maps?z=12&t=m&q=loc:${get(event, 'studio.location.lat')}+${get(event, 'studio.location.long')}`;   
    
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
          property: "og:type",
          content: 'website'
        }, {
          property: "og:title",
          content: get(event, 'seo.title') || ''
        }, {
          property: "og:description",
          content: get(event, 'seo.desc') || ''
        }, {
          property: "og:image",
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
            <span className="date">{moment.unix(start_time).utc().format('D MMMM')}</span> <span className="time">{moment.unix(start_time).utc().format('h:mma')}–{moment.unix(end_time).utc().format('h:mma')}</span>
          </p>
          {this.renderSocialMediaSharing('side')}
          <h1 className='title'>{get(event, 'name')}</h1>
          <p className="location">
            <SVG
              className="location-icon"
              spritemapID="locationpin"
            />
            <span><a href={mapurl}>{get(event, 'studio.name')}</a></span>
          </p>
        <section className="single-column im-in-single-column">
          {this.renderImInButton()}
        </section>
        {renderModules({
          modules: get(event, 'page_builder', [])
        })}
        <hr className='social rule' />
        {this.renderSocialMediaSharing('bottom')}
      </div>
    </article>
	}
});

export default PageEvent;
