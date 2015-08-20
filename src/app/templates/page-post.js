import React from 'react';
import get from 'lodash/object/get';
import moment from 'moment';
import classnames from 'classnames';

import Flux from '../flux';

import ModuleRenderer from '../_lib/module-renderer';
import SocialMediaSharing from '../components/social-media-sharing';

export default class PagePost extends React.Component {
  componentWillMount() {
    this.fetchSocialMediaShareCounts(this.props.page);
  }
  componentWillReceiveProps(nextProps) {
    this.fetchSocialMediaShareCounts(nextProps.page);
  }
  render() {
    const post = this.props.page;
    const terms = get(post, '_embedded.wp:term', []);
    const category = get(terms, '0.0');
    const classes = classnames('page-post', `blog-label-${get(category, 'slug', 'uncategorised')}`);
    const attachments = get(post, '_embedded.wp:attachment', []);

    return (
      <article className={classes}>
        <style>{`
          .page-post .content-container a {
            border-bottom-color: #14C04D;
          }
        `}</style>
        <div className="hero-image" style={{backgroundImage: `url(${get(attachments, '1.source_url')})`}}>
          <img className="image" src={get(attachments, '1.source_url')} />
        </div>
        <div className="content-container">
          <div className="blog-category">{get(category, 'name', 'category')}</div>
          <h1 className="title">{get(post, 'title.rendered')}</h1>
          <SocialMediaSharing className='side' title={get(post, 'title.rendered')} uri={`http://ustwo.com/blog/${post.slug}`} facebookShareCount={post && post.facebookShares} twitterShareCount={post && post.twitterShares} />
          <p className="meta">By {get(post, '_embedded.author.0.name')} - <span className="date">{moment(get(post, 'date')).format('D MMMM YYYY')}</span></p>
          <hr className="rule" />
          {get(post, 'page_builder', []).map(this.getModuleRenderer(get(post, 'colors', {})))}
          <hr className="rule" />
          <SocialMediaSharing className='bottom' title={get(post, 'title.rendered')} uri={`http://ustwo.com/blog/${post.slug}`} facebookShareCount={post && post.facebookShares} twitterShareCount={post && post.twitterShares} />
          <section className="author">
            <img className="mugshot" src={get(post, '_embedded.author.0.avatar_urls.96')} />
            <h1 className="title">About {get(post, '_embedded.author.0.name')}</h1>
            <p className="desc">{get(post, '_embedded.author.0.description')}</p>
            {/*<ul className="links">
              <li className="link"><a href={get(post, 'author.links[0].href')}>{get(post, 'author.links[0].text')}</a></li>
            </ul>*/}
          </section>
        </div>
      </article>
    );
  }
  getModuleRenderer(colours) {
    return (moduleData) => {
      return ModuleRenderer(moduleData, colours, () => {
        this.zebra = !this.zebra;
        return this.zebra;
      });
    };
  }
  fetchSocialMediaShareCounts = (post) => {
    if (post && post.slug) {
      this.fetchFacebookShareCount(post);
      this.fetchTweetCount(post);
    }
  }
  fetchFacebookShareCount = (post) => {
    if (!(post.facebookShares || post.facebookShares === 0)) {
      const uri = `http://ustwo.com/blog/${post.slug}`;
      Flux.getSocialShareCountForPost('facebook', uri);
    }
  }
  fetchTweetCount = (post) => {
    if (!(post.twitterShares || post.twitterShares === 0)) {
      const uri = `http://ustwo.com/blog/${post.slug}`;
      Flux.getSocialShareCountForPost('twitter', uri);
    }
  }
}
