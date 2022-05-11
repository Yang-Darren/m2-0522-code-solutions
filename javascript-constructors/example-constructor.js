function ExampleConstructor() {}

console.log('value of prototype property of ExampleConstructor function:', ExampleConstructor.prototype);
console.log('typeof prototype property of ExampleConstructor function:', typeof ExampleConstructor);

var newVariable = new ExampleConstructor();
console.log(newVariable);

console.log(newVariable instanceof ExampleConstructor);
