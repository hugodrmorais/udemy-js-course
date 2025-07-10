// Base constructor function for Animal
function Animal(type) {
  if (type) {
    this.type = type;
  }
}

// Add a method to the Animal prototype
Animal.prototype.getType = function () {
  return this.type;
};

// Set a default type property on the Animal prototype
Animal.prototype.type = "unknown";

// Constructor function for Dog, inheriting from Animal
function Dog(name, type) {
  this.name = name;
  // Call the Animal constructor in the context of the new Dog instance ('this').
  // This allows Dog instances to inherit properties defined on 'this' in Animal.
  Animal.call(this, type);

  // This line is important for proper prototype chain and 'instanceof' checks.
  // It correctly sets the constructor property of Dog.prototype back to Dog.
  // By default, when `Cachorro.prototype = new Animal()`, Cachorro.prototype.constructor
  // would point to Animal. We want it to point to Dog.
  Object.defineProperty(Dog.prototype, "constructor", {
    value: Dog,
    enumerable: false // Make it non-enumerable so it doesn't show up in 'for...in' loops
  });
}

// Set Dog's prototype to an instance of Animal.
// This links Dog's prototype chain to Animal's prototype, enabling inheritance.
// Dog.prototype now has access to methods/properties on Animal.prototype (like getType and type).
Dog.prototype = new Animal();

// Create a new Dog instance
let rex = new Dog("Rex", "mammal");
console.log(rex);

// Iterate over enumerable own properties of 'rex'
// hasOwnProperty(prop) ensures only properties directly on 'rex' are logged,
// not those inherited from its prototype chain.
for (let prop in rex) {
  if (rex.hasOwnProperty(prop)) {
    console.log(prop); // Expected: 'name', 'type'
  }
}

// Check instanceof relationships
console.log(rex instanceof Array);             // Output: false (rex is not an instance of Array)
console.log(Object.prototype.isPrototypeOf(rex)); // Output: true (Every object in JS ultimately has Object.prototype in its chain)
console.log(Object.getPrototypeOf(rex));       // Output: Animal { constructor: ƒ Dog() } (This shows the direct prototype of 'rex', which is Dog.prototype, which is an Animal instance)
console.log(rex.__proto__);                   // Output: Animal { constructor: ƒ Dog() } (Non-standard but commonly used way to access prototype)
console.log(rex.__proto__ === Object.getPrototypeOf(rex)); // Output: true (They refer to the same object)
