;(function (window) {
  var selectMask = new SelectMask({
    selectors : {
      select : '.js-select-mask'
    }
  });
  selectMask.start();

  selectMask.destroy();
})(window);