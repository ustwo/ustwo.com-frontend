import React from 'react';
import { kebabCase } from 'lodash';
import Flux from 'app/flux';

export default ({ data, isMobile }) => {
  const workProcess = data.map(item => {
    let link, title;
    if (item.name) {
      if (item.url) {
        title = (<h2 onClick={() => Flux.navigate(item.url)} className="sub-content-sections-link">{item.title}</h2>);
      } else {
        title = (<h2>{item.title}</h2>);
      }
    }
    if (item.url) {
      link = (<button onClick={() => Flux.navigate(item.url)} className="sub-content-sections-item-button">Read More</button>);
    }

    return (
      <div className={`sub-content-sections-item ${kebabCase(item.title)}`} key={`key-${item.name}`}>
        <div className="sub-content-sections-item-image">
          <img src={item.image} alt={`${item.title} icon`} />
        </div>
        {title}
        <p>{item.text}</p>
        {link}
      </div>
    );
  });

  return (
    <div className="sub-content-sections">
      <div className="sub-content-sections-wrapper">
        {workProcess}
      </div>
    </div>
  );
}
