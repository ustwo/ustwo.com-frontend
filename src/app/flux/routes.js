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
    statusCode: 200,
    data: () => []
  },
  work: {
    id: 'what-we-do',
    pattern: '/what-we-do',
    statusCode: 200,
    data: () => [{
      url: 'wp/v2/pages/66?_embed',
      type: 'page',
      id: 'what-we-do'
    }]
  },
  caseStudy: {
    id: 'what-we-do/case-study',
    pattern: '/what-we-do/:cid',
    statusCode: 200,
    data: cid => [{
      url: `ustwo/v1/case-studies/${cid}`,
      type: 'page',
      id: cid
    }]
  },
  blog: {
    id: 'blog',
    pattern: '/blog',
    statusCode: 200,
    data: () => [{
      url: 'wp/v2/pages?name=blog&_embed=true',
      type: 'page',
      id: 'blog',
      get: data => data[0]
    }]
  },
  post: {
    id: 'blog/post',
    pattern: '/blog/:pid',
    statusCode: 200,
    data: pid => [{
      url: `wp/v2/posts?name=${pid}&_embed=true`,
      type: 'page',
      id: pid,
      get: data => data[0]
    }]
  },
  legal: {
    id: 'legal',
    pattern: '/legal',
    statusCode: 200,
    data: () => [{
      url: 'wp/v2/pages?name=legal&_embed=true',
      type: 'page',
      id: 'legal',
      get: data => data[0]
    }]
  },
  privacy: {
    id: 'privacy',
    pattern: '/privacy',
    statusCode: 200,
    data: () => [{
      url: 'wp/v2/pages?name=privacy&_embed=true',
      type: 'page',
      id: 'privacy',
      get: data => data[0]
    }]
  },
  notfound: {
    id: 'notfound',
    pattern: '/404',
    statusCode: 404,
    data: () => []
  }
};

export default routes;
