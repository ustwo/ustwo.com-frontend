import env from 'app/adaptors/server/env';

export default function () {
  env.verbose && console.log.apply(console, arguments);
}
