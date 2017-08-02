import React from 'react';
import WorkItem from 'app/components/work-item';
import LoadMoreButton from 'app/components/load-more-button';
import kebabCase from 'lodash/string/kebabCase';
import classnames from 'classnames';

function WorkCaseStudies({ page, caseStudies, caseStudyFilter, numberOfCaseStudiesShowing, addMoreCaseStudies }) {

  if (caseStudyFilter === 'venture') {
    caseStudyFilter = 'ustwo-venture';
  }

  let filteredCaseStudies;
  if (caseStudyFilter === 'all') {
    filteredCaseStudies = caseStudies;
  } else {
    filteredCaseStudies = caseStudies.filter(caseStudy => {
      return caseStudy.categories[0].slug === caseStudyFilter
    });
  }

  const caseStudiesTotal = filteredCaseStudies.length;

  const renderCaseStudies = filteredCaseStudies.map((caseStudy, i) => {
    if (i < numberOfCaseStudiesShowing) {
      return (
        <WorkItem data={caseStudy} page={page} key={`case-study-${kebabCase(caseStudy.name)}`} />
      );
    }
  });

  const classes = classnames('card-list-inner', {
    lessThanThree: filteredCaseStudies.length < 3
  });

  return (
    <div className="card-list work-items-list work-case-studies">
      <div className={classes}>
        {renderCaseStudies}
      </div>
      <LoadMoreButton
        onClick={addMoreCaseStudies}
        disabled={numberOfCaseStudiesShowing >= caseStudiesTotal}
      />
    </div>
  );
}

export default WorkCaseStudies;
