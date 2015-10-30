import renderModules from '../../src/app/lib/module-renderer';
import SingleColumn from '../../src/app/components/single-column';

describe('ModuleRenderer', () => {
  let moduleRenderer;
  let moduleData;
  let colours;
  let result;

  describe('header', () => {
    beforeEach(() => {
      colours = {
        bg: '#ffede1',
        primary: '#ed0082',
        secondary: '#16d5d9'
      }
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
        colours: colours,
        name: 'header'
      };
      result = renderModules({
        modules: [moduleData],
        colours: colours,
        zebra: false
      })[0];
    });

    it('returns a SingleColumn', () => {
      expect(result.type).to.equal(SingleColumn);
    });

    it('has a title', () => {
      expect(result.props.title).to.equal('Monument Valley');
    });

    it('has a class name of "intro"', () => {
      expect(result.props.className).to.include('intro');
    });

    it('has a heading colour', () => {
      expect(result.props.headingColour).to.equal(colours.primary);
    });

    it('has a rule colour', () => {
      expect(result.props.ruleColour).to.equal(colours.secondary);
    });

    it('has a background colour', () => {
      expect(result.props.backgroundColour).to.equal(colours.bg);
    });
  });
});
