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
import Image from '../../adaptors/server/image';

class Rimage extends React.Component {
  constructor(props) {
    super(props);
    const sizes = this.getSizesArray(props.sizes);
    this.state = {
      sizes: sizes,
      size: sizes[0] || {}
    };
  }
  componentWillReceiveProps(props) {
    const sizes = this.getSizesArray(props.sizes);
    const el = React.findDOMNode(this);
    this.setState({
      sizes: sizes,
      size: this.getNewSize(sizes, el.clientWidth)
    });
  }
  componentDidMount() {
    const { sizes, size: currentSize } = this.state;
    const el = React.findDOMNode(this);
    const newSize = this.getNewSize(sizes, el.clientWidth);
    const newSizeUrl = this.getImageUrl(newSize);
    const newSizeIsBigger = findIndex(sizes, newSize) > findIndex(currentSize);

    if (newSizeUrl && newSizeIsBigger) {
      const img = new Image();
      img.src = newSizeUrl;
      img.onload = () => this.setState({
        size: newSize
      });
    }
  }
  getSizesArray(sizesObject) {
    return sortBy(map(omit(sizesObject, (size, name) => {
      return name === 'thumbnail' || endsWith(name, '_crop');
    }), (size, name) => {
      size.name = name;
      return size;
    }), 'width');
  }
  getImageUrl(size) {
    return size.url || size.source_url;
  }
  getNewSize(sizes, containerSize) {
    const isSmallerThanContainer = size => size.width < containerSize;
    const newSize = first(dropWhile(sizes, isSmallerThanContainer));
    return newSize || last(sizes) || {};
  }
  render() {
    const url = this.getImageUrl(this.state.size);
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
};

export default Rimage;
