'use strict';

import React from 'react';

import Flux from '../flux';
import CloseButton from '../elements/close-button';
import {onClickContent} from '../modules/modal';

export default class SearchModal extends React.Component {
  componentDidMount() {
    const input = React.findDOMNode(this.refs.input);
    input.focus();
    input.addEventListener('keyup', this.onKeyup);
    input.addEventListener('keydown', this.onKeydown);
    window.addEventListener('keydown', this.onKeydown);
  }
  componentWillUnmount() {
    const input = React.findDOMNode(this.refs.input);
    input.removeEventListener('keyup', this.onKeyup);
    input.removeEventListener('keydown', this.onKeydown);
  }
  render() {
    const ustwoLogo = '<use xlink:href="/images/spritemap.svg#ustwologo" />';
    const searchIcon = '<use xlink:href="/images/spritemap.svg#search" />';
    return (
      <div className="search-modal" onClick={onClickContent}>
        <header className='header'>
          <CloseButton onClose={this.onClickClose} autoAnim={500}>
            <span className="text">Hit esc to close</span>
          </CloseButton>
        </header>
        <form method='POST' action='/blog/search' className='search' onSubmit={this.onSubmit}>
          <input name='q' type='text' className='input' value={this.props.searchQuery} />
          <div ref='input' contentEditable="true" className='editable-div'></div>
          <button className="submit">
            <svg role="img" dangerouslySetInnerHTML={{__html: searchIcon }} />
          </button>
        </form>
      </div>
    );
  }
  onClickLogo = (event) => {
    event.preventDefault();
    Flux.navigate('/');
  }
  onClickClose() {
    Flux.closeModal();
  }
  onKeydown = (event) => {
    switch(event.keyCode) {
      case 13: // enter
        this.onSubmit(event);
        break;
      case 27: // esc
        Flux.closeModal();
        break;
    }
  }
  onKeyup = (event) => {
    const value = event.target.innerHTML;
    if (value) {
      Flux.setSearchQueryTo(value);
    }
  }
  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.searchQuery) {
      Flux.closeModal();
      Flux.navigate(`/blog/search?q=${this.props.searchQuery}`);
    }
  }
}
