let type = ""; // Global 'type' variable (less common for this pattern, but matches original)
// const allowedTypes = { "mammal": true, "amphibian": true, "reptile": true }; // Original object-based approach
const allowedTypes = ["mammal", "amphibian"]; // Array-based approach

const dog = {
    name: "Rex",
    // Getter for the 'type' property
    get type() {
        return type;
    },
    // Setter for the 'type' property with validation
    set type(_type) {
        // if (allowedTypes[_type]) { // Object-based pattern
        if (allowedTypes.indexOf(_type) >= 0) { // Array-based pattern: check if _type exists in allowedTypes
            type = _type; // If allowed, set the global 'type' variable
        }
    }
};


// IIFE (Immediately Invoked Function Expression) to avoid polluting the global scope
// This creates a private scope for the 'cat' object and its 'type' and 'allowedTypes' variables.
(function () {
    let type = ""; // Private 'type' variable for the 'cat' object
    // const allowedTypes = { "mammal": true, "amphibian": true, "reptile": true }; // Original object-based approach
    const allowedTypes = ["mammal", "amphibian"]; // Private 'allowedTypes' array

    const cat = {
        name: "Whiskers", // Renamed from "mingal"
        // Getter for the 'type' property, accessing the private 'type'
        get type() {
            return type;
        },
        // Setter for the 'type' property with validation against the private 'allowedTypes'
        set type(_type) {
            // if (allowedTypes[_type]) { // Object-based pattern
            if (allowedTypes.indexOf(_type) >= 0) { // Array-based pattern
                type = _type; // If allowed, set the private 'type' variable
            }
        }
    };
    this.cat = cat; // Exposes the 'cat' object to the global scope (if 'this' is 'window' or 'global')
})();
