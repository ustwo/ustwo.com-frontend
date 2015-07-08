import find from 'lodash/collection/find';

function isIn(item, array) {
  return !!find(array, 'key', item.key);
}

export default isIn;
