function space() {
  console.log("");
}

function someFunction() {
  console.log(this);
}

console.log("'this' is the window when the function is just invoked");
space();
someFunction();
space();
(function() {
  console.log('same for anonymous functions');
  space();
  console.log(this);
  space();
  (function() {
    console.log('even nested functions');
    space();
    console.log(this);
    space();
  })();
})();

var object = { name: "the best object" };
object.someMethod = someFunction;
console.log("'this' is our object when it is invoked as a method");
space();
object.someMethod();
space();

console.log("but it goes back to window if we don't invoke it on the object");
space();
var someMethod = object.someMethod;
someMethod();
space();

console.log("'this' will be our object if we invoke it dynamically as well");
space();
object['some' + 'Method']();
space();

console.log("but again, it'll be window if it's not invoked on the object");
space();
var someDynamicMethod = object['some' + 'Method'];
someDynamicMethod();
space();

console.log("what 'this' is can be forced via 'call'");
space();
someFunction.call(object);
space();

console.log("it can also be forced via 'apply'");
space();
someFunction.apply(object);
space();

function whatArgs() {
  console.log(arguments);
}

console.log("the first argument to 'call' is the context, essentially what 'this' should be when it executes");
console.log("the following arguments are passed through to the function as arguments");
space();
whatArgs.call(object, 'some', 'arguments', 'passed', 'to', 'call');
space();

console.log("the first argument to 'apply' is also the context, but it only accepts one other argument");
console.log("the second argument can be an array or array like object (the 'arguments' object for instance)");
console.log("'apply' will essentially splat them out like so");
space();
whatArgs.apply(object, ['we', 'arg', 'the', 'args'], "I'm ignored");
space();

console.log("so if we want to stop people from changing what 'this' is when are function is invoked, we have to bind it");
console.log("there are several ways to do this");
console.log("we can make a new function");
space();
var boundFunction = function() {
  someFunction.apply(object, arguments);
}

console.log("the bound function will always say 'object' is 'this'");
console.log("if we invoke it");
space();
boundFunction();
space();

console.log("even if we put it as a method on another object");
space();
var otherObject = { name: "some other object", someMethod: boundFunction };
otherObject.someMethod();
space();

function someOtherFunction() {
  console.log(this);
}

console.log("in some browsers we can also use the 'bind' method to bind");
space();
var otherBoundFunction = someOtherFunction.bind(object);
otherBoundFunction();
space();

console.log("this does not change the original function though");
space();
someOtherFunction();
