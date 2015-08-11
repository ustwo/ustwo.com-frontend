import {EventEmitter} from 'events';

import router from './router';
import actions from './actions';

const Actions = Object.assign({}, EventEmitter.prototype, router, actions);

export default function (url) {
  return Actions.init(url);
}
