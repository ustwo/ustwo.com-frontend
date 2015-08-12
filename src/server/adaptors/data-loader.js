import CamelCase from 'lodash/string/camelCase';
import Pluralize from 'pluralize';

import fetcher from '../../app/_lib/fetcher';

export default function (requiredData, apply) {
  console.log(requiredData, arguments);
  return Promise.all(requiredData.map((params) => {
    console.log('Loading...', params.type, (params.id || ''));
    return fetcher({
      namespace: params.namespace,
      url: params.type + (params.id ? '/'+params.id : '')
    });
  })).then(dataCollection => {
    dataCollection.forEach((data, index) => {
      const params = requiredData[index];
      apply(CamelCase(params.id ? Pluralize(params.type, 1) : params.type), params.get ? params.get(data) : data);
    });
  }).catch(error => console.log('Fetch error', error));
}
