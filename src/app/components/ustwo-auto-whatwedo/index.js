import React from 'react';
import classnames from 'classnames';
import WorkProcess from 'app/components/work-process';

export default ({ data, isMobile, scrollProgress }) => {
  const progress = Math.round(((scrollProgress - 0.5) * 2) * 100) / 100;
  const classes = classnames('ustwo-auto-whatwedo', 'work-whatwedo-wrapper', {
    showQuarter: progress > 0.33,
    showHalf: progress > 0.66
  });

  return (
    <div className={classes}>
      <div className="work-whatwedo">
        <div className="work-intro">
          <p className="work-intro-statement">
            {data.intro}
          </p>
          <p className="work-intro-further">
            {data.introFurther}
          </p>
        </div>
      </div>
      <WorkProcess data={data.items} isMobile={isMobile}  />
    </div>
  );
}
