import React, { Component } from 'react';
import { get } from 'lodash';
import Flux from 'app/flux';
import getFeaturedImage from 'app/lib/get-featured-image';
import Rimage from 'app/components/rimage';
import ImageHover from 'app/components/image-hover';
import classnames from 'classnames';
import getAppleTitles from 'app/lib/apple-titles';
import kebabCase from 'lodash/string/kebabCase';
import CategoryTag from 'app/components/category-tag';

class WorkItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };
  }

  onMouseEnter() {
    this.setState({
      hover: true
    });
  }

  onMouseLeave() {
    this.setState({
      hover: false
    });
  }

  render() {
    const { data, page, featured } = this.props;
    const link = `/work/${get(data, 'slug')}`;
    const category = get(data, 'categories.0.name');
    const attachments = get(page, '_embedded.wp:attachment');
    const image = getFeaturedImage(data, attachments);
    const classes = classnames('card-item', 'work-item', `work-item-${data.id}`, `work-label-${kebabCase(category)}`, {
      featured: featured ? featured : null
    });

    return (
      <div className={classes} key={data.slug}>
        <a href={link} onClick={Flux.override(link)} className="card-image">
          <Rimage
            wrap='div'
            sizes={get(image, 'media_details.sizes')}
            altText={get(image, 'alt_text')}
          />
          <ImageHover autoAnim={500} hover={this.state.hover} />
        </a>
        <div className="card-details">
          <CategoryTag category={category} caseStudy={true} />
          <h3 className="title">
            <a
              href={link}
              onMouseEnter={this.onMouseEnter()}
              onMouseLeave={this.onMouseLeave()}
              onClick={Flux.override(link)}
            >{getAppleTitles(get(data, 'name'))}</a>
          </h3>
          <div
            className="excerpt"
            dangerouslySetInnerHTML={{__html: get(data, 'excerpt')}}
          />
          <div className="tail">
            <a
              className="link"
              href={link}
              onMouseEnter={this.onMouseEnter()}
              onMouseLeave={this.onMouseLeave()}
              onClick={Flux.override(link)}
            >Read more</a>
          </div>
        </div>
      </div>
    );
  }

  onMouseEnter() {
    return () => {
      this.setState({ hover: true });
    }
  }

  onMouseLeave() {
    return () => {
      this.setState({ hover: false });
    }
  }
};

export default WorkItem;
