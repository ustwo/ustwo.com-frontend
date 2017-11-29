import React from 'react';
import kebabCase from 'lodash/string/kebabCase';

function WorkClientsBoard({ logos, title }) {
  const items = logos.map(item => {
    return (
      <li key={`client-logo-${kebabCase(item)}`}>
        <img src={`/images/work/logo-${kebabCase(item)}.svg`} alt={`Logo of ${item}`} title={item} />
      </li>
    );
  });

  return (
    <div className="work-clients-board">
      <div className="work-clients-board-inner">
        <h2 className="title">{title}</h2>
        <hr className="hr hr-work" />
        <ul>
          {items}
        </ul>
      </div>
    </div>
  )
}

export default WorkClientsBoard;
