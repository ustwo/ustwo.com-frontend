import Actions from './actions';

const handlers = {
  home() {
    Actions.goTo('home');
  },
  work() {
    Actions.goTo('work');
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
    pattern: '/work',
    handler: handlers.work
  }
};

export default routes;
