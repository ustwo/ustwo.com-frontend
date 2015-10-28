'use strict';

import React from 'react';
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
    const { className, altText, children: originalChildren, wrap } = this.props;
    const classes = classnames('rimage', className, { 'background-image': wrap });
    const url = this.getImageUrl(this.state.size);
    const img = <img className='img' src={url} alt={altText} />;
    let wrapElement;
    let props;
    let children;

    if (wrap) {
      wrapElement = wrap;
      props = { style: { backgroundImage: url && `url('${url}')` }};
      children = createFragment({
        img: img,
        originalChildren: originalChildren
      });
    } else {
      wrapElement = 'div';
      props = {};
      children = img;
    }

    return React.createElement(
      wrapElement,
      Object.assign(props, { className: classes }),
      children
    );
  }
};

export default Rimage;
