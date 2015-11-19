import HomeTextBlock from './';
import renderVariations from 'app/lib/sandbox/render-variations';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <style>{`
        body {
          background: #ccc;
        }
      `}</style>
      {renderVariations({
        'Default': <HomeTextBlock title="Some random title 1">Text block 1</HomeTextBlock>,
        'With colour': <HomeTextBlock title="Some random title 2" colour="red">Text block 2</HomeTextBlock>,
        'With childColour': <HomeTextBlock title="Some random title 3" childColour="blue">Text block 3</HomeTextBlock>
      })}
    </div>;
  }
});

export default Sandbox;
