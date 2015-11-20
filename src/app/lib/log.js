import env from 'app/adaptors/server/env';
import window from 'app/adaptors/server/window';

export default function () {
  window.env.verbose && console.log.apply(console, arguments);
}
