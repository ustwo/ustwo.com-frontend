import React from 'react';
import classnames from 'classnames';
import SubContentSections from 'app/components/sub-content-sections';
import ContentWrapper from 'app/components/content-wrapper';

export default ({ intro, introFurther, isMobile, scrollProgress, workProcess }) => {
  const progress = Math.round(((scrollProgress - 0.5) * 2) * 100) / 100;
  const classes = classnames('auto-whatwedo', 'work-whatwedo-wrapper');

  return (
    <ContentWrapper>
      {workProcess ? <SubContentSections data={workProcess} isMobile={isMobile}  /> : null}
      <div className="content-wrapper-statement">
        {intro ? (
          <p>
            {intro}
          </p>
        ) : null}
      </div>
    </ContentWrapper>
  );
}
