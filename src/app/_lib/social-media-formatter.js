export default (data, type) => {
  let uri;
  let count;
  let slug;
  switch (type) {
    case 'twitterShares':
      uri = data.url;
      count = data.count;
      break;
    case 'facebookShares':
      uri = data.id;
      count = data.shares || (data.id && 0);
      break;
  }
  if (uri) {
    const uriArray = uri.split('/');
    slug = uriArray[uriArray.length-1] || uriArray[uriArray.length-2];
  }
  return {
    url: uri,
    slug: slug,
    count: count,
    type: type
  }
}
