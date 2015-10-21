import map from 'lodash/collection/map';

function composeVariation(component, label) {
  return <div key={label} className='sandbox-component'>
    <h1 className='sandbox-label'>{label}</h1>
    {component}
  </div>;
}

function renderVariations(variations) {
  return map(variations, composeVariation);
}

export default renderVariations;
