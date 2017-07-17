import React from 'react';
import WorkItem from 'app/components/work-item';
import LoadMoreButton from 'app/components/load-more-button';
import kebabCase from 'lodash/string/kebabCase';

function WorkCaseStudies({ page, caseStudies, caseStudyFilter, numberOfCaseStudiesShowing, addMoreCaseStudies }) {

  let filteredCaseStudies;
  if (caseStudyFilter === 'all') {
    filteredCaseStudies = caseStudies;
  } else {
    filteredCaseStudies = caseStudies.filter(caseStudy => {
      return caseStudy.categories[0].name === caseStudyFilter
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

  return (
    <div className="card-list work-items-list work-case-studies">
      <div className="card-list-inner">
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
