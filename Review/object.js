// const names = ["Daniel", "Maria", "Joao"];
// const ages = [null, 40, 28, 35];
// console.log(names[0], ages[0]);

// const person = new Object(); // This is an alternative way to create an object, but object literal is more common.

const person = {
    name: "Daniel",
    age: 40
};
// The lines below are redundant as the properties are already set during object creation.
// person.name = "Daniel";
// person.age = 40;

console.log(person); // Outputs the entire person object: { name: "Daniel", age: 40 }
let prop = "name";
console.log(person[prop]); // Accesses the 'name' property using a variable, outputs "Daniel"
console.log(person["age"]); // Accesses the 'age' property using bracket notation with a string literal, outputs 40
