import React from 'react';
import classnames from 'classnames';
import kebabCase from 'lodash/string/kebabCase';
import { get } from 'lodash';
import QS from 'app/lib/query-string';

import GridCell from 'app/components/grid-cell';

const Grid = React.createClass({
  render() {
    const { className, images, cells } = this.props;
    return <section className={classnames('grid', className)}>
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
