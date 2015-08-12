import Actions from '../flux/actions';

var globalLoads = [{
  namespace: 'ustwo/v1/',
  type: 'studios'
}, {
  namespace: 'ustwo/v1/',
  type: 'footer'
}];

const handlers = {
  home() {
    return Actions.goTo('home', 200, globalLoads);
  },
  whatWeDo() {
    return Actions.goTo('what-we-do', 200, [].concat(globalLoads, {
      namespace: 'wp/v2/',
      type: 'pages',
      id: '66?_embed'
    }));
  },
  caseStudy(cid) {
    return Actions.goTo('what-we-do/case-study', 200, [].concat(globalLoads, {
      namespace: 'ustwo/v1/',
      type: 'case-studies',
      id: cid
    }));
  },
  blog() {
    return Actions.goTo('blog', 200, [].concat(globalLoads, {
      namespace: 'wp/v2/',
      type: 'pages',
      id: '?name=blog&_embed=true',
      get: data => data[0]
    }));
  },
  post(pid) {
    return Actions.goTo('blog/post', 200, [].concat(globalLoads, {
      namespace: 'wp/v2/',
      type: 'posts',
      id: `?name=${pid}&_embed=true`,
      get: data => data[0]
    }));
  },
  legal() {
    return Actions.goTo('legal', 200, [].concat(globalLoads, {
      namespace: 'wp/v2/',
      type: 'pages',
      id: '?name=legal&_embed=true',
      get: data => data[0]
    }));
  },
  privacy() {
    return Actions.goTo('privacy', 200, [].concat(globalLoads, {
      namespace: 'wp/v2/',
      type: 'pages',
      id: '?name=privacy&_embed=true',
      get: data => data[0]
    }));
  }
};

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
    pattern: '/',
    handler: handlers.home
  },
  work: {
    pattern: '/what-we-do',
    handler: handlers.whatWeDo
  },
  caseStudy: {
    pattern: '/what-we-do/:cid',
    handler: handlers.caseStudy
  },
  blog: {
    pattern: '/blog',
    handler: handlers.blog
  },
  post: {
    pattern: '/blog/:pid',
    handler: handlers.post
  },
  legal: {
    pattern: '/legal',
    handler: handlers.legal
  },
  privacy: {
    pattern: '/privacy',
    handler: handlers.privacy
  }
};

export default routes;
