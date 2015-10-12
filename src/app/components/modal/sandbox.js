import Modal from './';

const Sandbox = React.createClass({
  render() {
    return (<div>
      <Modal
        className="test-class"
        belowHeader={true}
      >Some children</Modal>
    </div>);
  }
});

export default Sandbox;
