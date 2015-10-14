import {EventEmitter} from 'events';
import reduce from 'lodash/collection/reduce';
import Actions from './actions';

function mockerise(target) {
  return reduce(target, (mock, value, key) => {
    mock[key] = () => {};
    return mock;
  }, {});
}

const FluxMock = Object.assign(
  mockerise(EventEmitter.prototype),
  mockerise(Actions),
  {
    init() {},
    navigate() {},
    addChangeListener() {},
    removeChangeListener() {},
    override() {}
  }
);

export default FluxMock
