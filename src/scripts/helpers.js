import {log, colors} from 'gulp-util';

/*
 * Error handling wrapper
 */
function handleError(task) {
  return function (err) {
    error(err);
  };
};

function error(text) {
  return log(colors.bgRed(colors.white('error')), colors.red(text));
}

function info(text) {
  return log(colors.bgGreen(colors.black('info')), text);
}

export default {
  info,
  error,
  handleError
}
