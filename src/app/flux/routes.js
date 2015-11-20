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
    patterns: ['/'],
    data: () => [{
      url: 'ustwo/v1/pages/home',
      type: 'page',
      slug: 'home',
      async: ['related_content']
    }]
  },
  work: {
    id: 'what-we-do',
    patterns: ['/what-we-do'],
    data: () => [{
      url: 'ustwo/v1/pages/what-we-do',
      type: 'page',
      slug: 'what-we-do'
    }]
  },
  caseStudy: {
    id: 'what-we-do/case-study',
    patterns: ['/what-we-do/:cid'],
    data: slug => [{
      url: `ustwo/v1/case-studies/${slug}`,
      type: 'caseStudy',
      slug: slug,
      async: ['related_content']
    }]
  },
  blogCategory: {
    id: 'blog',
    patterns: ['/blog?category=:category'],
    data: category => [{
      url: `ustwo/v1/pages/blog`,
      type: 'page',
      slug: 'blog'
    }, {
      url: `ustwo/v1/posts?per_page=12&category=${category}`,
      type: 'posts',
      slug: `posts/${category}`
    }]
  },
  blog: {
    id: 'blog',
    patterns: ['/blog'],
    data: () => [{
      url: 'ustwo/v1/pages/blog',
      type: 'page',
      slug: 'blog'
    }, {
      url: 'ustwo/v1/posts?per_page=13',
      type: 'posts',
      slug: 'posts/all'
    }]
  },
  searchResults: {
    id: 'blog/search-results',
    pattern: ['/blog/search?q=:query'],
    data: query => [{
      url: `ustwo/v1/posts?search=${query}`,
      type: 'posts',
      slug: 'posts/search'
    }]
  },
  post: {
    id: 'blog/post',
    patterns: ['/blog/:pid'],
    data: pid => [{
      url: `ustwo/v1/posts/${pid}`,
      type: 'post',
      slug: pid,
      async: ['related_content']
    }]
  },
  legal: {
    id: 'legal',
    patterns: ['/legal'],
    data: () => [{
      url: 'ustwo/v1/pages/legal',
      type: 'page',
      slug: 'legal'
    }]
  },
  joinUs: {
    id: 'join-us',
    patterns: ['/join-us', '/join-us/:lid'],
    data: lid => [{
      url: 'ustwo/v1/pages/join-us',
      type: 'page',
      slug: 'join-us'
    }, {
      url: 'ustwo/v1/jobs',
      type: 'jobs'
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
