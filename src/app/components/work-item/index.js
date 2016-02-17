'use strict';

import React from 'react';
import get from 'lodash/object/get';

import Flux from 'app/flux';

import Rimage from 'app/components/rimage';
import ImageHover from 'app/components/image-hover';
import WorkItemStyles from 'app/components/work-item-styles';
import classnames from 'classnames';

const WorkItem = React.createClass({
  getInitialState() {
    return {
      hover: false
    };
  },
  render() {
    const { data, image, className } = this.props;
    const id = data.id;
    const link = `/what-we-do/${get(data, 'slug')}`;

    return <div className={classnames('work-item', `work-item-${id}`)}>
      <WorkItemStyles data={data} />
      <a href={link} onClick={Flux.override(link)} className="image">
        <Rimage
          wrap='div'
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
        <ImageHover autoAnim={500} hover={this.state.hover} />
      </a>
      <div className='details'>
        <p className='type'>
          {get(data, 'type')}
        </p>
        <h3 className='title'>
          <a
            href={link}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={Flux.override(link)}
          >{get(data, 'name')}</a>
        </h3>
        <div
          className='desc'
          dangerouslySetInnerHTML={{__html: get(data, 'excerpt')}}
        />
        <div className="tail">
          <a
            className='link'
            href={link}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={Flux.override(link)}
          >Read more</a>
        </div>
      </div>
    </div>;
  },
  onMouseEnter() {
    this.setState({
      hover: true
    });
  },
  onMouseLeave() {
    this.setState({
      hover: false
    });
  }
});

export default WorkItem;
