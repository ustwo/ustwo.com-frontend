import React from 'react';
import classnames from 'classnames';
import goToCapability from 'app/lib/go-to-capability';

function WorkCapabilities({ selected }) {
  const items = workCapabilitiesData.map(item => {
    const classes = classnames('work-capabilities-item', item.name, {
      selected: item.name === selected
    });

    return (
      <li className={classes} key={`capability-${item.name}`}>
        <button onClick={() => goToCapability(item.name)}>
          <div className="work-capabilities-item-title">{item.title}</div>
        </button>
      </li>
    )
  });

  const classes = classnames({ working: selected === 'working' });

  return (
    <div className="work-capabilities">
      <div className="work-capabilities-bg">
        <div className="capabilities-dotted" />
        <div className="capabilities-dotted" />
      </div>
      <ul className={classes}>
        {items}
      </ul>
    </div>
  );
}

export default WorkCapabilities;

const workCapabilitiesData = [{
  name: 'discovery',
  title: 'Discovery & Strategy'
}, {
  name: 'design',
  title: 'Design & Build'
}, {
  name: 'launch',
  title: 'Launch & Scale'
}];
