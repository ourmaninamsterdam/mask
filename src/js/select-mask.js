/**
 * @class SelectMask
 * @constructor
 * @param {Object} options                    Configuration parameters
 * @param {Object} [options.selectors]        Selectors to use
 * @param {String} [options.selectors.select] Selectors to use
 */
function SelectMask(options) {
  this.selectors = {
    select: options.selectors.select || '.js-select-mask'
  };
  this.elementType = options.elementType || 'span';
  this.$selects = null;
  this.eventFn = this._updateLabel.bind(this);
  this._init();
}

/**
 * Unbinds onchange events from matching `select` elements in this.selects
 * @method _unbindEvents
 * @private
 * @return {Object} this
 */
SelectMask.prototype._init = function() {
  this.$selects = $(this.selectors.select);

  return this;
};

/**
 * Binds onchange events to `select` elements in this.selects
 * @method _bindEvents
 * @private
 */
SelectMask.prototype._bindEvents = function() {
  $(document).on('change', this.selectors.select, this.eventFn);
};

/**
 * Unbinds onchange events from matching `select` elements in this.selects
 * @method _unbindEvents
 * @private
 */
SelectMask.prototype._unbindEvents = function() {
  $(document).off('change', this.selectors.select, this.eventFn);
};

/**
 * Updates the label mask
 * @method _updateLabel
 * @private
 * @return {Object} this 
 */
SelectMask.prototype._updateLabel = function(e) {
  this._setLabelMask(e.target.previousSibling, this._getSelectedIndex(e.target).innerText);
  console.log('var1');
  return this;
};

/**
 * Creates mask DOM element and prepends to `select` element
 * @method _createLabelMask
 * @param {Object} select `select` element
 * @private
 * @return {Object} this
 */
SelectMask.prototype._createLabelMask = function(select) {
  var mask = document.createElement(this.elementType);
  this._setLabelMask(mask, this._getSelectedIndex(select).innerText);
  mask.className += 'select-mask';
  select.parentNode.insertBefore(mask, select);

  return this;
};

/**
 * Creates mask DOM element and prepends to `select` element
 * @method _setLabelMask
 * @param {Object} elem Mask element
 * @param {String} text Text to set on the label mask
 * @private
 * @return {Object} this
 */
SelectMask.prototype._setLabelMask = function(elem, text) {
  console.log('_setLabelMask', elem, text);
  elem.innerText = text;
  return this;
};

/**
 * Loops over the selects array and calling the _createLabelMask method on each
 * @method _processSelects
 * @private
 * @return {Object} this
 */
SelectMask.prototype._processSelects = function() {
  var that = this;
  $.each(this.$selects, function() {
    that._createLabelMask($(this)[0]);
  });
  return this;
};

/**
 * Gets the currently selected index from the passed `select` element
 * @method _getSelecteIndex
 * @param {Object} select `select` element
 * @private
 * @return {Number} The selected index
 */
SelectMask.prototype._getSelectedIndex = function(select) {
  var options = select.options;
  return options[options.selectedIndex];
};

/**
 * Adds DOM events
 * @method start
 * @public
 * @return {Object} this
 */
SelectMask.prototype.start = function() {
  this._bindEvents();
  this._processSelects();

  return this;
};

/**
 * Destroys the select masks and unbinds any event listeners
 * @method destroy
 * @public
 * @return {Object} this
 */
SelectMask.prototype.destroy = function() {
  this._unbindEvents();
};

/**
 * ES5 Shims
 */
if(typeof Function.prototype.bind === 'undefined') {
  return function( event ){
    return fn.call( context, ( event || window.event ) );
  };
}

/**
 * Events
 */
if( window.addEventListener ){
  var eventHelper = {
    addEventMethodName : 'addEventListener',
    removeEventMethodName : 'removeEventListener',
    prefix : ''
  };
}
else{
  var eventHelper = {
    addEventMethodName : 'attachEvent',
    removeEventMethodName : 'detachEvent',
    prefix : 'on'
  };
}