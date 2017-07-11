import React from 'react';
import { kebabCase } from 'lodash';
import goToCapability from 'app/lib/go-to-capability';

export default ({ data, isMobile }) => {
  const workProcess = data.map(item => {
    let link, title;
    if (item.name) {
      title = (<h2 onClick={() => goToCapability(item.name)} className="work-process-link">{item.title}</h2>);
      link = (<button onClick={() => goToCapability(item.name)} className="work-process-item-button">Read More</button>);
    } else {
      title = (<h2>{item.title}</h2>);
    }

    return (
      <div className={`work-process-item ${kebabCase(item.title)}`} key={`key-${item.name}`}>
        <img src={item.image} alt={`${item.title} icon`} />
        {title}
        <p>{item.text}</p>
        {link}
      </div>
    );
  });

  return (
    <div className="work-process">
      <div className="work-process-wrapper">
        {workProcess}
      </div>
    </div>
  );
}
