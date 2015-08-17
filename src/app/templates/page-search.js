'use strict';

import React from 'react';

import Flux from '../flux';

export default class PageSearch extends React.Component {
  render() {
    return (
      <article className="page-search">
        <form method='POST' action='/blog/search' onSubmit={this.onSubmit}>
          <input name='q' type='text' placeholder='Search' onChange={this.onChange} />
        </form>
      </article>
    );
  }
  onChange(event) {
    Flux.setSearchQueryTo(event.target.value);
  }
  onSubmit = (event) => {
    event.preventDefault();
    Flux.navigate(`/blog/search?q=${this.props.searchQuery}`);
  }
};
