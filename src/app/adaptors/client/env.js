import 'browsernizr/test/touchevents';
import 'browsernizr/test/history';
import 'browsernizr/test/css/transitions';
import 'browsernizr/test/dom/classlist';
import 'browsernizr/test/css/backgroundcliptext';
import 'browsernizr/test/css/objectfit';

export default {
  Modernizr: require('browsernizr'),
  verbose: process.env.NODE_ENV === 'development'
};
