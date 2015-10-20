import LoadingIcon from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <style>{`
        body {
          background: #ccc;
        }
      `}</style>
      <LoadingIcon className="test-class" />
    </div>;
  }
});

export default Sandbox;
