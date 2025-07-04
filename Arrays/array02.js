let arr = [4, 5, 10, 20, 35, 4, 5];

// .indexOf() returns the first index at which a given element can be found in the array.
// If the element is not present, it returns -1.
console.log(arr.indexOf(555)); // -1 (555 is not in the array)
// This is a common way to check if an element exists in an array.
console.log(arr.indexOf(555) > -1); // false (since -1 > -1 is false)

// .includes() is a more modern and readable way to check if an array contains a certain value.
// It returns true if the value is found, and false otherwise.
console.log(arr.includes(555)); // false (555 is not in the array)

// .find() returns the VALUE of the first element in the array that satisfies the provided testing function.
// If no elements satisfy the testing function, undefined is returned.
console.log(arr.find(function (el) {
    return el > 1000; // The test: find an element greater than 1000.
})); // undefined (no element in the array is greater than 1000)

// .findIndex() returns the INDEX of the first element in the array that satisfies the provided testing function.
// If no elements satisfy the testing function, -1 is returned.
console.log(arr.findIndex(function (el) {
    return el > 1000; // The test: find the index of the first element greater than 1000.
})); // -1 (no element satisfies the condition)
