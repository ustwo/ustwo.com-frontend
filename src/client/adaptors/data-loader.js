import CamelCase from 'lodash/string/camelCase';

import Log from '../../app/_lib/log';
import fetcher from '../../app/_lib/fetcher';

export default function (requiredData, apply) {
  return Promise.all(requiredData.map(params => {
    Log('Loading...', params.type, (params.slug || ''));
    return fetcher({
      url: params.url,
      external: params.external,
      failure: params.failure,
      success: (data) => {
        apply(CamelCase(params.type), params.get ? params.get(data) : data);
      }
    });
  })).catch(error => Log('Fetch error', error, error.stack));
}
