'use strict';

import wd from 'wd';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// WebDriver browser instance
let browser;

// browser capabilities
const desireds = {
  firefox: {browserName: 'firefox'},
  chrome: {browserName: 'chrome'},
  explorer: {browserName: 'internet explorer', version:'10'}
};

// http configuration, not needed for simple runs
wd.configureHttp( {
  timeout: 60000,
  retryDelay: 15000,
  retries: 5
});

// building desired capability
const browserKey = process.env.BROWSER || 'explorer';
let desired = desireds[browserKey];
desired.name = 'testing with ' + browserKey;
desired.tags = ['integration'];

// selectors and strings
const navigationToggle = '.navigation .navigation-toggle';
const navigationOverlay = '.navigation-overlay';
const navigationDesktopMenu = '.navigation .menu';
const takeover = '.takeover';
const baseURL = 'https://local.ustwo.com';
const homeTitle = 'ustwo | Digital product studio';
const takeoverClose = '.take-over .close-button';
const modal = '.app__modal';
const takeoverModal = '.take-over';
const footer = '.footer';
const studios = '.studios';
const studio = 'London';
const blogLink = 'Blog';
const featuredBlogPost = '.blog-post-list-item.featured';
const blogReadmore = 'Read more';
const blogSlug = 'blog';
const logoLink = '.navigation .logo a';
const pageHome = '.page-home';
const homeHeadline = 'DIGITAL PRODUCT STUDIO';
const joinLink = 'Join Us';
const jobsList = '.jobs-container';
const jobMoreinfo = 'More info';
const joinSlug = 'join';
const workURL = baseURL + '/what-we-do';
const workItem = '.page-work .work-item';
const workReadmore = 'Read more';
const workSlug = 'what';

// helpers
function openPageByMenuLink(linkText) {
  return browser
    .elementByCss(navigationToggle).isDisplayed(function (err, isVisible) {
      // here we need to break out of the promise chain for this callback to be able to
      // check for the presence of the takeover without failing the test...
      if (err === null) {
        return browser.elementByCss(navigationToggle)
          .click()
          .waitForElementByCss(navigationOverlay)
          .elementByLinkText(linkText)
          .click();
      }
    }).catch(() => {
      // ...but we also need to catch and absorb the error
      return browser.elementByCss(navigationDesktopMenu).isDisplayed();
    });
}

describe('  mocha integration tests (' + desired.browserName + ')', function () {
  this.timeout(100000);
  let allPassed = true;

  before(() => {
    let username = process.env.SAUCE_USERNAME;
    let accessKey = process.env.SAUCE_ACCESS_KEY;
    browser = wd.promiseChainRemote('ondemand.saucelabs.com', 80, username, accessKey);
    if (process.env.VERBOSE) {
      // optional logging
      browser.on('status', info => console.log(info));
      browser.on('command', (meth, path, data) => console.log(' > ' + meth, path, data || ''));
    }
    return browser
      .init(desired)
      .setPageLoadTimeout(30000)
      .setWindowSize(1280, 720);
  });

  beforeEach(() => {
    return browser
      .setWindowSize(1280, 720);
  });

  // need to keep it `function`, otherwise `this.currentTest` is undefined
  afterEach(function () {
    allPassed = allPassed && (this.currentTest.state === 'passed');
  });

  after(() => {
    return browser
      .quit()
      .sauceJobStatus(allPassed);
  });

  it('should load home page', () => {
    return browser
      .get(baseURL)
      .title()
      .should.become(homeTitle);
  });

  it('should close overlay if present', () => {
      return browser
        .elementByCss(takeover, function (err, el) {
          // here we need to break out of the promise chain for this callback to be able to
          // check for the presence of the takeover without failing the test...
          if (err === null) {
            return browser.waitForElementByCss(takeoverClose, 30000)
              .click()
              .elementByCss(modal)
              .should.eventually.not.hasElementByCss(takeoverModal);
          }
        }).catch(() => {
          // ...but we also need to catch and absorb the error
          return browser.waitForElementByCss(footer).isDisplayed();
        });
  });

  it('should contain London in footer', () => {
    return browser
      .elementByCss(studios)
      .text()
      .should.eventually.include(studio);
  });

  it('should go to the Blog page and look for Featured post', () => {
    return openPageByMenuLink(blogLink)
      .waitForElementByCss(featuredBlogPost, wd.asserters.textInclude(blogReadmore), 10000)
      .url().should.eventually.include(blogSlug);
  });

  it('should return to the home page', () => {
    return browser
      .elementByCss(logoLink)
      .click()
      .waitForElementByCss(pageHome, wd.asserters.textInclude(homeHeadline), 10000);
  });

  it('should go to the Join us page and look for job listings', () => {
    return openPageByMenuLink(joinLink)
      .waitForElementByCss(jobsList, wd.asserters.textInclude(jobMoreinfo), 10000)
      .url().should.eventually.include(joinSlug);
  });

  it('should go to the What We Do page and look for case studies', () => {
    return browser
      .get(workURL)
      .waitForElementByCss(workItem, wd.asserters.textInclude(workReadmore), 10000)
      .url().should.eventually.include(workSlug);
  });
});
