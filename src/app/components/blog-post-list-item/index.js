import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import he from 'he';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';
import getAuthor from '../../lib/get-author';
import getFeaturedImage from '../../lib/get-featured-image';

import Flux from '../../flux';

import Rimage from '../rimage';
import SocialMediaStatistics from '../social-media-statistics';

export default class BlogPostListItem extends React.Component {
  render() {
    const props = this.props;
    const { data: post, featured } = this.props;
    const category = get(post, '_embedded.wp:term.0.0', {});
    const classes = classnames('blog-post-list-item', `blog-label-${get(category, 'slug', 'category')}`, {
      featured: featured
    });
    const image = getFeaturedImage(post);
    const uri = `/blog/${get(post, 'slug')}`;

    return (
      <article className={classes}>
        <Rimage className="image" wrap="div" href={uri} sizes={get(image, 'media_details.sizes')} />
        <div className="content">
          <div className="blog-category">{get(category, 'name', 'category')}</div>
          <h2 className="title"><a href={uri} onClick={Flux.override(uri)}>{he.decode(get(post, 'title.rendered'))}</a></h2>
          <p className="meta">By {getAuthor(post)} - <span className="date">{moment(get(post, 'date')).format('D MMMM YYYY')}</span></p>
          <div className="excerpt" dangerouslySetInnerHTML={{ __html: get(post, 'excerpt.rendered')}} />
          <div className="tail">
            <a href={uri} onClick={Flux.override(uri)}>Read more</a>
            <SocialMediaStatistics facebookShares={get(post, 'facebookShares')} twitterShares={get(post, 'twitterShares')} />
          </div>
        </div>
      </article>
    );
  }
}
