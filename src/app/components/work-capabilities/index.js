import React from 'react';
import classnames from 'classnames';
import Flux from 'app/flux';

function WorkCapabilities({ selected }) {
  const items = workCapabilitiesData.map(item => {
    const classes = classnames('work-capabilities-item', item.name, {
      selected: item.name === selected
    });

    return (
      <li className={classes} key={`capability-${item.name}`}>
        <button onClick={() => Flux.navigate(item.url)}>
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
  title: 'Discovery & Strategy',
  url: '/work/discovery-strategy'
}, {
  name: 'design',
  title: 'Design & Build',
  url: '/work/design-build'
}, {
  name: 'launch',
  title: 'Launch & Scale',
  url: '/work/launch-scale'
}];
