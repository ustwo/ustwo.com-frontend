import LoadMoreButton from './';
import renderVariations from '../../lib/render-variations';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      {renderVariations({
        'Loading': <LoadMoreButton loading={true} />,
        'Disabled (hidden)': <LoadMoreButton disabled={true} />,
        'With onClick handler': <LoadMoreButton onClick={() => alert('clicked')} />
      })}
    </div>;
  }
});

export default Sandbox;
