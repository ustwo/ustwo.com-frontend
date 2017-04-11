import React from 'react';
import WorkCapability from 'app/components/work-capability';

function PageWorkDiscoveryStrategy() {
  return (
    <div className="work-discovery-strategy">
      <WorkCapability data={workDiscoverStrategyData} />
    </div>
  );
}

export default PageWorkDiscoveryStrategy;

const workDiscoverStrategyData = {
  name: 'discovery',
  title: 'Discovery & Strategy',
  blocks: [{
    title: 'Innovation is problem-solving',
    text: 'And to solve problems, you need to understand what they are. We apply systems thinking and service design to discover what will delight your users and get to the heart of your business goals.',
    imageURL: ''
  },{
    title: 'Innovation is customer led',
    text: 'Our process is human-centred. We help you discover what will deliver the greatest value to your customers through user testing and research. To help you meet the challenges of innovating in the digital world.',
    imageURL: ''
  }]
}
