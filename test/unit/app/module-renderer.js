import renderModules from 'app/lib/module-renderer';
import SingleColumn from 'app/components/single-column';
import Rimage from 'app/components/rimage';
import QuoteBlock from 'app/components/quote-block';
import Grid from 'app/components/grid';

const colours = {
  bg: '#ffede1',
  primary: '#ed0082',
  secondary: '#16d5d9'
}

describe('renderModules', () => {
  let moduleData;
  let result;

  beforeEach(() => {
    result = () => renderModules({
      modules: [moduleData],
      colours: colours,
      zebra: false
    })[0];
  });

  describe('header', () => {
    beforeEach(() => {
      moduleData = {
        attr: {
          heading: {
            name: 'heading',
            type: 'text',
            value: 'Monument Valley'
          },
          subheading: {
            name: 'subheading',
            type: 'textarea',
            value: 'A story of forgiveness'
          }
        },
        name: 'header'
      };
    });

    it('returns a SingleColumn', () => {
      expect(result().type).to.equal(SingleColumn);
    });

    it('has a title', () => {
      expect(result().props.title).to.equal('Monument Valley');
    });

    it('has a class name of "intro"', () => {
      expect(result().props.className).to.include('intro');
    });

    it('has a heading colour', () => {
      expect(result().props.headingColour).to.equal(colours.primary);
    });

    it('has a rule colour', () => {
      expect(result().props.ruleColour).to.equal(colours.secondary);
    });

    it('has a background colour', () => {
      expect(result().props.backgroundColour).to.equal(colours.bg);
    });
  });

  describe('text', () => {
    beforeEach(() => {
      moduleData = {
        attr: {
          heading: {
            name: 'heading',
            type: 'text',
            value: 'Impossible geometry'
          },
          body: {
            name: 'body',
            type: 'wysiwyg',
            value: '<p>Monument Valley is a surreal exploration through fantastical architecture and impossible geometry. The player guides the silent princess Ida through mysterious monuments, to uncover hidden paths, unfold optical illusions and outsmart the enigmatic Crow People.</p><p>We didn’t experience a classic ‘eureka’ moment that signified the birth of Monument Valley, but it was close. Ken Wong, the team’s lead designer, created a piece of artwork, an image of a building in isometric view with a single figure, staring at its strange but completely possible architecture. The image came with no suggestion of a game design, but it was instantly arresting and it dared us to come up with something that would be as powerful as it was. The great thing about looking at the image now is just how close it looks to the finished game. It’s incredibly satisfying that we managed to realise the potential of that very pure idea.</p>'
          }
        },
        name: 'text'
      };
    });

    it('returns a SingleColumn', () => {
      expect(result().type).to.equal(SingleColumn);
    });

    it('has a title', () => {
      expect(result().props.title).to.equal(moduleData.attr.heading.value);
    });

    it('has a heading colour', () => {
      expect(result().props.headingColour).to.equal(colours.primary);
    });

    it('has a rule colour', () => {
      expect(result().props.ruleColour).to.equal(colours.secondary);
    });

    it('has a background colour', () => {
      expect(result().props.backgroundColour).to.equal(colours.bg);
    });
  });

  describe('image', () => {
    let sizes;

    beforeEach(() => {
      sizes = {
        small: {},
        medium: {},
        large: {}
      }
      moduleData = {
        attr: {
          caption: {
            name: 'caption',
            type: 'image',
            value: 'Caption'
          },
          image: {
            name: 'image',
            type: 'image',
            value: [{
              alt: 'alt text here',
              sizes: sizes
            }]
          }
        },
        name: 'image'
      };
    });

    it('returns a Rimage', () => {
      expect(result().type).to.equal(Rimage);
    });

    it('has sizes', () => {
      expect(result().props.sizes).to.equal(sizes);
    });

    it('has alt text', () => {
      expect(result().props.altText).to.equal(moduleData.attr.image.value[0].alt);
    });
  });

  describe('blockquote', () => {
    beforeEach(() => {
      moduleData = {
        attr: {
          source: {
            value: 'Confucius'
          },
          text: {
            value: 'Life is really simple, but we insist on making it complicated.'
          }
        },
        name: 'blockquote'
      };
    });

    it('returns a QuoteBlock', () => {
      expect(result().type).to.equal(QuoteBlock);
    });

    it('has a source', () => {
      expect(result().props.source).to.equal(moduleData.attr.source.value);
    });

    it('has a background colour', () => {
      expect(result().props.backgroundColour).to.equal(colours.secondary);
    });

    it('renders quote text as a child', () => {
      expect(result().props.children).to.include(moduleData.attr.text.value);
    });
  });

  describe('grid', () => {
    let cells;
    let video;
    let sizes;

    beforeEach(() => {
      cells = [];
      video = [];
      sizes = {
        small: {},
        medium: {},
        large: {}
      }
      moduleData = {
        attr: {
          grid_cells: {
            value: cells
          },
          grid_video: {
            value: video
          },
          grid_image: {
            value: [{
              sizes: sizes
            }]
          }
        },
        name: 'grid'
      };
    });

    it('returns a grid', () => {
      expect(result().type).to.equal(Grid);
    });

    it('has cells', () => {
      expect(result().props.cells).to.equal(cells);
    });

    it('has video', () => {
      expect(result().props.video).to.equal(video);
    });

    it('has images', () => {
      expect(result().props.images).to.equal(sizes);
    });
  });

  describe('placeholder', () => {
    let hasCallbackBeenCalled = false;

    beforeEach(() => {
      moduleData = {
        name: 'placeholder',
        attr: {
          keyword: {
            name: "keyword",
            value: "WORKABLE_LIST",
            type: "text"
          }
        }
      }

      renderModules({
        modules: [moduleData],
        colours: colours,
        zebra: false,
        placeholderContents: {
          WORKABLE_LIST: () => {
            hasCallbackBeenCalled = true;
          }
        }
      });
    });

    it('calls the placeholder callback', () => {
      expect(hasCallbackBeenCalled).to.equal(true);
    });
  });

  describe('if rendered as a zebra list', () => {
    let modules;
    let headerModule;
    let textModule;

    beforeEach(() => {
      headerModule = { name: 'header' };
      textModule = { name: 'text' };
      result = () => renderModules({
        modules: modules,
        colours: colours,
        zebra: true
      });
    });

    it('gives alternate modules alternate background colours', () => {
      modules = [headerModule, textModule, textModule];
      expect(result()[0].props.backgroundColour).not.to.equal(result()[1].props.backgroundColour);
      expect(result()[0].props.backgroundColour).to.equal(result()[2].props.backgroundColour);
    });

    it('ignores modules without background colours in the zebra order', () => {
      const moduleWithoutBackground = { name: 'image' };
      modules = [headerModule, moduleWithoutBackground, textModule];
      const header = result()[0];
      const text = result()[2];
      expect(header.props.backgroundColour).not.to.equal(text.props.backgroundColour);
    });
  });
});
