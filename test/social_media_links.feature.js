process.env.NODE_ENV = 'test';

const app = require('../index');
const Browser = require('zombie');
const assert = require('assert');

describe('upcoming events', function() {
  var route = {name:'landing' ,path: '/'};
  var expected_contents = [
    {name:'Facebook Item', expected: 'fbicon'},
    {name:'Twitter Item', expected: 'twittericon'},
    {name:'Instagram Item', expected: 'instaicon'}
  ]
  
  before(function() {
    this.server  = app.listen(2000)
    this.browser = new Browser({site: 'http://localhost:2000'})
  });
  
  describe('Checking '+route.name+' page for social media links',function() {
    before(function(done) {
      this.browser.visit(route.path, done);
    });
    it(route.name+' page should load', function() {
      assert.ok(this.browser.success);
    });
  });
  
  describe('social media contents', function() {
    describe('Checking Existance of each social media item on the landing page', function() {
      expected_contents.forEach(function(item) {
        it('should contain "'+item.name+'"', function() {
          assert(this.browser.html('img#'+item.expected))
        });
      });
    });
  });

  after(function(done) {
    this.server.close(done)
  });
});