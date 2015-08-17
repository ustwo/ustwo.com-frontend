'use strict';

import React from 'react';

import Flux from '../flux';

export default class PageSearch extends React.Component {
  render() {
    return (
      <article className="page-search">
        <form onSubmit={this.onSubmit}>
          <input type='text' placeholder='Search' onChange={this.onChange} />
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
