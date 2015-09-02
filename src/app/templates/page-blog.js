'use strict';

import React from 'react';
import classnames from 'classnames';
import TransitionManager from 'react-transition-manager';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import filter from 'lodash/collection/filter';
import take from 'lodash/array/take';
import every from 'lodash/collection/every';

import Flux from '../flux';

import BlogLoader from '../components/blog-loader';
import Hero from '../components/hero';
import BlogPostListItem from '../components/blog-post-list-item';
import BlogControls from '../components/blog-controls';
import LoadMoreButton from '../elements/load-more-button';

export default class PageBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingInitialPosts: true,
      loadingMorePosts: false
    }
  }
  componentWillMount() {
    if (this.props.posts) {
      Flux.getSocialSharesForPosts();
      // TODO: REMOVE THIS
      setTimeout(() => {
        this.setState({
          loadingInitialPosts: false
        });
      }, 4000);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.isCategorised = nextProps.blogCategory !== 'all';
    const currentPosts = this.props.posts;
    const nextPosts = nextProps.posts;
    const thereAreNoPosts = !currentPosts || !(currentPosts && currentPosts.length);
    const thereWillBePosts = nextPosts && !!nextPosts.length;
    const newPostsAdded = (currentPosts && nextPosts) && (currentPosts.length < nextPosts.length);

    // applies on cold loading and when category is changed
    if (thereAreNoPosts && thereWillBePosts) {
      Flux.getSocialSharesForPosts();
      // TODO: REMOVE THIS
      // this.setState({
      //   loadingInitialPosts: false
      // });
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
    let posts = props.posts;
    if (!this.isCategorised && (props.postsPagination < props.postsPaginationTotal)) {
      posts = props.posts && take(props.posts, props.posts.length-2);
    }
    const classes = classnames('page-blog', {
      categorised: this.isCategorised,
      loading: state.loadingInitialPosts,
      empty: posts && !posts.length
    });
    return (
      <article className={classes}>
        <TransitionManager component="div" duration="0">
          {this.renderBlogContent()}
        </TransitionManager>
      </article>
    );
  }
  renderBlogContent = () => {
    const state = this.state;
    const props = this.props;
    let content;

    if (state.loadingInitialPosts) {
      content = <BlogLoader />;
    } else {
      const attachments = get(props.page, '_embedded.wp:attachment.0', []);
      const image = find(attachments, item => item.id === get(props.page, 'featured_image'));
      let posts = props.posts;
      if (!this.isCategorised && (props.postsPagination < props.postsPaginationTotal)) {
        posts = props.posts && take(props.posts, props.posts.length-2);
      }
      console.log('image');
      content = (
        <div>
          <Hero title='Think. Share. Learn.' backgroundTint={true} imageURL={get(image, 'source_url', '')} eventLabel='blog' showDownChevron={false}>
            <BlogControls blogCategory={props.blogCategory}/>
          </Hero>
          <section className="blog-post-list">
            {this.renderPosts(posts)}
            <LoadMoreButton loading={state.loadingMorePosts} onClick={this.onClickLoadMore} disabled={props.postsPagination >= props.postsPaginationTotal} />
          </section>
        </div>
      );
    }
    return content;
  }
  renderPosts = (posts) => {
    let output;
    if (posts) {
      if (posts.length) {
        output = posts.map((postData, index) => {
          return <BlogPostListItem key={postData.slug} className="blog-post-list-item" featured={!this.isCategorised && index === 0} data={postData} />;
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
