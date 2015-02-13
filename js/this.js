function someFunction() {
  console.log(this);
}

console.log("'this' is the window when the function is just invoked")
someFunction();

(function() {
  console.log('same for anonymous functions');
  console.log(this);

  (function() {
    console.log('even nested functions');
    console.log(this);
  })();
})();

var object = { name: "the best object" };
object.someMethod = someFunction;
console.log("'this' is our object when it is invoked as a method");
object.someMethod();

console.log("but it goes back to window if we don't invoke it immediately after accessing it on the object");
var someMethod = object.someMethod;
someMethod();

console.log("'this' will be our object if we invoke it immediately after accessing it dynamically as well");
object['some' + 'Method']();

console.log("but again, it'll be window if it's not immediately invoked");
var someDynamicMethod = object['some' + 'Method'];
someDynamicMethod();

console.log("what 'this' is can be forced via 'call'");
someFunction.call(object);

console.log("it can also be forced via 'apply'");
someFunction.apply(object);

function whatArgs() {
  console.log(arguments);
}

console.log("the first argument to 'call' is the context, essentially what 'this' should be when it executes");
console.log("the following arguments are passed through to the function as arguments");
whatArgs.call(object, 'some', 'arguments', 'passed', 'to', 'call');

console.log("the first argument to 'apply' is also the context, but it only accepts one other argument");
console.log("the second argument can be an array or array like object (the 'arguments' object for instance)");
console.log("'apply' will essentially splat them out like so");
whatArgs.apply(object, ['we', 'arg', 'the', 'args'], "I'm ignored");


console.log("so if we want to stop people from changing what 'this' is when are function is invoked, we have to bind it");
console.log("there are several ways to do this");
console.log("we can make a new function");
var boundFunction = function() {
  someFunction.apply(object, arguments);
}
console.log("the bound function will always say 'object' is 'this'");
console.log("if we invoke it");
boundFunction();

console.log("even if we put it as a method on another object");
var otherObject = { name: "some other object", someMethod: boundFunction };
otherObject.someMethod();

function someOtherFunction() {
  console.log(this);
}

console.log("in some browsers we can also use the 'bind' method to bind");
var otherBoundFunction = someOtherFunction.bind(object);
otherBoundFunction();

console.log("this does not change the original function though");
someOtherFunction();

console.log("lodash and underscore can also bind functions for you");
