process.env.NODE_ENV = 'test';

const app = require('../index');
const Browser = require('zombie');
const assert = require('assert');


describe('navigation bar', function() {
  var valid_routes = [
    {name:'landing'   ,path: '/'             ,},
    {name:'officers'  ,path: '/officers'     ,},
    {name:'teams'     ,path: '/teams'        ,},
    {name:'courses'   ,path: '/courses'      ,},
    {name:'news'      ,path: '/news'         ,},
    {name:'lostfound' ,path: '/lostandfound' ,},
  ];

  var expected_contents = [
    {name:'Club Name Item'        ,expected: 'TAMU Disc Golf'     ,},
    {name:'Competitive Teams'     ,expected: 'Competitive Teams'  ,},
    {name:'Officers'              ,expected: 'Officers'           ,},
    {name:'Local Courses'         ,expected: 'Local Courses'      ,},
    {name:'Lost & Found'          ,expected: 'Lost &amp; Found'   ,},
    {name:'News/Recent Events'    ,expected: 'News/Recent Events' ,},
    {name:'Log in Item'           ,expected: 'Log In'             ,},
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
      this.browser.visit('/', done);
    });
    before(function() {
      rawNav = this.browser.html('nav');
      processedNav = rawNav.replace(/</g,'>').split('>').map(function(item) {return item.trim()})
    });
    describe('Checking Existance of each item of the navbar', function() {
      expected_contents.forEach(function(item) {
        it('should contain "'+item.name+'"', function() {
            assert(processedNav.indexOf(item.expected) > -1)
        });
      });
    });
    describe('Checking order of each item of the navbar', function() {
      for (i = 1; i < expected_contents.length; i++) {
        name1 = expected_contents[i-1].name
        name2 = expected_contents[i].name
        val1 = expected_contents[i-1].expected
        val2 = expected_contents[i].expected
        it('should contain "'+name1+'" before "'+name2+'"', function() {
            assert(processedNav.indexOf(val1) < processedNav.indexOf(val2))
        });
      }
    });
  });

  after(function(done) {
    this.server.close(done)
  });
});
