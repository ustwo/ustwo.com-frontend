import React from 'react';
import WorkCapabilities from 'app/components/work-capabilities';
import ContactButton from 'app/components/contact-button';

function WorkCapability({ data }) {

  const blocks = data.blocks.map(block => {
    return (
      <div className="work-capability-block">
        <div className="work-capability-block-text">
          <h2>{block.title}</h2>
          <p>{block.text}</p>
        </div>
        <img src={block.imageURL} alt={block.title} />
      </div>
    );
  });

  const title = data.title.split(" ").map(word => {
    return (<span>{word} </span>);
  });

  return (
    <div className="work-capability">
      <div className="work-capability-inner">
        <h1>{title}</h1>
        <WorkCapabilities selected={data.name} />
        {blocks}
        <div className="work-capability-contact">
          <p>Have a project or an idea you'd like to collaborate with ustwo on? Interested in what ustwo can do for you?</p>
          <ContactButton />
        </div>
      </div>
    </div>
  )
}

export default WorkCapability;
