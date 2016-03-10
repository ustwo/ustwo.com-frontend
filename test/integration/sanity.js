'use strict';

import wd from 'wd';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const Q = wd.Q;

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// WebDriver browser instance
let browser;

// browser capabilities
// TODO: we should check Android later, seems currently (November 2015) Sauce
// Labs is having some problems with launching Android emulator fast enough or
// supporting setting a timeout long enough so that we don't intermittently
// get failing tests
const desireds = {
  firefox: {
    browserName: 'firefox',
    platform: 'OS X 10.10',
    screenResolution: '1280x1024'
  },
  chrome: {
    browserName: 'chrome',
    platform: 'Windows 10',
    screenResolution: '1280x1024'
  },
  explorer: {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    screenResolution: '1280x1024',
    version: '10'
  },
  android: {
    browserName: 'android',
    platform: 'Linux',
    deviceOrientation: 'portrait',
    version: '4.4'
  }
};

// http configuration, not needed for simple runs
wd.configureHttp( {
  timeout: 60000,
  retryDelay: 15000,
  retries: 5
});

// building desired capability
const browserKey = process.env.BROWSER || 'explorer';
const proxyName = process.env.PROXY_NAME;
let desired = desireds[browserKey];
desired.name = 'testing with ' + browserKey;
desired.tags = ['integration'];
desired.tunnelIdentifier = process.env.TUNNEL || 'nouser';

// selectors and strings
const navigation = '.navigation';
const navigationToggle = navigation + ' .navigation-toggle';
const navigationOverlay = '.navigation-overlay';
const navigationDesktopMenu = navigation + ' .menu';
const baseURL = 'http://' + proxyName;
const homeTitle = 'ustwo | Digital product studio';
const takeover = '.takeover';
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
const joinLink = 'Join';
const jobsPage = '.page-container';
const jobOpenings = 'WE\'RE HIRING';
const joinSlug = 'join';
const workURL = baseURL + '/what-we-do';
const workItem = '.page-work .work-item';
const workReadmore = 'Read more';
const workSlug = 'what';
const sandboxURL = baseURL + '/sandbox';
const sandboxComponentList = 'body > ol';
const sandboxComponentName = 'blog';
const sandboxSlug = 'sandbox';
const badURL = baseURL + '/blog/press/asdf';
const page404 = '.page-404';

// helpers
wd.addPromiseChainMethod('openPageByMenuLink', (linkText) => {
  return browser
    .elementByCss(navigationToggle)
    .isDisplayed()
    .then((isDisplayed) => {
      if (isDisplayed) {
        console.log('We have a mobile menu so need to open it first...');
        return browser
          .elementByCss(navigationToggle)
          .click()
          .waitForElementByPartialLinkText(linkText.toUpperCase(), 5000)
          .click();
      } else {
        console.log('We are on desktop resolution now, no need to open mobile menu!');
        return browser
          .elementByPartialLinkText(linkText)
          .click();
      }
    });
});

wd.addPromiseChainMethod('closeTakeoverIfPresent', () => {
  return browser
    .elementByCss(takeover)
    .then(() => {
      console.log('We have a takeover so need to close it first...')
      return browser
        .waitForElementByCss(takeoverClose, 30000)
        .click()
        .elementByCss(modal)
        .should.eventually.not.hasElementByCss(takeoverModal);
    }, () => {
      console.log('We don\'t have a takeover right now, carrying on!')
      return browser;
    });
});

describe('  mocha integration tests (' + desired.browserName + ')', function () {
  this.timeout(200000);
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
    if (desired.browserName === 'android') {
      return browser
        .init(desired);
    } else {
      return browser
        .init(desired)
        .setPageLoadTimeout(100000)
        .setWindowSize(1200, 900);
    }
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
      .waitForElementByCss(navigation, 100000)
      .title()
      .should.become(homeTitle)
      .closeTakeoverIfPresent()
      .waitForElementByCss(footer)
      .isDisplayed();
  });

  it('should contain London in footer', () => {
    return browser
      .elementByCss(studios)
      .text()
      .should.eventually.include(studio);
  });

  it('should go to the Blog page and look for Featured post', () => {
    return browser
      .openPageByMenuLink(blogLink)
      .waitForElementByCss(featuredBlogPost, wd.asserters.textInclude(blogReadmore), 15000)
      .url().should.eventually.include(blogSlug);
  });

  it('should return to the home page', () => {
    if (desired.browserName !== 'android') {
      browser.setWindowSize(800, 600)
    }
    return browser
      .elementByCss(logoLink)
      .click()
      .waitForElementByCss(pageHome, wd.asserters.textInclude(homeHeadline), 10000);
  });

  it('should go to the Join us page and look for job listing title', () => {
    return browser
      .openPageByMenuLink(joinLink)
      .waitForElementByCss(jobsPage, wd.asserters.textInclude(jobOpenings), 15000)
      .url().should.eventually.include(joinSlug);
  });

  it('should go to the What We Do page and look for case studies', () => {
    return browser
      .get(workURL)
      .waitForElementByCss(workItem, wd.asserters.textInclude(workReadmore), 15000)
      .url().should.eventually.include(workSlug);
  });

  it('should go to the Sandbox page and look for the component list', () => {
    return browser
      .get(sandboxURL)
      .waitForElementByCss(sandboxComponentList, wd.asserters.textInclude(sandboxComponentName), 15000)
      .url().should.eventually.include(sandboxSlug);
  });

  it('should go to a non-existent page and get 404', () => {
    return browser
      .get(badURL)
      .waitForElementByCss(page404, 15000);
  });
});
