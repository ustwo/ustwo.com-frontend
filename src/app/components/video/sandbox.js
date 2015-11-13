import Video from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox full-width-component">
      <style>{`
        .sandbox {
          height: 100vh;
        }
      `}</style>
      <Video />
    </div>;
  }
});

export default Sandbox;
