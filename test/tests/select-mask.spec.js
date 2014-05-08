describe('Select Mask', function() {
  var selectMask,
      elSelect;

  before(function(done) {
    var fixtureHTML,
        fragment = document.createElement('div');

    fixtureHTML = window.__html__['test/fixtures/select-mask.html'];
    fragment.innerHTML = fixtureHTML;
    document.body.appendChild(fragment.firstChild);
    elSelect = document.querySelector('select');

    require(['select-mask'], function(SelectMask) {
      selectMask = new SelectMask({
        selectors : {
          select : 'select'
        }
      });
      selectMask.start();
      done();
    });
  });

  describe('Selecting an option', function() {

    it('the mask\'s text should match selected option', function() {
      var selectedOptionText,
          selectOptions = elSelect.options,
          maskText;

      // Randomly select an item
      selectOptions.selectedIndex = parseInt(Math.random() * selectOptions.length,10);
      selectedOptionText = selectOptions[selectOptions.selectedIndex].innerText;

      // Get mask text
      maskText = document.querySelector(selectMask.selectors.mask);

      expect(maskText).to.equal(selectedOptionText);
    });
  });
});
