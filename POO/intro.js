// Defines a constructor function for Animal.
// The 'type' parameter, if provided, sets the instance's type.
function Animal(type) {
  if (type) {
      this.type = type;
  }
}

// Create new Animal instances.
let dog = new Animal("mammal");
let cat = new Animal("mammal");
let snake = new Animal("reptile");
let fish = new Animal(); // No type provided, will use prototype's default type.

// // Create a standard JavaScript Array (unrelated to the Animal example, but kept for context).
let arr = new Array(1, 2, 3);

// // Add a method to the Animal prototype.
// // All instances of Animal (and objects inheriting from Animal.prototype) will have access to this method.
Animal.prototype.getType = function () {
  return this.type;
};

// // Add a default 'type' property to the Animal prototype.
// // This will be used by instances that don't have their own 'type' property (like 'fish' initially).
Animal.prototype.type = "unknown1";

// // Log the type of 'fish'.
// // 'fish' itself doesn't have a 'type' property, so JavaScript looks up the prototype chain
// // and finds 'type: "unknown"' on Animal.prototype.
// console.log(fish.type); // Output: unknown

// // Example of using the new method and demonstrating type values
// console.log(dog.type);       // Output: mammal (own property)
// console.log(snake.getType()); // Output: reptile (own property accessed via prototype method)
// console.log(fish.getType()); // Output: unknown (prototype property accessed via prototype method)

// // You can also add a property directly to an instance later:
// fish.type = "fish";
// console.log(fish.type);      // Output: fish (now has its own 'type' property)
// console.log(fish.getType()); // Output: fish (its own property is prioritized)
