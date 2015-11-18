import RenderVariations from 'app/lib/sandbox/render-variations';
import Component from 'app/components/bold-header';
import find from 'lodash/collection/find';

describe('RenderVariations', () => {
  let result;
  let variation;
  let variationWithProps;

  beforeEach(() => {
    result = RenderVariations({
      'Default': <Component />,
      'With colour': <Component colour="white" />
    });
    variation = result[0];
    variationWithProps = result[1];
  });

  it('returns a div with class name "sandbox-component" for each variation', () => {
    expect(result.length).to.equal(2);
    expect(variation.type).to.equal('div');
    expect(variation.props.className).to.equal('sandbox-component');
  });

  it('displays the label for each variation', () => {
    const label = find(variation.props.children, 'type', 'h1');
    expect(label).to.be.ok;
    expect(label.props.children).to.equal('Default');
  });

  it('displays the label with a class name of "sandbox-label"', () => {
    const label = find(variation.props.children, 'type', 'h1');
    expect(label.props.className).to.equal('sandbox-label');
  });

  it('displays a Component for each variation', () => {
    const component = find(variation.props.children, 'type', Component);
    expect(component).to.be.ok;
  });

  it('displays the Component with any specified props', () => {
    const component = find(variation.props.children, 'type', Component);
    const componentWithProps = find(variationWithProps.props.children, 'type', Component);
    expect(component).not.to.include.key('colour');
    expect(componentWithProps.props.colour).to.equal('white');
  });

  describe('if no arguments are passed', () => {
    it('should not throw an error', () => {
      expect(RenderVariations).not.to.throw(Error);
    });

    it('should return an empty array', () => {
      result = RenderVariations();
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });
  });
});
