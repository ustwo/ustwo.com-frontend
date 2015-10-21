import SVG from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <SVG
        className="test-class"
        title="test-title"
        spritemapID="ustwologo"
        style={{fill: 'red'}}
      />
    </div>;
  }
});

export default Sandbox;
