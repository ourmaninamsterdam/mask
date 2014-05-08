#mask

Mask is a lightweight JavaScript library for masking `<select>` boxes with a fully customisable layer which sit on top of the `<select>`. The `<select>` element is only hidden, but is still focusable, thus allowing full functionality and accessibility.

Inspired by the custom select boxes used on [Transport for London's Journey Planner](http://www.tfl.gov.uk/plan-a-journey/).

##Install

###Prerequisites
NodeJS and karma-cli

```
npm install;
bower install
```

##Run
```
karma start
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
```

By default `SelectMask` class is available on the `Window` object but if an AMD loader, such as `RequireJS` is detected, then it will default to AMD mode.

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

##Generate documentation
Full library documentation is generated using *YUIDoc*

Run `yuidoc .` from project root folder to generate the docs.
