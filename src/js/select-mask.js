/*
  - Set label element's inner text
  - find element
  - get inner text of select
  - set inner text of label
- Update title of select
  - get inner text of select
  - set title
- Inject label
  - create detached element [DONE]
  - set default text [DONE]
  - attach element to DOM [DONE]
- Set focus state of element
  - [TBD]
*/

  function SelectMask(options) {
    if(typeof options !== 'object') return;
    this.selectors = {
      select: options.selectors.select || '.js-select-mask'
    };
    this.elementType = options.elementType || 'span';
    this.$selects = null;
    this.eventFn = $.proxy(this._update,this);
    this._init();
  }

  // 'Private' methods
  SelectMask.prototype._bindEvents = function() {
    $(document).on('change', this.selectors.select, this.eventFn);
  };

  SelectMask.prototype._unbindEvents = function() {
    $(document).off('change', this.selectors.select, this.eventFn);
  };

  SelectMask.prototype._init = function() {
    this.$selects = $(this.selectors.select);

    return this;
  };

  SelectMask.prototype._update = function(e) {
    console.log('_update', e.currentTarget, this._getSelectedIndex($(e.currentTarget)));
    this._setLabelMask(e.currentTarget, e.currentTarget)

    return this;
  };

  SelectMask.prototype._getSelectedIndex = function($select) {
    var options = $select[0].options;
    return options[options.selectedIndex];
  };

  SelectMask.prototype._createLabelMask = function($select) {
    var $mask = $(document.createElement(this.elementType));
    this._setLabelMask($mask, this._getSelectedIndex($select).innerText);
    $mask.addClass('select-mask');
    $mask.insertBefore($select);

    return this;
  };

  SelectMask.prototype._setLabelMask = function($elem, text) {
    $elem.text(text);

    return this;
  };

  SelectMask.prototype._processSelects = function() {
    var that = this;
    $.each(this.$selects, function() {
      that._createLabelMask($(this));
    });
    return this;
  };

  // Public methods
  SelectMask.prototype.start = function() {
    this._bindEvents();
    this._processSelects();

    return this;
  };

  SelectMask.prototype.stop = function() {
    this._unbindEvents();
    // Remove label mask
  };