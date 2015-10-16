import BlogControls from './';

function renderInContainer(component) {
  return (<div style={{position: 'relative', width: '400px', height: '100%', display: 'inline-block'}}>
    {component}
  </div>);
}

const Sandbox = React.createClass({
  render() {
    return (<div style={{height: '100%'}}>
      {[
        <BlogControls />,
        <BlogControls className="test" />,
        <BlogControls blogCategory="design" />
      ].map(renderInContainer)}
    </div>);
  }
});

export default Sandbox;
