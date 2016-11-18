import Rimage from 'app/components/rimage';
import React from 'react/addons';
import ReactDOM from 'react-dom';

describe('Rimage', () => {
  const { TestUtils } = React.addons;
  const NullSize = {
    'file': null,
    'height': null,
    'mime-type': null,
    'name': null,
    'source_url': null,
    'width': null
  }
  const sizes = {
    'small': Object.assign({}, NullSize, { name: 'small', height: 480, width: 600, source_url: 'small_url' }),
    'medium': Object.assign({}, NullSize, { name: 'medium', height: 768, width: 1024, source_url: 'medium_url' }),
    'large': Object.assign({}, NullSize, { name: 'large', height: 1200, width: 1800, source_url: 'large_url' })
  }
  let props;
  let rimage = () => TestUtils.renderIntoDocument(React.createElement(Rimage, props));
  let renderedDOM = () => ReactDOM.findDOMNode(rimage());

  beforeEach(() => {
    props = { sizes: sizes };
  });

  it('returns an img', () => {
    expect(renderedDOM().localName).to.equal('img');
  });

  it('has a class name of "rimage"', () => {
    expect(renderedDOM().className).to.include('rimage');
  });

  it('includes any class names that are passed', () => {
    props = Object.assign(props, { className: 'hola' });
    expect(renderedDOM().className).to.include('hola');
  });

  it('contains an image with alt text that is passed', () => {
    const altText = 'Some text';
    props = Object.assign(props, { altText: altText });
    expect(renderedDOM().getAttribute('alt')).to.equal(altText);
  });

  it('initializes with the smallest sized image', () => {
    expect(rimage().state.size.name).to.equal('small');
    expect(renderedDOM().getAttribute('src')).to.equal(sizes.small.source_url);
  });

  it('will replace the image with a sufficiently large image', () => {
    const sizesArray = rimage().getSizesArray(sizes);
    expect(rimage().getNewSize(sizesArray, 800).name).to.equal('medium');
    expect(rimage().getNewSize(sizesArray, 1100).name).to.equal('large');
  });

  describe('if a wrap', () => {
    beforeEach(() => {
      props = {
        sizes: sizes,
        wrap: 'section'
      }
    });

    it('returns an element based on the wrap element', () => {
      expect(renderedDOM().localName).to.equal(props.wrap);
    });

    it('has a class name of "rimage"', () => {
      expect(renderedDOM().className).to.include('rimage');
    });

    it('includes any class names that are passed', () => {
      props = Object.assign(props, { className: 'hola' });
      expect(renderedDOM().className).to.include('hola');
    });

    it('has a background image', () => {
      expect(renderedDOM().getAttribute('style')).to.include('background-image');
      expect(renderedDOM().getAttribute('style')).to.include(sizes.small.source_url);
    });

    it('contains an image', () => {
      expect(renderedDOM().children[0].localName).to.equal('img');
    });

    it('contains an image with a class name of "img"', () => {
      expect(renderedDOM().children.length).to.equal(1);
      expect(renderedDOM().children[0].className).to.equal('img');
    });

    it('renders any children passed to it', () => {
      const child = <h1>Test</h1>;
      props = Object.assign(props, {
        children: [child]
      });
      expect(renderedDOM().children.length).to.equal(2);
      expect(renderedDOM().children[1].localName).to.equal('h1');
    });
  });
});
