// ES5 (ECMAScript 5) - Traditional Constructor Function Inheritance

// Animal constructor function
function Animal(type) {
    // Enforce 'new' keyword usage: if 'this' is not an instance of Animal, throw an error.
    if (this instanceof Animal) {
        if (type) this.type = type;
    } else {
        throw new Error("Animal must be created with the new operator");
    }
}

// Dog constructor function, inheriting from Animal
function Dog(name) {
    this.name = name;
    // Call the Animal constructor in the context of the new Dog instance ('this').
    // This allows Dog instances to inherit properties defined on 'this' in Animal.
    Animal.call(this, "mammal"); // Sets the type to "mammal" for all Dogs.
}

// Establish the inheritance chain: Dog's prototype is an instance of Animal.
// This gives Dog.prototype access to methods/properties on Animal.prototype.
Dog.prototype = new Animal();
// Correctly set the constructor property of Dog.prototype back to Dog.
// This is crucial for 'instanceof' checks and correctly identifying the constructor.
Dog.prototype.constructor = Dog;

// Create a new Dog instance
let dog = new Dog("Dog");

// Add a method to the Animal prototype.
// All Animal instances and objects inheriting from Animal (like Dog) will have access to this method.
Animal.prototype.getType = function () {
    return this.type;
};

// Set a default 'type' property on the Animal prototype.
// This will be used if an Animal instance is created without a 'type' or if a subclass
// doesn't explicitly set one and looks up the prototype chain.
Animal.prototype.type = "unknown";


// ES6 (ECMAScript 2015) - Class Syntax Inheritance

class AnimalC { // 'C' suffix for 'Class' to distinguish from ES5 Animal
    constructor(type) {
        if (type) {
            this.type = type;
        }
    }

    // Method defined directly within the class, automatically added to the prototype.
    getType() {
        return this.type;
    }
}

class CatC extends AnimalC { // CatC extends AnimalC, setting up inheritance
    constructor(name) {
        super("mammal"); // Call the parent class (AnimalC) constructor with "mammal" as type.
        this.name = name; // Set the name property specific to CatC.
    }
}

// Set a default 'type' property on the AnimalC prototype.
// Similar to ES5, this acts as a fallback for instances without their own 'type'.
AnimalC.prototype.type = "unknown";

// Create new instances using the ES6 classes
let animal = new AnimalC("amphibian"); // Animal with explicit type
let frog = new AnimalC();             // Animal without explicit type, will get "unknown" from prototype

let whiskers = new CatC("Whiskers"); // A CatC instance named "Whiskers"

// Console logs to inspect the objects and prototypes
// (Original console.log statements uncommented for display)
// console.log(animal);
// console.log(cat); // Note: Original code had 'gato', changed to 'whiskers' for consistency
// console.log(typeof animal);
// console.log(typeof cat);
// console.log(typeof Animal);
// console.log(typeof AnimalC);
// console.log(animal.getType());
// console.log(cat.getType());

console.log(Animal.prototype);   // Logs the prototype object of the ES5 Animal constructor
console.log(AnimalC.prototype);  // Logs the prototype object of the ES6 AnimalC class
console.log(whiskers);           // Logs the CatC instance, showing its properties and prototype chain
console.log(dog);                // Logs the Dog instance, showing its properties and prototype chain
