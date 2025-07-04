const arr = [1, 5, 10, "ola", true];

// .every() checks if ALL elements in an array pass a test (return true).
// It returns true if all elements pass, otherwise false.
// It stops iterating as soon as it finds an element that returns false.
let justNumbers = arr.every(function (el) {
  console.log(el); // This will log each element as it's checked until 'ola' is encountered.
  return typeof el === "number"; // The test: is the element a number?
});

console.log(justNumbers); // false (because "ola" and true are not numbers)

// .some() checks if AT LEAST ONE element in an array passes a test (return true).
// It returns true if at least one element passes, otherwise false.
// It stops iterating as soon as it finds an element that returns true.
let justNumbers1 = arr.some(function (el) {
    return typeof el === "number"; // The test: is the element a number?
});

console.log(justNumbers1); // true (because 1, 5, and 10 are numbers)

// .filter() creates a NEW array with all elements that pass the test (return true).
// It does not modify the original array.
let arr1 = arr.filter(function (el, i, _arr) {
    return typeof el === "number"; // The test: include only elements that are numbers.
});

console.log(arr1); // [ 1, 5, 10 ]

// .forEach() executes a provided function ONCE for each array element.
// It does not return a new array and is primarily used for side effects (like logging).
arr.forEach(function (el, i, _arr) {
    console.log(el); // Logs each element of the original 'arr'.
});
// Expected console output from forEach:
// 1
// 5
// 10
// ola
// true

// .map() creates a NEW array by calling a provided function ONCE for each element in the original array.
// It transforms each element based on the function's return value.
// It does not modify the original array.
let arr2 = arr1.map(function (el, i, _arr) {
    return el * el; // The transformation: square each number.
});

console.log(arr2);
// Expected console output:
// [ 1, 25, 100 ] (because arr1 was [1, 5, 10], and their squares are 1, 25, 100)
