const NAME_SYMBOL = Symbol(); // Creates a unique Symbol. Symbols are primitive values.
console.log(typeof NAME_SYMBOL); // Output: symbol

let n = 0;
const user = {
    // Dynamic property names using computed property syntax ("[]")
    ["test" + (++n)]: "test" + n, // "test1": "test1"
    ["test" + (++n)]: "test" + n, // "test2": "test2"
    ["test" + (++n)]: "test" + n, // "test3": "test3"

    // Using the Symbol as a property key. This creates a unique, non-enumerable property.
    [NAME_SYMBOL]: "with symbol",

    // Standard string property key
    "name": "with string",

    // Numeric property key (JavaScript converts it to a string internally, so it's "3")
    3: "with number"
};

user.name = "name changed"; // Modifies the property with the string key "name"
console.log(user); // Logs the entire user object

// Accessing the property using the Symbol key
console.log(user[NAME_SYMBOL]); // Output: "with symbol"

// Get all Symbol properties directly owned by the object
let testSymbols = Object.getOwnPropertySymbols(user);
console.log(testSymbols[0]); // Output: Symbol() (the actual Symbol object)
console.log(user[testSymbols[0]]); // Access the property using the retrieved Symbol key. Output: "with symbol"
console.log(typeof user[testSymbols[0]]); // Output: string (the type of the value associated with the Symbol key)

user[testSymbols[0]] = "symbol name changed"; // Modify the property using the retrieved Symbol key
console.log(user); // Logs the user object again, showing the updated Symbol property value
