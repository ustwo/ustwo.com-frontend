import React from 'react';
import WorkCapability from 'app/components/work-capability';
import Footer from 'app/components/footer';
import ContactFloating from 'app/components/contact-floating';

function PageWorkLaunchScale({ footer, studios, currentPage }) {
  return (
    <div className="work-launch-scale">
      <WorkCapability data={workLaunchScaleData} />
      <ContactFloating buttonFlavour="work" darkStyle />
      <Footer data={footer} studios={studios} currentPage={currentPage}/>
    </div>
  );
}

export default PageWorkLaunchScale;

const workLaunchScaleData = {
  name: 'launch',
  title: 'Launch & Scale',
  blocks: [{
    title: 'Taking measurement deeper',
    text: 'No matter what you make with us, the objective is always two-fold: tangible business value and meaningful impact. We’ll establish the right metrics for you to demonstrate both ROI and the difference you’re making to people’s lives.',
    imageURL: '/images/work/capability-launch-01.jpg'
  },{
    title: 'Progress is always improving',
    text: 'Tracking performance. Evaluating data to evolve products. Learning fast from the growth of ventures. We’re in the business of constant improvement and love using what we know to help build out your product and internal team.',
    imageURL: '/images/work/capability-launch-02.jpg'
  }]
}
