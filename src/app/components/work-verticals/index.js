import React from 'react';
import SVG from 'app/components/svg';
import Flux from 'app/flux';

function WorkVerticals({ data }) {
  return (
    <div className="work-verticals">
      <div className="work-verticals-item work-vertical-auto">
        <div className="work-verticals-item-inner">
          <div className="work-verticals-content">
            <div className="section-title">Expertise</div>
            <h3>{data.auto.title}</h3>
            <p>{data.auto.text}</p>
            <button className="work-verticals-button" onClick={Flux.override(data.auto.linkURI)}>
              <div className="work-verticals-button-inner">
                Read More
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="work-verticals-item work-vertical-health">
        <div className="work-verticals-item-inner">
          <div className="work-verticals-content">
            <div className="section-title">Expertise</div>
            <h3>{data.health.title}</h3>
            <p>{data.health.text}</p>
            <button className="work-verticals-button" onClick={Flux.override(data.health.linkURI)}>
              <div className="work-verticals-button-inner">
                Read More
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkVerticals;
