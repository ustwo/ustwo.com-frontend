import React from 'react';
import classnames from 'classnames';
import kebabCase from 'lodash/string/kebabCase';
import get from 'lodash/object/get';
import QS from '../../lib/query-string';

import Rimage from '../rimage';
import GridCell from '../grid-cell';

const Grid = React.createClass({
  renderVideo() {
    const { video } = this.props;
    let output;
    if (video && video.length) {
      const baseURL = 'https://player.vimeo.com/video';
      const options = {
        title: 0,
        byline: 0,
        portrait: 0
      }
      output = <iframe
        src={`${baseURL}/${video}${QS.stringify(options)}`}
        frameBorder="0"
        webkitallowfullscreen
        mozallowfullscreen
        allowFullScreen
      />;
    }
    return output;
  },
  render() {
    const { className, images, cells } = this.props;
    return <section className={classnames('grid', className)}>
      <Rimage className="video" wrap="div" sizes={images}>
        {this.renderVideo()}
      </Rimage>
      <ul className="grid-list">
        {cells.map(cell => {
          return <GridCell
            key={`cell-${kebabCase(get(cell, 'attr.heading.value'))}`}
            cell={cell}
          />;
        })}
      </ul>
    </section>;
  }
});

export default Grid;
