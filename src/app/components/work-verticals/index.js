import React from 'react';
import SVG from 'app/components/svg';
import Flux from 'app/flux';
import kebabCase from 'lodash/string/kebabCase';

function WorkVerticals({ data }) {
  const content = data.map(item => {

    const size = item.small ? 'work-verticals-item-small' : null;

    return (
      <div
        className={`work-verticals-item work-vertical-${kebabCase(item.shortTitle)} ${size}`}
        key={item.shortTitle}
      >
        <div className="work-verticals-item-inner">
          <div className="work-verticals-content">
            <div className="section-title">Research Project</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <button className="work-verticals-button" onClick={Flux.override(item.slug)}>
              <div className="work-verticals-button-inner">
                Read More
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="work-verticals">
      {content}
    </div>
  );
}

export default WorkVerticals;
