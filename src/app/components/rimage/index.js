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
  wrapImageInElement(img, wrapper) {
    const url = this.getImageUrl(this.state.size);
    const { children } = this.props;
    return React.createElement(
      wrapper,
      { style: { backgroundImage: url && `url('${url}')` } },
      [React.cloneElement(img, { className: 'img' })].concat(children)
    );
  }
  wrapElementInAnchorTag(element, href) {
    return <a href={href} onClick={Flux.override(href)}>{element}</a>;
  }
  render() {
    const url = this.getImageUrl(this.state.size);
    const { className, wrap, href } = this.props;
    const img = <img src={url} alt="" />;
    let output = img;

    if (wrap) {
      output = this.wrapImageInElement(img, wrap);
    }

    if (href) {
      output = this.wrapElementInAnchorTag(output, href);
    }

    return React.cloneElement(output, { className: className });
  }
};

export default Rimage;
