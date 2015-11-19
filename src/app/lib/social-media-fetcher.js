import find from 'lodash/collection/find';
import DataLoader from 'app/lib/data-loader';
import tweetCounts from 'app/lib/tweetCounts';
import log from 'app/lib/log';

function formatter(data, type) {
  let uri;
  let count;
  let slug;
  switch (type) {
    case 'twitter':
      uri = data.url;
      count = data.count;
      break;
    case 'facebook':
      uri = data.id;
      count = data.shares || (data.id && 0);
      break;
  }
  if (uri) {
    const uriArray = uri.split('/');
    slug = uriArray[uriArray.length-1] || uriArray[uriArray.length-2];
    if (type === 'twitter') {
      const oldCount = find(tweetCounts, 'slug', slug);
      if (oldCount) {
        count += oldCount.count;
      }
    }
  }
  const object = {
    slug: slug,
    data: count
  }
  return object;
}

export default (slug, cb) => {
  const httpsUri = `https://ustwo.com/blog/${slug}`;
  const uri = `http://ustwo.com/blog/${slug}`;

  return DataLoader([{
    url: `https://graph.facebook.com/?id=${uri}`,
    external: 'facebook',
    type: 'facebookShares',
    get: response => formatter(response.data, 'facebook'),
    failure: err => log('Failed to fetch Facebook share count', err)
  }, {
    url: `twitter/count?url=${httpsUri}`,
    external: 'twitter',
    type: 'twitterShares',
    get: response => formatter(response.data, 'twitter'),
    failure: err => log('Failed to fetch Twitter share count', err)
  }], cb);
};
