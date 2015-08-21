import env from '../../server/adaptors/env';

export default function () {
  env.verbose && console.log.apply(console, arguments);
}
