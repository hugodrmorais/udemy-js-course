function Dog(name) {
  let position = 0; // This variable is private to each Dog instance created by this constructor.

  this.name = name; // 'name' is a public property, unique to each instance.

  // 'bark' is a public method, unique to each instance.
  this.bark = function () {
    console.log(this.name, "is barking");
  };

  // 'walk' is a public method, unique to each instance.
  // It updates the 'position' variable in its closure.
  this.walk = function (distance) {
    position += distance; // Updates the private 'position' for this specific dog instance.
    console.log(this.name, "walked", distance, "m");
    console.log("The current position is", position, "m");
  };

  // Note: There's no getter for 'position' in this constructor function like in your previous example.
  // If you wanted to expose 'position', you'd need a getter or make it a public property.
}

// Create new Dog instances using the 'new' keyword.
const rex = new Dog("Rex");
const toto = new Dog("Totó");

console.log(rex); // Logs the Rex object and its methods/properties.
rex.bark();       // Rex barks.
rex.walk(5);      // Rex walks 5m.
rex.walk(10);     // Rex walks another 10m.

toto.walk(3);     // Totó walks 3m. (Notice Totó's position starts from 0, independent of Rex).

const laica = new Dog("Laica");
laica.bark();     // Laica barks.
laica.walk(2);    // Laica walks 2m.
laica.walk(-16);  // Laica walks -16m (backwards).
