import React from 'react';
import classnames from 'classnames';
import he from 'he';
import get from 'lodash/object/get';
import ModuleRenderer from '../../lib/module-renderer';
import getAuthor from '../../lib/get-author';
import getFeaturedImage from '../../lib/get-featured-image';
import getScrollTrackerMixin from '../../lib/get-scroll-tracker-mixin';

import Flux from '../../flux';

import Rimage from '../rimage';
import BlogPostMetaInformation from '../blog-post-meta-information';
import SocialMediaSharing from '../social-media-sharing';

const PagePost = React.createClass({
  mixins: [getScrollTrackerMixin('post')],
  componentWillMount() {
    const page = this.props.page;
    if (page && page.slug) {
      Flux.getSocialSharesForPost();
    }
  },
  componentWillReceiveProps(nextProps) {
    if (!this.props.page && nextProps.page && nextProps.page.slug) {
      Flux.getSocialSharesForPost();
    }
  },
  render() {
    const { page: post } = this.props;
    const category = get(post, '_embedded.wp:term.0.0', []);
    const image = getFeaturedImage(post);
    const classes = classnames('page-post', `blog-label-${get(category, 'slug', 'uncategorised')}`);
    return (
      <article className={classes}>
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
        <div className="content-container">
          <div className="blog-category">{get(category, 'name', 'category')}</div>
          <h1 className="title">{he.decode(get(post, 'title.rendered', ''))}</h1>
          {this.renderSocialMediaSharing('side')}
          <BlogPostMetaInformation
            author={getAuthor(post)}
            date={get(post, 'date')}
          />
          <hr className="rule" />
          {get(post, 'page_builder', []).map(this.getModuleRenderer(get(post, 'colors', {})))}
          <hr className="rule" />
          {this.renderSocialMediaSharing('bottom')}
          <section className="author">
            <img className="mugshot" alt={`Photo of ${get(post, '_embedded.author.0.name', 'post author')}`} src={get(post, '_embedded.author.0.avatar_urls.96')} />
            <h3 className="title">About {get(post, '_embedded.author.0.name')}</h3>
            <p className="desc">{get(post, '_embedded.author.0.description')}</p>
            {/*<ul className="links">
              <li className="link"><a href={get(post, 'author.links[0].href')}>{get(post, 'author.links[0].text')}</a></li>
            </ul>*/}
          </section>
        </div>
      </article>
    );
  },
  renderSocialMediaSharing(position) {
    const props = this.props;
    return (
      <SocialMediaSharing
        className={position}
        title={he.decode(get(props.page, 'title.rendered', ''))}
        uri={`http://ustwo.com/blog/${get(props.page, 'slug')}`}
        facebookShares={props.facebookShares}
        twitterShares={props.twitterShares}
      />
    );
  },
  getModuleRenderer(colours) {
    return (moduleData, index) => {
      return ModuleRenderer(moduleData, index, colours);
    };
  }
});

export default PagePost;
