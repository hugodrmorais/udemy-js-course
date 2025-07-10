// ES5 (ECMAScript 5) - Constructor Function with Prototype and Static Property
function Animal() { }

// Add a method to the Animal prototype.
// 'this' inside this method will refer to the instance calling it.
Animal.prototype.whoAmI = function () {
    return this;
};

// Add a "static" property directly to the Animal constructor function itself.
// This property belongs to the constructor, not its instances.
Animal.category = "living being";

// Create an instance of Animal.
const dog = new Animal();

// ES6 (ECMAScript 2015) - Class Syntax with Static Methods
class Doggo { // Using 'Doggo' to avoid naming conflict with ES5 'Dog' instance
    constructor(name) {
        this.name = name;
        console.log("Calling static method from inside the constructor");
        // Static methods are called directly on the class itself.
        Doggo.drink();
    }

    // Static method 'eat'. It belongs to the class, not instances.
    // 'this' inside a static method refers to the class itself (Doggo in this case).
    static eat() {
        // console.log(this); // Would log 'class Doggo'
        console.log("eating");
        // Static methods can call other static methods on the same class.
        this.drink();
    }

    // Static method 'drink'. It also belongs to the class.
    static drink() {
        console.log("drinking");
    }
}

// Create an instance of the ES6 Doggo class.
const doggoInstance = new Doggo("Rex"); // Renamed to avoid conflict and be clearer
