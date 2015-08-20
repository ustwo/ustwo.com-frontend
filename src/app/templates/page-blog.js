'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import filter from 'lodash/collection/filter';
import classnames from 'classnames';

import Hero from '../components/hero';
import BlogPostListItem from '../components/blog-post-list-item';
import BlogControls from '../components/blog-controls';

export default class PageBlog extends React.Component {
  render() {
    const props = this.props;
    const pageData = this.props.page;

    const latestPosts = get(pageData, '_embedded.ustwo:posts.0', []);
    const filteredPosts = get(this.props, 'posts');
    const posts = props.blogCategory === 'all' ? latestPosts : filteredPosts;
    const attachments = get(pageData, '_embedded.wp:attachment.0', []);
    const image = find(attachments, item => item.id === get(props.page, 'featured_image'));
    const categorised = this.props.blogCategory !== 'all';
    const classes = classnames('page-blog', {
      categorised: categorised,
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
        posts = <div className="message">No posts found</div>;
      }
    } else {
      posts = <div className="message">Loading</div>;
    }
    return posts;
  }
}
