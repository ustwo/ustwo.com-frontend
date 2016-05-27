import LoadingIcon from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <style>{`
        body {
          background: #009CF3;
          padding: 100px;
        }
      `}</style>
      <LoadingIcon className="test-class" />
    </div>;
  }
});

export default Sandbox;
