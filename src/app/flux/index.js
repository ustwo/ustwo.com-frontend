import {EventEmitter} from 'events';
import mapValues from 'lodash/object/mapValues'

import window from '../../server/adaptors/window';
import Router from './router';
import Actions from './actions';

function emitify(fn) {
  console.log('setting up emitify 1');
  return function() {
    console.log('calling emitified fn', fn.toString(), arguments);
    return fn.apply(null, arguments).then(state => {
      console.log('about to emit', state);
      Flux.emit('change', state);
      return state;
    });
  };
}

const Flux = Object.assign({
  init(initialUrl) {
    return Router.init(initialUrl, Flux.navigate);
  },
  addChangeListener(callback) {
    Flux.on('change', callback);
  },
  removeChangeListener(callback) {
    Flux.removeListener('change', callback);
  },
  override(url) {
    return (e) => {
      e.preventDefault();
      Flux.navigate(url);
    };
  }
}, EventEmitter.prototype, {
  navigate: emitify(Router.navigate)
}, mapValues(Actions, emitify));

window.Flux = Flux;

export default Flux
