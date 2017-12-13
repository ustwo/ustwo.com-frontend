import React from 'react';
import kebabCase from 'lodash/string/kebabCase';

function WorkClientsBoard({ logos, title }) {
  const items = logos.map(item => {
    const extension = kebabCase(item) === 'barclays' ? 'png' : 'svg';

    return (
      <li key={`client-logo-${kebabCase(item)}`}>
        <img src={`/images/work/logo-${kebabCase(item)}.${extension}`} alt={`Logo of ${item}`} title={item} />
      </li>
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
