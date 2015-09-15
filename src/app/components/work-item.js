'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';

import Flux from '../flux';
import getFeaturedImage from '../_lib/get-featured-image';
import Rimage from '../elements/rimage';

export default class WorkItem extends React.Component {
  render() {
    const data = this.props.data;
    const link = `/what-we-do/${get(data, 'slug')}`;
    const image = getFeaturedImage(data, this.props.attachments);
    return (
      <li className={classnames(this.props.className, 'work-item')} style={{backgroundColor: get(data, 'colors.bg')}}>
        <Rimage wrap="div" href={link} onClick={Flux.override(link)} className="work-item__image-link" sizes={get(image, 'media_details.sizes')} />
        <div className="work-item__details">
          <p className="work-item__details__type" style={{borderColor: get(data, 'colors.secondary')}}>{get(data, 'type')}</p>
          <h3 className="work-item__details__title" style={{color: get(data, 'colors.primary')}}><a href={link} onClick={Flux.override(link)}>{get(data, 'name')}</a></h3>
          <div className="work-item__details__desc" dangerouslySetInnerHTML={{__html: get(data, 'excerpt')}} />
          <a className="work-item__details__cta" href={link} style={{borderColor: get(data, 'colors.secondary')}} onClick={Flux.override(link)}>Read more</a>
        </div>
      </li>
    );
  }
}
