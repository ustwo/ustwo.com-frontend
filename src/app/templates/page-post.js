import React from 'react';
import get from 'lodash/object/get';
import moment from 'moment';
import classnames from 'classnames';

import ModuleRenderer from '../_lib/module-renderer';
import SocialMediaStatistics from '../components/social-media-statistics';

export default class PagePost extends React.Component {
  componentDidMount() {
    this.fetchSocialMediaShareCounts(this.props.page);
  }
  componentWillReceiveProps(nextProps) {
    this.fetchSocialMediaShareCounts(nextProps.page);
  }
  render() {
    const post = this.props.page;
    const terms = (post && post._embedded && post._embedded['http://v2.wp-api.org/term']) || [];
    const category = get(terms, '0.0');
    const classes = classnames('page-post', `blog-label-${get(category, 'slug', 'category')}`);
    const attachments = (post && post._embedded && post._embedded['http://v2.wp-api.org/attachment']) || [];

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
          <SocialMediaStatistics className='side' facebookShareCount={post && post.facebookShares} twitterShareCount={post && post.twitterShares} />
          <p className="meta">By {get(post, '_embedded.author.0.name')} - <span className="date">{moment(get(post, 'date')).format('D MMMM YYYY')}</span></p>
          <hr className="rule" />
          {get(post, 'page_builder', []).map(this.getModuleRenderer(get(post, 'colors', {})))}
          <hr className="rule" />
          <SocialMediaStatistics className='bottom' facebookShareCount={post && post.facebookShares} twitterShareCount={post && post.twitterShares} />
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
