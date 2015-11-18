import QS from 'app/lib/query-string';
import isEqual from 'lodash/lang/isEqual';

describe('QS', () => {
  describe('parsing a query string', () => {
    let string;
    let result;

    beforeEach(() => {
      string = '?this=that&something=true&somethingElse=false&colour=null&hairy=undefined';
      result = QS.parse(string);
    });

    it('returns an object', () => {
      expect(result).to.be.an('object');
    });

    it('does not parse undefined properties', () => {
      expect(result).not.to.have.property('hairy');
      expect(Object.keys(result).length).to.equal(4);
    });

    it('identifies booleans and converts them from strings', () => {
      expect(result.something).to.equal(true);
      expect(result.somethingElse).to.equal(false);
    });

    it('identifies null and converts it from a string', () => {
      expect(result.colour).to.equal(null);
    });

    it('returns an empty object if passed an empty string', () => {
      expect(isEqual(QS.parse(''), {})).to.equal(true);
    });
  });

  describe('stringifying an object', () => {
    let object;
    let result;

    beforeEach(() => {
      object = {
        this: 'that',
        something: true,
        somethingElse: false,
        colour: null,
        hairy: undefined
      };
      result = QS.stringify(object);
    });

    it('returns a string', () => {
      expect(result).to.be.a('string');
    });

    it('returns a string beginning with "?"', () => {
      expect(result[0]).to.equal('?');
    });

    it('does not stringify undefined properties', () => {
      expect(result).not.to.contain('hairy');
    });

    it('contains all non-undefined properties', () => {
      expect(result).to.contain('this=that')
        .and.contain('something=true')
        .and.contain('somethingElse=false')
        .and.contain('colour=null');
    });

    it('returns an empty string if passed an empty object', () => {
      expect(QS.stringify({})).to.equal('');
    });
  });
});
