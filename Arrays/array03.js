let arr1 = [1, 2, 3];
let arr2 = [5, 6, 7];

// .toString() converts an array into a string of comma-separated values.
// It does not modify the original array.
console.log(arr1.toString()); // "1,2,3"

// .join() converts all elements of an array into a string.
// It accepts an optional separator argument; if not provided, a comma is used.
// It does not modify the original array.
console.log(arr1.join(" - ")); // "1 - 2 - 3"

// .concat() creates a NEW array by merging two or more arrays (and/or values).
// It does not modify the original arrays.
// You can pass multiple arrays or individual values as arguments.
let arr3 = arr1.concat(arr2, 4, 89, 9, 10, ["ola", "mundo"]);

console.log(arr1); // [1, 2, 3] (original arr1 remains unchanged)
console.log(arr2); // [5, 6, 7] (original arr2 remains unchanged)
console.log(arr3); // [1, 2, 3, 5, 6, 7, 4, 89, 9, 10, "ola", "mundo"] (the new concatenated array)
