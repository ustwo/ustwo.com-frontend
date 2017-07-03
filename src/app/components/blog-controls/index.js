'use strict';

import React from 'react';
import classnames from 'classnames';

import Flux from 'app/flux';

import SVG from 'app/components/svg';
import LoadingIcon from 'app/components/loading-icon';

const blogCategories = {
  all: 'All Categories',
  business: 'Business',
  culture: 'Culture',
  design: 'Design',
  development: 'Development',
  process: 'Process',
  ux: 'UX',
  apps: 'Apps',
  innovation: 'Innovation',
  product: 'Product'
}

const BlogControls = React.createClass({
  onClickSelectedCategory() {
    Flux.showBlogCategories();
  },
  render() {
    const { className, blogCategory: currentCategory } = this.props;
    return <div className={classnames('blog-controls', className)}>
      <div className="blog-filter">
        <div
          className="selected"
          onClick={this.onClickSelectedCategory}
        >
          {blogCategories[currentCategory]}
        </div>
        <LoadingIcon />
      </div>
    </div>;
  }
});

export default BlogControls;
