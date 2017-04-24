import React from 'react';
import WorkCapability from 'app/components/work-capability';
import ContactBlock from 'app/components/contact-block';
import Footer from 'app/components/footer';

function PageWorkDesignBuild({ footer, studios, currentPage }) {
  return (
    <div className="work-design-build">
      <WorkCapability data={workDesignBuildData} />
      <Footer data={footer} studios={studios} currentPage={currentPage}/>
    </div>
  );
}

export default PageWorkDesignBuild;

const workDesignBuildData = {
  name: 'design',
  title: 'Design & Build',
  blocks: [{
    title: 'Working to make new happen',
    text: 'Making something original means pushing boundaries by bringing experts together who can work across disciplines as one team. That takes business, design, development and engineering. All working collectively with you.',
    imageURL: '/images/work/capability-design-01.jpg'
  },{
    title: 'Building a platform for success',
    text: 'The practices we apply in design and build are unique to ustwo. They’re rooted in human-centred thinking and exist to give every team the platform to work fast, respond the right way to insights and turn your shared vision into reality.',
    imageURL: '/images/work/capability-design-02.jpg'
  }]
}
