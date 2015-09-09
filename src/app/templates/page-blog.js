'use strict';

import React from 'react';
import TransitionManager from 'react-transition-manager';
import classnames from 'classnames';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import take from 'lodash/array/take';

import Flux from '../flux';

import Search from '../components/search';
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
    const classes = classnames('page-blog', {
      categorised: state.isCategorised,
      loading: !props.posts,
      empty: props.posts && !props.posts.length
    });
    return (
      <article className={classes}>
        <TransitionManager component='div' className='hero-transition-manager' duration={1000}>
          {this.renderHero()}
        </TransitionManager>
        <section className='blog-post-list'>
          {this.renderPosts(props.posts)}
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
          <BlogControls blogCategory={props.blogCategory}/>
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
