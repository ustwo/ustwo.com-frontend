import reduce from 'lodash/collection/reduce';
import kebabCase from 'lodash/string/kebabCase';

function stripIndicator(search) {
  return search[0] === '?' ? search.substr(1) : search;
}

const QS = {
  parse: search => {
    return stripIndicator(search).split('&').reduce((hash, item) => {
      const tuple = item.split('=');
      switch(tuple[1]) {
        case "null":
          tuple[1] = null;
          break;
        case "true":
          tuple[1] = true;
          break;
        case "false":
          tuple[1] = false;
          break;
      }
      if (tuple[1] !== undefined) {
        hash[tuple[0]] = tuple[1];
      }
      return hash;
    }, {});
  },
  stringify: search => {
    return reduce(search, (searchString, value, key) => {
      let item;
      if (value !== undefined) {
        if (searchString.length) searchString += '&';
        searchString += `${key}=${kebabCase(value)}`;
      }
      return searchString;
    }, '');
  }
};

export default QS;
