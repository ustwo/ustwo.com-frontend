'use strict';

import React from 'react';
import map from 'lodash/collection/map';

import Flux from '../../flux';
import CloseButton from '../close-button';
import {onClickContent} from '../modal';

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

export default class BlogCategories extends React.Component {
  render() {
    return (
      <div className='blog-categories-container' onClick={onClickContent}>
        <CloseButton onClose={this.onClickClose} autoAnim={500} />
        <div className="scroll-wrapper">
          <ul className='blog-categories'>{this.renderBlogCategories()}</ul>
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
  getOnClickBlogCategoryHandler = (uri) => {
    return (event) => {
      event.preventDefault();
      Flux.closeModal();
      Flux.navigate(uri, true);
    }
  }
  onClickClose() {
    Flux.closeModal();
  }
};
