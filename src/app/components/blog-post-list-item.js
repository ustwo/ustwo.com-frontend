import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import he from 'he';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';

import Flux from '../flux';

export default class BlogPostListItem extends React.Component {
  render() {
    const props = this.props;
    const post = props.data;
    const terms = get(post, '_embedded.wp:term', []);
    const category = get(terms, '0.0');
    const classes = classnames('blog-post-list-item', `blog-label-${get(category, 'slug', 'category')}`, {
      featured: props.featured
    });
    const attachments = get(post, '_embedded.wp:attachment', []);
    const imageURL = get(attachments, '1.source_url', '');
    const featuredImage = find(attachments, 'id', get(post, 'featured_image'));
    const uri = `/blog/${get(post, 'slug')}`;

    return (
      <article className={classes}>
        <div className="image" style={{backgroundImage: `url(${imageURL})`}} onClick={Flux.override(uri)}>
          <a href={uri} onClick={Flux.override(uri)}><img src={imageURL} /></a>
        </div>
        <div className="content">
          <div className="blog-category">{get(category, 'name', 'category')}</div>
          <h2 className="title"><a href={uri} onClick={Flux.override(uri)}>{he.decode(get(post, 'title.rendered'))}</a></h2>
          <p className="meta">By {get(post, '_embedded.author.0.first_name')} {get(post, '_embedded.author.0.last_name')} - <span className="date">{moment(get(post, 'date')).format('D MMMM YYYY')}</span></p>
          <div className="excerpt" dangerouslySetInnerHTML={{ __html: get(post, 'excerpt.rendered')}} />
          <div className="tail">
            <a href={uri} onClick={Flux.override(uri)}>Read more</a>
            {this.renderSocialMediaShareCounts()}
          </div>
        </div>
      </article>
    );
  }
  renderSocialMediaShareCounts = () => {
    const facebookIcon = '<use xlink:href="/images/spritemap.svg#facebook" />';
    const twitterIcon = '<use xlink:href="/images/spritemap.svg#twitter" />';

    return (
      <div className="social-media">
        <div className="channel facebook">
          <div className='logo'><svg className="facebook-icon" role="img" dangerouslySetInnerHTML={{__html: facebookIcon }} /></div>
          <span>{get(this.props.data, 'facebookShares')}</span>
        </div>
        <div className="channel twitter">
          <div className='logo'><svg className="twitter-icon" role="img" dangerouslySetInnerHTML={{__html: twitterIcon }} /></div>
          <span>{get(this.props.data, 'twitterShares')}</span>
        </div>
      </div>
    );
  }
}
