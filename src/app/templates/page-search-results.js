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
    const state = this.state;
    const props = this.props;
    let outcomeText;

    if (!state.loading && !props.posts.length) {
      outcomeText = `No results found for ${props.searchQuery}`;
    } else {
      outcomeText = props.searchQuery;
    }

    return (
      <article className="page-search-results">
        <div className="search-results-header">
          <h1>{outcomeText}</h1>
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
    } else {
      output = (
        <ul>
          {props.posts.map(post => <SearchResultListItem data={post} />)}
        </ul>
      );
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
