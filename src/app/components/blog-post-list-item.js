import React from 'react';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';
import moment from 'moment';
import classnames from 'classnames';

import Flux from '../flux';

export default class BlogPostListItem extends React.Component {
  render() {
    const props = this.props;
    const post = props.data;
    const terms = (post._embedded && post._embedded['http://v2.wp-api.org/term']) || [];
    const category = get(terms, '0.0');
    const classes = classnames('blog-post-list-item', `blog-label-${get(category, 'slug', 'category')}`, {
      featured: props.featured
    });
    const attachments = (post._embedded && post._embedded['http://v2.wp-api.org/attachment']) || [];
    const imageURL = get(attachments, '1.source_url');
    const featuredImage = find(attachments, 'id', get(post, 'featured_image'));
    const uri = `/blog/${get(post, 'slug')}`;

    return (
      <article className={classes}>
        <div className="image" style={{backgroundImage: `url(${imageURL})`}} onClick={Flux.override(uri)}>
          <a href={uri} onClick={Flux.override(uri)}><img src={imageURL} /></a>
        </div>
        <div className="content">
          <div className="blog-category">{get(category, 'name', 'category')}</div>
          <h2 className="title"><a href={uri} onClick={Flux.override(uri)}>{get(post, 'title.rendered')}</a></h2>
          <p className="meta">By {get(post, '_embedded.author.0.first_name')} {get(post, '_embedded.author.0.last_name')} - <span className="date">{moment(get(post, 'date')).format('D MMMM YYYY')}</span></p>
          <div className="excerpt" dangerouslySetInnerHTML={{ __html: get(post, 'excerpt.rendered')}} />
          <div className="tail">
            <a href={uri} onClick={Flux.override(uri)}>Read more</a>
            <div className="social">
              <div className="twitter">120</div>
              <div className="comments">43</div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}
