'use strict';

import React from 'react';
import map from 'lodash/collection/map';

const blogCategories = {
  all: "All Categories",
  business: "Business",
  culture: "Culture",
  design: "Design",
  development: "Development",
  process: "Process",
  ux: "UX",
  apps: "Apps",
  innovation: "Innovation",
  product: "Product"
}

export default class BlogControls extends React.Component {
  render() {
    const searchIcon = '<use xlink:href="/images/spritemap.svg#search" />';
    return (
      <div className="blog-controls">
        <a href="/" className="blog-search-button">
          <svg className="search-icon" role="img" dangerouslySetInnerHTML={{__html: searchIcon }} />
        </a>
        <div className="blog-filter">
          <div className="selected">All Categories</div>
          <ul className="dropdown">
            {this.renderBlogCateories()}
          </ul>
        </div>
      </div>
    );
  }
  renderBlogCateories = () => {
    return map(blogCategories, (name, id) => {
      return <li className={id}>{name}</li>;
    });
  }
};
