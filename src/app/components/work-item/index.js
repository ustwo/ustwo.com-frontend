'use strict';

import React from 'react';
import get from 'lodash/object/get';

import Flux from '../../flux';

import Rimage from '../rimage';
import ImageHover from '../image-hover';
import WorkItemStyles from '../work-item-styles';
import classnames from 'classnames';

const WorkItem = React.createClass({
  render() {
    const { data, image, className } = this.props;
    const link = `/what-we-do/${get(data, 'slug')}`;

    return <div className={classnames('work-item', `work-item-${id}`)}>
      <WorkItemStyles data={data} />
      <a href={link} onClick={Flux.override(link)} className="image">
        <Rimage
          wrap='div'
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
        <ImageHover autoAnim={500} />
      </a>
      <div className='details'>
        <p className='type'>
          {get(data, 'type')}
        </p>
        <h3 className='title'>
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
