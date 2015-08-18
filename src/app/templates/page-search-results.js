'use strict';

import React from 'react';
import map from 'lodash/collection/map';

import Flux from '../flux';

import SearchResultListItem from '../components/search-result-list-item';

export default class PageSearchResults extends React.Component {
  render() {
    const props = this.props;
    const searchURL = '/blog/search';
    let outcomeText;
    let searchText;

    if (props.page) {
      if (Object.keys(props.page).length) {
        outcomeText = props.searchQuery;
        searchText = 'Clear search';
      } else {
        outcomeText = `No results found for ${props.searchQuery}`;
        searchText = 'Search again';
      }
    } else {
      outcomeText = 'Searching...';
    }

    return (
      <article className="page-search-results">
        <h1>{outcomeText}</h1>
        <div className="clear-search">
          <a href={searchURL} onClick={Flux.override(searchURL)}>{searchText}</a>
        </div>
        <ul>{this.renderSearchResults(props.page)}</ul>
      </article>
    );
  }
  renderSearchResults(posts) {
    return map(posts, (post, index) => {
      return <SearchResultListItem data={post} />;
    });
  }
};
