'use strict';

import React from 'react';

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
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.loading && nextProps.posts) {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    return (
      <article className="page-search-results">
        <div className="search-results-header">
          <h1>{this.props.searchQuery}</h1>
          <button className='clear-search' onClick={this.onClickClearSearch}>Clear search</button>
        </div>
        {this.renderSearchResults()}
      </article>
    );
  }
  renderSearchResults = () => {
    const state = this.state;
    const props = this.props;
    let output;

    if (state.loading) {
      output = <LoadingIcon />;
    } else if (props.posts.length) {
      output = (
        <ul>
          {props.posts.map(post => <SearchResultListItem data={post} />)}
        </ul>
      );
    } else {
      output = <h1>No results found</h1>;
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
