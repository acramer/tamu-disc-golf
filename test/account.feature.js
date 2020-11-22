process.env.NODE_ENV = 'test';

const app = require('../index');
const Browser = require('zombie');
const assert = require('assert');


describe('Account Features', function() {

  var registration_sad_paths = [
    {title: 'invalid email format',      name: 'tester',  email:'test',                   password: 'test123',  password2: 'test123',  expected: 'Please enter a valid email address',},
    {title: 'existing email registered', name: 'tester',  email:'testuser@testuser.com',  password: 'test123',  password2: 'test123',  expected: 'Email already registered',},
    {title: 'invalid password format',   name: 'tester',  email:'test@test.test',         password: 'test12',   password2: 'test12',   expected: 'Passwords must be longer than 6 characters',},
    {title: 'password discrepancy',      name: 'tester',  email:'test@test.test',         password: 'test123',  password2: 'test321',  expected: 'Passwords do not match',},
  ];

  var users = {
    valid_admin:  {email:'bmueck@tamu.edu',            password:'password'},
    invalid_user: {email:'invalid@email.com',          password:'password'},
    valid_user:   {name:'TestUser', email:'testuser@testuser.com',  password:'password'},
    created_user: {name:'test',     email:'test@test.test',         password:'Password1'},
  }

  before(function() {
    this.server  = app.listen(2000)
    this.browser = new Browser({site: 'http://localhost:2000'})
  });


  describe('Account Creation', function() {
    before(function(done) {
      this.browser.visit('/register', done);
    });
    it('Register page should load', function() {
      assert.ok(this.browser.success);
    });

    // Sad Paths
    describe('Checking Sad Paths', function() {
      registration_sad_paths.forEach(function(item) {
        describe('Checking '+item.title, function() {
          before(function(done) {
            this.browser
                                      .fill('name',      item.name)
              .then(() => this.browser.fill('email',     item.email))
              .then(() => this.browser.fill('password',  item.password))
              .then(() => this.browser.fill('password2', item.password2))
              .then(() => this.browser.pressButton('Register', done));
          });
          before(function() {
            raw = this.browser.html();
            processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()})
          });
          it('should stay on the "register" page and display the proper error message', function() {
              assert(processed.indexOf(item.expected) > -1)
          });
        });
      });
    });

    // Happy Path
    describe('Checking registration attempt with proper values (Happy Path)', function() {
      before(function(done) {
        this.browser
                                  .fill('name',      users.created_user.name)
          .then(() => this.browser.fill('email',     users.created_user.email))
          .then(() => this.browser.fill('password',  users.created_user.password))
          .then(() => this.browser.fill('password2', users.created_user.password))
          .then(() => this.browser.pressButton('Register', done));
      });
      before(function() {
        raw = this.browser.html();
        processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()})
      });
      it('should redirect to the "login" page', function() {
          assert(processed.indexOf('Login') > -1)
      });
      it('should display the "Registation Success"', function() {
          assert(processed.indexOf('Registration Successful') > -1)
      });
    });
  });

  describe('Account Log In and Log Out', function() {
    before(function(done) {
      this.browser.visit('/login', done);
    });
    it('Register page should load', function() {
      assert.ok(this.browser.success);
    });

    // Sad Path
    describe('Checking Log In attempt for non-existent account', function() {
      before(function(done) {
        this.browser
                                  .fill('email',     users.invalid_user.email)
          .then(() => this.browser.fill('password',  users.invalid_user.password))
          .then(() => this.browser.pressButton('Login', done));
      });
      before(function() {
        raw = this.browser.html();
        processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()})
      });
      it('should stay on "login" page', function() {
          assert(processed.indexOf('Login') > -1)
      });
      it('should display error message', function() {
          assert(processed.indexOf('Email Password Combination is incorrect') > -1)
      });
    });

    // Happy Paths
    describe('Checking Log In attempt for existing account', function() {
      before(function(done) {
        this.browser
                                  .fill('email',     users.created_user.email)
          .then(() => this.browser.fill('password',  users.created_user.password))
          .then(() => this.browser.pressButton('Login', done));
      });
      before(function() {
        raw = this.browser.html();
        processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()})
      });
      it('should redirect to "profile" page', function() {
          assert(processed.indexOf(users.created_user.name) > -1)
      });
    });
    describe('Checking Log Out attempt for Logged In user', function() {
      before(function(done) {
        this.browser
                                  .click('#navbarDropdownProfile')
          .then(() => this.browser.clickLink('Log Out', done));
      });
      before(function() {
        raw = this.browser.html();
        processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()})
      });
      it('should redirect to "Login" page', function() {
          assert(processed.indexOf('Login') > -1)
      });
    });
  });

  describe('Admin Accout Dropdown', function() {
    before(function(done) {
      this.browser.visit('/login', done);
    });
    it('Register page should load', function() {
      assert.ok(this.browser.success);
    });

    // Sad Path
    describe('Checking Member "Admin" button display', function() {
      before(function(done) {
        this.browser
                                  .fill('email',     users.valid_user.email)
          .then(() => this.browser.fill('password',  users.valid_user.password))
          .then(() => this.browser.pressButton('Login'))
          .then(() => this.browser.click('#navbarDropdownProfile', done));
      });
      before(function() {
        raw = this.browser.html();
        processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()})
      });
      it('should not display "Admin" button', function() {
          assert(processed.indexOf('Admin') == -1)
      });


      after(function(done) {
        this.browser
                                  .click('#navbarDropdownProfile')
          .then(() => this.browser.clickLink('Log Out', done));
      });
    });

    // Happy Paths
    describe('Checking Admin "Admin" button display', function() {
      before(function(done) {
        this.browser
                                  .fill('email',     users.valid_admin.email)
          .then(() => this.browser.fill('password',  users.valid_admin.password))
          .then(() => this.browser.pressButton('Login', done))
          .then(() => this.browser.click('#navbarDropdownProfile'));
      });
      before(function() {
        raw = this.browser.html();
        processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()})
      });
      it('should display admin', function() {
          assert(processed.indexOf('Admin') > -1)
      });
      after(function(done) {
        this.browser
                                  .click('#navbarDropdownProfile')
          .then(() => this.browser.clickLink('Log Out', done));
      });
    });
  });

  describe('Edit Profile', function() {
    describe('Edit Profile Picture', function() {
      before(function(done) {
        this.browser
                                  .fill('email',     users.created_user.email)
          .then(() => this.browser.fill('password',  users.created_user.password))
          .then(() => this.browser.pressButton('Login'))
          .then(() => this.browser.visit('/editprofilepic'))
          .then(() => this.browser.fill('profile_pic',  'test'))
          .then(() => this.browser.pressButton('Update Profile Picture', done));
      });
      before(function() {
        raw = this.browser.html();
        processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()});
      });
      it('should redirect to "Profile" page', function() {
          assert(processed.indexOf(users.created_user.name) > -1);
      });
      it('should display success message', function() {
          assert(processed.indexOf('Profile Picture Change Successful') > -1);
      });
      after(function(done) {
        this.browser
                                  .click('#navbarDropdownProfile')
          .then(() => this.browser.clickLink('Log Out', done));
      });
    });
    describe('Edit Profile', function() {
      describe('Invalid Email Format (Sad Path)', function() {
        before(function(done) {
          this.browser
                                    .fill('email',     users.created_user.email)
            .then(() => this.browser.fill('password',  users.created_user.password))
            .then(() => this.browser.pressButton('Login'))
            .then(() => this.browser.visit('/editprofile'))
            .then(() => this.browser.fill('name',  'newname'))
            .then(() => this.browser.fill('email', 'invalidemailformat'))
            .then(() => this.browser.fill('about', 'newabout'))
            .then(() => this.browser.pressButton('Update Profile', done));
        });
        before(function() {
          raw = this.browser.html();
          processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()});
        });
        it('should stay on "Update Profile" page', function() {
            assert(processed.indexOf('Update Profile') > -1);
        });
        it('should display error message', function() {
            assert(processed.indexOf('Please enter a valid email address') > -1);
        });
        after(function(done) {
          this.browser
                                    .click('#navbarDropdownProfile')
            .then(() => this.browser.clickLink('Log Out', done));
        });
      });
      describe('Existing Email of Another Member Entered (Sad Path)', function() {
        before(function(done) {
          this.browser
                                    .fill('email',     users.created_user.email)
            .then(() => this.browser.fill('password',  users.created_user.password))
            .then(() => this.browser.pressButton('Login'))
            .then(() => this.browser.visit('/editprofile'))
            .then(() => this.browser.fill('name',  'newname'))
            .then(() => this.browser.fill('email', users.valid_user.email))
            .then(() => this.browser.fill('about', 'newabout'))
            .then(() => this.browser.pressButton('Update Profile', done));
        });
        before(function() {
          raw = this.browser.html();
          processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()});
        });
        it('should stay on "Update Profile" page', function() {
            assert(processed.indexOf('Update Profile') > -1);
        });
        it('should display error message', function() {
            assert(processed.indexOf('Email registered with another user') > -1);
        });
        after(function(done) {
          this.browser
                                    .click('#navbarDropdownProfile')
            .then(() => this.browser.clickLink('Log Out', done));
        });
      });
      describe('Correct Input (Happy Path)', function() {
        before(function(done) {
          this.browser
                                    .fill('email',     users.created_user.email)
            .then(() => this.browser.fill('password',  users.created_user.password))
            .then(() => this.browser.pressButton('Login'))
            .then(() => this.browser.visit('/editprofile'))
            .then(() => this.browser.fill('name',  'newname'))
            .then(() => this.browser.fill('email', users.created_user.email))
            .then(() => this.browser.fill('about', 'newabout'))
            .then(() => this.browser.pressButton('Update Profile', done));
        });
        before(function() {
          raw = this.browser.html();
          processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()});
        });
        it('should redirect to "Profile" page', function() {
          assert(processed.indexOf('newname') > -1);
        });
        it('should display success message', function() {
            assert(processed.indexOf('Profile Update Successful') > -1);
        });
        after(function(done) {
          this.browser
                                    .click('#navbarDropdownProfile')
            .then(() => this.browser.clickLink('Log Out', done));
        });
      });
    });
    describe('Change Password', function() {
      // Sad Paths (Memember)
      describe('Checking Invalid Passwords (Sad Path)', function() {
        before(function(done) {
          this.browser
                                    .fill('email',     users.created_user.email)
            .then(() => this.browser.fill('password',  users.created_user.password))
            .then(() => this.browser.pressButton('Login'))
            .then(() => this.browser.visit('/changepassword'))
            .then(() => this.browser.fill('current_password',  'notCurrentPassword'))
            .then(() => this.browser.fill('password',  users.created_user.password))
            .then(() => this.browser.fill('password2',  users.created_user.password))
            .then(() => this.browser.pressButton('Update Password', done));
        });
        before(function() {
          raw = this.browser.html();
          processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()});
        });
        it('should stay on "Change Password" page', function() {
            assert(processed.indexOf('Change Password') > -1);
        });
        it('should display error message', function() {
            assert(processed.indexOf('Current Password is incorrect') > -1);
        });
        after(function(done) {
          this.browser
                                    .click('#navbarDropdownProfile')
            .then(() => this.browser.clickLink('Log Out', done));
        });
      });
      describe('Checking Invalid Password length (Sad Path)', function() {
        before(function(done) {
          this.browser
                                    .fill('email',     users.created_user.email)
            .then(() => this.browser.fill('password',  users.created_user.password))
            .then(() => this.browser.pressButton('Login'))
            .then(() => this.browser.visit('/changepassword'))
            .then(() => this.browser.fill('current_password',  users.created_user.password))
            .then(() => this.browser.fill('password',  'short'))
            .then(() => this.browser.fill('password2',  'short'))
            .then(() => this.browser.pressButton('Update Password', done));
        });
        before(function() {
          raw = this.browser.html();
          processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()});
        });
        it('should stay on "Change Password" page', function() {
            assert(processed.indexOf('Change Password') > -1);
        });
        it('should display error message', function() {
            assert(processed.indexOf('Passwords must be longer than 6 characters') > -1);
        });
        after(function(done) {
          this.browser
                                    .click('#navbarDropdownProfile')
            .then(() => this.browser.clickLink('Log Out', done));
        });
      });
      describe('Checking Invalid Passwords (Sad Path)', function() {
        before(function(done) {
          this.browser
                                    .fill('email',     users.created_user.email)
            .then(() => this.browser.fill('password',  users.created_user.password))
            .then(() => this.browser.pressButton('Login'))
            .then(() => this.browser.visit('/changepassword'))
            .then(() => this.browser.fill('current_password',  users.created_user.password))
            .then(() => this.browser.fill('password',  'notCurrentPassword'))
            .then(() => this.browser.fill('password2',  users.created_user.password))
            .then(() => this.browser.pressButton('Update Password', done));
        });
        before(function() {
          raw = this.browser.html();
          processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()});
        });
        it('should stay on "Change Password" page', function() {
            assert(processed.indexOf('Change Password') > -1);
        });
        it('should display error message', function() {
            assert(processed.indexOf('Passwords do not match') > -1);
        });
        after(function(done) {
          this.browser
                                    .click('#navbarDropdownProfile')
            .then(() => this.browser.clickLink('Log Out', done));
        });
      });
      // Happy Path
      describe('Checking Correct Parameters', function() {
        before(function(done) {
          this.browser
                                    .fill('email',     users.valid_user.email)
            .then(() => this.browser.fill('password',  users.valid_user.password))
            .then(() => this.browser.pressButton('Login'))
            .then(() => this.browser.visit('/changepassword'))
            .then(() => this.browser.fill('current_password',  users.valid_user.password))
            .then(() => this.browser.fill('password',  'password'))
            .then(() => this.browser.fill('password2',  'password'))
            .then(() => this.browser.pressButton('Update Password', done));
        });
        before(function() {
          raw = this.browser.html();
          processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()});
        });
        it('should redirect to "Profile" page', function() {
            assert(processed.indexOf(users.valid_user.name) > -1);
        });
        it('should display success message', function() {
            assert(processed.indexOf('Password Update Successful') > -1);
        });
        after(function(done) {
          this.browser
                                    .click('#navbarDropdownProfile')
            .then(() => this.browser.clickLink('Log Out', done));
        });
      });
    });
  });

  describe('Accout Deletion', function() {
    // Sad Path (Admin)
    describe('Checking only Admin cannot delete account (Sad Path)', function() {
      before(function(done) {
        this.browser
                                  .fill('email',     users.valid_admin.email)
          .then(() => this.browser.fill('password',  users.valid_admin.password))
          .then(() => this.browser.pressButton('Login'))
          .then(() => this.browser.visit('/deleteprofile'))
          .then(() => this.browser.fill('password',  users.valid_admin.password))
          .then(() => this.browser.pressButton('Delete Profile', done));
      });
      before(function() {
        raw = this.browser.html();
        processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()});
      });
      it('should stay on "Delete Account" page', function() {
          assert(processed.indexOf('Delete Account') > -1);
      });
      it('should display error message', function() {
          assert(processed.indexOf('Cannot Delete Only Admin Account') > -1);
      });
      after(function(done) {
        this.browser
                                  .click('#navbarDropdownProfile')
          .then(() => this.browser.clickLink('Log Out', done));
      });
    });
    // Sad Path (Members)
    describe('Checking only Admin cannot delete account (Sad Path)', function() {
      before(function(done) {
        this.browser
                                  .fill('email',     users.valid_user.email)
          .then(() => this.browser.fill('password',  users.valid_user.password))
          .then(() => this.browser.pressButton('Login'))
          .then(() => this.browser.visit('/deleteprofile'))
          .then(() => this.browser.fill('password',  'incorrectpassword'))
          .then(() => this.browser.pressButton('Delete Profile', done));
      });
      before(function() {
        raw = this.browser.html();
        processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()});
      });
      it('should stay on "Delete Account" page', function() {
          assert(processed.indexOf('Delete Account') > -1);
      });
      it('should display error message', function() {
          assert(processed.indexOf('Password is incorrect') > -1);
      });
      after(function(done) {
        this.browser
                                  .click('#navbarDropdownProfile')
          .then(() => this.browser.clickLink('Log Out', done));
      });
    });

    // Happy Path
    describe('Checking member accout deletion', function() {
      before(function(done) {
        this.browser
                                  .fill('email',     users.created_user.email)
          .then(() => this.browser.fill('password',  users.created_user.password))
          .then(() => this.browser.pressButton('Login'))
          .then(() => this.browser.visit('/deleteprofile'))
          .then(() => this.browser.fill('password',  users.created_user.password))
          .then(() => this.browser.pressButton('Delete Profile', done));
      });
      before(function() {
        raw = this.browser.html();
        processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()});
      });
      it('should redirect to "Login" page', function() {
          assert(processed.indexOf('Login') > -1);
      });
      it('should display success message', function() {
          assert(processed.indexOf('Profile Successfully Deleted') > -1);
      });
      describe('Checking account actually deleted', function() {
        before(function(done) {
          this.browser
                                    .fill('email',     users.created_user.email)
            .then(() => this.browser.fill('password',  users.created_user.password))
            .then(() => this.browser.pressButton('Login', done));
        });
        before(function() {
          raw = this.browser.html();
          processed = raw.replace(/</g,'>').split('>').map(function(item) {return item.trim()});
        });
        it('should stay on "Login" page', function() {
            assert(processed.indexOf('Login') > -1);
        });
        it('should display error message', function() {
            assert(processed.indexOf('Email Password Combination is incorrect') > -1);
        });
      });
    });
  });

  after(function(done) {
    this.server.close(done)
  });
});
