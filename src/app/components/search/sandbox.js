import Search from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <Search
        className="test-class"
        searchQuery="design"
      />
    </div>;
  }
});

export default Sandbox;
