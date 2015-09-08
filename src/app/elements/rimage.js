'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import findIndex from 'lodash/array/findIndex';
import map from 'lodash/collection/map';
import sortBy from 'lodash/collection/sortBy';
import omit from 'lodash/object/omit';

function getSizesArray(sizesObject) {
  return sortBy(map(omit(sizesObject, 'thumbnail'), (size, name) => {
    size.name = name;
    return size;
  }), 'width');
}

class Rimage extends React.Component {
  constructor(props) {
    const sizes = getSizesArray(props.sizes);
    super(props);
    this.state = {
      sizes: sizes,
      size: sizes[0]
    };
  }
  render() {
    const url = this.getImageUrl();
    let img;
    if(!this.props.href && !this.props.wrap) {
      img = <img className={this.props.className} src={url} />;
    } else {
      img = <img className="image" src={url} />;
    }
    if(this.props.href) {
      img = <a className="link" href={this.props.href} onClick={Flux.override(this.props.href)}>{img}</a>;
    }
    if(this.props.wrap) {
      img = React.createElement(
        this.props.wrap,
        Object.assign({ style: {backgroundImage: `url('${url}')`} }, omit(this.props, ['wrap', 'sizes', 'href'])),
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
    let newSize = find(sizes, size => size.width > constrainSize);
    return newSize || sizes[0];
  }
  componentDidMount() {
    const sizes = this.state.sizes;
    const newSize = this.getNewSize();
    if(findIndex(sizes, newSize) > findIndex(this.state.size)) {
      const img = new Image();
      img.onload = () => this.setState({
        size: newSize
      });
      img.src = newSize.url || newSize.source_url;
    }
  }
};

export default Rimage;
