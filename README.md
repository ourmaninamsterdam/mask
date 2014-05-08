#mask

Mask is a simple JavaScript library for creating styleable *custom* select elements which sit on top of a normal `<select>` element. The `<select>` element is only hidden but still focusable, so the user is able to interact with it as normal ensuring full functionality and accessibility are maintained.

Inspired by the custom select boxes used on [Transport for London's Journey Planner](http://www.tfl.gov.uk/plan-a-journey/).

## Libraries
None


##Install

```
npm install;
bower install
```

##Run
```
karma start
```

##Generate docs
Run `yuidoc .` from project root folder.

##Prerequisites
NodeJS and karma-cli

## Browser support

* Chrome 
* Firefox (Partial, as Firefox requires the `keyup` event. Full support coming soon)
* Opera
* IE9+
* *IE7+8 coming soon. Or just use ES5 shim*.

##Tests
Karma, Mocha, Chai and Sinon