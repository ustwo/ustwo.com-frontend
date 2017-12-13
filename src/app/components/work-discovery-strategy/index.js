import React from 'react';
import WorkCapability from 'app/components/work-capability';
import Footer from 'app/components/footer';
import ContactFloating from 'app/components/contact-floating';

function PageWorkDiscoveryStrategy({ footer, studios, currentPage }) {
  return (
    <div className="work-discovery-strategy">
      <WorkCapability data={workDiscoverStrategyData} />
      <ContactFloating buttonFlavour="work" darkStyle />
      <Footer data={footer} studios={studios} currentPage={currentPage}/>
    </div>
  );
}

export default PageWorkDiscoveryStrategy;

const workDiscoverStrategyData = {
  name: 'discovery',
  title: 'Discovery & Strategy',
  blocks: [{
    title: 'Innovation begins with customers',
    text: 'Your customers are full of answers to your company’s toughest questions - if you listen to them in the right ways. That’s why we take a human-centred approach to discovering what creates the greatest value for you.',
    imageURL: '/images/work/capability-discovery-01.jpg'
  },{
    title: 'Solving problems means truly understanding them',
    text: 'Finding the right insights to guide rapid design iteration is a vital step towards delivering exceptional value. We apply systems thinking and service design to make sure your product will both beat your business goals and delight users.',
    imageURL: '/images/work/capability-discovery-02.jpg'
  }]
}
