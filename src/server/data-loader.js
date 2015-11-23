import CamelCase from 'lodash/string/camelCase';

import log from 'app/lib/log';
import fetcher from 'app/lib/fetcher';

export default function (requiredData, apply) {
  return Promise.all(requiredData.map(params => {
    log('Loading...', params.type, (params.slug || ''));
    return fetcher({
      url: params.url,
      failure: params.failure
    });
  })).then(dataCollection => {
    dataCollection.forEach((data, index) => {
      const params = requiredData[index];
      apply(params.get ? params.get(data) : data, CamelCase(params.type));
    });
  }).catch(error => log('Fetch error', error, error.stack));
}
