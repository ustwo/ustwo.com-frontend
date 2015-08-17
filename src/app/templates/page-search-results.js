'use strict';

import React from 'react';
import map from 'lodash/collection/map';

import SearchResultListItem from '../components/search-result-list-item';

export default class PageSearchResults extends React.Component {
  render() {
    return (
      <article className="page-search-results">
        <h1>Search</h1>
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
