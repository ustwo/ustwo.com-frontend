import DownChevron from './';

const Sandbox = React.createClass({
  render() {
    return (<div style={{height: '100%'}}>
      <DownChevron autoAnim={500} />
      <DownChevron autoAnim={500} customClass="testClass" />
      <DownChevron autoAnim={500} onClick={() => alert('clicked')} />
    </div>);
  }
});

export default Sandbox;
