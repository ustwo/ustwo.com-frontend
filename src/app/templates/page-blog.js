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
import LoadMoreButton from '../elements/load-more-button';

export default class PageBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCategorised: props.blogCategory !== 'all',
      loadingMorePosts: false
    }
  }
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
    const newPostsAdded = (currentPosts && nextPosts) && (currentPosts.length < nextPosts.length);

    this.setState({
      isCategorised: nextProps.blogCategory !== 'all'
    });

    // applies when category is changed
    if (thereAreNoPosts && thereWillBePosts) {
      Flux.getSocialSharesForPosts();
    }

    // applies when "load more" button is clicked
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
    const attachments = get(props.page, '_embedded.wp:attachment.0', []);
    const image = find(attachments, item => item.id === get(props.page, 'featured_image'));
    let posts = props.posts;
    if (!state.isCategorised && (props.postsPagination < props.postsPaginationTotal)) {
      posts = props.posts && take(props.posts, props.posts.length-2);
    }
    const classes = classnames('page-blog', {
      categorised: state.isCategorised,
      loading: !posts,
      empty: posts && !posts.length
    });
    return (
      <article className={classes}>
        <Hero title={get(props.page, 'display_title')} backgroundTint={true} sizes={get(image, 'media_details.sizes')} eventLabel='blog' showDownChevron={false}>
          <BlogControls blogCategory={props.blogCategory}/>
        </Hero>
        <section className="blog-post-list">
          {this.renderPosts(posts)}
          <LoadMoreButton loading={state.loadingMorePosts} onClick={this.onClickLoadMore} disabled={props.postsPagination >= props.postsPaginationTotal} />
        </section>
      </article>
    );
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
