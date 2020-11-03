process.env.NODE_ENV = 'test';

const app = require('../index');
const Browser = require('zombie');
const assert = require('assert');

describe('lost and found', function() {
  var route = {name:'page' ,path: '/lostandfound'};
  var expected_contents = [
    // Check if the lost and found image is present
    {name:'Image', expected: 'img#lfimage'},
    // Check if there is at least one card describing a lost and found item
    {name:'Card', expected: 'div.card'},
  ]
  
  before(function() {
    this.server  = app.listen(2000)
    this.browser = new Browser({site: 'http://localhost:2000'})
  });
  
  describe('Checking '+route.name+' lost and found items',function() {
    before(function(done) {
      this.browser.visit(route.path, done);
    });
    it(route.name+' page should load', function() {
      assert.ok(this.browser.success);
    });
  });
  
  describe('lost and found elements', function() {
    describe('Checking Existance of each required item', function() {
      expected_contents.forEach(function(item) {
        it('should contain "'+item.name+'"', function() {
          assert(this.browser.html(item.expected))
        });
      });
    });
  });

  after(function(done) {
    this.server.close(done)
  });
});