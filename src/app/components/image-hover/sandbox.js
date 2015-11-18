import ImageHover from './';
import renderVariations from 'app/lib/sandbox/render-variations';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      {renderVariations({
        '500ms timeout': <ImageHover autoAnim={500} />
      })}
    </div>;
  }
});

export default Sandbox;
