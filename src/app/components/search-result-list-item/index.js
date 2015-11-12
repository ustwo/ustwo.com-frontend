import React from 'react';
import classnames from 'classnames';
import he from 'he';
import get from 'lodash/object/get';
import kebabCase from 'lodash/string/kebabCase';
import getFeaturedImage from '../../lib/get-featured-image';
import getAuthor from '../../lib/get-author';

import Flux from '../../flux';

import Rimage from '../rimage';
import BlogPostMetaInformation from '../blog-post-meta-information';
import SocialMediaStatistics from '../social-media-statistics';

const SearchResultListItem = React.createClass({
  render() {
    const { data: post } = this.props;
    const category = get(post, '_embedded.wp:term.0.0.name', 'category');
    const uri = `/blog/${get(post, 'slug')}`;
    const image = getFeaturedImage(post);
    const classes = classnames(
      'search-result-list-item',
      `blog-label-${kebabCase(category)}`
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
        <div className="blog-category">{category}</div>
        <h2 className="title">
          <a href={uri} onClick={Flux.override(uri)}>
            {he.decode(get(post, 'title.rendered'))}
          </a>
        </h2>
        <BlogPostMetaInformation
          author={getAuthor(post)}
          date={get(post, 'date')}
        />
        <SocialMediaStatistics
          facebookShares={get(post, 'facebookShares')}
          twitterShares={get(post, 'twitterShares')}
        />
        <div className="tail">
          <a href={uri} onClick={Flux.override(uri)}>Read more</a>
        </div>
      </div>
    </li>;
  }
});

export default SearchResultListItem;
