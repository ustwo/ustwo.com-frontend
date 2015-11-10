import reduce from 'lodash/collection/reduce';

function stripIndicator(queryString) {
  return queryString.substr(1);
}

function parseForSpecialValue(string) {
  let value = string;
  switch(string) {
    case "null":
      value = null;
      break;
    case "true":
      value = true;
      break;
    case "false":
      value = false;
      break;
  }
  return value;
}

const QS = {
  parse(queryString) {
    return stripIndicator(queryString)
      .split('&')
      .reduce((queryObject, item) => {
        const tuple = item.split('=');
        const key = tuple[0];
        const value = parseForSpecialValue(tuple[1]);
        if (value !== 'undefined' && value !== undefined) {
          queryObject[key] = value;
        }
        return queryObject;
      }, {});
  },
  stringify(queryObject) {
    const queryString = reduce(queryObject, (queryString, value, key) => {
      if (value !== undefined) {
        if (queryString.length) queryString += '&';
        const valueString = value === null ? 'null' : value;
        queryString += `${key}=${valueString}`;
      }
      return queryString;
    }, '');
    return queryString.length ? `?${queryString}` : queryString;
  }
};

export default QS;
