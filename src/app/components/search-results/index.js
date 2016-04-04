'use strict';

import React from 'react';
import TransitionManager from 'react-transition-manager';
import classnames from 'classnames';

import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';

import Flux from 'app/flux';

import LoadingIcon from 'app/components/loading-icon';
import SearchResultListItem from 'app/components/search-result-list-item';

const PageSearchResults = React.createClass({
  mixins: [getScrollTrackerMixin('search-results')],
  getInitialState() {
    return {
      loading: true,
      startAnimation: false
    };
  },
  componentWillMount() {
    if (this.props.posts) {
      this.setState({
        loading: false
      });
    }
  },
  componentWillReceiveProps(nextProps) {
    if (this.state.loading && nextProps.posts) {
      this.setState({
        loading: false
      });
    }
  },
  render() {
    setTimeout(function() {
      this.setState({
        startAnimation: true
      });
    }.bind(this), 10);
    const pageClasses = classnames('page-search-results', {
      'shown': this.state.startAnimation
    });
    return (
      <article className={pageClasses}>
        <div className="search-results-header">
          <div className="h1 searched-term">{this.props.searchQuery}</div>
          <div className="clear-search"><button onClick={this.onClickClearSearch}>Clear search</button></div>
        </div>
        <TransitionManager component='div' className='search-transition-manager' duration={700}>
          {this.renderSearchResults()}
        </TransitionManager>
      </article>
    );
  },
  renderSearchResults() {
    const { loading: isLoading } = this.state;
    const { posts } = this.props;
    let output;

    if (isLoading) {
      output = <LoadingIcon key='loading-icon' />;
    } else if (posts && posts.length) {
      output = (
        <ul key='search-results' className='search-results'>
          {posts.map(post => <SearchResultListItem key={post.slug} data={post} />)}
        </ul>
      );
    } else {
      output = <h2 key='no-results' className='no-results'>No results found</h2>;
    }
    return output;
  },
  onClickClearSearch() {
    if (history) {
      history.go(-1);
    } else {
      Flux.navigate('/blog');
    }
    Flux.resetPosts();
  }
});

export default PageSearchResults;
