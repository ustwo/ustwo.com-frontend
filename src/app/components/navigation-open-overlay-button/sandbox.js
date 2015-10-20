import NavigationOpenOverlayButton from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <style>{`
        body {
          background: #ccc;
        }
      `}</style>
      <NavigationOpenOverlayButton
        onOpen={() => alert('opened!')}
      />
    </div>;
  }
});

export default Sandbox;
