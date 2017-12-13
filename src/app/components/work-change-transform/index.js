import React from 'react';
import WorkCapability from 'app/components/work-capability';
import ContactBlock from 'app/components/contact-block';
import Footer from 'app/components/footer';
import ContactFloating from 'app/components/contact-floating';

function PageChangeTransform({ footer, studios, currentPage }) {
  return (
    <div className="work-change-transform">
      <WorkCapability data={workChangeTransform} />
      <ContactFloating buttonFlavour="work" darkStyle />
      <Footer data={footer} studios={studios} currentPage={currentPage}/>
    </div>
  );
}

export default PageChangeTransform;

const workChangeTransform = {
  name: 'working',
  title: 'Change & Transform',
  blocks: [{
    title: 'From discovery to transformation',
    text: 'We build teams with the perfect mix of business-value and empathic-design expertise. Our approach creates a great culture, upgrades the ways your business does digital and unites everyone to achieve lasting change.',
    imageURL: '/images/work/capability-working-01.jpg'
  },{
    title: 'Tools for rewriting your future',
    text: 'We put you in great shape to transform how your business works, long after ustwo leave. We refocus everyone around values and outcomes; and know how to change behaviours and mindsets. So you can evolve with confidence.',
    imageURL: '/images/work/capability-working-02.jpg'
  }]
}
