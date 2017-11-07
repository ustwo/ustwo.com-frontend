import React from 'react';
import classnames from 'classnames';
import SubContentSections from 'app/components/sub-content-sections';

export default ({ intro, introFurther, isMobile, scrollProgress, workProcess }) => {
  const progress = Math.round(((scrollProgress - 0.5) * 2) * 100) / 100;
  const classes = classnames('auto-whatwedo', 'work-whatwedo-wrapper');

  return (
    <div className="auto-whatwedo work-whatwedo-wrapper">
      {workProcess ? <SubContentSections data={workProcess} isMobile={isMobile}  /> : null}
      <div className="work-whatwedo">
        <div className="work-intro">
          {intro ? (
            <p className="work-intro-statement">
              {intro}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
