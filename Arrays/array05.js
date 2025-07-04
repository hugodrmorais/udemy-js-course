let arr = [1, 3, 5, 7, 9];

// .push() adds one or more elements to the end of an array.
// It returns the NEW length of the array.
let testPush = arr.push(11, 13, true, "hello world");
console.log(testPush); // Logs the new length of 'arr' (which will be 9: [1, 3, 5, 7, 9, 11, 13, true, "hello world"])
console.log(arr);     // Logs the modified array: [1, 3, 5, 7, 9, 11, 13, true, "hello world"]

// .pop() removes the LAST element from an array.
// It returns the removed element.
// It modifies the original array.
let lastItem = arr.pop();
// let lastItem = arr[arr.length - 1]; // This line is commented out, but it shows how you could access the last item WITHOUT removing it.
console.log(lastItem); // Logs "hello world" (the item that was removed)
console.log(arr);      // Logs the array after removal: [1, 3, 5, 7, 9, 11, 13, true]

// .shift() removes the FIRST element from an array.
// It returns the removed element.
// It modifies the original array.
let firstItem = arr.shift();
console.log(firstItem); // Logs 1 (the item that was removed)
console.log(arr);       // Logs the array after removal: [3, 5, 7, 9, 11, 13, true]

// .unshift() adds one or more elements to the BEGINNING of an array.
// It returns the NEW length of the array.
// It modifies the original array.
testPush = arr.unshift(4, 5, 6);
console.log(testPush); // Logs the new length of 'arr' (which will be 10: [4, 5, 6, 3, 5, 7, 9, 11, 13, true])
console.log(arr);     // Logs the modified array: [4, 5, 6, 3, 5, 7, 9, 11, 13, true]

// .slice() returns a SHALLOW COPY of a portion of an array into a NEW array.
// It does NOT modify the original array.
// arr.slice(startIndex, endIndex) - endIndex is exclusive.
// If only one argument, it slices from that index to the end.
let arr2 = arr.slice(5); // Slices from index 5 to the end.
console.log(arr2);       // Logs [7, 9, 11, 13, true]
console.log(arr);        // Logs the original array, which remains unchanged: [4, 5, 6, 3, 5, 7, 9, 11, 13, true]

// .splice() changes the contents of an array by REMOVING existing elements and/or ADDING new elements.
// It modifies the original array.
// It returns an array containing the DELETED elements (if any).
// arr.splice(startIndex, deleteCount, item1, item2, ...)
// Here: start at index 2, delete 4 elements, then insert "hello world", 10, 100, 1000.
let arr3 = arr.splice(2, 4, "hello world", 10, 100, 1000);
console.log(arr);  // Logs the MODIFIED array: [4, 5, "hello world", 10, 100, 1000, 13, true]
                   // Elements 6, 3, 5, 7 were removed, and the new ones inserted.
console.log(arr3); // Logs the array of DELETED elements: [6, 3, 5, 7]
