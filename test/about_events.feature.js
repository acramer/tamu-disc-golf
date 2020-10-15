/*
  This file consists of test case to check the existence of:
  (a) Welcome statement
  (b) About Us section
  (c) Upcoming events section
*/

process.env.NODE_ENV = 'test';

const app = require('../index');
const Browser = require('zombie');
const assert = require('assert');

describe('upcoming events', function() {
  var route = {name:'landing' ,path: '/'};
  var expected_contents = [
    {name:'Welcome Item', expected: 'Welcome to TAMU Disc Golf Club'},
    {name:'Upcoming Event Item', expected: 'Upcoming Events'},
    {name:'About Us Item', expected: 'About Us'}
  ]

  before(function() {
    this.server  = app.listen(2000)
    this.browser = new Browser({site: 'http://localhost:2000'})
  });

  describe('Checking '+route.name+' page for upcoming events',function() {
    before(function(done) {
      this.browser.visit(route.path, done);
    });
    it(route.name+' page should load', function() {
      assert.ok(this.browser.success);
    });
  });

  describe('landing page contents', function() {
    before(function() {
      rawDiv = this.browser.html('div');
      processedDiv = rawDiv.replace(/</g,'>').split('>').map(function(item) {return item.trim()})
    });
    describe('Checking Existance of each item of the landing page', function() {
      expected_contents.forEach(function(item) {
        it('should contain "'+item.name+'"', function() {
            assert(processedDiv.indexOf(item.expected) > -1)
        });
      });
    });
  });

  after(function(done) {
    this.server.close(done)
  });
});