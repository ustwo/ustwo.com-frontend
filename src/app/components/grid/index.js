import React from 'react';
import kebabCase from 'lodash/string/kebabCase';
import get from 'lodash/object/get';
import classnames from 'classnames';

import Rimage from '../rimage';
import GridCell from '../grid-cell';

export default class Grid extends React.Component {
  render() {
    return (
      <section className={classnames('grid', this.props.className)}>
        <Rimage className="video" wrap="div" sizes={this.props.images}>
          {this.renderVideo()}
        </Rimage>
        <ul className="grid-list">
          {this.props.cells.map(cell => <GridCell key={`cell-${kebabCase(get(cell, 'attr.heading.value'))}`} cell={cell} />)}
        </ul>
      </section>
    );
  }
  renderVideo = () => {
    let video;
    if(this.props.video && this.props.video.length) {
      video = <iframe src={`https://player.vimeo.com/video/${this.props.video}?title=0&byline=0&portrait=0`} frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>;
    }
    return video;
  }
}
