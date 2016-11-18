'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { create as createFragment } from 'react/lib/ReactFragment';
import classnames from 'classnames';
import first from 'lodash/array/first';
import last from 'lodash/array/last';
import dropWhile from 'lodash/array/dropWhile';
import findIndex from 'lodash/array/findIndex';
import map from 'lodash/collection/map';
import sortBy from 'lodash/collection/sortBy';
import omit from 'lodash/object/omit';
import endsWith from 'lodash/string/endsWith';

import Flux from 'app/flux';
import Image from 'app/adaptors/server/image';

const Rimage = React.createClass({
  getInitialState() {
    const sizes = this.getSizesArray(this.props.sizes);
    return {
      sizes: sizes,
      size: sizes[0] || {}
    }
  },
  componentDidMount() {
    const { sizes, size: currentSize } = this.state;
    const el = ReactDOM.findDOMNode(this);
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
  },
  componentWillReceiveProps(props) {
    const sizes = this.getSizesArray(props.sizes);
    const el = ReactDOM.findDOMNode(this);
    this.setState({
      sizes: sizes,
      size: this.getNewSize(sizes, el.clientWidth)
    });
  },
  getSizesArray(sizesObject) {
    return sortBy(map(omit(sizesObject, (size, name) => {
      return name === 'thumbnail' || endsWith(name, '_crop');
    }), (size, name) => {
      size.name = name;
      return size;
    }), 'width');
  },
  getImageUrl(size) {
    return size.url || size.source_url;
  },
  getNewSize(sizes, containerSize) {
    const isSmallerThanContainer = size => size.width < containerSize;
    const newSize = first(dropWhile(sizes, isSmallerThanContainer));
    return newSize || last(sizes) || {};
  },
  render() {
    const { className, altText, children: originalChildren, wrap } = this.props;
    const classes = classnames('rimage', className, { 'background-image': wrap });
    const url = this.getImageUrl(this.state.size);
    const img = <img src={url} alt={altText} />;
    let rimage;

    if (wrap) {
      const props = { style: { backgroundImage: url && `url('${url}')` }};
      const children = createFragment({
        img: React.cloneElement(img, { className: 'img' }),
        originalChildren: originalChildren
      });
      rimage = React.createElement(wrap, props, children);
    } else {
      rimage = img;
    }

    return React.cloneElement(rimage, { className: classes });
  }
});

export default Rimage;
