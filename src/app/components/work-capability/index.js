import React from 'react';
import WorkCapabilities from 'app/components/work-capabilities';

function WorkCapability({ data }) {

  const blocks = data.blocks.map(block => {
    return (
      <div className="work-capability-block">
        <h2>{block.title}</h2>
        <p>{block.text}</p>
        <img src={block.imageURL} alt={block.title} />
      </div>
    );
  });

  return (
    <div className="work-capability">
      <h1>{data.title}</h1>
      <WorkCapabilities selected={data.name} />
      {blocks}
    </div>
  )
}

export default WorkCapability;
