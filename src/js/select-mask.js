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
    // @todo Add validation for options.selector object
    this.selectors = {
      select: options.selectors.select || '.js-select-mask',
      container: options.selectors.container || '.mask-container',
      mask: options.selectors.mask || '.mask',
      maskActive : options.selectors.maskActive || '.is-active'
    };
    this.elementType = options.elementType || 'span';
    this.elemSelects = null;

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

    if(window.addEventListener) {
      this.addEventMethod = 'addEventListener';
      this.removeEventMethod = 'removeEventListener';
      this.eventMethodPrefix = '';
    }
    else if(window.attachEvent) {
      this.addEventMethod = 'attachEvent';
      this.removeEventMethod = 'detachEvent';
      this.eventMethodPrefix = 'on';
    }

    return this;
  };

  /**
   * Binds onchange events to `select` elements
   * @method _bindEvents
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._bindEvents = function() {
    var that = this,
        selects,
        selectsIdx;

    var selectChangeHandler = function(e) {
      var target = that._getTarget(e);
      that._eventPreventDefault(e);
      if(that._hasClass(target, that.options.selectors.select) ) {
        that._update(e, target);
      }
    };

    var selectFocusHandler = function(e) {
      var target = that._getTarget(e);
      that._eventPreventDefault(e);
      if(that._hasClass(target, that.options.selectors.select) ) {
        that._setMaskFocusState(e, target);
      }
    };

    var selectBlurHandler = function(e) {
      var target = that._getTarget(e);
      that._eventPreventDefault(e);
      if(that._hasClass(target, that.options.selectors.select) ) {
        that._unsetMaskFocusState(e, target);
      }
    };

    selects = document.querySelectorAll(this.selectors.select);
    selectsIdx = selects.length;

    while(selectsIdx--) {
      this._addEvent(selects[selectsIdx], 'change', selectChangeHandler);
      this._addEvent(selects[selectsIdx], 'focus', selectFocusHandler);
      this._addEvent(selects[selectsIdx], 'blur', selectBlurHandler);
    }

    return this;
  };

  /**
   * Updates the mask
   * @method _update
   * @param {Object} e DOM event object
   * @param {Object} elem DOM element
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._update = function(e, elem) {
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

    this
      ._setMaskText(elemMask, this._getSelectedIndex(elemSelect).innerHTML)
      ._addClass(elemMask, this._stripSelectorPrefixes(this.selectors.mask))
      ._addClass(elemContainer, this._stripSelectorPrefixes(this.selectors.container));

    elemSelect.parentNode.insertBefore(elemContainer, elemSelect);
    elemContainer.appendChild(elemMask);
    elemContainer.appendChild(elemSelect);

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
    elem.innerHTML = text;

    return this;
  };

  /**
   * Adds maskActive class to a mask element
   * @method _setMaskTextFocusState
   * @param {Object} elem The mask element
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._setMaskFocusState = function(e, elem) {
    this._addClass(elem.previousSibling, this._stripSelectorPrefixes(this.selectors.maskActive));

    return this;
  };

  /**
   * Removes maskActive class from a mask element
   * @method _setMaskTextFocusState
   * @param {Object} elem The mask element
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._unsetMaskFocusState = function(e, elem) {
    this._removeClass(elem.previousSibling, this._stripSelectorPrefixes(this.selectors.maskActive));

    return this;
  };



  /**
   * Loops over a nodelist calling the handler and passing the element as a paramater
   * @method _eachElem
   * @param {Object} elems NodeList
   * @param {Function} handler Handler function
   * @param {Object} context Calling context
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._eachElem = function(elems, handler, context) {
    var i = elems.length;
    while(i--) {
      if(typeof handler === 'function') {
        handler.call((context = context || this), elems[i]);
      }
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
   * Prepends element to a supplied target element
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
   * [_addClass description]
   * @param {[type]} elem     [description]
   * @param {[type]} newClass [description]
   */
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

  /**
   * [_removeClass description]
   * @param  {[type]} elem     [description]
   * @param  {[type]} cssClass [description]
   * @return {[type]}          [description]
   */
  SelectMask.prototype._removeClass = function(elem, cssClass){
    elem.className = elem.className.replace(' ' + cssClass,'');
  };


  /**
   * [_hasClass description]
   * @param  {[type]}  elem     [description]
   * @param  {[type]}  cssClass [description]
   * @return {Boolean}          [description]
   */
  SelectMask.prototype._hasClass = function(elem, cssClass){
    return new RegExp('\\b'+ cssClass +'\\b', 'gi').test( elem.className );
  };

  /**
   * Add an event listener to an element
   * @method _addEvent
   * @param {Object} elem         Target element
   * @param {String} event        Event type
   * @param {Function} handler    Handler function to trigger on event
   * @param {Boolean} useCapture  Register event as a capturing listener
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._addEvent = function(elem, eventType, handler, useCapture) {
    useCapture = useCapture || false;
    this.handler = handler;
    elem[this.addEventMethod](this.eventMethodPrefix + eventType, handler, useCapture);
  };

  /**
   * Removes an event listener from an element
   * @method _removeEvent
   * @param {Object} elem         Target element
   * @param {String} event        Event type
   * @param {Function} handler    Handler function to remove from element
   * @param {Boolean} useCapture  Whether the event was a capturing listener
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._removeEvent = function(elem, eventType, handler, useCapture) {
    useCapture = useCapture || false;
    elem[this.removeEventMethod](this.eventMethodPrefix + eventType, handler, useCapture);
  };

  /**
   * Cross-browser shim (<IE9) to return the target element from an Event object
   * @method _getTarget
   * @param  {Object} e Event object
   * @return {Object} The element that received the event
   */
  SelectMask.prototype._getTarget = function(e) {
    e = e || window.event;
    return e.target || e.srcElement;
  };

  /**
   * [_eventPreventDefault description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  SelectMask.prototype._eventPreventDefault = function(e){
    return e.preventDefault? e.preventDefault() : e.returnValue = false;
  };

  /**
   * Unbinds onchange events from matching `select` elements
   * @method _unbindEvents
   * @private
   * @return {Object} this
   */
  SelectMask.prototype._unbindEvents = function() {
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
    this._eachElem(this.elemSelects, this._createMask);

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

  if (typeof define === 'function' && define.amd) {
    define('select-mask', [], function() {
      return SelectMask;
    });
  }
  else {
    root.SelectMask = SelectMask;
  }

})(window);
