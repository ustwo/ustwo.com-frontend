import FourOhFour from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <style>{`
        .sandbox {
          height: 100vh;
        }
      `}</style>
      <FourOhFour />
    </div>;
  }
});

export default Sandbox;
