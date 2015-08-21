'use strict';

import React from 'react';
import classnames from 'classnames';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import filter from 'lodash/collection/filter';
import take from 'lodash/array/take';
import every from 'lodash/collection/every';

import Flux from '../flux';

import Hero from '../components/hero';
import BlogPostListItem from '../components/blog-post-list-item';
import BlogControls from '../components/blog-controls';

export default class PageBlog extends React.Component {
  componentWillMount() {
    if (this.props.posts) {
      Flux.getSocialSharesForPosts();
    }
  }
  componentWillReceiveProps(nextProps) {
    const posts = nextProps.blogCategory === 'all' ? take(nextProps.posts, 10) : nextProps.posts;
    const socialShareDataIncomplete = !every(posts, post => {
      const hasFacebookData = post.facebookShares || post.facebookShares === 0;
      const hasTwitterData = post.twitterShares || post.twitterShares === 0;
      return hasFacebookData && hasTwitterData;
    });
    if (posts && socialShareDataIncomplete) {
      Flux.getSocialSharesForPosts();
    }
  }
  render() {
    const props = this.props;
    const posts = props.blogCategory === 'all' ? take(props.posts, 10) : props.posts;
    const attachments = get(props.page, '_embedded.wp:attachment.0', []);
    const image = find(attachments, item => item.id === get(props.page, 'featured_image'));
    const classes = classnames('page-blog', {
      categorised: props.blogCategory !== 'all',
      loading: !posts,
      empty: posts && !posts.length
    });
    return (
      <article className={classes}>
        <Hero title='Think. Share. Learn.' backgroundTint={true} imageURL={get(image, 'source_url', '')} eventLabel='blog'>
          <BlogControls blogCategory={props.blogCategory}/>
        </Hero>
        <section className="blog-post-list">
          {this.renderPosts(posts)}
        </section>
      </article>
    );
  }
  renderPosts = (postsArray) => {
    const categorised = this.props.blogCategory !== 'all';
    let posts;
    if(postsArray) {
      if(postsArray.length) {
        posts = postsArray.map((postData, index) => {
          return <BlogPostListItem key={postData.slug} className="blog-post-list-item" featured={!categorised && index === 0} data={postData} />;
        });
      } else {
        posts = <h3 className="message">No posts found</h3>;
      }
    } else {
      posts = <h3 className="message loading">Loading<div className="spinner"></div></h3>;
    }
    return posts;
  }
}
