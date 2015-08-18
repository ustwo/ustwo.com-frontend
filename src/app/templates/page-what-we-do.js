'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';

import WorkItem from '../components/work-item';
import Hero from '../components/hero';

export default class PageWork extends React.Component {
  render() {
    const pageData = this.props.page;
    const headerText = 'Building and Launching'; // get(pageData, 'page_builder.0.attr.heading.value')
    return (
      <article className="page-work">
        <Hero title={headerText} imageURL='/images/whatwedo/header/image_1.jpg' eventLabel='what-we-do' />
        <section className="intro">
          <h2 className="intro__title">{get(pageData, 'page_builder.1.attr.heading.value')}</h2>
          <hr className="intro__rule" />
          <div className="intro__para" dangerouslySetInnerHTML={{__html: get(pageData, 'page_builder.1.attr.body.value')}} />
        </section>
        <ul className="page-work__list">
          {get(pageData, 'page_builder.2.attr.case_studies.value', '').split(',').map(caseStudyName => {
            const caseStudyData = find(get(pageData, '_embedded.ustwo:case_studies', []), 'slug', caseStudyName);
            const attachments = (pageData && pageData._embedded && pageData._embedded['http://v2.wp-api.org/attachment']) || [];
            return <WorkItem key={caseStudyName} className="page-work__list__item" data={caseStudyData} attachments={attachments} />;
          })}
        </ul>
      </article>
    );
  }
}
