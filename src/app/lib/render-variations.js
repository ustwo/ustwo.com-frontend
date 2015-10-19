import map from 'lodash/collection/map';

export default variations => {
  return map(variations, (component, label) => {
    return (<div key={label} className='sandbox-component'>
      <h1 className='sandbox-label'>{label}</h1>
      {component}
    </div>);
  });
}
