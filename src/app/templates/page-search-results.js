'use strict';

import React from 'react';
import map from 'lodash/collection/map';

import Flux from '../flux';

import SearchResultListItem from '../components/search-result-list-item';

export default class PageSearchResults extends React.Component {
  render() {
    const clearSearchURL = '/blog/search';
    return (
      <article className="page-search-results">
        <h1>{this.props.searchQuery}</h1>
        <a href={clearSearchURL} onClick={Flux.override(clearSearchURL)}>Clear search</a>
        <ul>{this.renderSearchResults(this.props.page)}</ul>
      </article>
    );
  }
  renderSearchResults(posts) {
    return map(posts, (post, index) => {
      return <SearchResultListItem data={post} />;
    });
  }
};
