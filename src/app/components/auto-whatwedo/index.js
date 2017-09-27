import React from 'react';
import classnames from 'classnames';
import WorkProcess from 'app/components/work-process';

export default ({ intro, introFurther, isMobile, scrollProgress, workProcess }) => {
  const progress = Math.round(((scrollProgress - 0.5) * 2) * 100) / 100;
  const classes = classnames('auto-whatwedo', 'work-whatwedo-wrapper');

  return (
    <div className={classes}>
      {workProcess ? <WorkProcess data={workProcess} isMobile={isMobile}  /> : null}
      <div className="work-whatwedo">
        <div className="work-intro">
          {intro ? (
            <p className="work-intro-statement">
              {intro}
            </p>
          ) : null}
          {introFurther ? (
            <p className="work-intro-further">
              {introFurther}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
