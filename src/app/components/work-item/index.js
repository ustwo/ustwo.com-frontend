'use strict';

import React from 'react';
import get from 'lodash/object/get';

import Flux from '../../flux';

import Rimage from '../rimage';
import ImageHover from '../image-hover';

const WorkItem = React.createClass({
  render() {
    const { data, image, className } = this.props;
    const link = `/what-we-do/${get(data, 'slug')}`;
    const bgColour = get(data, 'colors.bg');
    const primaryColour = get(data, 'colors.primary');
    const secondaryColour = get(data, 'colors.secondary');

    return <div className="work-item" style={{backgroundColor: bgColour}}>
      <a href={link} onClick={Flux.override(link)} className="image">
        <Rimage
          wrap='div'
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
        <ImageHover autoAnim={500} />
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
    </div>;
  }
});

export default WorkItem;
