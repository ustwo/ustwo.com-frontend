import React from 'react';
import classnames from 'classnames';
import he from 'he';
import { get } from 'lodash';
import renderModules from 'app/lib/module-renderer';
import getAuthor from 'app/lib/get-author';
import getFeaturedImage from 'app/lib/get-featured-image';
import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';

import Flux from 'app/flux';

import Rimage from 'app/components/rimage';
import BlogPostMetaInformation from 'app/components/blog-post-meta-information';
import CategoryTag from 'app/components/category-tag';
import SocialMediaSharing from 'app/components/social-media-sharing';
import RelatedContent from 'app/components/related-content';

const PagePost = React.createClass({
  mixins: [getScrollTrackerMixin('post')],
  render() {
    const {post} = this.props;
    const category = get(post, '_embedded.wp:term.0.0', []);
    const image = getFeaturedImage(post);
    const classes = classnames('page-post', this.props.className, `blog-label-${get(category, 'slug', 'uncategorised')}`);
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
        <CategoryTag
          category={get(category, 'name', 'category')}
        />
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
      {this.renderRelatedContent()}
    </article>
  },
  renderRelatedContent() {
    let relatedContent;
    if(this.props.relatedContent.length) {
      relatedContent = <RelatedContent content={this.props.relatedContent} />
    }
    return relatedContent;
  },
  renderSocialMediaSharing(position) {
    const { post } = this.props;
    return (
      <SocialMediaSharing
        className={position}
        title={he.decode(get(post, 'title.rendered', ''))}
        uri={`http://ustwo.com/blog/${get(post, 'slug')}`}
      />
    );
  },
  renderAuthorInformation() {
    const { post } = this.props;
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
