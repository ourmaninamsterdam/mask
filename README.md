#mask

Mask is a lightweight JavaScript library for allowing customisable `<select>` boxes by masking it with a customisable element.

The mask element sits on top of the `<select>` and updates its text content when there's a change to the select box below. The `<select>` element is merely hidden so continues to be focusable, thus allowing full functionality and accessibility.

Inspired by the custom select boxes used on [Transport for London's Journey Planner](http://www.tfl.gov.uk/plan-a-journey/).

##Demo
[Demo](http://ourmaninamsterdam.github.io/mask/src/index.html)

##Install

###Prerequisites
NodeJS and karma-cli

```
npm install;
bower install
```

## Usage

```html
<select class="select">
  <option value="">Option 1</option>
  <option value="">Option 2</option>
  <option value="">Option 3</option>
  <option value="">Option 4</option>
</select>
```

```javascript
var selectMask = new SelectMask({
  selectors : {
    select : '.select'
  }
});
selectMask.start();
```

By default `SelectMask` class is available on the `Window` object. It will default to AMD mode if an AMD loader, such as [RequireJS](http://requirejs.org/), is detected.

### Via AMD

```javascript
require('select-mask');
```

## Browser support

* Chrome
* Chrome Android
* Firefox (Partial, as Firefox requires the `keyup` event. Full support coming soon)
* Opera
* Safari
* Mobile Safari
* IE9/10/11
* *IE7+8 coming soon. Or just use ES5 shim*.

##Testing
Karma, Mocha, Chai and Sinon

###Run tests
```
karma start
```

##Generate documentation
Full library documentation is generated using *YUIDoc*

Run `yuidoc .` from project root folder to generate the docs.
