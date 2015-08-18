'use strict';

import React from 'react';

import Flux from '../flux';

export default class PageSearch extends React.Component {
  componentDidMount() {
    const input = React.findDOMNode(this.refs.input);
    input.focus();
    input.addEventListener('keyup', this.onKeyup);
    input.addEventListener('keydown', this.onKeydown);
  }
  componentWillUnmount() {
    const input = React.findDOMNode(this.refs.input);
    input.removeEventListener('keyup', this.onKeyup);
    input.removeEventListener('keydown', this.onKeydown);
  }
  render() {
    const searchIcon = '<use xlink:href="/images/spritemap.svg#search" />';
    return (
      <article className="page-search">
        <form method='POST' action='/blog/search' className='search' onSubmit={this.onSubmit}>
          <input name='q' type='text' className='input' value={this.props.searchQuery} />
          <div ref='input' contentEditable="true" className='editable-div'></div>
          <div className="placeholder" onClick={this.onClickPlaceholder}>Search</div>
          <button className="submit">
            <svg role="img" dangerouslySetInnerHTML={{__html: searchIcon }} />
          </button>
        </form>
      </article>
    );
  }
  onClickPlaceholder = () => {
    React.findDOMNode(this.refs.input).focus();
  }
  onKeydown = (event) => {
    if (event.keyCode === 13) {
      this.onSubmit(event);
    }
  }
  onKeyup = (event) => {
    Flux.setSearchQueryTo(event.target.innerHTML);
  }
  onSubmit = (event) => {
    event.preventDefault();
    Flux.navigate(`/blog/search?q=${this.props.searchQuery}`);
  }
};
