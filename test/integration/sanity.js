'use strict';

import wd from 'wd';
import chai from 'chai';
import chaiAsPromised from'chai-as-promised';

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// browser capabilities
const desireds = {
  firefox: {browserName: 'firefox'},
  chrome: {browserName: 'chrome'},
  explorer: {browserName: 'internet explorer'}
};

// http configuration, not needed for simple runs
wd.configureHttp( {
  timeout: 60000,
  retryDelay: 15000,
  retries: 5
});

// building desired capability
let browserKey = process.env.BROWSER || 'explorer';
let desired = desireds[browserKey];
desired.name = 'testing with ' + browserKey;
desired.tags = ['integration'];

describe('  mocha integration tests (' + desired.browserName + ')', function () {
  this.timeout(100000);
  let browser;
  let allPassed = true;

  function openMobileMenu() {
    if (browser.hasElementByCss('.nav__open-overlay-button') && browser.elementByCss('.nav__open-overlay-button').isVisible) {
      browser.elementByCss('.nav__open-overlay-button').click();
    }
  }

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
      .setWindowSize(1280, 720);
  });

  // need to keep it `function`, otherwise `this.currentTest` is undefined
  afterEach(function () {
    allPassed = allPassed && (this.currentTest.state === 'passed');
  });

  after(() => {
    browser
      .quit()
      .sauceJobStatus(allPassed);
  });

  it('should load home page', () => {
    browser
      .get('https://local.ustwo.com')
      .title()
      .should.become('ustwo | Digital product studio')
  });

  it('should close overlay if present', () => {
    if (browser.hasElementByCss('.takeover')) {
      return browser
        .waitForElementByCss('.take-over .close-button', 20000)
        .click()
        .elementByCss('.app__modal')
        .should.eventually.not.hasElementByCss('.take-over');
    } else {
      return browser;
    }
  });

  it('should contain London in footer', () => {
    browser
      .elementByCss('.studios')
      .text()
      .should.eventually.include('London')
  });

  it('should go to the Blog page and look for Featured post', () => {
    openMobileMenu();
    browser
      .waitForElementByLinkText('Blog', 3000)
      .click()
      .waitForElementByCss('.blog-post-list-item.featured', wd.asserters.textInclude('Read more'), 10000)
      .url().should.eventually.include('blog');
  });

  it('should return to the home page', () => {
    browser
      .elementByCss('.navigation .logo a')
      .click()
      .waitForElementByCss('.page-home', wd.asserters.textInclude('DIGITAL PRODUCT STUDIO'), 10000);
  });

  it('should go to the Join us page and look for job listings', () => {
    openMobileMenu();
    browser
      .waitForElementByLinkText('Join Us', 3000)
      .click()
      .waitForElementByCss('.jobs-container', wd.asserters.textInclude('More info'), 10000)
      .url().should.eventually.include('join');
  });

  it('should go to the What We Do page and look for case studies', () => {
    browser
      .get('https://ustwo.com/what-we-do')
      .waitForElementByCss('.page-work work-item', wd.asserters.textInclude('Read more'), 10000)
      .url().should.eventually.include('what');
  });
});
