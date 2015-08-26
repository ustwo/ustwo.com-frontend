import DataLoader from '../../server/adaptors/data-loader';

export default (slug, cb) => {
  const httpsUri = `https://ustwo.com/blog/${slug}`;
  const uri = `http://ustwo.com/blog/${slug}`;

  return DataLoader([{
    url: `https://graph.facebook.com/?id=${uri}`,
    external: 'facebook',
    type: 'facebookShares',
    failure: err => console.log('Failed to fetch Facebook share count', err)
  }, {
    url: `twitter/count?url=${httpsUri}`,
    external: 'twitter',
    type: 'twitterShares',
    failure: err => console.log('Failed to fetch Twitter share count', err)
  }], cb);
};
