const person = {
    name: "Maria",
    age: 28,
    "email": "she@server.com" // Property names with special characters or spaces must be quoted.
};

console.log(person); // Outputs the entire person object.

// Iterating over object properties
for (let prop in person) {
    console.log(prop);         // Outputs the property name (e.g., "name", "age", "email").
    console.log(person[prop]); // Outputs the value of the property (e.g., "Maria", 28, "she@server.com").
}
