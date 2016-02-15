import React from 'react';
import classnames from 'classnames';
import he from 'he';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';
import getAuthor from 'app/lib/get-author';
import getFeaturedImage from 'app/lib/get-featured-image';

import Flux from 'app/flux';

import Rimage from 'app/components/rimage';
import BlogPostMetaInformation from 'app/components/blog-post-meta-information';
import BlogCategoryTag from 'app/components/blog-category-tag';

const BlogPostListItem = React.createClass({
  render() {
    const { data: post, featured } = this.props;
    const category = get(post, '_embedded.wp:term.0.0', {});
    const classes = classnames(
      'blog-post-list-item',
      `blog-label-${get(category, 'slug', 'category')}`,
      { featured: featured }
    );
    const excerpt = get(post, 'excerpt.rendered').replace(/<img[^>]*>/g,"");
    const image = getFeaturedImage(post);
    const uri = `/blog/${get(post, 'slug')}`;

    return <div className={classes}>
      <a href={uri} onClick={Flux.override(uri)} className="post-image">
        <Rimage
          wrap="div"
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
        />
      </a>
      <div className="details">
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
        </div>
      </div>
    </div>;
  }
});

export default BlogPostListItem;
