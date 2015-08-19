import React from 'react';
import get from 'lodash/object/get';
import moment from 'moment';
import classnames from 'classnames';

import ModuleRenderer from '../_lib/module-renderer';

export default class PagePost extends React.Component {
  componentDidMount() {
    this.fetchTweetCount(this.props.page);
  }
  componentWillReceiveProps(nextProps) {
    this.fetchTweetCount(nextProps.page);
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
          <ul className="social-container">
            <li className="twitter">{post && post.tweetCount}</li>
          </ul>
          <div className="blog-category">{get(category, 'name', 'category')}</div>
          <h1 className="title">{get(post, 'title.rendered')}</h1>
          <p className="meta">By {get(post, '_embedded.author.0.name')} - <span className="date">{moment(get(post, 'date')).format('D MMMM YYYY')}</span></p>
          <hr className="rule" />
          {get(post, 'page_builder', []).map(this.getModuleRenderer(get(post, 'colors', {})))}
          <hr className="rule" />
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
  fetchTweetCount = (post) => {
    if (post && post.slug && post.tweetCount !== 0) {
      const uri = `http://ustwo.com/blog/${post.slug}`;
      Flux.getTweetCountForPost(uri);
    }
  }
}
