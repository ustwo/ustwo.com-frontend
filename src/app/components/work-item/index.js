'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import getFeaturedImage from '../../lib/get-featured-image';

import Flux from '../../flux';

import Rimage from '../rimage';

export default class WorkItem extends React.Component {
  render() {
    const { data, attachments, className } = this.props;
    const link = `/what-we-do/${get(data, 'slug')}`;
    const image = getFeaturedImage(data, attachments);
    const classes = classnames(className, 'work-item');
    const bgColour = get(data, 'colors.bg');
    const primaryColour = get(data, 'colors.primary');
    const secondaryColour = get(data, 'colors.secondary');

    return <li className={classes} style={{backgroundColor: bgColour}}>
      <a href={link} onClick={Flux.override(link)}>
        <Rimage
          className='image'
          wrap='div'
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
      </a>
      <div className='details'>
        <p className='type' style={{borderColor: secondaryColour}}>
          {get(data, 'type')}
        </p>
        <h3 className='title' style={{color: primaryColour}}>
          <a href={link} onClick={Flux.override(link)}>{get(data, 'name')}</a>
        </h3>
        <div
          className='desc'
          dangerouslySetInnerHTML={{__html: get(data, 'excerpt')}}
        />
        <a
          className='link'
          href={link}
          style={{borderColor: secondaryColour}}
          onClick={Flux.override(link)}
        >
          Read more
        </a>
      </div>
    </li>;
  }
}
