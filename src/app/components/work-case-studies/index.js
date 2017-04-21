import React from 'react';
import { get } from 'lodash';
import getFeaturedImage from 'app/lib/get-featured-image';
import WorkItem from 'app/components/work-item';
import LoadMoreButton from 'app/components/load-more-button';

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
      const attachments = get(page, '_embedded.wp:attachment');
      const image = getFeaturedImage(caseStudy, attachments);
      // const featured = caseStudies.indexOf(caseStudy) === 0;
      let featured;

      return (
        <WorkItem
          key={caseStudy.slug}
          data={caseStudy}
          image={image}
          featured={featured}
        />
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
