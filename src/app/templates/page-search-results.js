'use strict';

import React from 'react';

import Flux from '../flux';

import SearchResultListItem from '../components/search-result-list-item';

export default class PageSearchResults extends React.Component {
  render() {
    const props = this.props;
    let outcomeText;

    if (props.posts && !props.posts.length) {
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
        <ul>{this.renderSearchResults()}</ul>
      </article>
    );
  }
  renderSearchResults = () => {
    return this.props.posts && this.props.posts.map(post => {
      return <SearchResultListItem data={post} />;
    });
  }
  onClickClearSearch = () => {
    if (history) {
      history.go(-1);
    } else {
      Flux.navigate('/blog');
    }
  }
};
