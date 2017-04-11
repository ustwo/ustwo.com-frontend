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
    title: 'Innovation is problem-solving',
    text: 'And to solve problems, you need to understand what they are. We apply systems thinking and service design to discover what will delight your users and get to the heart of your business goals.',
    imageURL: '/images/work/capability-01.jpg'
  },{
    title: 'Innovation is customer led',
    text: 'Our process is human-centred. We help you discover what will deliver the greatest value to your customers through user testing and research. To help you meet the challenges of innovating in the digital world.',
    imageURL: '/images/work/capability-02.jpg'
  }]
}
