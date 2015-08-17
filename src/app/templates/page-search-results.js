'use strict';

import React from 'react';
import map from 'lodash/collection/map';

export default class PageSearchResults extends React.Component {
  render() {
    const searchResults = map(this.props.page, (result, index) => {
      return <li key={result.slug}>{result.title.rendered}</li>;
    });
    return (
      <article className="page-search-results">
        <h1>Search</h1>
        <ul>{searchResults}</ul>
      </article>
    );
  }
};
