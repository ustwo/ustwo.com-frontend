import CamelCase from 'lodash/string/camelCase';

import Log from '../../lib/log';
import fetcher from '../../lib/fetcher';

export default function (requiredData, apply) {
  return Promise.all(requiredData.map(params => {
    Log('Loading...', params.type, (params.slug || ''));
    return fetcher({
      url: params.url,
      external: params.external,
      failure: params.failure
    });
  })).then(dataCollection => {
    dataCollection.forEach((data, index) => {
      const params = requiredData[index];
      apply(params.get ? params.get(data) : data, CamelCase(params.type));
    });
  }).catch(error => Log('Fetch error', error, error.stack));
}
