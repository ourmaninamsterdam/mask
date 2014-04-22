describe("Select mask", function() {
  before(function(done) {
    var html = window.__html__['test/fixtures/select-mask.html'];
    require(['jquery'], function($) {
      done();
    });
  });
  it('should fail', function() {
    expect(true).to.be.false;
  });
});