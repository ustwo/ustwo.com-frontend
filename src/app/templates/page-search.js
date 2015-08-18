'use strict';

import React from 'react';

import Flux from '../flux';

export default class PageSearch extends React.Component {
  componentDidMount() {
    const input = React.findDOMNode(this.refs.input);
    input.addEventListener('keyup', this.onKeyup);
  }
  render() {
    const searchIcon = '<use xlink:href="/images/spritemap.svg#search" />';
    return (
      <article className="page-search">
        <form method='POST' action='/blog/search' className='search' onSubmit={this.onSubmit}>
          <input name='q' type='text' className='input' value={this.props.searchQuery} />
          <div ref='input' contentEditable="true" className='editable-div'></div>
          <div className="placeholder">Search</div>
          <button className="submit">
            <svg role="img" dangerouslySetInnerHTML={{__html: searchIcon }} />
          </button>
        </form>
      </article>
    );
  }
  onKeyup = (event) => {
    event.persist();
    Flux.setSearchQueryTo(event.target.innerText);
  }
  onSubmit = (event) => {
    event.preventDefault();
    Flux.navigate(`/blog/search?q=${this.props.searchQuery}`);
  }
};
