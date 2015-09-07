'use strict';

import React from 'react';

import Flux from '../flux';

import SVG from '../elements/svg';

export default class Search extends React.Component {
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
    return (
      <div className='search'>
        <form method='POST' action='/blog/search' className='search-form' onSubmit={this.onSubmit}>
          <input name='q' type='text' className='input' value={this.props.searchQuery} />
          <div ref='input' contentEditable='true' className='editable-div'></div>
          <button className='submit' type='submit' onClick={this.onSubmit}>
            <SVG spritemapID='search' />
          </button>
        </form>
        <div className='cancel'><button type='button' onClick={this.onClickCancel}>Cancel</button></div>
      </div>
    );
  }
  onClickCancel = () => {
    Flux.hideSearch();
  }
  onKeydown = (event) => {
    switch(event.keyCode) {
      case 13: // enter
        this.onSubmit(event);
        break;
      case 27: // esc
        Flux.hideSearch();
        break;
    }
  }
  onKeyup = (event) => {
    const value = event.target.innerHTML;
    if (value || event.keyCode === 8) { // backspace
      Flux.setSearchQueryTo(value);
    }
  }
  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.searchQuery) {
      Flux.hideSearch();
      Flux.navigate(`/blog/search?q=${this.props.searchQuery}`);
    }
  }
}
