import NewsFlash from './';

const Sandbox = React.createClass({
  render() {
    return (<div>
      <NewsFlash
        className="test-class"
        autoAnim={50}
        loop={true}
      />
    </div>);
  }
});

export default Sandbox;
