import CamelCase from 'lodash/string/camelCase';

import log from './log';
import fetcher from './fetcher';

export default function (requiredData, apply) {
  return Promise.all(requiredData.map(params => {
    log('Loading...', params.type, (params.slug || ''));
    return fetcher({
      url: params.url,
      external: params.external,
      failure: params.failure,
      success: (data) => {
        apply(params.get ? params.get(data) : data, CamelCase(params.type));
      }
    });
  })).catch(error => log('Fetch error', error, error.stack));
}
