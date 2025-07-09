function createDog(name) {
    let position = 0; // Private variable to store the dog's position

    return {
      name, // Shorthand for name: name

      // Method for the dog to bark
      bark() {
        console.log(this.name, "is barking");
      },

      // Method for the dog to walk
      walk(distance) {
        position += distance; // Update position based on distance
        console.log(this.name, "walked", distance, "m");
      },

      // Getter for the dog's current position
      get position() {
        console.log(`The current position of ${this.name} is ${position}`);
        return position;
      }
    };
}

// Create a new dog instance named "Rex"
const rex = createDog("Rex");
rex.walk(10); // Rex walks 10m
rex.walk(5);  // Rex walks another 5m

console.log("rex.position"); // Just a label for the console output
console.log(rex.position);   // Get and log Rex's current position (using the getter)
console.log(rex);            // Log the entire Rex object to see its structure

// Create another new dog instance named "Totó"
const toto = createDog("Totó");
toto.walk(20);  // Totó walks 20m
toto.walk(-3);  // Totó walks -3m (backwards)
toto.walk(-17); // Totó walks -17m (backwards)
