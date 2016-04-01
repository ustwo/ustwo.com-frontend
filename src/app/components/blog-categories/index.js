'use strict';

import React from 'react';
import map from 'lodash/collection/map';

import Flux from 'app/flux';
import CloseButton from 'app/components/close-button';
import ModalContentMixin from 'app/lib/modal-content-mixin';

const blogCategories = {
  all: 'All Categories',
  business: 'Business',
  culture: 'Culture',
  design: 'Design',
  development: 'Development',
  process: 'Process',
  ux: 'UX',
  innovation: 'Innovation',
  product: 'Product'
}

const BlogCategories = React.createClass({
  mixins: [ModalContentMixin],
  renderBlogCategories() {
    return map(blogCategories, (name, id) => {
      const uri = (id === 'all') ? '/blog' : `/blog?category=${id}`;
      return <li key={`blog-category-${id}`} className={id}>
        <a href={uri} onClick={this.getOnClickBlogCategoryHandler(uri)}>
          {name}
        </a>
      </li>;
    });
  },
  getOnClickBlogCategoryHandler(uri) {
    return (event) => {
      event.preventDefault();
      Flux.closeModal();
      Flux.navigate(uri, true);
    }
  },
  onClickClose() {
    Flux.closeModal();
  },
  render() {
    return <div className="blog-categories" onClick={this.onClickContent}>
      <CloseButton onClose={this.onClickClose} autoAnim={500} />
      <div className="scroll-wrapper">
        <ul className="list">{this.renderBlogCategories()}</ul>
      </div>
    </div>;
  }
});

export default BlogCategories;
