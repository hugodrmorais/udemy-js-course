function Task(name) {
    "use strict"; // Enforces stricter parsing and error handling in code

    // Check if the function is called without 'new'.
    // If so, 'this' will refer to the global object (window in browsers, global in Node.js)
    // or be undefined in strict mode. Returning early prevents errors.
    if (this === undefined) return;

    // Private variable: Stored using a closure, it's not directly accessible from outside the object.
    // This is a common pattern for creating "private" properties in JavaScript before ES6 classes.
    let _name = name;

    // Public properties: Accessible directly from instances of Task.
    this.createdAt = new Date(); // Timestamp when the task object was created
    this.updatedAt = null;       // Timestamp for the last update, null initially

    // Public method: Allows changing the task's name.
    // It updates the private '_name' and sets 'updatedAt'.
    this.changeName = function (newName) {
        if (newName) { // Only update if a new name is provided (not null, undefined, or empty string)
            _name = newName;
            this.updatedAt = new Date(); // Update the timestamp
        }
    };

    // Public method: Allows retrieving the task's name.
    // This is the only way to access the private '_name' from outside.
    this.getName = function () {
        return _name;
    };
}

// --- Usage Example ---

// Create a new Task instance
const task1 = new Task("my task");

// Change the name of task1
task1.changeName("my updated task");

// Create another Task instance
const task2 = new Task("my second task");

// Output task2 object to console.
// Note: You will see 'createdAt', 'updatedAt', 'changeName', and 'getName' as properties.
// The '_name' itself won't be directly visible because it's a private variable.
console.log(task2);

// --- Uncomment these lines to see more examples ---
// console.log(task1.getName()); // Shows "my updated task"

// task1.changeName(); // Calling without a new name will not update '_name' or 'updatedAt'
// console.log(task1.getName()); // Still shows "my updated task"
// console.log(task1); // Shows the task1 object with updated properties

// console.log(createdAt); // This would cause a ReferenceError because 'createdAt' is a property of 'this', not a global variable.
