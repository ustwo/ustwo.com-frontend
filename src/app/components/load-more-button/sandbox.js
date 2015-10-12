import LoadMoreButton from './';

const Sandbox = React.createClass({
  render() {
    return (<div>
      <LoadMoreButton loading={true} />
      <LoadMoreButton disabled={true} />
      <LoadMoreButton onClick={() => alert('clicked')} />
    </div>);
  }
});

export default Sandbox;
