'use strict';

import React from 'react';
import get from 'lodash/object/get';

import Flux from 'app/flux';

import Rimage from 'app/components/rimage';
import ImageHover from 'app/components/image-hover';
import classnames from 'classnames';

import kebabCase from 'lodash/string/kebabCase';

const WorkItem = React.createClass({
  getInitialState() {
    return {
      hover: false
    };
  },
  render() {
    const { data, image, className, featured } = this.props;
    const id = data.id;
    const link = `/what-we-do/${get(data, 'slug')}`;
    const category = get(data, 'categories.0.name');

    return <div className={classnames('card-item', 'work-item', `work-item-${id}`, `work-label-${kebabCase(category)}`, {
        featured: featured
      })}>
      <a href={link} onClick={Flux.override(link)} className="card-image">
        <Rimage
          wrap='div'
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
        <ImageHover autoAnim={500} hover={this.state.hover} />
      </a>
      <div className="card-details">
        <div className="category-tag">
          {category}
        </div>
        <h3 className="title">
          <a
            href={link}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={Flux.override(link)}
          >{get(data, 'name')}</a>
        </h3>
        <div
          className="excerpt"
          dangerouslySetInnerHTML={{__html: get(data, 'excerpt')}}
        />
        <div className="tail">
          <a
            className="link"
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
