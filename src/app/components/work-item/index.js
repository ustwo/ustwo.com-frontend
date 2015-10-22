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
    return (
      <li className={classnames(className, 'work-item')} style={{backgroundColor: get(data, 'colors.bg')}}>
        <Rimage wrap="div" href={link} onClick={Flux.override(link)} className="image" sizes={get(image, 'media_details.sizes')} />
        <div className="details">
          <p className="type" style={{borderColor: get(data, 'colors.secondary')}}>{get(data, 'type')}</p>
          <h3 className="title" style={{color: get(data, 'colors.primary')}}><a href={link} onClick={Flux.override(link)}>{get(data, 'name')}</a></h3>
          <div className="description" dangerouslySetInnerHTML={{__html: get(data, 'excerpt')}} />
          <a className="link" href={link} style={{borderColor: get(data, 'colors.secondary')}} onClick={Flux.override(link)}>Read more</a>
        </div>
      </li>
    );
  }
}
