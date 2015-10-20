import RenderVariations from '../../src/app/lib/render-variations';
import Component from '../../src/app/components/bold-header';
import find from 'lodash/collection/find';

describe('RenderVariations', () => {
  let result;
  let variation;
  let variationWithProps;

  beforeEach(() => {
    result = RenderVariations({
      'Default': <Component />,
      'With colour': <Component colour="red" />
    });
    variation = result[0];
    variationWithProps = result[1];
  });

  it('returns a div for each variation', () => {
    expect(result.length).to.equal(2);
    expect(variation.type).to.equal('div');
  });

  it('displays the label for each variation', () => {
    const h1 = find(variation.props.children, 'type', 'h1');
    expect(h1).to.be.ok;
    expect(h1.props.children).to.equal('Default');
  });

  it('displays a Component for each variation', () => {
    const component = find(variation.props.children, 'type', Component);
    expect(component).to.be.ok;
  });

  it('displays the Component with any specified props', () => {
    const component = find(variation.props.children, 'type', Component);
    const componentWithProps = find(variationWithProps.props.children, 'type', Component);
    expect(component).not.to.include.key('colour');
    expect(componentWithProps.props.colour).to.equal('red');
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
