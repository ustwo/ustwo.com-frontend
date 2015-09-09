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
      this.setState({
        loading: false
      });
      Flux.getSocialSharesForPosts();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.loading && nextProps.posts) {
      this.setState({
        loading: false
      });
      Flux.getSocialSharesForPosts();
    }
  }
  render() {
    return (
      <article className="page-search-results">
        <div className="search-results-header">
          <div className="h1 searched-term">{this.props.searchQuery}</div>
          <div className="clear-search"><button onClick={this.onClickClearSearch}>Clear search</button></div>
        </div>
        <TransitionManager component='div' className='search-transition-manager' duration={700}>
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
      output = <h2 key='no-results' className='no-results'>No results found</h2>;
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
