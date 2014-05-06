/**
 * @class SelectMask
 * @constructor
 * @param {Object} options                    Configuration parameters
 * @param {Object} [options.selectors]        Selectors to use
 * @param {String} [options.selectors.select] Selectors to use
 * @return {Object} this
 */
function SelectMask(options) {
  this.selectors = {
    select: options.selectors.select || '.js-select-mask'
  };
  this.elementType = options.elementType || 'span';
  this.elemSelects = null;
  this.eventFn = this._update.bind(this);
  this._init();
}

/**
 * Caches `select` elements
 * @method _unbindEvents
 * @private
 * @return {Object} this
 */
SelectMask.prototype._init = function() {
  this.elemSelects = document.querySelectorAll(this.selectors.select);

  return this;
};

/**
 * Binds onchange events to `select` elements
 * @method _bindEvents
 * @private
 * @return {Object} this
 */
SelectMask.prototype._bindEvents = function() {
  var that = this;

  document.addEventListener('change', function(e){
    that._delegateEvent(e, that.selectors.select, that.eventFn);
  });
    // .on('change', , this.eventFn)
    // .on('focus', this.selectors.select, this._setMaskFocusState);

  return this;
};

SelectMask.prototype._delegateEvent = function(e, selector, callback) {
  var regEx = new RegExp(selector.replace('.',''),'gi'),
      elem = e.target;

  if(regEx.test(elem.className)){
    if(typeof callback === 'function'){
      callback(elem);
    }
  }
};

/**
 * Unbinds onchange events from matching `select` elements
 * @method _unbindEvents
 * @private
 * @return {Object} this
 */
SelectMask.prototype._unbindEvents = function() {
  $(document).off('change', this.selectors.select, this.eventFn);

  return this;
};

/**
 * Updates the mask
 * @method _update
 * @private
 * @return {Object} this 
 */
SelectMask.prototype._update = function(elem) {
  console.log(elem);
  this._setMaskText(elem.previousSibling, this._getSelectedIndex(elem).innerText);

  return this;
};

/**
 * Creates mask DOM element and prepends to `select` element
 * @method _createMask
 * @param {Object} select `select` element
 * @private
 * @return {Object} this
 */
SelectMask.prototype._createMask = function(select) {
  var mask = document.createElement(this.elementType);
  this._setMaskText(mask, this._getSelectedIndex(select).innerText);
  mask.className += 'select-mask';
  select.parentNode.insertBefore(mask, select);

  return this;
};

/**
 * Creates mask DOM element and prepends to `select` element
 * @method _setMaskText
 * @param {Object} elem Mask element
 * @param {String} text Text to set on the mask
 * @private
 * @return {Object} this
 */
SelectMask.prototype._setMaskText = function(elem, text) {
  console.log('_setMaskText', elem, text);
  elem.innerText = text;

  return this;
};

/**
 * Loops over the selects nodelist and calls the _createMask method on each
 * @method _processSelects
 * @private
 * @return {Object} this
 */
SelectMask.prototype._processSelects = function() {
  var that = this,
    i = this.elemSelects.length;
    console.log(this.elemSelects);
  while(i--) {
    that._createMask(this.elemSelects[i]);
  }

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
 * Adds a focus class to the mask
 * @method _setMaskTextFocusState
 * @param {Object} elem The mask element
 * @private
 * @return {Object} this
 */
SelectMask.prototype._setMaskFocusState = function(elem) {
  elem.className += 'is-active';

  return this;
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

  return this;
};

/**
 * ES5 Shims
 */
// if(typeof Function.prototype.bind === 'undefined') {
//   return function( event ){
//     return fn.call( context, ( event || window.event ) );
//   };
// }

// /**
//  * Events
//  */
// if( window.addEventListener ){
//   var eventHelper = {
//     addEventMethodName : 'addEventListener',
//     removeEventMethodName : 'removeEventListener',
//     prefix : ''
//   };
// }
// else{
//   var eventHelper = {
//     addEventMethodName : 'attachEvent',
//     removeEventMethodName : 'detachEvent',
//     prefix : 'on'
//   };
// }