import urllite from 'urllite';

import QS from 'app/lib/query-string';

function getActualUrl(url) {
  const splitUrl = url.split('#/');
  return splitUrl.length > 1 ? splitUrl.shift() + splitUrl.join('') : url;
}

export default function virtualUrl(url) {
  let vurl = urllite(getActualUrl(url));
  vurl.original = url;
  vurl.searchObject = QS.parse(vurl.search);
  return vurl;
}
