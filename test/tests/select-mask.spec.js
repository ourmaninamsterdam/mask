describe('Select Mask', function() {
  var selectMask, elemFixture, fixtureHTML;

  before(function(done) {
    fixtureHTML = window.__html__['test/fixtures/select-mask.html'];
    elemFixture = document.querySelector('select');
    console.log('ee', document);

    require(['select-mask'], function(SelectMask) {
      console.log('SSSSSSS:',SelectMask);
      selectMask = new SelectMask();
      done();
    });
  });

  describe('Selecting an option', function() {
    before(function() {

    });
    it('the mask text should match selected option', function() {
      expect(true).to.be.false;
    });
  });
});
