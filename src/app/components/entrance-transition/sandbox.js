import EntranceTransition from './';

const Sandbox = React.createClass({
  render() {
    return (<div style={{height: '100%'}}>
      <style>{`
        .entrance-transition {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .delayed {
          transition-delay: 1.5s;
        }
        .entrance-transition.show {
          opacity: 1;
        }
      `}</style>
      <EntranceTransition>Content to show</EntranceTransition>
      <EntranceTransition className="testClass">Content to show</EntranceTransition>
      <EntranceTransition className="delayed">Content to show</EntranceTransition>
    </div>);
  }
});

export default Sandbox;
