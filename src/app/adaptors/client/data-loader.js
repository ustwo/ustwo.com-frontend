import CamelCase from 'lodash/string/camelCase';

import log from '../../app/lib/log';
import fetcher from '../../app/lib/fetcher';

export default function (requiredData, apply) {
  return Promise.all(requiredData.map(params => {
    log('Loading...', params.type, (params.slug || ''));
    return fetcher({
      url: params.url,
      external: params.external,
      failure: params.failure,
      success: (data) => {
        apply(CamelCase(params.type), params.get ? params.get(data) : data);
      }
    });
  })).catch(error => log('Fetch error', error, error.stack));
}
