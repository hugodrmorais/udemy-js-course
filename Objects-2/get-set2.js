/*
Exercise
Create a product object.
This product has a single property called 'quantity'.
Protect this property so that it only accepts numbers greater than 0.
Every time the 'quantity' value is accessed, show a counter in the console.
Avoid global scope variables.
*/

// Immediately Invoked Function Expression (IIFE) to encapsulate variables and avoid global scope pollution.
(function () {
    let _quantity = 0; // Private variable to store the actual quantity value.
    let _counter = 0;  // Private variable to store the access counter.

    // Expose the 'product' object to the global scope (e.g., 'window' in browsers)
    // by attaching it to 'this' within the IIFE.
    this.product = {
        // Getter for the 'quantity' property.
        // This function runs every time 'product.quantity' is read.
        get quantity() {
            // Increment the counter and log how many times 'quantity' has been accessed.
            console.log(`Quantity has been accessed ${++_counter} time${_counter > 1 ? 's' : ''}`);
            return _quantity; // Return the private quantity value.
        },
        // Setter for the 'quantity' property.
        // This function runs every time 'product.quantity' is assigned a value.
        set quantity(value) {
            // Protect the property: only update _quantity if the new value is greater than 0.
            if (value > 0) {
                _quantity = value;
            } else {
                console.log("Quantity must be a number greater than 0.");
            }
        }
    };
})(); // The IIFE is immediately invoked.

// --- Usage Examples ---

// Set the quantity (using the setter, which applies validation)
product.quantity = 20;

// Access the quantity (using the getter, which increments the counter and logs)
console.log(product.quantity);

// Set the quantity again
product.quantity = 21;
// Access the quantity again
console.log(product.quantity);

// Set the quantity once more
product.quantity = 22;
// Access the quantity again
console.log(product.quantity);

// Example of trying to set an invalid quantity
product.quantity = 0; // This will trigger the setter's validation but won't change _quantity.
console.log(product.quantity); // Accessing will still log the last valid quantity (22) and increment the counter.
