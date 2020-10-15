process.env.NODE_ENV = 'test';

const app = require('../index');
const Browser = require('zombie');
const assert = require('assert');


describe('log in button', function() {
  before(function() {
    this.server  = app.listen(2000)
    this.browser = new Browser({site: 'http://localhost:2000'})
  });
  before(function(done) {
    this.browser.visit('/client/index.html', done);
  });

  it('Log in button should be on the nav bar', function() {
      rawNav = this.browser.html('nav');
      processedNav = rawNav.replace(/</g,'>').split('>').map(function(item) {return item.trim()})
      assert(processedNav.indexOf('Log In') > -1)
  });

  after(function(done) {
    this.server.close(done)
  });
});
