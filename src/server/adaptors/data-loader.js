import CamelCase from 'lodash/string/camelCase';

import fetcher from '../../app/_lib/fetcher';

export default function (requiredData, apply) {
  return Promise.all(requiredData.map(params => {
    console.log('Loading...', params.type, (params.slug || ''));
    return fetcher({
      url: params.url
    });
  })).then(dataCollection => {
    dataCollection.forEach((data, index) => {
      const params = requiredData[index];
      apply(CamelCase(params.type), params.get ? params.get(data) : data);
    });
  }).catch(error => console.log('Fetch error', error, error.stack));
}
