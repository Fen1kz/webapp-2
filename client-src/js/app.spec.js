describe('App Test', () => {
  beforeEach(module('rlike'));
  beforeEach(inject(function(_$rootScope_,_$compile_) {
    let $rootScope = _$rootScope_;
  }));
  it('Should exist', inject((APP_NAME) => {
    expect(APP_NAME).equal('rlike')
  }));
});
