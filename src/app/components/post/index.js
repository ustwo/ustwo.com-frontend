import React from 'react';
import classnames from 'classnames';
import he from 'he';
import get from 'lodash/object/get';
import renderModules from '../../lib/module-renderer';
import getAuthor from '../../lib/get-author';
import getFeaturedImage from '../../lib/get-featured-image';
import getScrollTrackerMixin from '../../lib/get-scroll-tracker-mixin';

import Flux from '../../flux';

import Rimage from '../rimage';
import BlogPostMetaInformation from '../blog-post-meta-information';
import SocialMediaSharing from '../social-media-sharing';

const PagePost = React.createClass({
  mixins: [getScrollTrackerMixin('post')],
  render() {
    const {post} = this.props;
    const category = get(post, '_embedded.wp:term.0.0', []);
    const image = getFeaturedImage(post);
    const classes = classnames('page-post', `blog-label-${get(category, 'slug', 'uncategorised')}`);
    return <article className={classes}>
      <style>{`
        .page-post .content-container a {
          border-bottom-color: #14C04D;
        }
      `}</style>
      <Rimage
        wrap='div'
        className='hero-image'
        sizes={get(image, 'media_details.sizes')}
        altText={get(image, 'alt_text')}
      />
      <div className='content-container'>
        <div className='blog-category'>
          {get(category, 'name', 'category')}
        </div>
        <h1 className='title'>{he.decode(get(post, 'title.rendered', ''))}</h1>
        {this.renderSocialMediaSharing('side')}
        <BlogPostMetaInformation
          author={getAuthor(post)}
          date={get(post, 'date')}
        />
        <hr className='rule' />
        {renderModules({
          modules: get(post, 'page_builder', []),
          colours: get(post, 'colors'),
          zebra: false
        })}
        <hr className='rule' />
        {this.renderSocialMediaSharing('bottom')}
        {this.renderAuthorInformation()}
      </div>
    </article>;
  },
  renderSocialMediaSharing(position) {
    const props = this.props;
    return (
      <SocialMediaSharing
        className={position}
        title={he.decode(get(props.post, 'title.rendered', ''))}
        uri={`http://ustwo.com/blog/${get(props.page, 'slug')}`}
        facebookShares={props.facebookShares}
        twitterShares={props.twitterShares}
      />
    );
  },
  renderAuthorInformation() {
    const { page: post } = this.props;
    const author = get(post, '_embedded.author.0');
    return <section className='author'>
      <img
        className='mugshot'
        alt={get(author, 'name', 'post author')}
        src={get(author, 'avatar_urls.96')}
      />
      <h3 className='title'>About {get(author, 'name')}</h3>
      <p className='desc'>{get(author, 'description')}</p>
      {/*<ul className='links'>
        <li className='link'>
          <a href={get(post, 'author.links[0].href')}>
            {get(post, 'author.links[0].text')}
          </a>
        </li>
      </ul>*/}
    </section>;
  }
});

export default PagePost;
