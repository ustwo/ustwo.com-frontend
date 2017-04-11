import React, { Component } from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';

import renderModules from 'app/lib/module-renderer';
import getFeaturedImage from 'app/lib/get-featured-image';

import Hero from 'app/components/hero';
import Video from 'app/components/video';

class Page extends Component {
  render() {
    const {page} = this.props;
    const image = getFeaturedImage(page);
    const classes = classnames('page', this.props.className);

    return <article className={classes}>
      <Hero
        title={get(page, 'display_title')}
        transitionImage={true}
        eventLabel='page'
        showDownChevron={true}
      >
        <Video
          src={get(page, 'featured_video')}
          sizes={get(image, 'media_details.sizes')}
          isVideoBackground={true}
        />
      </Hero>
      {renderModules({
        modules: get(page, 'page_builder', []),
        colours: get(page, 'colors'),
        zebra: true
      })}
    </article>;
  }
};

export default Page;
