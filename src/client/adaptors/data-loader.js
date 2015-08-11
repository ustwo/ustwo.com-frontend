import fetcher from '../../app/_lib/fetcher';

export default function (requiredData, apply, emit) {
  requiredData.forEach((params) => {
    console.log('Loading...', params.type, (params.id || ''));
    fetcher({
      namespace: params.namespace,
      url: params.type + (params.id ? '/'+params.id : ''),
      success: (data) => {
        apply(CamelCase(params.id ? Pluralize(params.type, 1) : params.type), params.get ? params.get(data) : data);
        emit();
      }
    }).catch(error => console.log('Fetch error', error));
  });
}
