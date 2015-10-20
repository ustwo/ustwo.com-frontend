import WordAnimation from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <WordAnimation
        delay={1}
        duration={3}
      >
        Some words to be animated in
      </WordAnimation>
    </div>;
  }
});

export default Sandbox;
