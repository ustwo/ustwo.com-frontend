import React from 'react';
import env from 'app/adaptors/server/env';
import classnames from 'classnames';
import SVG from 'app/components/svg';
import window from 'app/adaptors/server/window';

function PaperPlane({ screenPosition, contactUsPlane }) {
  let scaleModifier;
  if (contactUsPlane) {
    if (window.innerWidth <= 480) {
      scaleModifier = 1;
    } else if (window.innerWidth > 480 && window.innerWidth < 1200) {
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
      <div className={trailClasses} />
      <div className={trailClasses} />
    </div>
  );

  const modifier = env.Modernizr.touchevents ? 5 : 1;

  let interactiveStyles;
  if (screenPosition) {
    if (contactUsPlane) {
      interactiveStyles = {
        transform: `rotateY(${Math.round((screenPosition.coordinateX * -34) * modifier)}deg) rotateX(${Math.round((screenPosition.coordinateY * -14) * modifier)}deg)`
      }
    } else {
      interactiveStyles = {
        transform: `rotateY(${Math.round((screenPosition.coordinateX * -28) * modifier)}deg) rotateX(${Math.round(((screenPosition.coordinateY * -12) + 15) * modifier)}deg)`
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
