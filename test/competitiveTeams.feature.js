process.env.NODE_ENV = 'test';

const app = require('../index');
const Browser = require('zombie');
const assert = require('assert');


describe('competitive team page', function() {
    var route_landing = {name:'landing' ,path: '/'};
    var route_teams = {name:'competitive_teams' ,path: '/teams'};

  before(function() {
    this.server  = app.listen(2000)
    this.browser = new Browser({site: 'http://localhost:2000'})
  });

  describe('Checking '+route_landing.name+' page for competitive teams tab',function() {
    before(function(done) {
      this.browser.visit(route_landing.path, done);
    });
    it(route_landing.name+' page should load', function() {
      assert.ok(this.browser.success);
    });
  });

  describe('teams page', function() {
    describe(`Checking Existence of ${route_teams.name} page`, function() {
        it(route_teams.name+' page should load', function() {
            assert.ok(this.browser.success);
        });
      });
    });


  after(function(done) {
    this.server.close(done)
  });
});
