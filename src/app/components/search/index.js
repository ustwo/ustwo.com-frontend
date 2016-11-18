'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import Flux from 'app/flux';

import SVG from 'app/components/svg';

const Search = React.createClass({
  componentDidMount() {
    const input = ReactDOM.findDOMNode(this.refs.input);
    input.focus();
    input.addEventListener('keyup', this.onKeyup);
    input.addEventListener('keydown', this.onKeydown);
  },
  componentWillUnmount() {
    const input = ReactDOM.findDOMNode(this.refs.input);
    input.removeEventListener('keyup', this.onKeyup);
    input.removeEventListener('keydown', this.onKeydown);
  },
  onClickCancel() {
    Flux.hideSearch();
  },
  onKeydown(event) {
    switch(event.keyCode) {
      case 13: // enter
        this.onSubmit(event);
        break;
      case 27: // esc
        Flux.hideSearch();
        break;
    }
  },
  onKeyup(event) {
    const value = event.target.innerHTML;
    if (value || event.keyCode === 8) { // backspace
      Flux.setSearchQueryTo(value);
    }
  },
  onSubmit(event) {
    const { searchQuery } = this.props;
    event.preventDefault();
    if (searchQuery) {
      Flux.hideSearch();
      Flux.navigate(`/blog/search?q=${searchQuery}`);
    }
  },
  render() {
    const { className, searchQuery } = this.props;
    return <div className={classnames('search', className)}>
      <form
        method="POST"
        action="/blog/search"
        className="search-form"
        onSubmit={this.onSubmit}
      >
        <input name="q" type="text" className="input" value={searchQuery} />
        <div ref="input" contentEditable="true" className="h1 editable-div" />
        <button className="submit-search" type="submit" onClick={this.onSubmit}>
          <SVG spritemapID="search" />
        </button>
      </form>
      <div className="cancel-search">
        <button type="button" onClick={this.onClickCancel}>Cancel</button>
      </div>
    </div>;
  }
});

export default Search;
