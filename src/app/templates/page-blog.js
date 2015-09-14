'use strict';

import React from 'react';
import TransitionManager from 'react-transition-manager';
import classnames from 'classnames';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import take from 'lodash/array/take';
import isEqual from 'lodash/lang/isEqual';

import Flux from '../flux';

import Search from '../components/search';
import Hero from '../components/hero';
import BlogPostListItem from '../components/blog-post-list-item';
import BlogControls from '../components/blog-controls';
import LoadMoreButton from '../elements/load-more-button';

function getCategory(post) {
  return get(post, '_embedded.wp:term.0.0.slug');
}

export default class PageBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCategorised: props.blogCategory !== 'all',
      loadingMorePosts: false,
      loadingCategoryPosts: false
    }
  }
  componentWillMount() {
    if (this.props.posts) {
      Flux.getSocialSharesForPosts();
    }
  }
  componentWillReceiveProps(nextProps) {
    const { posts: currentPosts, blogCategory: currentBlogCategory } = this.props;
    const { posts: nextPosts, blogCategory: nextBlogCategory } = nextProps;

    // applies when category is changed
    if (currentBlogCategory !== nextBlogCategory) {
      this.setState({
        loadingCategoryPosts: true
      });
    }

    // applies when posts from category change have loaded
    const currentPostsSample = take(currentPosts, 6).map(post => post.id);
    const nextPostsSample = take(nextPosts, 6).map(post => post.id);
    if (!isEqual(currentPostsSample, nextPostsSample)) {
      Flux.getSocialSharesForPosts();
      this.setState({
        loadingCategoryPosts: false,
        isCategorised: currentBlogCategory !== 'all'
      });
    }

    // applies when "load more" button is clicked
    const newPostsAdded = (currentPosts && nextPosts) && (currentPosts.length < nextPosts.length);
    if (newPostsAdded) {
      Flux.getSocialSharesForPosts();
      this.setState({
        loadingMorePosts: false
      });
    }
  }
  render() {
    const state = this.state;
    const props = this.props;
    const classes = classnames('page-blog', {
      categorised: state.isCategorised,
      loading: state.loadingCategoryPosts,
      empty: props.posts && !props.posts.length
    });
    let posts = props.posts;
    if (!state.isCategorised && props.postsPagination > 1 && props.postsPagination < props.postsPaginationTotal) {
      posts = take(props.posts, (props.postsPagination * 12) + 1);
    }

    return (
      <article className={classes}>
        <TransitionManager component='div' className='hero-transition-manager' duration={1000}>
          {this.renderHero()}
        </TransitionManager>
        <section className='blog-post-list'>
          {this.renderPosts(posts)}
          <LoadMoreButton loading={state.loadingMorePosts} onClick={this.onClickLoadMore} disabled={props.postsPagination >= props.postsPaginationTotal} />
        </section>
      </article>
    );
  }
  renderHero = () => {
    const props = this.props;
    const attachments = get(props.page, '_embedded.wp:attachment.0', []);
    const image = find(attachments, 'id', get(props.page, 'featured_image'));
    let output;
    if (props.searchMode) {
      output = <Search key='search' searchQuery={props.searchQuery} />;
    } else {
      output = (
        <Hero key='hero' title={get(props.page, 'display_title')} imageOnly={true} sizes={get(image, 'media_details.sizes')} eventLabel='blog' showDownChevron={false}>
          <BlogControls className={classnames({ show: props.page })} blogCategory={props.blogCategory}/>
        </Hero>
      );
    }
    return output;
  }
  renderPosts = (posts) => {
    let output;
    if (posts) {
      if (posts.length) {
        output = posts.map((postData, index) => {
          return <BlogPostListItem key={postData.slug} className="blog-post-list-item" featured={!this.state.isCategorised && index === 0} data={postData} />;
        });
      } else {
        output = <h3 className="message">No posts found</h3>;
      }
    }
    return output;
  }
  onClickLoadMore = () => {
    Flux.loadMorePosts();
    this.setState({
      loadingMorePosts: true
    });
  }
}
