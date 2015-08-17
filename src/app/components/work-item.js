'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';

import Flux from '../flux';

export default class WorkItem extends React.Component {
  render() {
    const data = this.props.data;
    const link = `/what-we-do/${get(data, 'slug')}`;
    const imageId = get(data, 'featured_image');
    let image;
    this.props.attachments.forEach(item => {
      if(item.id === imageId) {
        image = item;
      }
    });
    return (
      <li className={classnames(this.props.className, 'work-item')} style={{backgroundColor: get(data, 'colors.bg')}}>
        <a href={link} onClick={Flux.override(link)} className="work-item__image-link" style={{backgroundImage: `url('${get(image, 'source_url') || ''}')`}}>
          <img className="work-item__image-link__image" src={get(image, 'source_url') || ''} />
        </a>
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
