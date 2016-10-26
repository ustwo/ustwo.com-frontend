import React from 'react';
import classnames from 'classnames';
import he from 'he';
import { get } from 'lodash';
import kebabCase from 'lodash/string/kebabCase';
import getFeaturedImage from 'app/lib/get-featured-image';
import getAuthor from 'app/lib/get-author';

import Flux from 'app/flux';

import Rimage from 'app/components/rimage';
import BlogPostMetaInformation from 'app/components/blog-post-meta-information';
import CategoryTag from 'app/components/category-tag';

const SearchResultListItem = React.createClass({
  render() {
    const { data: post } = this.props;
    const category = get(post, '_embedded.wp:term.0.0', {});
    const uri = `/blog/${get(post, 'slug')}`;
    const image = getFeaturedImage(post);
    const classes = classnames(
      'search-result-list-item',
      `blog-label-${get(category, 'slug', 'category')}`
    );

    return <li className={classes}>
      <a href={uri} onClick={Flux.override(uri)}>
        <Rimage
          className="image"
          wrap="div"
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
      </a>
      <div className="content">
        <CategoryTag
          category={get(category, 'name', 'category')}
        />
        <h2 className="title">
          <a href={uri} onClick={Flux.override(uri)}>
            {he.decode(get(post, 'title.rendered'))}
          </a>
        </h2>
        <BlogPostMetaInformation
          author={getAuthor(post)}
          date={get(post, 'date')}
        />
        <div className="tail">
          <a href={uri} onClick={Flux.override(uri)}>Read more</a>
        </div>
      </div>
    </li>;
  }
});

export default SearchResultListItem;
