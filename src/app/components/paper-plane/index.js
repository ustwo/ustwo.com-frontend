import React from 'react';
import env from 'app/adaptors/server/env';
import classnames from 'classnames';
import SVG from 'app/components/svg';
import window from 'app/adaptors/server/window';

function PaperPlane({ screenPosition, contactUsPlane }) {
  let scaleModifier;
  if (contactUsPlane) {
    if (window.innerWidth <= 600) {
      scaleModifier = 1;
    } else if (window.innerWidth > 600 && window.innerWidth < 1200) {
      scaleModifier = 2;
    } else {
      scaleModifier = 3;
    }
  } else {
    scaleModifier = 1;
  }

  const fuselageLength = 108 * scaleModifier;
  const fuselageHeight = 35 * scaleModifier;

  const planeShape = (
    <svg viewBox={`0 0 ${fuselageLength} ${fuselageHeight}`}>
      <g>
        <polygon points={`0 0 ${fuselageLength} 0 0 ${fuselageHeight} 0 0`} />
      </g>
    </svg>
  );

  const fuselageDimensions = {
    width: `${fuselageLength}px`,
    height: `${fuselageHeight}px`
  }

  const trailClasses = classnames('trail', { trailContact: contactUsPlane })

  const plane = (
    <div className="paper-plane-body">
      <div className="right-wing" style={fuselageDimensions}>
        {contactUsPlane ? <SVG title="ustwo" spritemapID="ustwologo" /> : null}
        {planeShape}
      </div>
      <div className="left-wing" style={fuselageDimensions}>
        {planeShape}
      </div>
      <div className="right-fuselage" style={fuselageDimensions}>
        {planeShape}
      </div>
      <div className="left-fuselage" style={fuselageDimensions}>
        {planeShape}
      </div>
      {contactUsPlane ? <SVG spritemapID="wave" className="trail-wave" /> : <div className={trailClasses} />}
    </div>
  );

  let interactiveStyles;
  if (screenPosition) {
    if (env.Modernizr.touchevents) {
      interactiveStyles = {
        transform: `rotateY(${Math.round((screenPosition.coordinateX * -20) * 5) - 10}deg) rotateX(${Math.round((screenPosition.coordinateY * -20) * 5) + 30}deg)`
      }
    } else {
      if (contactUsPlane) {
        interactiveStyles = {
          transform: `rotateY(${Math.round(screenPosition.coordinateX * -50)}deg) rotateX(${Math.round(screenPosition.coordinateY * -50)}deg)`
        }
      } else {
        interactiveStyles = {
          transform: `rotateY(${Math.round(screenPosition.coordinateX * -35)}deg) rotateX(${Math.round(screenPosition.coordinateY * -25)}deg)`
        }
      }
    }
  }

  return (
    <div className="paper-plane">
      <div className="paper-plane-interactive-layer" style={interactiveStyles}>
        {plane}
      </div>
    </div>
  );
}

export default PaperPlane;
