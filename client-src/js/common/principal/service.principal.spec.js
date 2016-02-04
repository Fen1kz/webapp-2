describe('Principal', () => {
  var $httpBackend, Principal, Storage
    ;

  var userAdmin = {
    login: 'good'
    , token: '$token'
    , scopes: ['auth', 'admin']
  };

  beforeEach(module('rlike'));
  beforeEach(inject(($injector) => {
    $httpBackend = $injector.get('$httpBackend');
    Principal = $injector.get('Principal');
    Storage = $injector.get('Storage');
  }));

  after((() => {
    Storage.clear();
  }));

  it('Should exist', (done) => {
    expect(Principal).to.be.defined;
    done();
  });

  it('Should not be logged in', () => {
    expect(Principal.user).equal(null);
    expect(Principal.checkScope('auth')).equal(false);
  });

  it('Should login', (done) => {
    $httpBackend.expect('POST', '/auth/login', {
      login: userAdmin.login, password: 'password'
    }).respond(201, userAdmin);

    Principal.login({
      login: userAdmin.login,
      password: 'password'
    }).then(() => {
        expect(Principal.user.eql(userAdmin));
        expect(Principal.checkScope('auth')).equal(true);
      })
      .then(() => done())
      .catch(done);

    $httpBackend.flush();
  });
});
