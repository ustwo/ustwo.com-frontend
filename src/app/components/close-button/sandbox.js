import CloseButton from './';

const Sandbox = React.createClass({
  render() {
    return (<div style={{height: '100%'}}>
      <CloseButton autoAnim={500} />
      <CloseButton autoAnim={500} className="testClass" />
      <CloseButton autoAnim={500} onClose={() => alert('clicked')} />
      <CloseButton autoAnim={500} style={{ fill: 'blue' }} />
    </div>);
  }
});

export default Sandbox;
