import React from 'react';
import classnames from 'classnames';
import Flux from 'app/flux';

function capabilityNav(name) {
  let navigateTo;
  switch(name) {
    case 'discovery':
      navigateTo = '/work/discovery-strategy';
      break;
    case 'design':
      navigateTo = '/work/design-build';
      break;
    case 'launch':
      navigateTo = '/work/launch-scale';
      break;
    default:
      navigateTo = '/work';
  }

  Flux.navigate(navigateTo);
}

function WorkCapabilities({ selected }) {
  const items = workCapabilitiesData.map(item => {
    const classes = classnames('work-capabilities-item', {
      selected: item.name === selected
    });

    return (
      <li className={classes} key={`capability-${item.name}`}><button onClick={() => capabilityNav(item.name)}>{item.title}</button></li>
    )
  });

  return (
    <div className="work-capabilities">
      <ul>
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
