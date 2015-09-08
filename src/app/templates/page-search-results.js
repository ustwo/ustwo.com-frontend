'use strict';

import React from 'react';
import TransitionManager from 'react-transition-manager';

import Flux from '../flux';

import LoadingIcon from '../elements/loading-icon';
import SearchResultListItem from '../components/search-result-list-item';

export default class PageSearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentWillMount() {
    if (this.props.posts) {
      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 2000);
      Flux.getSocialSharesForPosts();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.loading && nextProps.posts) {
      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 2000);
      Flux.getSocialSharesForPosts();
    }
  }
  render() {
    return (
      <article className="page-search-results">
        <div className="search-results-header">
          <h1>{this.props.searchQuery}</h1>
          <button className='clear-search' onClick={this.onClickClearSearch}>Clear search</button>
        </div>
        <TransitionManager component='div' className='search-transition-manager' duration={500}>
          {this.renderSearchResults()}
        </TransitionManager>
      </article>
    );
  }
  renderSearchResults = () => {
    const state = this.state;
    const props = this.props;
    let output;

    if (state.loading) {
      output = <LoadingIcon key='loading-icon' />;
    } else if (props.posts.length) {
      output = (
        <ul key='search-results' className='search-results'>
          {props.posts.map(post => <SearchResultListItem data={post} />)}
        </ul>
      );
    } else {
      output = <h1 key='no-results' className='no-results'>No results found</h1>;
    }
    return output;
  }
  onClickClearSearch = () => {
    if (history) {
      history.go(-1);
    } else {
      Flux.navigate('/blog');
    }
  }
};
