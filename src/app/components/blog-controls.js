'use strict';

import React from 'react';
import classnames from 'classnames';
import map from 'lodash/collection/map';

import Flux from '../flux';

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
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  render() {
    const searchIcon = '<use xlink:href="/images/spritemap.svg#search" />';
    const searchURL = '/blog/search';
    return (
      <div className="blog-controls">
        <button onClick={this.onClickSearch} className="blog-search-button">
          <svg className="search-icon" role="img" dangerouslySetInnerHTML={{__html: searchIcon }} />
        </button>
        <div className={classnames("blog-filter", { open: this.state.open })}>
          <div className="selected" onClick={this.onClickSelectedCategory}>{blogCategories[this.props.blogCategory]}</div>
          <ul className="dropdown">
            {this.renderBlogCategories()}
          </ul>
        </div>
      </div>
    );
  }
  renderBlogCategories = () => {
    return map(blogCategories, (name, id) => {
      const uri = (id === 'all') ? '/blog' : `/blog?category=${id}`;
      return (
        <li className={id}>
          <a href={uri} onClick={this.getOnClickBlogCategoryHandler(uri)}>{name}</a>
        </li>
      );
    });
  }
  onClickSearch = (event) => {
    event.preventDefault();
    Flux.showSearch();
  }
  onClickSelectedCategory = () => {
    this.setState({
      open: true
    });
  }
  getOnClickBlogCategoryHandler = (uri) => {
    return (e) => {
      Flux.override(uri)(e);
      this.setState({
        open: false
      });
    }
  }
};
