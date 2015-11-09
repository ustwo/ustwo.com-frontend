import React from 'react';
import classnames from 'classnames';
import he from 'he';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';
import getAuthor from '../../lib/get-author';
import getFeaturedImage from '../../lib/get-featured-image';

import Flux from '../../flux';

import Rimage from '../rimage';
import BlogPostMetaInformation from '../blog-post-meta-information';
import BlogCategoryTag from '../blog-category-tag';
import SocialMediaStatistics from '../social-media-statistics';

const BlogPostListItem = React.createClass({
  render() {
    const { data: post, featured } = this.props;
    const category = get(post, '_embedded.wp:term.0.0', {});
    const classes = classnames(
      'blog-post-list-item',
      `blog-label-${get(category, 'slug', 'category')}`,
      { featured: featured }
    );
    const excerpt = get(post, 'excerpt.rendered');
    const image = getFeaturedImage(post);
    const uri = `/blog/${get(post, 'slug')}`;

    return <article className={classes}>
      <a href={uri} onClick={Flux.override(uri)}>
        <Rimage
          className="post-image"
          wrap="div"
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
      </a>
      <div className="content">
        <BlogCategoryTag
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
        <div className="excerpt" dangerouslySetInnerHTML={{__html: excerpt}} />
        <div className="tail">
          <a href={uri} onClick={Flux.override(uri)}>Read more</a>
          <SocialMediaStatistics
            facebookShares={get(post, 'facebookShares')}
            twitterShares={get(post, 'twitterShares')}
          />
        </div>
      </div>
    </article>;
  }
});

export default BlogPostListItem;
