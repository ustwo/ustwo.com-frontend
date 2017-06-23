import React from 'react';
import kebabCase from 'lodash/string/kebabCase';

function WorkClientsBoard({ logos, title }) {
  const items = logos.map(item => {
    const type = item === 'Qantas' ? 'jpg' : 'svg';

    return (
      <li><img src={`/images/work/logo-${kebabCase(item)}.${type}`} alt={`Logo of ${item}`} /></li>
    );
  });

  return (
    <div className="work-clients-board">
      <div className="work-clients-board-inner">
        <h5 className="title">{title}</h5>
        <ul>
          {items}
        </ul>
      </div>
    </div>
  )
}

export default WorkClientsBoard;
