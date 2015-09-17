import Rimage from '../../../src/app/components/rimage';
import React from 'react/addons';

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
  let renderedDOM = () => React.findDOMNode(rimage());

  beforeEach(() => {
    props = { sizes: sizes };
  });

  it('returns an image only', () => {
    expect(renderedDOM().localName).to.equal('img');
    expect(renderedDOM().children.length).to.equal(0);
  });

  it('initializes with the smallest sized image', () => {
    expect(rimage().state.size.name).to.equal('small');
    expect(renderedDOM().getAttribute('src')).to.equal(sizes.small.source_url);
  });

  it('will replace the image with a sufficiently large image on mount', () => {
    expect(rimage().getNewSize().name).to.equal('large');
  });

  it('includes the classname if it is passed', () => {
    props = Object.assign(props, { className: 'hola' });
    expect(renderedDOM().className).to.include('hola');
  });

  describe('if a wrap', () => {
    beforeEach(() => {
      props = {
        sizes: sizes,
        wrap: 'div'
      }
    });

    it('returns an element based on the wrap element', () => {
      expect(renderedDOM().localName).to.equal('div');
    });

    it('includes the classname on the wrapper if it is passed', () => {
      props = Object.assign(props, { className: 'hola' });
      expect(renderedDOM().className).to.include('hola');
    });

    it('renders a child image within the wrapper', () => {
      expect(renderedDOM().children[0].localName).to.equal('img');
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

  describe('if an optional href is passed', () => {
    let ustwo;

    beforeEach(() => {
      ustwo = 'https://ustwo.com';
      props = Object.assign(props, { href: ustwo });
    });

    it('wraps the image in an anchor with the href', () => {
      expect(renderedDOM().localName).to.equal('a');
      expect(renderedDOM().getAttribute('href')).to.equal(ustwo);
      expect(renderedDOM().children[0].localName).to.equal('img');
    });

    describe('and Rimage is rendered as a wrapper', () => {
      beforeEach(() => {
        props = Object.assign(props, { wrap: 'div' });
      });

      xit('wraps the wrapper in an anchor', () => {
        expect(renderedDOM().localName).to.equal('a');
        expect(renderedDOM().getAttribute('href')).to.equal(ustwo);
        expect(renderedDOM().children[0].localName).to.equal('div');
      });
    });
  });
});
