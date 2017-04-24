import Modal from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <style>{`
        .test-class {
          color: #f8f8f8;
        }
      `}</style>
      <Modal
        className="test-class"
        belowHeader={true}
      >Some children</Modal>
    </div>;
  }
});

export default Sandbox;
