'use strict';

import React from 'react';
import TransitionManager from 'react-transition-manager';
import classnames from 'classnames';
import find from 'lodash/collection/find';
import { get } from 'lodash';
import take from 'lodash/array/take';
import isEqual from 'lodash/lang/isEqual';

import getFeaturedImage from 'app/lib/get-featured-image';
import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';

import Flux from 'app/flux';

import Search from 'app/components/search';
import Hero from 'app/components/hero';
import BlogPostListItem from 'app/components/blog-post-list-item';
import BlogControls from 'app/components/blog-controls';
import LoadMoreButton from 'app/components/load-more-button';

const PageBlog = React.createClass({
  mixins: [getScrollTrackerMixin('blog')],
  getInitialState() {
    return {
      isCategorised: this.props.blogCategory !== 'all',
      isLoadingInitialPosts: true,
      isLoadingMorePosts: false,
      isLoadingCategoryPosts: false
    };
  },
  componentWillMount() {
    if (this.props.posts) {
      this.setState({
        isLoadingInitialPosts: false
      });
    }
  },
  componentWillReceiveProps(nextProps) {
    const { posts: currentPosts, blogCategory: currentBlogCategory } = this.props;
    const { posts: nextPosts, blogCategory: nextBlogCategory } = nextProps;
    const { isLoadingInitialPosts } = this.state;

    if (isLoadingInitialPosts && nextPosts) {
      this.setState({
        isLoadingInitialPosts: false
      });
    }

    // applies when category is changed
    if (currentBlogCategory !== nextBlogCategory) {
      this.setState({
        isLoadingCategoryPosts: true
      });
    }

    // applies when posts from category change have loaded
    // we infer a category change from post IDs as:
    // - can't use props, by this point currentBlogCategory === nextBlogCategory
    // - looping through posts to infer category is less reliable as some posts have multiple
    //   categories, hence in a given category not all the posts will have the same category.
    const currentPostsSample = take(currentPosts, 6).map(post => post.id);
    const nextPostsSample = take(nextPosts, 6).map(post => post.id);
    if (!isEqual(currentPostsSample, nextPostsSample)) {
      this.setState({
        isLoadingCategoryPosts: false,
        isCategorised: currentBlogCategory !== 'all'
      });
    }

    // applies when "load more" button is clicked
    const newPostsAdded = (currentPosts && nextPosts) && (currentPosts.length < nextPosts.length);
    if (newPostsAdded) {
      this.setState({
        isLoadingMorePosts: false
      });
    }
  },
  getPosts() {
    const { isCategorised } = this.state;
    const { postsPagination, postsPaginationTotal } = this.props;
    let { posts } = this.props;
    if (!isCategorised && postsPagination > 1 && postsPagination < postsPaginationTotal) {
      posts = take(posts, (postsPagination * 12) + 1);
    }
    return posts;
  },
  onClickLoadMore() {
    Flux.loadMorePosts();
    this.setState({
      isLoadingMorePosts: true
    });
  },
  renderHero() {
    const { page, searchMode, searchQuery, blogCategory } = this.props;
    const image = getFeaturedImage(page);
    let output;
    if (searchMode) {
      output = <Search key="search" searchQuery={searchQuery} />;
    } else {
      output = <Hero
        key="hero"
        title={get(page, 'display_title')}
        transitionImage={true}
        sizes={get(image, 'media_details.sizes')}
        altText={get(image, 'alt_text')}
        eventLabel="blog"
        showDownChevron={false}
      >
        <BlogControls
          className={classnames({ show: page })}
          blogCategory={blogCategory}
        />
      </Hero>;
    }
    return output;
  },
  renderPosts() {
    const posts = this.getPosts();
    let output;
    if (posts) {
      if (posts.length) {
        output = posts.map((postData, index) => {
          return <BlogPostListItem
            key={postData.slug}
            className="blog-post-list-item"
            featured={!this.state.isCategorised && index === 0}
            data={postData}
          />;
        });
      } else {
        output = <h3 className="message">No posts found</h3>;
      }
    }
    return output;
  },
  render() {
    const {
      isCategorised,
      isLoadingInitialPosts,
      isLoadingMorePosts,
      isLoadingCategoryPosts
    } = this.state;
    const { postsPagination, postsPaginationTotal } = this.props;
    const { posts } = this.props;
    const classes = classnames('page-blog', this.props.className, {
      categorised: isCategorised,
      loading: isLoadingInitialPosts || isLoadingCategoryPosts,
      empty: posts && !posts.length
    });

    return <article className={classes}>
      <TransitionManager
        component="div"
        className="hero-transition-manager"
        duration={1000}
      >
        {this.renderHero()}
      </TransitionManager>
      <section className="card-list blog-post-list">
        {this.renderPosts()}
        <LoadMoreButton
          loading={isLoadingMorePosts}
          onClick={this.onClickLoadMore}
          disabled={postsPagination >= postsPaginationTotal}
        />
      </section>
    </article>;
  },
});

export default PageBlog;
