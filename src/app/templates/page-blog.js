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
    const currentPosts = this.props.posts;
    const nextPosts = nextProps.posts;
    const thereAreNoPosts = !currentPosts || !(currentPosts && currentPosts.length);
    const thereWillBePosts = nextPosts && !!nextPosts.length;
    const blogCategoryChanged = this.props.blogCategory !== nextProps.blogCategory;

    if (thereWillBePosts && (thereAreNoPosts || blogCategoryChanged)) {
      Flux.getSocialSharesForPosts();
    }
  }
  render() {
    const props = this.props;
    const posts = props.blogCategory === 'all' ? take(props.posts, (12*props.postsPagination)-2) : props.posts;
    const attachments = get(props.page, '_embedded.wp:attachment.0', []);
    const image = find(attachments, item => item.id === get(props.page, 'featured_image'));
    const classes = classnames('page-blog', {
      categorised: props.blogCategory !== 'all',
      loading: !posts,
      empty: posts && !posts.length
    });
    return (
      <article className={classes}>
        <Hero title='Think. Share. Learn.' backgroundTint={true} imageURL={get(image, 'source_url', '')} eventLabel='blog' showDownChevron={false}>
          <BlogControls blogCategory={props.blogCategory}/>
        </Hero>
        <section className="blog-post-list">
          {this.renderPosts(posts)}
          <button onClick={this.onClickLoadMore}>Load more</button>
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
  onClickLoadMore = () => {
    Flux.loadMorePosts();
  }
}
