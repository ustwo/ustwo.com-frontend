var wd = require('wd');
require('colors');
var _ = require('lodash');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// browser capabilities
var DESIREDS = {
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
var browserKey = process.env.BROWSER || 'explorer';
var desired = DESIREDS[browserKey];
desired.name = 'testing with ' + browserKey;
desired.tags = ['integration'];

describe('  mocha integration tests (' + desired.browserName + ')', function() {
  this.timeout(60000);
  var browser;
  var allPassed = true;

  before(function() {
    var username = process.env.SAUCE_USERNAME;
    var accessKey = process.env.SAUCE_ACCESS_KEY;
    browser = wd.promiseChainRemote('ondemand.saucelabs.com', 80, username, accessKey);
    if(process.env.VERBOSE){
      // optional logging
      browser.on('status', function(info) {
        console.log(info.cyan);
      });
      browser.on('command', function(meth, path, data) {
        console.log(' > ' + meth.yellow, path.grey, data || '');
      });
    }
    return browser
      .init(desired)
      .setWindowSize(1280, 720);
  });

  afterEach(function() {
    allPassed = allPassed && (this.currentTest.state === 'passed');
  });

  after(function() {
    return browser
      .quit()
      .sauceJobStatus(allPassed);
  });

  it('should load home page', function() {
    return browser
      .get('https://ustwo.com')
      .title()
      .should.become('ustwo | Digital product studio')
  });

  it('should close overlay if present', function() {
    if(browser.hasElementByCss('.takeover')) {
      return browser
        .waitForElementByCss('.take-over__content__message__close', 10000)
        .click()
        .elementByCss('.app__modal')
        .should.eventually.not.hasElementByCss('.take-over');
    } else {
      return browser;
    }
  });

  it('should contain London in footer', function() {
    return browser
      .elementByCss('.studios')
      .text()
      .should.eventually.include('London')
  });

  it('should go to the Blog page and look for Featured post', function() {
    return browser
      .elementByLinkText('Blog')
      .click()
      .waitForElementByCss('.blog-post-list-item.featured', wd.asserters.textInclude('Read more'), 10000)
      .url().should.eventually.include('blog');
  });

  it('should return to the home page', function() {
    return browser
      .elementByCss('.nav__logo__link')
      .click()
      .waitForElementByCss('.page-home', wd.asserters.textInclude('DIGITAL PRODUCT STUDIO'), 10000);
  });

  it('should go to the Join us page and look for job listings', function() {
    return browser
      .elementByLinkText('Join Us')
      .click()
      .waitForElementByCss('.jobs-container', wd.asserters.textInclude('More info'), 10000)
      .url().should.eventually.include('join');
  });

  it('should go to the What We Do page and look for case studies', function() {
    return browser
      .get('https://ustwo.com/what-we-do')
      .waitForElementByCss('.page-work__list', wd.asserters.textInclude('Read more'), 10000)
      .url().should.eventually.include('what');
  });

});

