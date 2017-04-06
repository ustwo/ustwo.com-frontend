import React from 'react';
import SVG from 'app/components/svg';

function WorkVerticals({ data }) {
  return (
    <div className="work-verticals">
      <div className="work-verticals-item work-vertical-intro">
        <div className="work-verticals-item-inner">
          <h2>{data.title}</h2>
          <ul className="work-verticals-icons">
            <li><SVG spritemapID="iconExpertiseTransport" /></li>
            <li><SVG spritemapID="iconExpertiseRetail" /></li>
            <li><SVG spritemapID="iconExpertiseEducation" /></li>
            <li><SVG spritemapID="iconExpertiseEntertainment" /></li>
            <li><SVG spritemapID="iconExpertiseHealth" /></li>
            <li><SVG spritemapID="iconExpertiseVr" /></li>
          </ul>
          <p>{data.introText}</p>
        </div>
      </div>
      <div className="work-verticals-item work-vertical-auto">
        <div className="work-verticals-item-inner">
          <div className="work-verticals-content">
            <div className="section-title">Expertise</div>
            <h3>{data.auto.title}</h3>
            <p>{data.auto.text}</p>
            <button className="work-verticals-button">
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
            <button className="work-verticals-button">
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
