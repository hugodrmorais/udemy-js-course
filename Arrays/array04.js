let arr1 = ["a", "b", "c"];

// Creates a NEW array (arr2) by concatenating arr1.
// This is a common way to create a shallow copy of an array.
// arr2 now contains ["a", "b", "c"], but it's a distinct array in memory from arr1.
let arr2 = [].concat(arr1);

// Adds a new value to the END of arr2.
// arr2.length is 3, so arr2[3] is assigned "novo valor".
// This modification only affects arr2, not arr1, because arr2 is a separate copy.
arr2[arr2.length] = "novo valor";

console.log(arr1); // ["a", "b", "c"] (remains unchanged)
console.log(arr2); // ["a", "b", "c", "novo valor"] (the new value is added to the copy)
