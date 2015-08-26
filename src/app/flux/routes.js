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
    data: () => [{
      url: 'ustwo/v1/pages/home',
      type: 'page',
      slug: 'home'
    }]
  },
  work: {
    id: 'what-we-do',
    pattern: '/what-we-do',
    statusCode: 200,
    data: () => [{
      url: 'ustwo/v1/pages/what-we-do',
      type: 'page',
      slug: 'what-we-do'
    }]
  },
  caseStudy: {
    id: 'what-we-do/case-study',
    pattern: '/what-we-do/:cid',
    statusCode: 200,
    data: slug => [{
      url: `ustwo/v1/case-studies/${slug}`,
      type: 'page',
      slug: slug
    }]
  },
  blogCategory: {
    id: 'blog',
    pattern: '/blog?category=:category',
    status: 200,
    data: category => [{
      url: `ustwo/v1/pages/blog`,
      type: 'page',
      slug: 'blog'
    }, {
      url: `ustwo/v1/posts?per_page=12&category=${category}`,
      type: 'posts',
      cache: false
    }]
  },
  blog: {
    id: 'blog',
    pattern: '/blog',
    statusCode: 200,
    data: () => [{
      url: 'ustwo/v1/pages/blog',
      type: 'page',
      slug: 'blog'
    }, {
      url: 'ustwo/v1/posts?per_page=12',
      type: 'posts',
      cache: false
    }]
  },
  searchResults: {
    id: 'blog/search-results',
    pattern: '/blog/search?q=:query',
    status: 200,
    data: query => [{
      url: `ustwo/v1/posts?search=${query}`,
      type: 'page',
      slug: 'search'
    }]
  },
  post: {
    id: 'blog/post',
    pattern: '/blog/:pid',
    statusCode: 200,
    data: pid => [{
      url: `ustwo/v1/posts/${pid}`,
      type: 'page',
      slug: pid
    }, {
      url: `https://graph.facebook.com/?id=http://ustwo.com/blog/${pid}`,
      external: 'facebook',
      type: 'facebookShares',
      slug: pid,
      failure: response => console.log('Failed to fetch Facebook share count', response)
    }, {
      url: `twitter/count?url=https://ustwo.com/blog/${pid}`,
      external: 'twitter',
      type: 'twitterShares',
      slug: pid,
      failure: response => console.log('Failed to fetch Twitter share count', response)
    }]
  },
  legal: {
    id: 'legal',
    pattern: '/legal',
    statusCode: 200,
    data: () => [{
      url: 'ustwo/v1/pages/legal',
      type: 'page',
      slug: 'legal'
    }]
  },
  privacy: {
    id: 'privacy',
    pattern: '/privacy',
    statusCode: 200,
    data: () => [{
      url: 'ustwo/v1/pages/privacy',
      type: 'page',
      slug: 'privacy'
    }]
  },
  joinUs: {
    id: 'join-us',
    pattern: '/join-us',
    status: 200,
    data: () => [{
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
