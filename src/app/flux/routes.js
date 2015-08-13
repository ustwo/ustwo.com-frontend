import Actions from '../flux/actions';

/**
  Example route definitions
  {
    '/': function () {},
    '/projects': function () {},
    '/projects/:pid': function (pid) {}
  }
*/
const routes = {
  home: {
    id: 'home',
    pattern: '/',
    status: 200,
    data: () => []
  },
  work: {
    id: 'what-we-do',
    pattern: '/what-we-do',
    status: 200,
    data: () => [{
      namespace: 'wp/v2/',
      type: 'pages',
      id: '66?_embed'
    }]
  },
  caseStudy: {
    id: 'what-we-do/case-study',
    pattern: '/what-we-do/:cid',
    status: 200,
    data: cid => [{
      namespace: 'ustwo/v1/',
      type: 'case-studies',
      id: cid
    }]
  },
  blog: {
    id: 'blog',
    pattern: '/blog',
    status: 200,
    data: () => [{
      namespace: 'wp/v2/',
      type: 'pages',
      id: '?name=blog&_embed=true',
      get: data => data[0]
    }]
  },
  post: {
    id: 'blog/post',
    pattern: '/blog/:pid',
    status: 200,
    data: pid => [{
      namespace: 'wp/v2/',
      type: 'posts',
      id: `?name=${pid}&_embed=true`,
      get: data => data[0]
    }]
  },
  legal: {
    id: 'legal',
    pattern: '/legal',
    status: 200,
    data: () => [{
      namespace: 'wp/v2/',
      type: 'pages',
      id: '?name=legal&_embed=true',
      get: data => data[0]
    }]
  },
  privacy: {
    id: 'privacy',
    pattern: '/privacy',
    status: 200,
    data: () => [{
      namespace: 'wp/v2/',
      type: 'pages',
      id: '?name=privacy&_embed=true',
      get: data => data[0]
    }]
  },
  notfound: {
    id: 'notfound',
    pattern: '/404',
    status: 404,
    data: () => []
  },
  joinUs: {
    id: 'join-us',
    pattern: '/join-us',
    status: 200,
    data: () => []
  }
};

export default routes;
