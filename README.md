Object Oriented Javascript Class Project
========================================

Installation/Prerequisites
--------------------------

Node.js/npm is required to run the express webserver:

* Download Node for your platform [here](http://nodejs.org/download/)
* `npm install`
* `npm start` to run server
* visit localhost:3000 to see the widget
* visit localhost:3000/spec to run the tests

Dependencies
------------
There are a couple libraries that I would consider required for any "vanilla" javascript project. jQuery (or your API-compatible variant of choice) for DOM manipulation, and lodash for manipulating data.
* Lodash
* jQuery

Development Dependencies
------------------------
* Mocha
* Chai
* Chai-jQuery
* Sinon

Function Binding
----------------

```js
_.bindAll.apply(this, [this].concat(_.functions(this)));
