process.env.NODE_ENV = 'test';

const app = require('../index');
const Browser = require('zombie');
const assert = require('assert');


describe('navigation bar', function() {
  var valid_routes = [
    {name:'landing',path: '/'                   ,},
  ];

  before(function() {
    this.server  = app.listen(2000)
    this.browser = new Browser({site: 'http://localhost:2000'})
  });

  valid_routes.forEach(function(route) {
    describe('Checking '+route.name+' page for nav bar',function() {
        before(function(done) {
          this.browser.visit(route.path, done);
        });
        it(route.name+' page should load', function() {
          assert.ok(this.browser.success);
        });
        it('should exist on the '+route.name+' page', function() {
          assert(this.browser.text('a.navbar-brand').includes('TAMU Disc Golf'));
        });
    });

  })

  describe('Nav Bar contents', function() {
    before(function(done) {
      this.browser.visit('', done);
    });
    before(function() {
      rawNav = this.browser.html('nav');
      processedNav = rawNav.replace(/</g,'>').split('>').map(function(item) {return item.trim()})
    });
    it('should contain "TAMU Disc Golf"', function() {
        assert(processedNav.indexOf('TAMU Disc Golf') > -1)
    });
    it('should contain "About"', function() {
        assert(processedNav.indexOf('About') > -1)
    });
    it('should contain "Services"', function() {
        assert(processedNav.indexOf('Services') > -1)
    });
    it('should contain "Contact"', function() {
        assert(processedNav.indexOf('Contact') > -1)
    });
    it('should contain "Portfolio"', function() {
        assert(processedNav.indexOf('Portfolio') > -1)
    });
    it('should contain "Blog"', function() {
        assert(processedNav.indexOf('Blog') > -1)
    });
    it('should contain "Other Pages"', function() {
        assert(processedNav.indexOf('Other Pages') > -1)
    });
    it('should contain "TAMU Disc Golf" before "About"', function() {
        assert(processedNav.indexOf('TAMU Disc Golf') < processedNav.indexOf('About'))
    });
    it('should contain "About" before "Services"', function() {
        assert(processedNav.indexOf('About') < processedNav.indexOf('Services'))
    });
    it('should contain "Services" before "Contact"', function() {
        assert(processedNav.indexOf('Services') < processedNav.indexOf('Contact'))
    });
  });

  after(function(done) {
    this.server.close(done)
  });
});
