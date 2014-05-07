;(function(root) {
  'use strict';

  /**
   * @class SelectMask
   * @constructor
   * @param {Object} options                         Configuration parameters
   * @param {Object} [options.selectors]             Selectors to use
   * @param {String} [options.selectors.select]      `select` element selector
   * @param {String} [options.selectors.mask]        Mask element selector
   * @param {String} [options.selectors.maskActive]  Mask element active selector
   * @return {Object} this
   */
  function SelectMask(options) {
    this.selectors = {
      select: options.selectors.select || '.js-select-mask',
      container: options.selectors.container || '.mask-container',
      mask: options.selectors.mask || '.mask',
      maskActive : options.selectors.maskActive || '.is-active'
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

    this.addListener(document, 'change', function(e){
      that._delegateEvent(e, that.selectors.select, that._update.bind(that));
    });

    this.addListener(document, 'change', function(e){
      that._delegateEvent(e, that.selectors.select, that._setMaskFocusState.bind(that));
    });


    // document.addEventListener('change', function(e){
    //   that._delegateEvent(e, that.selectors.select, that._update.bind(that));
    // });

    // document.querySelector('.select').addEventListener('focus', function(e){
    //   that._delegateEvent(e, that.selectors.select, that._setMaskFocusState.bind(that));
    // });

    // document.querySelector('.select').addEventListener('blur', function(e){
    //   that._delegateEvent(e, that.selectors.select, that._unsetMaskFocusState.bind(that));
    // });

    return this;
  };

  SelectMask.prototype.addListener = function(elem, events, handler) {
    var i;

    if(typeof handler !== 'function') return;

    events = events.split(' ');
    i = events.length;

    while(i--) {
      elem.addEventListener(events[i], handler);
    }

    return this;
  };

  SelectMask.prototype._delegateEvent = function(e, selector, handler) {
    var elem = e.target;
    if(new RegExp(this._stripSelectorPrefixes(selector),'gi').test(elem.className)){
      if(typeof handler === 'function'){
        handler(elem);
      }
    }

    return this;
  };

  /**
   * Unbinds onchange events from matching `select` elements
   * @method _unbindEvents
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._unbindEvents = function() {
    // $(document).off('change', this.selectors.select, this.eventFn);

    return this;
  };

  /**
   * Updates the mask
   * @method _update
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._update = function(elem) {
    this._setMaskText(elem.previousSibling, this._getSelectedIndex(elem).innerHTML);

    return this;
  };

  /**
   * Creates mask DOM element and prepends to `select` element
   * @method _createMask
   * @param {Object} elemSelect `select` element
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._createMask = function(elemSelect) {
    var elemMask = document.createElement(this.elementType),
        elemContainer = document.createElement(this.elementType);

    this._setMaskText(elemMask, this._getSelectedIndex(elemSelect).innerHTML);

    this._addClass(elemMask, this._stripSelectorPrefixes(this.selectors.mask));
    this._addClass(elemContainer, this._stripSelectorPrefixes(this.selectors.container));

    elemSelect.parentNode.insertBefore(elemContainer, elemSelect);
    elemContainer.appendChild(elemMask);
    elemContainer.appendChild(elemSelect);

    return this;
  };

  /**
   * Creates mask DOM element and prepends to `select` element
   * @method _insertBefore
   * @param {Object} elem The element to be inserted
   * @param {Object} target Target element to insert elem before
   * @private
   * @return {Object} Inserted element
   */
  SelectMask.prototype._insertBefore = function(elem, target) {
    return target.parentNode.insertBefore(elem, target);
  };

  /**
   * Removes `.` or `#` from selector
   * @method _stripSelectorPrefixes
   * @param {String} selector Selector to sanitise
   * @private
   * @return {String} selector
   */
  SelectMask.prototype._stripSelectorPrefixes = function(selector) {
    return selector.replace(/\.|\#/gi,'');
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
    elem.innerHTML = text;

    return this;
  };

  /**
   * Loops over the selects nodelist and calls the _createMask method on each
   * @method _processElems
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._processElems = function(elems, handler) {
    var i = elems.length;

    while(i--) {
      handler(elems[i]);
    }

    return this;
  };

  /**
   * Gets the currently selected index from the passed `select` element
   * @method _getSelectedIndex
   * @param {Object} elemSelect `select` element
   * @private
   * @return {Number} The selected index
   */
  SelectMask.prototype._getSelectedIndex = function(elemSelect) {
    var options = elemSelect.options;

    return options[options.selectedIndex];
  };

  /**
   * Adds maskActive class to a mask element
   * @method _setMaskTextFocusState
   * @param {Object} elem The mask element
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._setMaskFocusState = function(elem) {
    this._addClass(elem, this._stripSelectorPrefixes(this.selectors.maskActive));

    return this;
  };

  /**
   * Removes maskActive class from a mask element
   * @method _setMaskTextFocusState
   * @param {Object} elem The mask element
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._unsetMaskFocusState = function(elem) {
    this._removeClass(elem, this._stripSelectorPrefixes(this.selectors.maskActive));

    return this;
  };

  /**
   * Remove element from dom
   * @method _removeElem
   * @param {Object} elem The DOM element to remove
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._removeElem = function(elem) {
    elem.parentNode.removeChild(elem);

    return this;
  };

  SelectMask.prototype._addClass = function(elem, newClass){
    var curClass = elem.className;
    if(!new RegExp(newClass,'i').test(curClass)){
      if(curClass.length > 0 && curClass.charAt(curClass.length) === '') {
         newClass = ' ' + newClass;
      }
      elem.className += newClass;
    }

    return this;
  };

  SelectMask.prototype._removeClass = function(elem, cssClass){
    elem.className = elem.className.replace(' ' + cssClass,'');
  };

  /**
   * Adds DOM events
   * @method start
   * @public
   * @return {Object} this
   */
  SelectMask.prototype.start = function() {
    this._bindEvents();
    this._processElems(this.elemSelects, this._createMask.bind(this));

    return this;
  };

  /**
   * Destroys the select masks and unbinds any event listeners
   * @method destroy
   * @public
   * @return {Object} this
   */
  SelectMask.prototype.destroy = function() {
    var elemsMasks = document.querySelectorAll(this.selectors.mask),
        i = elemsMasks.length;

    this._unbindEvents();

    while(i--) {
      this._removeElem(elemsMasks[i]);
    }

    return this;
  };

  /**
   * ES5 Shims
   */
  // if(typeof Function.prototype.bind === 'undefined') {
  //   return function(event){
  //     return fn.call(context, (event || window.event));
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

  root.SelectMask = SelectMask;

  if (typeof define === 'function' && define.amd) {
    define('select-mask', [], function() {
      return SelectMask;
    });
  }

})(window);
