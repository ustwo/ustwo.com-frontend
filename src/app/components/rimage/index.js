'use strict';

import React from 'react';
import first from 'lodash/array/first';
import last from 'lodash/array/last';
import dropWhile from 'lodash/array/dropWhile';
import findIndex from 'lodash/array/findIndex';
import map from 'lodash/collection/map';
import sortBy from 'lodash/collection/sortBy';
import omit from 'lodash/object/omit';
import endsWith from 'lodash/string/endsWith';

import Flux from '../../flux';

function getSizesArray(sizesObject) {
  return sortBy(map(omit(sizesObject, (size, name) => {
    return name === 'thumbnail' || endsWith(name, '_crop');
  }), (size, name) => {
    size.name = name;
    return size;
  }), 'width');
}

class Rimage extends React.Component {
  constructor(props) {
    super(props);
    const sizes = getSizesArray(props.sizes);
    this.state = {
      sizes: sizes,
      size: sizes[0] || {}
    };
  }
  componentWillReceiveProps(props) {
    const sizes = getSizesArray(props.sizes);
    this.state = {
      sizes: sizes,
      size: this.getNewSize()
    };
  }
  render() {
    const url = this.getImageUrl();
    let img = <img />;
    if(!this.props.backgroundOnly) {
      if(!this.props.href && !this.props.wrap) {
        img = <img className={this.props.className} src={url} alt="" />;
      } else {
        img = <img className="image" src={url} alt="" />;
      }
      if(this.props.href) {
        img = <a className="link" href={this.props.href} onClick={Flux.override(this.props.href)}>{img}</a>;
      }
    }
    if(this.props.wrap) {
      img = React.createElement(
        this.props.wrap,
        Object.assign({ style: {backgroundImage: url && `url('${url}')`} }, omit(this.props, ['wrap', 'sizes', 'href'])),
        [img].concat(this.props.children)
      );
    }
    return img;
  }
  getImageUrl = () => {
    return this.state.size.url || this.state.size.source_url;
  }
  getNewSize = () => {
    const sizes = this.state.sizes;
    const el = React.findDOMNode(this);
    const constrainSize = el.clientWidth;
    let newSize = first(dropWhile(sizes, size => {
      return size.width < constrainSize;
    }));
    return newSize || last(sizes) || {};
  }
  componentDidMount() {
    const sizes = this.state.sizes;
    const newSize = this.getNewSize();
    if((newSize.url || newSize.source_url) && findIndex(sizes, newSize) > findIndex(this.state.size)) {
      const img = new Image();
      img.onload = () => this.setState({
        size: newSize
      });
      img.src = newSize.url || newSize.source_url;
    }
  }
};

export default Rimage;
